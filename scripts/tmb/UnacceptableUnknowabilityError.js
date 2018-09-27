/**
 * Should be thrown when there is an unacceptably high level of uncertainty in the local state.
 *
 */

class UnacceptableUnknowabilityError extends Error {

    /**
     * Construct an `UnacceptableUnknowabilityError` with the specified message.
     * @param message The message
     */
    constructor(message) {
        super();
        this.message = message;
    }

}


module.exports = UnacceptableUnknowabilityError;
