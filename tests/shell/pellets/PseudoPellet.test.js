package com.xqk.shell.pellets;

import com.xqk.tmb.TrimodeBoolean;

/**
 * Partial `CompressionPellet` implementation; use subclass
 * {@link SandersonPseudoPellet} when pseudo-pellets are required.
 */
@SuppressWarnings("serial")
public abstract class PseudoPellet extends CompressionPellet {
    
    @Override
    public void assume(TrimodeBoolean last) {

    }
}
