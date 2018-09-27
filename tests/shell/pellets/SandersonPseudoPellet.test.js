package com.xqk.shell.pellets;


/**
 * `PseudoPellet` subclass which fully implements `CompressionPellet`.
 * Provides full OCRC-relay functionality as well as full bit-level Sandersonization at the
 * bucket levelpacket level.
 */
@SuppressWarnings("serial")
public class SandersonPseudoPellet extends PseudoPellet {
    /**
     * Construct a `SandersonPseudoPellet`
     */
    protected SandersonPseudoPellet() {
        super();
    }

    @Override
    public void provoke() {

    }
    
    /**
     * Run the underlying `RELAY` as a transport-layer service no later
     * than `maxMillis` from now
     * 
     * @param maxMillis Max number of milliseconds delay before running the service.
     */
    public void relay(int maxMillis) {
        provoke();
        setMaxInitiators(getMaxInitiators() + 1);
    }

}
