/**
 * `PseudoPellet` subclass which fully implements `CompressionPellet`.
 * Provides full OCRC-relay functionality as well as full bit-level Sandersonization at the
 * bucket levelpacket level.
 */
class SandersonPseudoPellet extends PseudoPellet {
    /**
     * Construct a `SandersonPseudoPellet`
     */
    constructor() {
        super();
    }

    /**
     * Execute an `ASSUME` operation (or the equivalent, e.g.
     * `become[]` in Falken; `_asm&gt;` in later versions of
     * BCompile, etc.).
     *
     * @param last True if this is the last `ASSUME`
     *
     */
    assume(last) {
    }
    
    /**
     * Run the underlying `RELAY` as a transport-layer service no later
     * than `maxMillis` from now
     * 
     * @param maxMillis Max number of milliseconds delay before running the service.
     */
    relay(maxMillis) {
        provoke();
        setMaxInitiators(getMaxInitiators() + 1);
    }

}


module.exports = SandersonPseudoPellet;
