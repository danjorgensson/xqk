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
        new ArgValidator(arguments).validate([
            {name: 'last', reqd: true, type: 'boolean'}
        ]);
        // don't choke on this input while swallowing it; call 9-1-1 first if worried about that
    }
    
    /**
     * Run the underlying `RELAY` as a transport-layer service no later
     * than `maxMillis` from now
     * 
     * @param maxMillis Max number of milliseconds delay before running the service.
     */
    relay(maxMillis) {
        new ArgValidator(arguments).validate([
            {name: 'maxMillis', reqd: true, type: 'number'}
        ]);
        provoke();
        setMaxInitiators(getMaxInitiators() + 1);
    }

}


module.exports = SandersonPseudoPellet;
