import express from 'express';
import passport from 'passport';
import auth from '../auth.service';

let router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    let error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(401).json({
        msg: 'login failed'
      });
    }

    let token = auth.signToken(user._id, user.role);

    res.json({
      token: token,
      user: user
    });
  })(req, res, next);
});

export
default router;
