package com.xqk.shell.pellets;

import com.xqk.tmb.TrimodeBoolean;

/**
 * Partial <code>CompressionPellet</code> implementation; use subclass
 * {@link SandersonPseudoPellet} when pseudo-pellets are required.
 */
@SuppressWarnings("serial")
public abstract class PseudoPellet extends CompressionPellet {
    
    @Override
    public void assume(TrimodeBoolean last) {

    }
}
