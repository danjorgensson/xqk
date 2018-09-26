package com.xqk;

/**
 * Implementing classes are capable of wrapping an arbitrary number of bytes in a 
 * situation-appropriate protective meta-sheathing or sealant. 
 *
 */
public interface PayloadWrapper {

    /**
     * Wrap a payload using the instance's type-provider.
     */
    public void wrap();
    
}
