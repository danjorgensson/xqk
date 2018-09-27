/**
 * Should be thrown when there is an unacceptably high level of uncertainty in the local state.
 *
 */

class UnacceptableUnknowabilityError extends Error {

    /**
     * Construct an `UnacceptableUnknowabilityError` with the specified message.
     * @param message The message, if any
     */
    constructor(message) {
        super();
        this.message = (message || null);
    }

}


module.exports = UnacceptableUnknowabilityError;
