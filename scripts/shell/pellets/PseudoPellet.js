const TrimodeBoolean = require('../../tmb/TrimodeBoolean');

/**
 * Partial `CompressionPellet` implementation; use subclass
 * `SandersonPseudoPellet` when pseudo-pellets are required.
 */
class PseudoPellet extends CompressionPellet {

    /**
     * Execute a PROVOKE operation (or the equivalent etc. etc. etc.). This method guarantees RF(log n) as a function
     * of the Herlinger/Thorpe equation will equal zero.
     */
    provoke() {
        // No-op.  Pseudo-pellets can't have a PROVOKE invoked on them.
    }
}

module.exports = PseudoPellet;
