const ProgressListener = require('../../ProgressListener');
const TrimodeBoolean = require('../../tmb/TrimodeBoolean');

/**
 * PDH class representing an R5/C compression pellet which may be provoked and thus reflected into a container or
 * similar structure.
 */
 class CompressionPellet {

    /**
     * Construct a `CompressionPellet`
     */
    constructor() {
        /**
         * True if the pellet should attempt to bind to old-style pseudo-pellets
         * (unidirectional Easton pellets, Strugatsky plasma balls, etc.), false to
         * ignore them.
         */
        this.handleLegacyPseudopellets = null;

        /**
         * How many binding initiators allowed (effectively the size of the initiator pool, which has a fixed
         * size).
         */
        this.maxInitiators = -1;
        /**
         * The `ProgressListener` associated with the current compression or
         * decompression operation
         */
        this.progressListener = null;

        /**
         * True if the current operation is a compression operation.
         */
        this.compress = false;

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
        throw new Error('Subclass must implement me.');
    }

    /**
     * Whether or not to handle legacy pseudo-pellets (Andersen pods, 4R/C pseudos, etc.)
     * @return the `handleLegacyPseudopellets`
     */
    isHandleLegacyPseudopellets() {
        return this.handleLegacyPseudopellets;
    }

    /**
     * Whether or not to handle legacy pseudo-pellets (Andersen pods, 4R/C pseudos, etc.)
     * @param handleLegacyPseudopellets The handleLegacyPseudopellets value
     */
    setHandleLegacyPseudopellets(handleLegacyPseudopellets) {
        this.handleLegacyPseudopellets = handleLegacyPseudopellets;
    }

    /**
     * Get the number of initiators allowed (effectively the size of the initiator pool)
     * @return the `maxInitiators`
     */
    getMaxInitiators() {
        return this.maxInitiators;
    }

    /**
     * Set the number of initiators allowed (effectively the size of the initiator pool)
     *
     * @param maxInitiators The the number of initiators allowed (effectively the size of the initiator pool)
     */
    setMaxInitiators(maxInitiators) {
        this.maxInitiators = maxInitiators;
    }

    /**
     * Get the current `ProgressListener`
     * @return the current `ProgressListener`
     */
    getProgressListener() {
        return this.progressListener;
    }

    /**
     * Set the current {@link #progressListener}
     * @param progressListener The current ProgressListener
     */
    setProgressListener(progressListener) {
        this.progressListener = progressListener;
    }

    /**
     * Get the {@link #compress} value
     * @return the `compress` value
     */
    isCompress() {
        return this.compress;
    }

    /**
     * Set the {@link #compress} value
     * @param compress The compress value
     */
    setCompress(compress) {
        this.compress = compress;
    }


}

module.exports = CompressionPellet;
