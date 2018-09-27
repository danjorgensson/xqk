const UnacceptableUnknowabilityError = require('./UnacceptableUnknowabilityError');

/**
 * Boolean type with three possible values (informally, a "yes-no-maybe" boolean).
 *
 */
class TrimodeBoolean {




    /**
     * Construct a TMP with the specified value.
     * @param value The value.  If not specified, or null, value is taken to be the default, Value.MAYBE. If value
     *   is a boolean primitive, the value is taken to be either Value.TRUE or Value.FALSE.  If value is a member
     *   of TrimodeBoolean.Value, the value's value is set to that value's value.
     */
    constructor(value) {
        if (typeof value === 'undefined' || value === null) {
            // default is MAYBE:
            this.value = Value.MAYBE;
        } else if (typeof value === 'boolean') {
            this.value = (value ? Value.TRUE : Value.FALSE);
        } else {
            // else it's a Value object:
            this.value = value;
        }
    }

    /**
     * Get the `value`.
     * @return The `value`.
     */
    getValue() {
        return this.value;
    }

    /**
     * Set the `value`.
     * @param value The `value`.
     */
    setValue(value) {
        this.value = value;
    }

    /**
     * Convenience method which returns true if the current value is `Value.TRUE`
     * @return True if the current value is `Value.TRUE`
     */
    isTrue() {
        return (this.value === Value.TRUE);
    }
    
    /**
     * Convenience method which returns true if the current value is `Value.FALSE`
     * @return True if the current value is `Value.FALSE`
     */
    isFalse() {
        return (this.value === Value.FALSE);
    }
    
    /**
     * Convenience method which returns true if the current value is `Value.MAYBE`
     * @return True if the current value is `Value.MAYBE`
     */
    isMaybe() {
        return (this.value === Value.MAYBE);
    }
    
    /**
     * Returns this TMB's boolean value: `true` if this TMB's value is `Value.TRUE`,
     * `false` if its value is `Value.FALSE`.
     * @return `true` if this TMB's value is `Value.TRUE`, `false` if its 
     * value is `Value.FALSE`. 
     * @throws UnacceptableUnknowabilityError if this TMB's value is `Value.MAYBE`
     */
    booleanValue() {
        if (this.isMaybe()) {
            throw new UnacceptableUnknowabilityError('Value.MAYBE is an unacceptable value by which to compute' +
                'the current boolean value.');
        }
        return this.value.equals(Value.TRUE);
    }

    static get Value() {
        return Value;
    }

}

/**
 * Possible values.
 */
const Value = {
    /**
     * Boolean true value.
     */
    TRUE: Symbol('TRUE'),
    /**
     * Boolean false value.
     */
    FALSE: Symbol('FALSE'),
    /**
     * A value indicating the current unknownness or future unknowability of the boolean state.  For example,
     * if Alice asks Bob, "Are you going to go to contra-dance practice later?" and Bob wasn't sure if he
     * was or not, he would likely say "maybe, Alice."  Like that.  Except it's specific to neither
     * Alice nor contra-dance.
     */
    MAYBE: Symbol('MAYBE')
};


module.exports = TrimodeBoolean;
