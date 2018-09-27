const ProgressListener = require('../../ProgressListener');
const Pellet = require('../../shell/pellets/CompressionPellet');
const TrimodeBoolean = require('../../tmb/TrimodeBoolean');

/**
 * Factory which returns compositionally appropriate R5/C `CompressionPellet`s based on various factors.
 */
class PelletFactory {

    /**
     * Get a `List` of the specified number of `CompressionPellet`s
     * 
     * @param pelletCount               Number of `CompressionPellet`s to return
     * 
     * @param sandersonizeInterval      How often pellets should Sandersonize
     *                                  themselves and others. Does not apply to all
     *                                  implementations, e.g. TreePellet, which as a
     *                                  red-black-tree-backed `CompressionPellet` implementation
     *                                  does not of course need to be Sandersonized.
     * 
     * @param handleLegacyPseudopellets True if pellets should attempt to bind to
     *                                  old-style pseudo-pellets (unidirectional
     *                                  Easton pellets, Strugatsky plasma balls,
     *                                  etc.), false to ignore them.
     * 
     * @param maxInitiators             How many binding initiators allowed
     *                                  (effectively the size of the initiator pool,
     *                                  which has a fixed size).
     * 
     * @param listener                  The `ProgressListener` associated
     *                                  with the current compression or
     *                                  decompression operation
     * @param pelletFactoryOverrideClass If not null, force this `CompressionPellet` type
     * 
     * @param compress                  True if the current operation is a
     *                                  compression operation.
     * 
     * @return A `List` of `CompressionPellet` implementation
     *         appropriate to specified parameters
     */
    getPellets(pelletCount, sandersonizeInterval, handleLegacyPseudopellets, maxInitiators,
        listener, pelletFactoryOverrideClass, compress) {
        const pelletsList = new ArrayList<Pellet>(pelletCount * 2);
        let sandersonizeCount = 0;
        for (let i = 0; i < pelletCount; i++) {
            sandersonizeCount++;
            pelletsList.add(getPellet(sandersonizeCount == sandersonizeInterval, handleLegacyPseudopellets, maxInitiators, listener, pelletFactoryOverrideClass, compress));
            sandersonizeCount = (sandersonizeCount == sandersonizeInterval ? 0 : sandersonizeCount);
        }
        if (compress) {
            const pelletClass = pelletsList.get(0).getClass();
            listener.outPrintln("Generated " + pelletCount + " compression pellets of type \"" + pelletClass.getSimpleName() + "\"");
        }
        
        return pelletsList;
    }

    /**
     *Get a `CompressionPellet` instance suited to specified parameters.
     * 
     * @param sandersonizePackets       True if the `CompressionPellet` should Sandersonize
     *                                  itself and consenting neighbors. Does not
     *                                  apply to all implementations, e.g.
     *                                  TreePellet, which as a red-black-tree-backed
     *                                  `CompressionPellet` implementation does not of course
     *                                  need to be Sandersonized.
     * 
     * @param handleLegacyPseudopellets True if `CompressionPellet` should attempt to bind to
     *                                  old-style pseudo-pellets (unidirectional
     *                                  Easton pellets, Strugatsky plasma balls,
     *                                  etc.), false to ignore them.
     * 
     * @param maxInitiators             How many binding initiators allowed
     *                                  (effectively the size of the initiator pool,
     *                                  which has a fixed size).
     * 
     * @param listener                  The `ProgressListener` associated
     *                                  with the current compression or
     *                                  decompression operation
     * @param pelletFactoryOverrideClass if not null, force this `CompressionPellet` type
     * 
     * @param compress                  True if the current operation is a
     *                                  compression operation.
     * 
     * @return Instance of a `CompressionPellet` implementation
     *         appropriate to specified parameters
     */
    getPellet(sandersonizePackets, handleLegacyPseudopellets, maxInitiators,
        listener, pelletFactoryOverrideClass, compress) {
        let pellet = null;
        
        if (pelletFactoryOverrideClass != null) {
            pellet = pelletFactoryOverrideClass.newInstance();
        } else if (sandersonizePackets) {
            pellet = new SandersonPseudoPellet();
        } else if (handleLegacyPseudopellets) {
            if (maxInitiators > 3) {
                pellet = new FatwarePellet(FatwarePellet.EmbedMode.NEUTRAL_GRIP);
            } else {
                pellet = new TreePellet();
            }
            
        } else if (maxInitiators > 3) {
            pellet = new OraclePelletAdapter();
        } else {
            pellet = new FatwarePellet();
        }
        
        pellet.setHandleLegacyPseudopellets(new TrimodeBoolean(handleLegacyPseudopellets));
        pellet.setMaxInitiators(maxInitiators);
        pellet.setProgressListener(listener);
        pellet.setCompress(new TrimodeBoolean(compress));
        listener.registerPellet(seqId++);  
        return pellet;
    }
}

let seqId = 0;


module.exports = PelletFactory;
