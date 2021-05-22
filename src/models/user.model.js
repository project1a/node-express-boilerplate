const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    accountId: {
      type: String,
    },
    appleId: {
      type: String,
    },
    avatar: {
      type: String,
    },
    availabilities: {
      type: Array
    },
    bookmarks: {
      type: Array,
    },
    cardPayments: {
      type: String
    },
    countryCode: {
      type: String
    },
    currency: {
      type: String
    },
    customerId: {
      type: String,
      required: true,
    },
    deepLink: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    fcmTokens: {
      type: Array
    },
    feedbackRequested: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    locale: {
      type: String,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    tz: {
      type: String,
    },
    transfers: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
