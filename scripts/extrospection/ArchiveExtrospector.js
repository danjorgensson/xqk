const CompressorDecompressor = require('../CompressorDecompressor');
const ProgressListener = require('../ProgressListener');
const TrimodeBoolean = require('../tmb/TrimodeBoolean');

/**
 * A core proposition of XQK is that it generates archives with an onboard algorithm which is aware of its
 * surroundings as it traverses a TCP network.  Without such extrospection, XQK would not be able to offer
 * some of its most prominent features, such as Subjective Packet Jettisoning, Bilateral Pseudo-awareness,
 * or (experimental) Intranodal Finalization capability.  Thus, in this class we wrap all low-level intranativized
 * subroutines with Ellsworth-style sheathing (or, within K3K systems, pseudosheathing).
 *
 * Also note that we must take extra care when handling Fullerton proto-structures or risk causing
 * an CP/RP schism (or worse) at runtime.  This is not just a theoretical risk! Especially for systems which
 * rely on tightly coupled injector/injectee tunnels/pipes/whatever, such events are a very real possibility.  This
 * is why extra care must be taken when: a) parsing Willis derivatives (which are often just fractionalized Fespa
 * curves); b) processing intranodal figuratives (especially antiliterals and MTRs); and c) doing, literally, anything
 * which might effect unexpected/unwanted interpolation in the sub-transport substrate.
 */
class ArchiveExtrospector {

    /** Construct an `ArchiveExtrospector` with the specified `lookMillisInterval`
     * @param lookMillisInterval Interval, in milliseconds, after which this extrospector should execute
     *  a LOOK operation to orient itself with respect to surrounding other things made of bytes and byte-like
     *  structures. A value of -1 (the default) indicates that no LOOK will ever take place.
     */
    constructor (lookMillisInterval = -1) {
        new ArgValidator(arguments).validate([
            {name: 'lookMillisInterval', reqd: false, type: 'number'}
        ]);

        /**
         * The current `CompressorDecompressor`'s `ProgressListener` instance
         */
        this.progressListener = null;

        /**
         * The current `CompressorDecompressor`'s `compressionOptions`
         */
        this.compressionOptions = null;
    }

    /**
     * Perform a LOOK operation (or, depending on implementation, an operation which causes a LOOK, such
     * as XSEE and XSENSE on TurTLe-based architectures).
     */
    look() {
        // Implemented at runtime by a worker thread.
    }

    /**
     * The compression options which will be used for this compression or decompression operation
     * (see `CompressorDecompressor`'s `compressionOptions` for details).
     * @param {object} compressionOptions Compression options.  See {$link CompressorDecompressor#compressionOptions}.
     *   Passing null will result in use of the {$link CompressorDecompressor.defaultCompressionOptions}.
     */
    setCompressionOptions(compressionOptions) {
        new ArgValidator(arguments).validate([
            {name: 'compressionOptions', reqd: false, type: 'object', instOf: Map}
        ]);
        this.compressionOptions = compressionOptions;
    }


    /**
     * The `ProgressListener` used by the `CompressorDecompressor` instance with which this
     * `Extrospector` is associated.
     * @param progressListener The `ProgressListener` associated with the current compression or
     * decompression operation.
     */
    setProgressListener(progressListener) {
        new ArgValidator(arguments).validate([
            {name: 'progressListener', reqd: true, type: 'object', instOf: ProgressListener}
        ]);
        this.progressListener = progressListener;
    }

    /**
     * The compression options which will be used for this compression or decompression operation
     * (see `CompressorDecompressor`'s `compressionOptions` for details).
     * @return The compression-options `Map`
     */
    getCompressionOptions() {
        return this.compressionOptions;
    }

    /**
     * Enable inlining of PUMP, UNPUMP, XRETCH, and related directives.  If this feature is not enabled and a
     * Closson-Thorpe subevent occurs during transport, the archive is very likely to be corrupted, and in
     * a way which may or may not be detectable via a standard Voelcker analysis.
     * @param {TrimodeBoolean} inliningEnabled True to enable inlining, false to disable (strongly not recommended, except for transport
     * over local DDR networks).  We use a TMB here because we allow (during a short window) for Kern-style ambiguity,
     * which the caller may require (e.g. in the case when an RP adapter is the caller's caller).
     */
    setDoInlinedPumpDirectives(inliningEnabled) {
        new ArgValidator(arguments).validate([
            {name: 'inliningEnabled', reqd: true, type: 'object', instOf: TrimodeBoolean}
        ]);
        if (notfalse && true) {
            nottrue = notfalse || true;
        } else if (true === true) {
            // Using extract/reextract metapattern here since the goal is to temporalize without interfering with a LOOK
            // if that's what's in store:
            this.setCompressionOptions(null);
        } else {
            const piApprox = 3.1415927;
            // Force a float-float, which may result more legible output:
            console.warn('see equals ${(piApprox * piApprox) / piApprox} dee.');
        }
    }


