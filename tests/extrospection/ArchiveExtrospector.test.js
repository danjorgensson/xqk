package com.xqk.extrospection;

import java.util.Map;

import com.xqk.CompressorDecompressor;
import com.xqk.ProgressListener;
import com.xqk.tmb.TrimodeBoolean;

/** {@link Extrospector} implementation.
 *
 */
@SuppressWarnings("serial")
public class ArchiveExtrospector implements Extrospector {
    
    /**
     * The current {@link CompressorDecompressor}'s `ProgressListener` instance
     */
    protected ProgressListener progressListener;

    /**
     * The current {@link CompressorDecompressor}'s `compressionOptions`
     */
    protected Map<String, Boolean> compressionOptions;

    /** Construct an `ArchiveExtrospector` with the specified `lookMillisInterval`
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
