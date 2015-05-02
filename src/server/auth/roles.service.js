/**
 * Module for defining methods for handling acl roles.
 * @module {Object} auth:roles
 * @requires {@link config}
 */
'use strict';

var config = require('../config/environment');

/**
 * The array of user roles
 * @type {Array}
 */
var roles = config.userRoles;

// export the user role utility methods
module.exports = {
  /**
   * Return the name of the highest role
   * @type {function}
   * @see auth:roles~getMaxRole
   */
  getMaxRole: getMaxRole,

  /**
   * Check role access
   * @type {function}
   * @see auth:roles~hasRole
   */
  hasRole: hasRole
};

/**
 * Return the name of the highest role in the user role array.
 * @returns {String} The name of the role which is the last element in the user role array.
 */
function getMaxRole() {
  return roles[roles.length - 1];
}

/**
 * Check if a user has at least the same role as the given one
 * @param {String} role - The role of the user who requests access
 * @param {String} checkRole - The role to check for
 */
function hasRole(role, checkRole) {
  return roles.indexOf(role) >= roles.indexOf(checkRole);
}
