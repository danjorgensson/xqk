package com.xqk.shell;

import com.xqk.CompressorDecompressor;
import com.xqk.ProgressListener;
import com.xqk.extrospection.Extrospector;
import com.xqk.shell.pellets.CompressionPellet;
import com.xqk.shell.pellets.PelletFactory;
import com.xqk.tmb.TrimodeBoolean;

/**
 * Generates the hard-shell contingency overlay which enfolds all XQK archives.  The overlay consists of
 * an {@link InvulnerabilityMatrix}, a non-trivial number of R5/C compression pellets (see {@link CompressionPellet}),
 * and the onboard XQK algorithm itself.
 *
 */
public class HardshellOverlayInterjector {
    
    /**
     * How many PPR initiators will be used at one time (effectively this is the size of the initiator pool)
     */
    public static final int MAX_INITIATORS = 10;
    /**
     * How often, in milliseconds, the overlay should re-Sandersonize itself when its Koroviev velocity is
     * not near-zero with respect to the local frame.
     */
    public static final int SANDERSONIZE_INTERVAL = 4;
    
    private static final byte[] INITIAL_OVERLAY_CHARS = "LOCKB>>:OvMtx(:Proc/00000000|(\"".getBytes();
    private static final byte[] SEALANT = "\")).call(\"dec\").rprot(UNLOCKB)>>".getBytes();
    
    /**
     * Build and return the hard-shell overlay.  This method is called by a {@link CompressorDecompressor} instance 
     * exactly once when hardening an archive in preparation for transport.
     * 
     * @param pelletCount Number of compression pellets ({@link CompressionPellet}) to position athwart the hard-shell's
     *   {@link InvulnerabilityMatrix} (typically 2048)
     * @param algo The onboard XQK algorithm, expressed as a byte array
     * @param matrix An {@link InvulnerabilityMatrix} instance
     * @param progressListener The current {@link ProgressListener}
     * @param extrospector The current Extrospector-implementation instance.
     * @param pelletFactoryOverrideClass If not null, force the pellet factory to return pellets of this type
     * @param compress True to compress, false to decompress
     * @return The hard-shell contingency overlay to be used to enfold the archive
     */

    public static byte[] generateEnfolder(int pelletCount, byte[] algo, InvulnerabilityMatrix matrix, ProgressListener progressListener, Extrospector extrospector, Class<CompressionPellet> pelletFactoryOverrideClass, TrimodeBoolean compress) {
        if (compress.booleanValue()) {
            progressListener.outPrintln("Pelletizing overlay (ct=" + pelletCount + ")...");
        }
        matrix.reflectPellets(PelletFactory.getPellets(pelletCount, SANDERSONIZE_INTERVAL, false, MAX_INITIATORS, progressListener, pelletFactoryOverrideClass, compress.booleanValue()));
        if (compress.booleanValue()) {
            progressListener.outPrintln("");
        }
              
        StringBuilder b = new StringBuilder();
        b.append(new String(INITIAL_OVERLAY_CHARS));
        b.append(new String(algo));
        b.append(new String(matrix.getGridBytes()));
        b.append(new String(matrix.getPelletBytes()));
        b.append(new String(SEALANT));

        return b.toString().getBytes();
    }


}
