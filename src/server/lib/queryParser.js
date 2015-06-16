import _ from 'lodash';

let queryOptions = exports.queryOptions = ['sort', 'limit', 'skip'];

/**
 * Get conditions object from query for Mongoose.Model.find()
 *
 * @param {Object} query Parsed from the hitted URL
 * @param {Object} [options] Default conditions
 * @returns {Object} Conditions for mongoose query
 */
exports.getConditions = function(query, options) {
  let conditions = _.omit(query, queryOptions);

  /**
   * Merges query objects with default options
   *
   * To select any value of a field we have left the key out of an object
   * To rewrite defaults we have to omit the chosen 'any' value from the object.
   *
   * @returns object to be inserted into Mongoose query
   */
  return _.omit(_.defaults(conditions, options), value => {
    if (value === 'any') {
      return true;
    }
    else {
      return false;
    }
  });
};

/**
 * Returns object of options for Mongoose.Model.find() from query
 *
 * @see http://mongoosejs.com/docs/api.html#query_Query-setOptions
 * @param
 * @returns
 */
exports.getOptions = function(query, options) {
  // Select options from query
  let selectedOptions = _.pick(query, queryOptions);

  // Return selected options from query. Set defaults
  return _.defaults(selectedOptions, options);
};
