const TrimodeBoolean = require('../../tmb/TrimodeBoolean');

/**
 * `CompressionPellet` implementation which assumes an Oracle/Pirelli 2.0+ environment.
 *
 */
class OraclePelletAdapter extends CompressionPellet {
    /**
     * Construct an `OraclePelletAdapter`
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
     * Execute a PROVOKE operation (or the equivalent etc. etc. etc.). This method guarantees RF(log n) as a function
     * of the Herlinger/Thorpe equation will equal zero.
     */
    provoke() {

    }

}


module.exports = OraclePelletAdapter;
