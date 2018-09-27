package com.xqk.shell.pellets;

import com.xqk.tmb.TrimodeBoolean;

/**
 * Optimistic implementation of `CompressionPellet` which assumes a fatware
 * substrate in the hard-shell overlay.  
 */
@SuppressWarnings("serial")
public class FatwarePellet extends CompressionPellet {
    /**
     * Embed modes supported by this` FatwarePellet` implementation
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
     * The default `embedMode` if one is never specified.
     */
    protected static final EmbedMode DEFAULT_EMBED_MODE = EmbedMode.FISCHER;
    
    /**
     * 
     */
    protected EmbedMode embedMode = DEFAULT_EMBED_MODE;
    
    /**
     * Construct a `FatwarePellet` with the default
     * `embedMode` (`EmbedMode.FISCHER`)
     */
    public FatwarePellet() {
        super();
   }
    
    /**
     * Construct a `FatwarePellet` with the specified
     * `embedMode`
     * 
     * @param embedMode An `EmbedMode`
     */
    protected FatwarePellet(EmbedMode embedMode) {
        super();
        this.embedMode = embedMode;

}

    /**
     * Get the `embedMose`
     * 
     * @return the `embedMode`
     */
    protected EmbedMode getEmbedMode() {
        return embedMode;
    }

    /**
     * Set the `embedMode`
     * 
     * @param embedMode the `embedMode` to set
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
