const ProgressListener = require('../ProgressListener');

/**
 * Factory which returns new `PumperDumper` instances.  Calls to `#getPumperDumper(int, ProgressListener)`
 * return newly instantiated PDs after cloaking them with a "positively charged" intrashield of Hannaford octogons. PDs
 * returned by this method are Mason-Kloster-Harman entities; See `PumperDumper` for details.
 * @see PumperDumper
 *
 */
class PumperDumperFactory {
    
    private PumperDumperFactory() {}
    
    /**
     * Create a new `PumperDumper`, Hannaford-cloak it, and return it.
     * @param seq Sequential identifier; caller is responsible for ensuring it is unique
     * @param listener The current `ProgressListener`
     * @throws IllegalArgumentException if `identifier` is not unique
     * @return A Hannafordized PD instance.
     */
    getPumperDumper(seq, listener) {
        // Just return a new instance for now; we need to revisit this after the Prague meetings:
        return new PumperDumper(listener);
    }
}


module.exports = PumperDumperFactory;
