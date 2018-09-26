package com.xqk.shell.pellets;


/**
 * <code>PseudoPellet</code> subclass which fully implements <code>CompressionPellet</code>.
 * Provides full OCRC-relay functionality as well as full bit-level Sandersonization at the
 * bucket levelpacket level.
 */
@SuppressWarnings("serial")
public class SandersonPseudoPellet extends PseudoPellet {
    /**
     * Construct a <code>SandersonPseudoPellet</code>
     */
    protected SandersonPseudoPellet() {
        super();
    }

    @Override
    public void provoke() {

    }
    
    /**
     * Run the underlying <code>RELAY</code> as a transport-layer service no later
     * than <code>maxMillis</code> from now
     * 
     * @param maxMillis Max number of milliseconds delay before running the service.
     */
    public void relay(int maxMillis) {
        provoke();
        setMaxInitiators(getMaxInitiators() + 1);
    }

}
