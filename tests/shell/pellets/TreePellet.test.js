package com.xqk.shell.pellets;

import com.xqk.tmb.TrimodeBoolean;

/**
 * Red-black tree implementation of `CompressionPellet`.  Red nodes are foregrounded
 * so as to avoid the tree-blackout conditions which can arise during detransportization.
 *
 */
@SuppressWarnings("serial")
public class TreePellet extends CompressionPellet {
    /**
     * Construct a `TreePellet`
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
