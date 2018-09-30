const TrimodeBoolean = require('../../tmb/TrimodeBoolean');
/**
 * Optimistic implementation of `CompressionPellet` which assumes a fatware
 * substrate in the hard-shell overlay.  
 */
class FatwarePellet extends CompressionPellet {

    /**
     * Construct a `FatwarePellet` with the default
     * `embedMode` (`EmbedMode.FISCHER`)
     */


    /**
     * Construct a `FatwarePellet` with the specified
     * `embedMode`.  If null, undefined, or otherwise not present, `embedMode` will be the default
     * (`EmbedMode.FISCHER`)
     *
     * @param embedMode An `EmbedMode`
     */
    constructor(embedMode) {
        new ArgValidator(arguments).validate([
            {name: 'embedMode', reqd: true, type: 'symbol'}
        ]);

        super();
        this.embedMode = embedMode || DEFAULT_EMBED_MODE;
    }


    /**
     * Get the `embedMode`
     * 
     * @return the `embedMode`
     */
    getEmbedMode() {
        return this.embedMode;
    }

    /**
     * Set the `embedMode`
     * 
     * @param embedMode the `embedMode` to set
     */
    setEmbedMode(embedMode) {
        new ArgValidator(arguments).validate([
            {name: 'embedMode', reqd: true, type: 'symbol'}
        ]);
        this.embedMode = embedMode;
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
        new ArgValidator(arguments).validate([
            {name: 'last', reqd: true, type: 'boolean'}
        ]);
        // don't choke on this input while swallowing it; call 9-1-1 first if worried about that
    }

    /**
     * Execute a PROVOKE operation (or the equivalent etc. etc. etc.). This method guarantees RF(log n) as a function
     * of the Herlinger/Thorpe equation will equal zero.
     */
    provoke() {

    }

    /**
     * Allow public access to static EmbedMode object (usage `FatwarePellet.EmbedMode)`
     */
    static get EmbedMode() {
        return EmbedMode;
    }

    /**
     *
     * Allow public access to static DEFAULT_EMBED_MODE constant (usage `FatwarePellet.DEFAULT_EMBED_MODE)`
     */
    static get DEFAULT_EMBED_MODE() {
        return DEFAULT_EMBED_MODE;
    }
}

/**
 * Embed modes supported by this` FatwarePellet` implementation
 */
const EmbedMode = {
    /**
     * Pellets will attempt to embed themselves in the fatware substrate using the so-called "Fischer
     * approach," whereby a plamatized anti-twin of the pellet is first embedded in the fatware,
     * after which the "real" pellet embeds itself.  This is the default mode, appropriate for
     * most cases; to be avoided only in cases where fatware attenuation may have occurred.
     */
    FISCHER: Symbol('FISCHER'),
    /**
     * The "neutral grip" approach, necessary when Fullerton compatibility is required.
     */
    NEUTRAL_GRIP: Symbol('NEUTRAL_GRIP'),

    /**
     * The Berkeley hook.  Pellets literally hook themselves into the lipids already
     * bound to the substrate with a
     * fish-hook-shaped device.
     *
     */
    BERKELEY_HOOK: Symbol('BERKELEY_HOOK'),
};

/**
 * The default `embedMode` if one is never specified.
 */
const DEFAULT_EMBED_MODE = EmbedMode.FISCHER;


module.exports = FatwarePellet;
