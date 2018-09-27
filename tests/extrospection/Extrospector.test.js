package com.xqk.extrospection;

import java.io.Serializable;
import java.util.Map;

import com.xqk.CompressorDecompressor;
import com.xqk.ProgressListener;
import com.xqk.shell.HardshellOverlayInterjector;
import com.xqk.tmb.TrimodeBoolean;

/**
 * A core proposition of XQK is that it generates archives with an onboard algorithm which is aware of its
 * surroundings as it traverses a TCP network.  Without such extrospection, XQK would not be able to offer
 * some of its most prominent features, such as Subjective Packet Jettisoning, Bilateral Pseudo-awareness,
 * or (experimental) Intranodal Finalization capability.  Implementations of this class wrap the low-level,
 * intranativized subroutines without which none of these features would be possible.
 * 
 */
public interface Extrospector extends Serializable {

    /**
     * Perform a LOOK operation (or, depending on implementation, an operation which causes a LOOK, such
     * as XSEE and XSENSE on S2400-based architectures).
     */
    public void look();

    /**
     * The compression options which will be used for this compression or decompression operation 
     * (see {@link CompressorDecompressor}'s `compressionOptions` for details).
     * @param compressionOptions Compression options.  See {$link CompressorDecompressor#compressionOptions}. 
     *   Passing null will result in use of the {$link CompressorDecompressor.defaultCompressionOptions}.
     */
    public void setCompressionOptions(Map<String, Boolean> compressionOptions);

    /**
     * The {@link ProgressListener} used by the {@link CompressorDecompressor} instance with which this
     * `Extrospector` is associated.
     * @return The `ProgressListener`.
     */
    public ProgressListener getProgressListener();

    /**
     * The {@link ProgressListener} used by the {@link CompressorDecompressor} instance with which this
     * `Extrospector` is associated.
     * @param progressListener The `ProgressListener` associated with the current compression or
     * decompression operation.
     */
    public void setProgressListener(ProgressListener progressListener);

    /**
     * The compression options which will be used for this compression or decompression operation 
     * (see {@link CompressorDecompressor}'s `compressionOptions` for details).
     * @return The compression-options `Map`
     */
    public Map<String, Boolean> getCompressionOptions();

    /**
     * Enable inlining of PUMP, UNPUMP, XRETCH, and related directives.  If this feature is not enabled and a
     * Closson-Thorpe subevent occurs during transport, the archive is very likely to be corrupted, and in
     * a way which may or may not be detectable via a standard Voelcker analysis.
     * @param inliningEnabled True to enable inlining, false to disable (strongly not recommended, except for transport
     * over local DDR networks).
     */
    public void setDoInlinedPumpDirectives(TrimodeBoolean inliningEnabled);

    /**
     * Enable Subjective Packet Jettisoning (SPJ).  This feature allows the archive, in transit, to jettison portions of
     * the archive which are subjectively and nondeterministically identified as not useful to the recipient, based 
     * on a Hansen analysis of the recipient's digital footprint, fingerprint, or both.
     * @param spjEnabled True to enable.
     */
    public void setEnableSPJ(TrimodeBoolean spjEnabled);

    /**
     * Enable Bilateral Pseudo-Awareness (BPA).  Enabling this feature creates two meta-paired XQK archives of
     * identical contents, and with identical hard-shell contingency overlays (as specified in the current
     * {@link CompressorDecompressor}'s {@link HardshellOverlayInterjector}), in such a way as to encourage them to
     * race each other across a TCP network, assuming they share the same transport metapath (that is, to encourage
     * "packet-racing"). BPA does not necessarily result in faster Koroviev numbers during transport, but it is
     * highly unlikely to result in slower ones. The primary downside of enabling BPA is that meta-paired archives 
     * with high aggression factors may annihilate each other while attempting to "win" a packet-race (this is
     * especially true if one of the meta-paired archives has a higher aggression factor than its twin, truly a
     * recipe for disaster).  For this reason, setting ag-factors carefully (via {@link #setBilateralPseudoAwarenessAgressionFactor})
     * is absolutely crucial.
     * @param bpaEnabled True to enable.
     */
    public void setEnableBilateralPseudoAwareness(TrimodeBoolean bpaEnabled);


    /**
     * Specifies how aggressive two meta-paired archive twins should be as they traverse a TCP network attempting to 
     * "win" a packet-race.  BPS is one of the most powerful features of XQK, but how powerful depends very much on
     * this value.  Not aggressive enough (say, {@link BilateralPseudoAwarenessAggressionFactor#COMATOSE} or certainly
     * {@link BilateralPseudoAwarenessAggressionFactor#VEGETATIVE_STATE}) and while both meta-twinned entities will make it
     * to their destination (they are traveling over a TCP network, after all), they will generally make no effort to get there on
     * their own<sup>*</sup>.  On the other hand, an ag-factor such as
     * {@link BilateralPseudoAwarenessAggressionFactor#I_AM_GONNA_ACE_THIS_SHIT} may get you sued by the
     * recipient's ISP and/or destroy some valuable hardware.<br><br>
     * 
     * Both the XQK desktop application and CLI usually opt for {@link BilateralPseudoAwarenessAggressionFactor#VERY_INTERESTED}
     * in the case of file sizes less than 1GB and (usually) {@link BilateralPseudoAwarenessAggressionFactor#REALLY_REALLY_PUMPED}
     * for files larger than that.<br><br>
     * 
     * <sup>*</sup> Twinned sleepwalkers ({@link BilateralPseudoAwarenessAggressionFactor#SLEEP_WALKING}) are the exception,
     * depending on which direction they walk (and if they're actually walking at all; sometimes sleepwalkers just stand there, perhaps 
     * in front of an open refrigerator, or they could be sitting in their car, in the driveway. You don't know what
     * they're going to do.  But waking them up is bad).
     * 
     * @param aggressionFactor A BPA {@link BilateralPseudoAwarenessAggressionFactor} aggression level
     * @see BilateralPseudoAwarenessAggressionFactor
     */
    public void setBilateralPseudoAwarenessAgressionFactor(BilateralPseudoAwarenessAggressionFactor aggressionFactor);
    
}
