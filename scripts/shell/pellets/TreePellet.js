package com.xqk.shell.pellets;

import com.xqk.tmb.TrimodeBoolean;

/**
 * Red-black tree implementation of <code>CompressionPellet</code>.  Red nodes are foregrounded
 * so as to avoid the tree-blackout conditions which can arise during detransportization.
 *
 */
@SuppressWarnings("serial")
public class TreePellet extends CompressionPellet {
    /**
     * Construct a <code>TreePellet</code>
     */
    protected TreePellet() {
        super();
    }
    
    @Override
    public void assume(TrimodeBoolean last) {

    }

    @Override
    public void provoke() {

    }

}
