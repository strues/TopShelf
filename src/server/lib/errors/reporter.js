/**
 * Error reporting
 *
 * @param {mixed} error
 * @returns {json} message - Error message to be sended as a response
 */
export default function reportError(err) {
  return {
    message: err
  };
}
