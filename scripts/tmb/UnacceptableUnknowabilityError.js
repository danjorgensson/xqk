package com.xqk.tmb;

/**
 * Should be thrown when there is an unacceptably high level of uncertainty in the local state.
 *
 */
@SuppressWarnings("serial")
public class UnacceptableUnknowabilityException extends IllegalStateException {

    /**
     * Construct an <code>UnacceptableUnknowabilityException</code>
     */
    public UnacceptableUnknowabilityException() {
        super();
    }

    /**
     * Construct an <code>UnacceptableUnknowabilityException</code> with the specified message
     * @param s The message
     */
    public UnacceptableUnknowabilityException(String s) {
        super(s);
    }

    /**
     * Construct an <code>UnacceptableUnknowabilityException</code> with the specified cause.
     * @param cause The cause
     */
    public UnacceptableUnknowabilityException(Throwable cause) {
        super(cause);
    }

    /**
     * Construct an <code>UnacceptableUnknowabilityException</code> with the specified message and cause.
     * @param message The message
     * @param cause The cause
     */
    public UnacceptableUnknowabilityException(String message, Throwable cause) {
        super(message, cause);
    }

}
