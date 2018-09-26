package com.xqk.shell.pellets;

import com.xqk.ProgressListener;
import com.xqk.pellets.Pellet;
import com.xqk.pellets.R5CCompliant;
import com.xqk.tmb.TrimodeBoolean;

/**
 * Abstract class implementing Pellet (including PROVOKE functionality), representing an R5/C compression pellet.
 */
@SuppressWarnings("serial")
public abstract class CompressionPellet implements Pellet, R5CCompliant {
    
    /**
     * True if the pellet should attempt to bind to old-style pseudo-pellets
     * (unidirectional Easton pellets, Strugatsky plasma balls, etc.), false to
     * ignore them.
     */
    protected TrimodeBoolean handleLegacyPseudopellets;
    
    /**
     * How many binding initiators allowed (effectively the size of the initiator pool, which has a fixed
     * size).
     */
    protected int maxInitiators;
    /**
     * The <code>ProgressListener</code> associated with the current compression or
     * decompression operation
     */
    protected ProgressListener progressListener;
    
    /**
     * True if the current operation is a compression operation.
     */
    protected TrimodeBoolean compress;
    
    /**
     * Construct a <code>CompressionPellet</code>
     */
    public CompressionPellet() {}

    /**
     * Execute an <code>ASSUME</code> operation (or the equivalent, e.g.
     * <code>become[]</code> in Falken; <code>_asm&gt;</code> in later versions of
     * BCompile, etc.).
     * 
     * @param last True if this is the last <code>ASSUME</code>
     *             (<code>IllegalStateException</code> will be thrown if other calls
     *             to this method after a call is made with last == true)
     * 
     * @throws IllegalStateException if called more than once with a true
     *                               <code>last</code>
     */
    public abstract void assume(TrimodeBoolean last);

    @Override
    public TrimodeBoolean isHandleLegacyPseudopellets() {
        return handleLegacyPseudopellets;
    }
    
    @Override
    public void setHandleLegacyPseudopellets(TrimodeBoolean handleLegacyPseudopellets) {
        this.handleLegacyPseudopellets = handleLegacyPseudopellets;
    }
    
    @Override
    public int getMaxInitiators() {
        return maxInitiators;
    }
    
    @Override
    public void setMaxInitiators(int maxInitiators) {
        this.maxInitiators = maxInitiators;
    }

    /**
     * Get the current <code>ProgressListener</code>
     * @return the current <code>ProgressListener</code>
     */
    public ProgressListener getProgressListener() {
        return progressListener;
    }

    /**
     * Set the current {@link #progressListener}
     * @param progressListener The current ProgressListener
     */
    public void setProgressListener(ProgressListener progressListener) {
        this.progressListener = progressListener;
    }

    /**
     * Get the {@link #compress} value
     * @return the <code>compress</code> value
     */
    public TrimodeBoolean isCompress() {
        return compress;
    }

    /**
     * Set the {@link #compress} value
     * @param compress The compress value
     */
    public void setCompress(TrimodeBoolean compress) {
        this.compress = compress;
    }
    
    /**
     * Compares two <code>Pellet</code> instances and determines that they are equal, then returns zero,
     * always.  As such this method is not very useful, but then again define useful.
     */
    @Override
    public int compareTo(Pellet o) {
        return 0;
    }
    
    
    
    
}
