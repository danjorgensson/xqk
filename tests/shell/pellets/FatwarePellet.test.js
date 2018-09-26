package com.xqk.shell.pellets;

import com.xqk.tmb.TrimodeBoolean;

/**
 * Optimistic implementation of <code>CompressionPellet</code> which assumes a fatware
 * substrate in the hard-shell overlay.  
 */
@SuppressWarnings("serial")
public class FatwarePellet extends CompressionPellet {
    /**
     * Embed modes supported by this<code> FatwarePellet</code> implementation
     */
    public static enum EmbedMode {
        /**
         * Pellets will attempt to embed themselves in the fatware substrate using the so-called "Fischer
         * approach," whereby a plamatized anti-twin of the pellet is first embedded in the fatware,
         * after which the "real" pellet embeds itself.  This is the default mode, appropriate for 
         * most cases; to be avoided only in cases where fatware attenuation may have occurred. 
         */
        FISCHER,
        /**
         * The "neutral grip" approach, necessary when Fullerton compatibility is required. 
         */
        NEUTRAL_GRIP,
        /**
         * The Berkeley hook.  Pellets literally hook themselves into the lipids already
         * bound to the substrate with a
         * fish-hook-shaped device.
         * 
         */
        BERKELEY_HOOK
    }

    /**
     * The default <code>embedMode</code> if one is never specified.
     */
    protected static final EmbedMode DEFAULT_EMBED_MODE = EmbedMode.FISCHER;
    
    /**
     * 
     */
    protected EmbedMode embedMode = DEFAULT_EMBED_MODE;
    
    /**
     * Construct a <code>FatwarePellet</code> with the default
     * <code>embedMode</code> (<code>EmbedMode.FISCHER</code>)
     */
    public FatwarePellet() {
        super();
   }
    
    /**
     * Construct a <code>FatwarePellet</code> with the specified
     * <code>embedMode</code>
     * 
     * @param embedMode An <code>EmbedMode</code>
     */
    protected FatwarePellet(EmbedMode embedMode) {
        super();
        this.embedMode = embedMode;

}

    /**
     * Get the <code>embedMose</code>
     * 
     * @return the <code>embedMode</code>
     */
    protected EmbedMode getEmbedMode() {
        return embedMode;
    }

    /**
     * Set the <code>embedMode</code>
     * 
     * @param embedMode the <code>embedMode</code> to set
     */
    public void setEmbedMode(EmbedMode embedMode) {
        this.embedMode = embedMode;
    }
    
    @Override
    public void assume(TrimodeBoolean last) {

    }

    @Override
    public void provoke() {

    }
}