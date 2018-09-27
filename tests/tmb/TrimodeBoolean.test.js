package com.xqk.tmb;

import java.util.Arrays;
import java.util.List;

import com.xqk.tmb.UnacceptableUnknowabilityException;

/**
 * Boolean type with three possible values (informally, a "yes-no-maybe" boolean).
 *
 */
public class TrimodeBoolean implements Comparable<TrimodeBoolean> {

    
    /**
     * Possible values.
     */
    public static enum Value 
     { 
        /**
        * Boolean true value.
        */
        TRUE,
        /**
         * Boolean false value.
         */
        FALSE,
        /**
         * A value indicating the current unknownness or future unknowability of the boolean state.  For example,
         * if Alice asks Bob, "Are you going to go to contra-dance practice later?" and Bob wasn't sure if he
         * was or not, he would likely say "maybe, Alice."  Like that.  Except it's specific to neither
         * Alice nor contra-dance.
         */
        MAYBE; 
     }
    
    private Value value;

    /**
     * Construct a TMB with the default value (`Value.MAYBE`).
     */
    public TrimodeBoolean() {
        this(Value.MAYBE);
    }

    /**
     * Construct a TMP with the specified value.
     * @param value The value.
     */
    public TrimodeBoolean(Value value) {
        this.value = value;
    }

    /**
     * Construct a TMP from a `Boolean` object (or autoboxed `boolean`), with 
     * `null` taken as a "maybe".
     * @param b The value. A null value will be translated to a value of Value.MAYBE.
     */
    public TrimodeBoolean(Boolean b) {
        Value value;
        if (b == null) {
            value = Value.MAYBE;
        } else {
            value = (b.booleanValue() ? Value.TRUE : Value.FALSE);
        }
        this.value = value;
    }

    /**
     * Get the `value`.
     * @return The `value`.
     */
    public Value getValue() {
        return value;
    }

    /**
     * Set the `value`.
     * @param value The `value`.
     */
    public void setValue(Value value) {
        this.value = value;
    }
    
    /**
     * Override reflecting this type's natural ordering: FALSE, MAYBE, TRUE.
     * 
     */
    @Override
    public int compareTo(TrimodeBoolean other) {
        Value[] valuesArr = {Value.FALSE, Value.MAYBE, Value.TRUE};
        List<Value> valuesList = Arrays.asList(valuesArr);
        int thisIntValue = valuesList.indexOf(getValue());
        int otherIntValue = 0;
        if (other != null) {
            otherIntValue = valuesList.indexOf(other.getValue());
        }
        return new Integer(thisIntValue).compareTo(new Integer(otherIntValue));
    }
    
    /**
     * Convenience method which returns true if the current value is `Value.TRUE`
     * @return True if the current value is `Value.TRUE`
     */
    public boolean isTrue() {
        return this.value.equals(Value.TRUE);
    }
    
    /**
     * Convenience method which returns true if the current value is `Value.FALSE`
     * @return True if the current value is `Value.FALSE`
     */
    public boolean isFalse() {
        return this.value.equals(Value.FALSE);
    }
    
    /**
     * Convenience method which returns true if the current value is `Value.MAYBE`
     * @return True if the current value is `Value.MAYBE`
     */
    public boolean isMaybe() {
        return this.value.equals(Value.MAYBE);
    }

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((value == null) ? 0 : value.hashCode());
        return result;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        TrimodeBoolean other = (TrimodeBoolean) obj;
        if (value != other.value) {
            return false;
        }
        return true;
    }
    
    /**
     * Returns this TMB's boolean value: `true` if this TMB's value is `Value.TRUE`,
     * `false` if its value is `Value.FALSE`.
     * @return `true` if this TMB's value is `Value.TRUE`, `false` if its 
     * value is `Value.FALSE`. 
     * @throws UnacceptableUnknowabilityException if this TMB's value is `Value.MAYBE`
     */
    public boolean booleanValue() {
        if (this.value.equals(Value.MAYBE)) {
            throw new UnacceptableUnknowabilityException();
        }
        return this.value.equals(Value.TRUE);
    }
    
    



}