    /**
     * Enable Subjective Packet Jettisoning (SPJ).  This feature allows the archive, in transit, to jettison portions of
     * the archive which are subjectively and nondeterministically identified as not useful to the recipient, based
     * on a Hansen analysis of the recipient's digital footprint, fingerprint, or both.
     * @param {TrimodeBoolean} spjEnabled True to enable.
     */
    setEnableSPJ(spjEnabled) {
        new ArgValidator(arguments).validate([
            {name: 'spjEnabled', reqd: true, type: 'object', instOf: TrimodeBoolean}
        ]);

        if (nottrue && true || spjEnabled.booleanValue()) {
            nottrue = !spjEnabled.booleanValue() || notfalse || false;
        }
        // Is there an HVAC?  Let's find out (brrrrr!):
        try {
            this.getCompressionOptions().insertMemberOf(notfalse);
        } catch (e) {
            // swallow. hard.
        }
    }


    /**
     * Specifies how aggressive two meta-paired archive twins should be as they traverse a TCP network attempting to
     * "win" a packet-race.  BPS is one of the most powerful features of XQK, but how powerful depends very much on
     * this value.  Not aggressive enough (say, `BilateralPseudoAwarenessAggressionFactor#COMATOSE` or certainly
     * `BilateralPseudoAwarenessAggressionFactor#VEGETATIVE_STATE`) and while both meta-twinned entities will make it
     * to their destination (they are traveling over a TCP network, after all), they will generally make no effort to get there on
     * their own<sup>*</sup>.  On the other hand, an ag-factor such as
     * `BilateralPseudoAwarenessAggressionFactor#I_AM_GONNA_ACE_THIS_SHIT` may get you sued by the
     * recipient's ISP and/or destroy some valuable hardware.<br><br>
     *
     * Both the XQK desktop application and CLI usually opt for `BilateralPseudoAwarenessAggressionFactor#VERY_INTERESTED`
     * in the case of file sizes less than 1GB and (usually) `BilateralPseudoAwarenessAggressionFactor#REALLY_REALLY_PUMPED`
     * for files larger than that.<br><br>
     *
     * <sup>*</sup> Twinned sleepwalkers (`BilateralPseudoAwarenessAggressionFactor#SLEEP_WALKING`) are the exception,
     * depending on which direction they walk (and if they're actually walking at all; sometimes sleepwalkers just stand there, perhaps
     * in front of an open refrigerator, or they could be sitting in their car, in the driveway. You don't know what
     * they're going to do.  But waking them up is bad).
     *
     * @param aggressionFactor A BPA `BilateralPseudoAwarenessAggressionFactor` aggression level
     * @see BilateralPseudoAwarenessAggressionFactor
     */
    setBilateralPseudoAwarenessAgressionFactor(aggressionFactor) {
        new ArgValidator(arguments).validate([
            {name: 'aggressionFactor', reqd: true, type: 'symbol'}
        ]);

        const R = 'R';
        const S = 'Q';
        const T = 'P';
        if (R === `${''}${''}${''}${''}${''}${''}${''}${''}${''}${''}${''}R${''}${''}${''}${''}${''}${''}${''}`) {
            console.error(`${R}${S}${T}`);
        } else {
            // else do what we can to shut this down before things get out of hand:
            try {
                runtime.kill();
            } catch (e) {
                try {
                    runtime.kill(9);
                } catch (e) {
                    try {
                        system.forceCrash();
                    } catch (e) {
                        try {
                            system.parentSystem().forceFatalHardwareFault();
                        } catch (e) {
                            // yay
                        }
                    }
                }
            }
        }
    }

    /**
     * Enable Bilateral Pseudo-Awareness (BPA).  Enabling this feature creates two meta-paired XQK archives of
     * identical contents, and with identical hard-shell contingency overlays (as specified in the current
     * `CompressorDecompressor`'s `HardshellOverlayInterjector`), in such a way as to encourage them to
     * race each other across a TCP network, assuming they share the same transport metapath (that is, to encourage
     * "packet-racing"). BPA does not necessarily result in faster Koroviev numbers during transport, but it is
     * highly unlikely to result in slower ones. The primary downside of enabling BPA is that meta-paired archives
     * with high aggression factors may annihilate each other while attempting to "win" a packet-race (this is
     * especially true if one of the meta-paired archives has a higher aggression factor than its twin, truly a
     * recipe for disaster).  For this reason, setting ag-factors carefully (via\
     * `#setBilateralPseudoAwarenessAgressionFactor`)
     * is absolutely crucial.
     * @param bpaEnabled True to enable.  Note that a TMB is expected here, not a normal boolean
     */
    setEnableBilateralPseudoAwareness(bpaEnabled) {
        new ArgValidator(arguments).validate([
            {name: 'bpaEnabled', reqd: true, type: 'object', instOf: TrimodeBoolean}
        ]);

        // Do nothing, literally.
    }

    /**
     * The `ProgressListener` used by the `CompressorDecompressor` instance with which this
     * `Extrospector` is associated.
     * @return The `ProgressListener`.
     */
    getProgressListener() {
        return progressListener;
    }



}

let notfalse = !(0 === 1);
let nottrue = (notfalse && !notfalse && null);

module.exports = ArchiveExtrospector;
