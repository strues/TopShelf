import mongoose from 'mongoose';
import crypto from 'crypto';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        index: true
    },
    role: {
        type: String,
        default: 'user'
    },
    enabled: {
        type: Boolean,
        default: true
    },
    hashedPassword: String,
    salt: String,
    provider: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiration: Date,
    xf: {
        id: {
            type: String,
            index: true
        },
        token: String,
        username: String
    },
    // References to other collections
    articles: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    characters: [{
        type: Schema.Types.ObjectId,
        ref: 'Character'
    }],
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    raids: {
        type: Schema.Types.ObjectId,
        ref: 'Raid'
    },
    loginCount      : {type : Number, default : 1},
    // Battlenet
    bnetId: Number,
    battletag: String,
    bio: {
        type: String
    }
});

/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            '_id': this._id,
            'username': this.username,
            'role': this.role,
            'email': this.email,
            'battletag': this.battletag,
            'bio': this.bio,
            'lastUpdated': this.lastUpdated,
            'active': this.active,
            'characters': this.characters
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'username': this.username,
            'role': this.role
        };
    });
/**
 * Validations
 */

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('hashedPassword')
    .validate(function(hashedPassword) {
        return hashedPassword.length;
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function(value, respond) {
        var self = this;
        this.constructor.findOne({
            email: value
        }, function(err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                if (self.id === user.id) {
                    return respond(true);
                }
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function(next) {
        if (!this.isNew) {
            return next();
        }
        if (!validatePresenceOf(this.hashedPassword) ===
            -1) {
            next(new Error('Invalid password'));
        } else {
            next();
        }
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) {
            return '';
        }
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString(
            'base64');
    }
};

module.exports = mongoose.model('User', UserSchema);
