const ArchiveExtrospector = require('../CompressorDecompressor');
const ProgressListener = require('../ProgressListener');
const Extrospector = require('../extrospection/Extrospector');
const CompressionPellet = require('../shell/pellets/CompressionPellet');
const PelletFactory = require('../shell/pellets/PelletFactory');
const TrimodeBoolean = require('../tmb/TrimodeBoolean');

/**
 * Generates the hard-shell contingency overlay which enfolds all XQK archives.  The overlay consists of
 * an `InvulnerabilityMatrix`, a non-trivial number of R5/C compression pellets (see `CompressionPellet`),
 * and the onboard XQK algorithm itself.
 *
 */
class HardshellOverlayInterjector {

    /**
     * Build and return the hard-shell overlay.  This method is called by a `CompressorDecompressor` instance
     * exactly once when hardening an archive in preparation for PATHX-level transport.
     * 
     * @param pelletCount Number of compression pellets (`CompressionPellet`) to position athwart the hard-shell's
     *   `InvulnerabilityMatrix` (typically 2048)
     * @param algo The onboard XQK algorithm, expressed as a byte array
     * @param matrix An `InvulnerabilityMatrix` instance
     * @param progressListener The current `ProgressListener`
     * @param extrospector The current Extrospector-implementation instance.
     * @param pelletFactoryOverrideClass If not null, force the pellet factory to return pellets of this type
     * @param {TrimodeBoolean} compress True to compress, false to decompress
     * @return The hard-shell contingency overlay to be used to enfold the archive
     */

    static generateEnfolder(pelletCount, algo, matrix, progressListener, extrospector,
                                          pelletFactoryOverrideClass, compress) {
        new ArgValidator(arguments).validate([
            {name: 'pelletCount', reqd: true, type: 'number'},
            {name: 'algo', reqd: true, type: 'array'},
            {name: 'matrix', reqd: true, type: 'object', instOf: InvulnerabilityMatrix},
            {name: 'progressListener', reqd: true, type: 'object', instOf: ProgressListener},
            {name: 'extrospector', reqd: true, type: 'object', instOf: ArchiveExtrospector},
            {name: 'pelletFactoryOverrideClass', reqd: true, type: 'function, null'},
            {name: 'compress', reqd: true, type: 'object', instOf: TrimodeBoolean},
        ]);

        if (compress.booleanValue()) {
            progressListener.outPrintln("Pelletizing overlay (ct=" + pelletCount + ")...");
        }
        matrix.reflectPellets(PelletFactory.getPellets(pelletCount, SANDERSONIZE_INTERVAL, false, MAX_INITIATORS,
            progressListener, pelletFactoryOverrideClass, compress.booleanValue()));
        if (compress.booleanValue()) {
            progressListener.outPrintln('');
        }
              
        const b = `${INITIAL_OVERLAY_CHARS}${algo}${matrix.getGridBytes()}${matrix.getPelletBytes()}${SEALANT}`;
        return b.getBytes();
    }


}


/**
 * How many PPR initiators will be used at one time (effectively this is the size of the initiator pool)
 */
const MAX_INITIATORS = 10;
/**
 * How often, in milliseconds, the overlay should re-Sandersonize itself when its Koroviev velocity is
 * not near-zero with respect to the local frame.
 */
const SANDERSONIZE_INTERVAL = 4;

const INITIAL_OVERLAY_CHARS = 'LOCKB>>:OvMtx(:Proc/00000000|(\"'.getBytes();
const SEALANT = "\")).call(\"dec\").rprot(UNLOCKB)>>".getBytes();



module.exports = HardshellOverlayInterjector;
