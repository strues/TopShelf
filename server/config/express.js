/**
 * Express configuration
 */

'use strict';

var express        = require('express'),
    favicon        = require('serve-favicon'),
    morgan         = require('morgan'),
    colors         = require('colors'),
    compression    = require('compression'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    errorHandler   = require('errorhandler'),
    path           = require('path'),
    config         = require('./environment'),
    passport       = require('passport'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    mongoose       = require('mongoose'),
    bcrypt         = require('bcryptjs'),
    path           = require('path'),
    qs             = require('querystring'),
    jwt            = require('jwt-simple'),
    moment         = require('moment'),
     config   = require('./environment'),
    request        = require('request');

var User = require('../api/users/user.model');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
          host: '127.0.0.1',
          port: '6379'
    })
  }));


  /*
   |--------------------------------------------------------------------------
   | Loging Required Middleware
   |--------------------------------------------------------------------------
   */
  function ensureAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if (payload.exp <= Date.now()) {
      return res.status(401).send({ message: 'Token has expired' });
    }

    req.user = payload.sub;
    next();
  }

  /*
   |--------------------------------------------------------------------------
   | Generate JSON Web Token
   |--------------------------------------------------------------------------
   */
  function createToken(req, user) {
    var payload = {
      iss: req.hostname,
      sub: user._id,
      iat: moment().valueOf(),
      exp: moment().add(14, 'days').valueOf()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
  }

  /*
   |--------------------------------------------------------------------------
   | GET /api/me
   |--------------------------------------------------------------------------
   */
  app.get('/api/me', ensureAuthenticated, function(req, res) {
    User.findById(req.user, function (err, user) {
      res.send(user);
    });
  });

  /*
   |--------------------------------------------------------------------------
   | PUT /api/me
   |--------------------------------------------------------------------------
   */
  app.put('/api/me', ensureAuthenticated, function(req, res) {
    User.findById(req.user, function(err, user) {
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
      user.displayName = req.body.displayName || user.displayName;
      user.email = req.body.email || user.email;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  });


  /*
   |--------------------------------------------------------------------------
   | Log in with Email
   |--------------------------------------------------------------------------
   */
  app.post('/auth/login', function(req, res) {
    User.findOne({ email: req.body.email }, '+password', function(err, user) {
      if (!user) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }

      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: 'Wrong email and/or password' });
        }
        res.send({ token: createToken(req, user) });
      });
    });
  });

  /*
   |--------------------------------------------------------------------------
   | Create Email and Password Account
   |--------------------------------------------------------------------------
   */
  app.post('/auth/signup', function(req, res) {
    var user = new User();
    user.displayName = req.body.displayName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(err) {
      res.status(200).end();
    });
  });

  /*
   |--------------------------------------------------------------------------
   | Login with Google
   |--------------------------------------------------------------------------
   */
  app.post('/auth/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: config.GOOGLE_SECRET,
      code: req.body.code,
      grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {

      var accessToken = token.access_token;
      var headers = { Authorization: 'Bearer ' + accessToken };

      // Step 2. Retrieve profile information about the current user.
      request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {

        // Step 3a. If user is already signed in then link accounts.
        if (req.headers.authorization) {
          User.findOne({ google: profile.sub }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
            }

            var token = req.headers.authorization.split(' ')[1];
            var payload = jwt.decode(token, config.TOKEN_SECRET);

            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              user.google = profile.sub;
              user.displayName = user.displayName || profile.name;
              user.save(function(err) {
                res.send({ token: createToken(req, user) });
              });
            });
          });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({ google: profile.sub }, function(err, existingUser) {
            if (existingUser) {
              return res.send({ token: createToken(req, existingUser) });
            }

            var user = new User();
            user.google = profile.sub;
            user.displayName = profile.name;
            user.save(function(err) {
              res.send({ token: createToken(req, user) });
            });
          });
        }
      });
    });
  });

  /*
   |--------------------------------------------------------------------------
   | Login with GitHub
   |--------------------------------------------------------------------------
   */
  app.post('/auth/github', function(req, res) {
    var accessTokenUrl = 'https://github.com/login/oauth/access_token';
    var userApiUrl = 'https://api.github.com/user';

    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: config.GITHUB_SECRET,
      code: req.body.code
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
      accessToken = qs.parse(accessToken);

      var headers = { 'User-Agent': 'Satellizer' };

      // Step 2. Retrieve profile information about the current user.
      request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {

        // Step 3a. If user is already signed in then link accounts.
        if (req.headers.authorization) {
          User.findOne({ github: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' });
            }

            var token = req.headers.authorization.split(' ')[1];
            var payload = jwt.decode(token, config.TOKEN_SECRET);

            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              user.github = profile.id;
              user.displayName = user.displayName || profile.name;
              user.save(function(err) {
                res.send({ token: createToken(req, user) });
              });
            });
          });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({ github: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.send({ token: createToken(req, existingUser) });
            }

            var user = new User();
            user.github = profile.id;
            user.displayName = profile.name;
            user.save(function(err) {
              res.send({ token: createToken(req, user) });
            });
          });
        }
      });
    });
  });

  /*
   |--------------------------------------------------------------------------
   | Login with LinkedIn
   |--------------------------------------------------------------------------
   */
  app.post('/auth/linkedin', function(req, res) {
    var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
    var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name)';

    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: config.LINKEDIN_SECRET,
      code: req.body.code,
      grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { form: params, json: true }, function(err, response, body) {

      if (response.statusCode !== 200) {
        return res.status(response.statusCode).send({ message: body.error_description });
      }

      var params = {
        oauth2_access_token: body.access_token,
        format: 'json'
      };

      // Step 2. Retrieve profile information about the current user.
      request.get({ url: peopleApiUrl, qs: params, json: true }, function(err, response, profile) {

        // Step 3a. If user is already signed in then link accounts.
        if (req.headers.authorization) {
          User.findOne({ linkedin: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a LinkedIn account that belongs to you' });
            }

            var token = req.headers.authorization.split(' ')[1];
            var payload = jwt.decode(token, config.TOKEN_SECRET);

            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              user.linkedin = profile.id;
              user.displayName = user.displayName || profile.firstName + ' ' + profile.lastName;
              user.save(function(err) {
                res.send({ token: createToken(req, user) });
              });
            });
          });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({ linkedin: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.send({ token: createToken(req, existingUser) });
            }

            var user = new User();
            user.linkedin = profile.id;
            user.displayName = profile.firstName + ' ' + profile.lastName;
            user.save(function(err) {
              res.send({ token: createToken(req, user) });
            });
          });
        }
      });
    });
  });

  /*
   |--------------------------------------------------------------------------
   | Login with Facebook
   |--------------------------------------------------------------------------
   */
  app.post('/auth/facebook', function(req, res) {
    var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/me';

    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: config.FACEBOOK_SECRET,
      code: req.body.code
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
      accessToken = qs.parse(accessToken);

      // Step 2. Retrieve profile information about the current user.
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {

        // Step 3a. If user is already signed in then link accounts.
        if (req.headers.authorization) {
          User.findOne({ facebook: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
            }

            var token = req.headers.authorization.split(' ')[1];
            var payload = jwt.decode(token, config.TOKEN_SECRET);

            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              user.facebook = profile.id;
              user.displayName = user.displayName || profile.name;
              user.save(function(err) {
                res.send({ token: createToken(req, user) });
              });
            });
          });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({ facebook: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.send({ token: createToken(req, existingUser) });
            }

            var user = new User();
            user.facebook = profile.id;
            user.displayName = profile.name;
            user.save(function(err) {
              res.send({ token: createToken(req, user) });
            });
          });
        }
      });
    });
  });

  /*
   |--------------------------------------------------------------------------
   | Login with Twitter
   |--------------------------------------------------------------------------
   */
  app.get('/auth/twitter', function(req, res) {
    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var authenticateUrl = 'https://api.twitter.com/oauth/authenticate';

    if (!req.query.oauth_token || !req.query.oauth_verifier) {
      var requestTokenOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        callback: config.TWITTER_CALLBACK
      };

      // Step 1. Obtain request token for the authorization popup.
      request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
        var oauthToken = qs.parse(body);
        var params = qs.stringify({ oauth_token: oauthToken.oauth_token });

        // Step 2. Redirect to the authorization screen.
        res.redirect(authenticateUrl + '?' + params);
      });
    } else {
      var accessTokenOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        token: req.query.oauth_token,
        verifier: req.query.oauth_verifier
      };

      // Step 3. Exchange oauth token and oauth verifier for access token.
      request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, profile) {
        profile = qs.parse(profile);

        // Step 4a. If user is already signed in then link accounts.
        if (req.headers.authorization) {
          User.findOne({ twitter: profile.user_id }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a Twitter account that belongs to you' });
            }

            var token = req.headers.authorization.split(' ')[1];
            var payload = jwt.decode(token, config.TOKEN_SECRET);

            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              user.twitter = profile.user_id;
              user.displayName = user.displayName || profile.screen_name;
              user.save(function(err) {
                res.send({ token: createToken(req, user) });
              });
            });
          });
        } else {
          // Step 4b. Create a new user account or return an existing one.
          User.findOne({ twitter: profile.user_id }, function(err, existingUser) {
            if (existingUser) {
              return res.send({ token: createToken(req, existingUser) });
            }
            var user = new User();
            user.twitter = profile.user_id;
            user.displayName = profile.screen_name;
            user.save(function(err) {
              res.send({ token: createToken(req, user) });
            });
          });
        }
      });
    }
  });

  /*
   |--------------------------------------------------------------------------
   | Login with Foursquare
   |--------------------------------------------------------------------------
   */
  app.post('/auth/foursquare', function(req, res) {
    var accessTokenUrl = 'https://foursquare.com/oauth2/access_token';
    var userProfileUrl = 'https://api.foursquare.com/v2/users/self';

    var payload = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: config.FOURSQUARE_SECRET,
      code: req.body.code,
      grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: payload }, function(err, response, body) {
      var params = {
        v: '20140806',
        oauth_token: body.access_token
      };

      // Step 2. Retrieve information about the current user.
      request.get({ url: userProfileUrl, qs: params, json: true }, function(err, response, profile) {
        profile = profile.response.user;

        // Step 3a. If user is already signed in then link accounts.
        if (req.headers.authorization) {
          User.findOne({ foursquare: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a Foursquare account that belongs to you' });
            }

            var token = req.headers.authorization.split(' ')[1];
            var payload = jwt.decode(token, config.TOKEN_SECRET);

            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              user.foursquare = profile.id;
              user.displayName = user.displayName || profile.firstName + ' ' + profile.lastName;
              user.save(function(err) {
                res.send({ token: createToken(req, user) });
              });
            });
          });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({ foursquare: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.send({ token: createToken(req, existingUser) });
            }

            var user = new User();
            user.foursquare = profile.id;
            user.displayName = profile.firstName + ' ' + profile.lastName;
            user.save(function(err) {
              res.send({ token: createToken(req, user) });
            });
          });
        }
      });
    });
  });


  /*
   |--------------------------------------------------------------------------
   | Unlink Provider
   |--------------------------------------------------------------------------
   */

  app.get('/auth/unlink/:provider', ensureAuthenticated, function(req, res) {
    var provider = req.params.provider;
    User.findById(req.user, function(err, user) {
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }

      user[provider] = undefined;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  });


  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};