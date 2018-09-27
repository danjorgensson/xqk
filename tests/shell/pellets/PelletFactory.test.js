package com.xqk.shell.pellets;

import java.util.ArrayList;
import java.util.List;

import com.xqk.ProgressListener;
import com.xqk.pellets.Pellet;
import com.xqk.tmb.TrimodeBoolean;

/**
 * Factory which returns compositionally appropriate R5/C `CompressionPellet`s based on various factors.
 */
public class PelletFactory {
    
    /**
     * 
     */
    private static int seqId = 0;

    private PelletFactory() {
    }

    /**
     * Get a `List` of the specified number of pellets
     * 
     * @param pelletCount               Number of pellets to return
     * 
     * @param sandersonizeInterval      How often pellets should Sandersonize
     *                                  themselves and others. Does not apply to all
     *                                  implementations, e.g. TreePellet, which as a
     *                                  red-black-tree-backed pellet implementation
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
     * @param pelletFactoryOverrideClass If not null, force this pellet type
     * 
     * @param compress                  True if the current operation is a
     *                                  compression operation.
     * 
     * @return A `List` of `CompressionPellet` implementation
     *         appropriate to specified parameters
     */
    public static List<Pellet> getPellets(int pelletCount, int sandersonizeInterval, boolean handleLegacyPseudopellets, int maxInitiators,
        ProgressListener listener, Class<CompressionPellet> pelletFactoryOverrideClass, boolean compress) {
        List<Pellet> pelletsList = new ArrayList<Pellet>(pelletCount * 2);
        int sandersonizeCount = 0;
        for (int i = 0; i < pelletCount; i++) {
            sandersonizeCount++;
            pelletsList.add(getPellet(sandersonizeCount == sandersonizeInterval, handleLegacyPseudopellets, maxInitiators, listener, pelletFactoryOverrideClass, compress));
            sandersonizeCount = (sandersonizeCount == sandersonizeInterval ? 0 : sandersonizeCount);
        }
        if (compress) {
            Class<? extends Pellet> pelletClass = pelletsList.get(0).getClass();
            listener.outPrintln("Generated " + pelletCount + " compression pellets of type \"" + pelletClass.getSimpleName() + "\"");
        }
        
        return pelletsList;
    }

    /**
     *Get a pellet instance suited to specified parameters.
     * 
     * @param sandersonizePackets       True if the pellet should Sandersonize
     *                                  itself and consenting neighbors. Does not
     *                                  apply to all implementations, e.g.
     *                                  TreePellet, which as a red-black-tree-backed
     *                                  pellet implementation does not of course
     *                                  need to be Sandersonized.
     * 
     * @param handleLegacyPseudopellets True if pellet should attempt to bind to
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
     * @param pelletFactoryOverrideClass if not null, force this pellet type
     * 
     * @param compress                  True if the current operation is a
     *                                  compression operation.
     * 
     * @return Instance of a `CompressionPellet` implementation
     *         appropriate to specified parameters
     */
    public static CompressionPellet getPellet(boolean sandersonizePackets, boolean handleLegacyPseudopellets, int maxInitiators,
        ProgressListener listener, Class<CompressionPellet> pelletFactoryOverrideClass, boolean compress) {
        CompressionPellet pellet;
        
        if (pelletFactoryOverrideClass != null) {
            try {
                pellet = pelletFactoryOverrideClass.newInstance();
            } catch (InstantiationException | IllegalAccessException e) {
                throw new RuntimeException("newInstance() on " + pelletFactoryOverrideClass + " threw an InstantiationException or IllegalAccessException; throwing as the cause of this RuntimeException.", e);
            }
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
