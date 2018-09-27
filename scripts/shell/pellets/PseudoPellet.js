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

    }
}

module.exports = PseudoPellet;
