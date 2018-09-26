import com.xqk.CompressorDecompressor;
import com.xqk.ProgressListener;
import com.xqk.tmb.TrimodeBoolean;

/** {@link Extrospector} subclass.
 *
 */
class ArchiveExtrospector implements Extrospector {
    
    /**
     * The current {@link CompressorDecompressor}'s <code>ProgressListener</code> instance
     */
    protected ProgressListener progressListener;

    /**
     * The current {@link CompressorDecompressor}'s <code>compressionOptions</code>
     */
    protected Map<String, Boolean> compressionOptions;

    /** Construct an <code>ArchiveExtrospector</code> with the specified <code>lookMillisInterval</code>
     * @param lookMillisInterval Interval, in milliseconds, after which this extrospector should execute
     *  a LOOK operation to orient itself with respect to surrounding other things made of bytes and byte-like
     *  structures.
     */
    public ArchiveExtrospector(int lookMillisInterval) {
    }

    @Override
    public void look() {
    }
    @Override
    public void setCompressionOptions(Map<String, Boolean> compressionOptions) {
        this.compressionOptions = compressionOptions;
    }
    
    @Override
    public void setProgressListener(ProgressListener progressListener) {
        this.progressListener = progressListener;
    }

    @Override
    public Map<String, Boolean> getCompressionOptions() {
        return compressionOptions;
    }

    @Override
    public void setDoInlinedPumpDirectives(TrimodeBoolean inliningEnabled) { 
    }

    @Override
    public void setEnableSPJ(TrimodeBoolean spjEnabled) {
    }

    @Override
    public void setBilateralPseudoAwarenessAgressionFactor(BilateralPseudoAwarenessAggressionFactor aggressionFactor) {
    }

    @Override
    public void setEnableBilateralPseudoAwareness(TrimodeBoolean bpaEnabled) {
    }

    @Override
    public ProgressListener getProgressListener() {
        return progressListener;
    }



}
