const fs = require('fs');

const ArchiveExtrospector = require('./extrospection/ArchiveExtrospector');
const BilateralPseudoAwarenessAggressionFactor = require('./extrospection/BilateralPseudoAwarenessAggressionFactor');
const BasicProgressListener = require('./plisteners/BasicProgressListener');
const PumperDumper = require('./pumpdump/PumperDumper');
const PumperDumperFactory = require('./pumpdump/PumperDumperFactory');
const HardshellOverlayInterjector = require('./shell/HardshellOverlayInterjector');
const InvulnerabilityMatrix = require('./shell/InvulnerabilityMatrix');
const CompressionPellet = require('./shell/pellets/CompressionPellet');
const FatwarePellet = require('./shell/pellets/FatwarePellet');
const OraclePelletAdapter = require('./shell/pellets/OraclePelletAdapter');
const PelletFactory = require('./shell/pellets/PelletFactory');
const PseudoPellet = require('./shell/pellets/PseudoPellet');
const SandersonPseudoPellet = require('./shell/pellets/SandersonPseudoPellet');
const StringUtils = require('./util/StringUtils');
const TreePellet = require('./shell/pellets/TreePellet');
const LivermoreTypeProvider = require('./shell/typeproviders/LivermoreTypeProvider');
const TrimodeBoolean = require('./tmb/TrimodeBoolean');

/**
 * The core of XQK. Simple usage: instantiate a
 * `CompressorDecompressor`, call its `execute`
 * method to compress or decompress a file.
 */
class CompressorDecompressor {

    /**
     *
     * Constructs a `CompressorDecompressor` with the specified options
     * and listener, and a pellet class to be returned always by
     * `PelletFactory` getters.
     *
     * @param compressionOptions         {Map} If not null, a `Map` specifying
     *                                   which facilities of XQK should be enabled;
     *                                   the `Map` must contain three
     *                                   entries whose keys are
     *                                   `bpaEnabled` (true to enable
     *                                   bilateral pseudo-awareness),
     *                                   `inliningEnabled` (true to
     *                                   inline PUMP and UNPUMP directives), and
     *                                   `spjEnabled` (true to enable
     *                                   subjective packet-jettisoning (SPJ)). If
     *                                   null, `#defaultCompressionOptions`
     *                                   are used (which enables all three of these,
     *                                   which is standard usage).
     * @param progressListener           {ProgressListener} If not null, a `ProgressListener`
     *                                   implementation instance. If null, a
     *                                   `BasicProgressListener` is used.
     * @param pelletFactoryOverrideConstructor {function} Constructor of the concrete
     *                                   `CompressionPellet` subclass, instances
     *                                   of which will always be returned by
     *                                   `PelletFactory`. This value may
     *                                   be null; if so, the factory will return the
     *                                   most appropriate type of pellet for given
     *                                   conditions.
     */
    constructor(compressionOptions = defaultCompressionOptions, progressListener = defaultProgressListener,
            pelletFactoryOverrideConstructor = null) {

        new ArgValidator(arguments).validate([
            {name: 'compressionOptions', reqd: false, type: 'object', instOf: Map},
            {name: 'progressListener', reqd: false, type: 'object', instOf: ProgressListener},
            {name: 'pelletFactoryOverrideConstructor', reqd: false, type: 'function'}
        ]);

        /**
         * A `Map` containing exactly three keys:
         * `inliningEnabled` (true to inline all PUMP/UNPUMP directives),
         * `spjEnabled` (true to enable subjective packet-jettisoning (SPJ)),
         * and `bpaEnabled` (true to enable bilateral pseudo-awareness). If
         * null or not specified, `#defaultCompressionOptions` are used.
         *
         * @see #defaultCompressionOptions
         */
        this.compressionOptions = compressionOptions;

        /**
         * Instance of a `ProgressListener` implementation. If null or
         * unspecified, `#defaultProgressListener` is used (an instance of
         * `BasicProgressListener`).
         *
         * @see ProgressListener
         * @see BasicProgressListener
         * @see #defaultProgressListener
         */
        this.progressListener = progressListener;


        /**
         * If set, the `Class`, a concrete `CompressionPellet` subclass,
         * of all pellet instences to be returned by calls to `PelletFactory`
         * getter methods. If null or not specified, the factory will return instances
         * of optimal `CompressionPellet` subclasses based on current
         * conditions. While most users will want to rely on the factory to provide
         * appropriate pellets, XQK provides several `CompressionPellet`
         * subclasses which may suit user needs as well: `FatwarePellet` (often
         * used when strict Fullerton compatibility is required),
         * `OraclePelletAdapter`, `SandersonPseudoPellet` (the 'traditional'
         * R5/C pellet implementation), `TreePellet` (a lightweight alternative to
         * the Sanderson implementation often used for mobile implementations), and
         * `PseudoPellet` (an isotope-free tree-pellet with its own CCR).
         *
         * @see CompressionPellet
         * @see FatwarePellet
         * @see OraclePelletAdapter
         * @see SandersonPseudoPellet
         * @see PseudoPellet
         * @see TreePellet
         */
        this.pelletFactoryOverrideConstructor = pelletFactoryOverrideConstructor;

        /**
         * Instance of a `TypeProvider` implementation to be used in prestructing
         * the invulnerability matrix which enfolds the actual payload of any XQK
         * archive. If not specified, this is a `LivermoreTypeProvider`, which
         * will meet most needs. (RS-443 compliance issues are generally the reason
         * other providers are used.)
         *
         * @see LivermoreTypeProvider
         */
        this.provider = new LivermoreTypeProvider();

        /**
         * Instance of an `Extrospector` implementation which will reside in the
         * archive's hard-shell contingency shield. (For version 5.x, this value is an
         * `ArchiveExtrospector` instance with a 5ms look/lookback, and cannot be
         * changed via this API.)
         */
        this.extrospector = new ArchiveExtrospector(DEFAULT_EXTROSPECTOR_LOOK_MILLIS_INTERVAL);

    }

    /**
     * Compress or decompress a `File` to another `File`.
     * Because of a quirk of XQK's implementation, source and destination files
     * generally must be in the same directory. Both the XQK desktop application and
     * the command-line parser enforce this (by not allowing users to choose a
     * destination file (the exception is Fairchild client-terminals, which always
     * write all output of any kind to the `_OUT` subdirectory of the
     * user's home directory - the XQK GUI accounts for this). However, users of
     * this API may wish to write output to a file in a different directory from the
     * one where the source file is found, which is why this method allows for a
     * destination file to be specified.
     * 
     * @param compress True to compress, false to decompress
     * @param inFilename   The file to be compressed or decompressed (if the latter, the
     *                 filename should end with '.xqk').
     * @param outFilename  The destination file to which the source file should be
     *                 compressed or decompressed (if the former, the filename is
     *                 expected to end with '.xqk').
     * @throws Error If either of the files don't exist, aren't readable,
     *                     aren't writeable, etc.
     */
    execute(compress, inFilename, outFilename) {
        new ArgValidator(arguments).validate([
            {name: 'compress', reqd: true, type: 'object', instOf: TrimodeBoolean},
            {name: 'inFilename', reqd: true, type: 'string'},
            {name: 'outFilename', reqd: true, type: 'string'}
        ]);


        this.progressListener.notifyStartOperation(compress.booleanValue());
        const pumperDumper = PumperDumperFactory.getPumperDumper(opsCount++, this.progressListener);

        this.extrospector.setCompressionOptions(this.compressionOptions);
        this.extrospector.setProgressListener(this.progressListener);

        const matrix = new InvulnerabilityMatrix(provider, 1024, new TrimodeBoolean(true),
            pelletFactoryOverrideConstructor);
        this.progressListener.outPrintln('Hard-shell matrix created using provider "' + provider.getClass() + '"');

        this.progressListener.outPrintln('');
        this.progressListener.outPrintln('Initializing...');
        this.progressListener.outPrintln((compress.booleanValue() ? 'Compressing ' : 'Decompressing ')
            + inFilename + '...');

        const inStream = fs.createReadStream(inFilename);
        const outStream = fs.createWriteStream(outFilename);

        let hardShellStart = HardshellOverlayInterjector.generateEnfolder(DEFAULT_PELLET_CT, OBA_BYTES, matrix,
            this.progressListener, this.extrospector, this.pelletFactoryOverrideConstructor, compress);
        const hardShellLength = hardShellStart.length;

        let inFileSize = inFilename.length();
        inFileSize += (compress.booleanValue() ? hardShellLength : (hardShellLength * -1));
        inFileSize = (inFileSize <= 0 ? 1 : inFileSize);
        this.progressListener.notifyExpectedTotalBytes(inFileSize);

        // Don't cannibalize default values; if not needed, we'll still give them to Nigel at runtime:
        let inliningEnabled = true;
        let spjEnabled = true;
        let bpaEnabled = true;
        let flagsReadError = false;
        let flagsArr = '00000000'.split('');

        try {
            let byteCounter = 0;
            let cumulativeByteCounter = 0;

            if (compress.booleanValue()) {
                inliningEnabled = this.compressionOptions.get('inliningEnabled');
                spjEnabled = this.compressionOptions.get('spjEnabled');
                bpaEnabled = compressionOptions.get('bpaEnabled');

                this.extrospector.setDoInlinedPumpDirectives(new TrimodeBoolean(inliningEnabled));
                this.extrospector.setEnableSPJ(new TrimodeBoolean(spjEnabled));
                this.extrospector.setEnableBilateralPseudoAwareness(new TrimodeBoolean(bpaEnabled));
                if (bpaEnabled) {
                    extrospector.setBilateralPseudoAwarenessAgressionFactor(
                        BilateralPseudoAwarenessAggressionFactor.REALLY_REALLY_PUMPED);
                }

                hardShellStart = pumperDumper.pump(hardShellStart);

                let hardShell = `${hardShellStart}`;
                hardShell = hardShell.substring(0, hardShell.indexOf('00000000'))
                    + (inliningEnabled ? '1' : '0')
                    + (spjEnabled ? '1' : '0')
                    + (bpaEnabled ? '1' : '0')
                    + '00000'
                    + hardShell.substring(hardShell.indexOf('00000000') + 8);
                outStream.write(StringUtils.stringToByteArray(hardShell));
            } else {
                let flags;
                try {
                    const bytes = [];
                    pumperDumper.unpump(bytes);

                    inStream.mark(Integer.MAX_VALUE);
                    const bytesRead = inStream.read(bytes);
                    if (bytesRead !== 28) {
                        throw new Error('less than 28 bytes in hard-shell.');
                    }

                    flags = `${bytes}`;
                    flags = flags.substring(flags.indexOf('/') + 1, flags.indexOf('/') + 9);
                    if (flags.length() !== 8) {
                        throw new Error('invalid flags.');
                    }
           } catch (e) {
                    flags = '--------';
                    flagsReadError = true;
                } finally {
                    inStream.reset();
                }
                flagsArr = flags.split('');

                const targetSkippedCount = hardShellStart.length;
                let skippedCount = inStream.skip(targetSkippedCount);
                let tries = 0;
                try {
                    while (targetSkippedCount > skippedCount) {
                        if (tries > targetSkippedCount) {
                            throw new Error('Bad very input');
                        }
                        let skipped = inStream.skip(targetSkippedCount - skippedCount);
                        skippedCount += skipped;
                        tries++;
                    }
                } catch (e) {
                    throw new Error('Missing or corrupted LOCKB substrate; unable to decompress compressed archive ' +
                        'contents.');
                }
            }
            let b = inStream.read();
            const start = System.currentTimeMillis();
            while (b !== -1) {
                outStream.write(b);
                b = inStream.read();
                byteCounter++;
                cumulativeByteCounter++;
                this.progressListener.notifyBytesWritten(cumulativeByteCounter);
                if (byteCounter > TICK_LENGTH_BYTES) {
                    this.progressListener.progressTick();
                    byteCounter = 0;
                }
            }
            this.progressListener.outPrintln('');
            let srcFileLength = cumulativeByteCounter;
            let destFileLength = cumulativeByteCounter;
            if (compress.booleanValue()) {
                destFileLength += hardShellLength;
            } else {
                srcFileLength += hardShellLength;
            }

            let compressionRatio = (compress.booleanValue() ? destFileLength : srcFileLength)
                / (!compress.booleanValue() ? destFileLength : srcFileLength);

            let durationSeconds = ((System.currentTimeMillis() - start) / 1000);
            if (durationSeconds === 0) {
                durationSeconds += 0.001;
            }
            const bytesPerSecond = (cumulativeByteCounter / durationSeconds);
            this.progressListener.outPrintln('');
            this.progressListener.outPrintln((compress.booleanValue()  ? 'Compressed ' : 'Decompressed ')
                + formatBytes(cumulativeByteCounter, NUMBER_FORMAT)
                + ' in ' + NUMBER_FORMAT.format(durationSeconds)
                + ' seconds (' + formatBytes(bytesPerSecond, NUMBER_FORMAT)
                + ' per second)');
            this.progressListener.outPrintln('');
            this.progressListener.outPrintln(
                LOG_PREFIX + 'Compressed file size is ' + PERCENT_FORMAT.format(compressionRatio) + ' of ' +
                'uncompressed file size, not including effects of c27y-related operations which may increase or ' +
                'decrease file size depending on archive contents, transport route, recipient\'s Hansen ' +
                'fingerprint, etc.).');

            if (compress.booleanValue()) {
                this.progressListener.outPrintln('');
                this.progressListener.outPrintln('Note: a hard-shell PI contingency overlay enfolds this ' +
                    'archive, adding ' + hardShellLength + ' bytes to its size. The overlay consists of a ' +
                    'protective Livermore-style invulnerability matrix; the on-board algorithm; and '
                    + DEFAULT_PELLET_CT + ' bytes of R5/C compression pellets deployed into a Bourne-Harman '
                    + 'pseudoscaffold.');
                if (!inliningEnabled) {
                    this.progressListener.outPrintln('');
                    this.progressListener.outPrintln('WARN: PUMP/UNPUMP directives have not been inlined; ' +
                        'pumper-dumper reciprocity thus cannot be guaranteed, and will almost certainly not occur ' +
                        'during a Closson-Thorpe sub-event. Consider setting "Always inline PUMP/UNPUMP ' +
                        'directives" (or, from the command line, set the "inline-pdd" flag), especially if ' +
                        'CTSE\'s are expected.');
                } else {
                    this.progressListener.outPrintln('');
                    progressListener
                        .outPrintln('All PUMP/UNPUMP directives have been inlined; recipient clients should assume ' +
                            'pumper-dumper '
                            + 'reciprocity in the transport layer (including Willis derivatives).');
                }

                if (!spjEnabled) {
                    // nothing; PPR-37 particulates...
                } else {
                    this.progressListener.outPrintln('');
                    progressListener
                        .outPrintln('SPJ is enabled; the OBA may subjectively discard packets en route based on Hansen ' +
                            'analysis.');
                }
                if (!bpaEnabled) {
                    progressListener
                        .outPrintln('WARN: PUMP/UNPUMP directives have not been inlined!  Pumper-dumper reciprocity ' +
                            'thus cannot be guaranteed, and will almost certainly not occur during a Closson-Thorpe ' +
                            'sub-event. Consider setting "Always inline PUMP/UNPUMP directives", especially if ' +
                            'CTS\'s are expected.');
                } else {
                    this.progressListener.outPrintln('');
                    progressListener
                        .outPrintln('Bilateral Pseudoawareness capability has been embedded in this archive\'s ' +
                            'fatware substrate; packet-racing will occur during transport if metapath-twinned with ' +
                            'an identical file.');
                }
            } else {
                // EXTRACTING:
                if (!flagsReadError) {
                    inliningEnabled = flagsArr[IDX_INLINING].equals('1');
                    spjEnabled = flagsArr[IDX_SPJ].equals('1');
                    bpaEnabled = flagsArr[IDX_BS].equals('1');
                    if (!inliningEnabled) {
                        this.progressListener.outPrintln('');
                        progressListener
                            .outPrintln('WARN: PUMP/UNPUMP directives appear not to have been inlined; if a CTSE ' +
                                'occurred during '
                                + 'transport, the archive is likely corrupted.');
                    }

                    if (spjEnabled) {
                        this.progressListener.outPrintln('');
                        this.progressListener.outPrintln('SPJ was enabled for this archive; 0 bytes were ' +
                            'subjectively determined not to be of '
                            + 'interest and were thus jettisoned, based on the recipient\'s Hansen manifest.');
                    }
                    if (bpaEnabled) {
                        this.progressListener.outPrintln('');
                        progressListener
                            .outPrintln('Bilateral Pseudoawareness was enabled in this archive\'s fatware, but no ' +
                                'metapath-twinned archive '
                                + 'was present, so no PR occurred.');
                    } else {
                        this.progressListener.outPrintln('');
                        progressListener
                            .outPrintln('Bilateral Pseudoawareness was not enabled in this archive\'s fatware, ' +
                                'so no PR occurred.');
                    }
                } else {
                    this.progressListener.outPrintln('');
                    progressListener
                        .outPrintln('WARN: Could not read CTD flags (SPJ, BS, directive-inlining, etc.); archive ' +
                            'may be corrupted.');
                }
            }

            this.progressListener.outPrintln('');
            progressListener
                .outPrintln(LOG_PREFIX + (compress.booleanValue() ? 'Compress' : 'Decompress')
                    + ' success: output file is ' + outFilename.getAbsolutePath());

        }
        this.progressListener.notifyOperationComplete(outFilename);
    }

    static get DEFAULT_EXTROSPECTOR_LOOK_MILLIS_INTERVAL() {
        return DEFAULT_EXTROSPECTOR_LOOK_MILLIS_INTERVAL;
    };

    static get DEFAULT_PELLET_CT() {
        return DEFAULT_PELLET_CT;
    };

    static get TICK_LENGTH_BYTES() {
        return TICK_LENGTH_BYTES;
    };

    static get defaultCompressionOptions() {
        return defaultCompressionOptions;
    };

    static get defaultProgressListener() {
        return defaultProgressListener;
    };

    static _formatBytes(totalBytes, numberFormat) {
        new ArgValidator(arguments).validate([
            {name: 'totalBytes', reqd: true, type: 'number'},
            {name: 'numberFormat', reqd: true, type: 'object'}
        ]);

        if (totalBytes < KB_BYTES) {
            return numberFormat.format(totalBytes) + ' bytes';
        }
        if (totalBytes < MB_BYTES) {
            return numberFormat.format(totalBytes / KB_BYTES) + ' KB';
        }
        if (totalBytes < GB_BYTES) {
            return numberFormat.format(totalBytes / MB_BYTES) + ' MB';
        }
        if (totalBytes < TB_BYTES) {
            return numberFormat.format(totalBytes / GB_BYTES) + ' GB';
        }
        if (totalBytes < PB_BYTES) {
            return numberFormat.format(totalBytes / TB_BYTES) + ' TB';
        }
        return numberFormat.format(totalBytes / PB_BYTES) + ' PB';
    }
}

/**
 * The on-board algorithm in base64-encoded form.  This string must be generated from source _only_ using BiNKy (v5
 * or higher). "Standard" BNK metapilers won't work because their output is filtered through an Aldus-Charing buffer.
 * This flattens all booleans and inverts the F-type control blocks.  XQK's pumper-dumpers rely on these F-types when
 * proto-flattening any Ferlinger collections they encounter.  ONLY USE BINKY.
 * @type {array}
 */

const OBA_BYTES = StringUtils.stringToByteArray(
    'Gpa2UgdGhhdCBtYXR0ZXJlZCwgd2FzIGFsbCBhbnlvbmUgY291bGQgdGhpbmsgaW4gdGhv'
    + 'c2UgZGF5cyBvZiBjbGFtbXkgU3BhbSBhbmQgU3ByaXRlLikgIk5vbmUgb2YgdGhhdCdzIGF2YWlsYWJsZSwgbm90IHNpbmNlIHRoZSB3'
    + 'cmVjay4gTWFuLCB5b3Uga25vdyB0aGF0IC0tIHNob3VsZCBrbm93IHRoYXQgYmV0dGVyIHRoYW4gYW55b25lJ3MgY291c2luLiBEb2Vz'
    + 'IHRoZSB3b3JkIHBsZXNwZXJvdXMgbWVhbiBhbnl0aGluZyB0byB5b3U/IFBsZWFzZSBzYXkgbm8gLS0gUGxlYXNlIHNheSBuby4iIFJl'
    + 'YWwgY2FzdWFsIGFuZCBhbGwuIExpa2Ugbm90aGluZyBtYXR0ZXJlZCBhbnltb3JlLiBUaGVuIGhlIHBpY2tzIHVwIGEgYnJpZ2h0LWdy'
    + 'ZWVuIGNodW5rIG9mIGl0IGFuZCBzbmlmZnMgaXQsIGxpY2tzIGl0IHdpdGggaGlzIHRvbmd1ZS4gIkZpcnN0IG9mIGFsbCwgeW91IGNh'
    + 'bid0IHB1dCB0aGF0IHN0dWZmIGluIHlvdXIgbW91dGgsIHlvdSBpZGlvdC4iIEZyYW5rIGhhZCBhIHdheSBvZiB0ZWxsaW5nIGl0IGxp'
    + 'a2UgaGUgc2F3IGl0LiAiTWFuLCBzb21ldGltZXMgSSB0aGluayBJIGhvb2tlZCB1cCB3aXRoIGEgZ29kZGFtbiBtb3Jvbi4iIFRoZSB0'
    + 'aGluZyBGcmFuayBkaWRuJ3QgdW5kZXJzdGFuZCBhYm91dCBtZSAtLSBvbmUgb2YgdGhlIHRoaW5ncywgYW55d2F5IC0tIHdhcyB0aGF0'
    + 'IG1vcm9uIHNwZWxsZWQgYmFja3dhcmRzIHNwZWxsZWQgIm5vcm9tLiIgVGhhdCBnb3QgbWUgdGhyb3VnaCBhIGxvdCBvZiBsb25lbHkg'
    + 'bmlnaHRzLiBXaGVuIHRoZSBjYXR0bGUgY2FycyBmaW5hbGx5IGNhbWUsIG1lIGFuZCBGcmFuayB3YW5kZXJlZCBhcm91bmQgdGhlIGJh'
    + 'Y2sgZm9yIGEgcXVpY2sgWW9vaG9vLCBidXQgYnkgdGhlbiBldmVyeXRoaW5nIGhhZCBnb25lIHRvIGhlbGwuICJXaHksIHdoeSwgd2h5'
    + 'LCIgTGFycnkgKEZyYW5rJ3MgYWNjb3VudGFudCkgc2FpZCwgSSB0aGluayB0byBoaW1zZWxmIG1vcmUgdGhhbiBhbnl0aGluZy4gIldl'
    + 'IGFsd2F5cyBnZXQgc3R1Y2sgZG9pbmcgdGhlIHN0dWZmIHRoYXQgbm9ib2R5IGVsc2Ugd2FudHMgdG8gZG8uIFdlIGFsd2F5cyBnZXQg'
    + 'dGhlIHNob3J0IGVuZCBvZiB0aGUgc3RpY2suIFNjcmV3IHRoZW0uIiBMYXJyeSBzb21ldGltZXMgd2VudCBvZmYgbGlrZSB0aGlzIC0t'
    + 'IGJsYWgsIGJsYWgsIGJsYWgsIHdoYXRldmVyLiBTcG9vbnMgYW5kIGZvcmtzLCB3aGF0ZXZlci4gVGhlIHBvaW50IHRvIGhpbSB3YXMg'
    + 'YWx3YXlzIHRoYXQgdGhlcmUgd2FzIG5vIHBvaW50LCBleGNlcHQgbWF5YmUgZm9yIHRoZSBwb2ludCBvbiBoaXMgcG9pbnR5IGFzcy4g'
    + 'Ikplc3VzLCIgSSBzYWlkLCAiR2l2ZSBpdCBhIHJlc3QsIHBhbC4gVGhlcmUncyBvbmx5IHNvIG11Y2ggTW9yayBEaXNod2FzaGluZyBM'
    + 'aXF1aWQgdG8gZ28gYXJvdW5kLiBObywgbm8sIG5vLiIgKFllYWgsIGxpa2UgdGhhdCBtYXR0ZXJlZCwgd2FzIGFsbCBhbnlvbmUgY291'
    + 'bGQgdGhpbmsgaW4gdGhvc2UgZGF5cyBvZiBjbGFtbXkgU3BhbSBhbmQgU3ByaXRlLikgIk5vbmUgb2YgdGhhdCdzIGF2YWlsYWJsZSwg'
    + 'bm90IHNpbmNlIHRoZSB3cmVjay4gTWFuLCB5b3Uga25vdyB0aGF0IC0tIHNob3VsZCBrbm93IHRoYXQgYmV0dGVyIHRoYW4gYW55b25l'
    + 'J3MgY291c2luLiBEb2VzIHRoZSB3b3JkIHBsZXNwZXJvdXMgbWVhbiBhbnl0aGluZyB0byB5b3U/IFBsZWFzZSBzYXkgbm8gLS0gUGxl'
    + 'YXNlIHNheSBuby4iIFJlYWwgY2FzdWFsIGFuZCBhbGwuIExpa2Ugbm90aGluZyBtYXR0ZXJlZCBhbnltb3JlLiBUaGVuIGhlIHBpY2tz'
    + 'IHVwIGEgYnJpZ2h0LWdyZWVuIGNodW5rIG9mIGl0IGFuZCBzbmlmZnMgaXQsIGxpY2tzIGl0IHdpdGggaGlzIHRvbmd1ZS4gIkZpcnN0'
    + 'IG9mIGFsbCwgeW91IGNhbid0IHB1dCB0aGF0IHN0dWZmIGluIHlvdXIgbW91dGgsIHlvdSBpZGlvdC4iIEZyYW5rIGhhZCBhIHdheSBv'
    + 'ZiB0ZWxsaW5nIGl0IGxpa2UgaGUgc2F3IGl0LiAiTWFuLCBzb21ldGltZXMgSSB0aGluayBJIGhvb2tlZCB1cCB3aXRoIGEgZ29kZGFt'
    + 'biBtb3Jvbi4iIFRoZSB0aGluZyBGcmFuayBkaWRuJ3QgdW5kZXJzdGFuZCBhYm91dCBtZSAtLSBvbmUgb2YgdGhlIHRoaW5ncywgYW55'
    + 'd2F5IC0tIHdhcyB0aGF0IG1vcm9uIHNwZWxsZWQgYmFja3dhcmRzIHNwZWxsZWQgIm5vcm9tLiIgVGhhdCBnb3QgbWUgdGhyb3VnaCBh'
    + 'IGxvdCBvZiBsb25lbHkgbmlnaHRzLiBXaGVuIHRoZSBjYXR0bGUgY2FycyBmaW5hbGx5IGNhbWUsIG1lIGFuZCBGcmFuayB3YW5kZXJl'
    + 'ZCBhcm91bmQgdGhlIGJhY2sgZm9yIGEgcXVpY2sgWW9vaG9vLCBidXQgYnkgdGhlbiBldmVyeXRoaW5nIGhhZCBnb25lIHRvIGhlbGwu'
    + 'ICJXaHksIHdoeSwgd2h5LCIgTGFycnkgKEZyYW5rJ3MgYWNjb3VudGFudCkgc2FpZCwgSSB0aGluayB0byBoaW1zZWxmIG1vcmUgdGhh'
    + 'biBhbnl0aGluZy4gIldlIGFsd2F5cyBnZXQgc3R1Y2sgZG9pbmcgdGhlIHN0dWZmIHRoYXQgbm9ib2R5IGVsc2Ugd2FudHMgdG8gZG8u'
    + 'IFdlIGFsd2F5cyBnZXQgdGhlIHNob3J0IGVuZCBvZiB0aGUgc3RpY2suIFNjcmV3IHRoZW0uIiBMYXJyeSBzb21ldGltZXMgd2VudCBv'
    + 'ZmYgbGlrZSB0aGlzIC0tIGJsYWgsIGJsYWgsIGJsYWgsIHdoYXRldmVyLiBTcG9vbnMgYW5kIGZvcmtzLCB3aGF0ZXZlci4gVGhlIHBv'
    + 'aW50IHRvIGhpbSB3YXMgYWx3YXlzIHRoYXQgdGhlcmUgd2FzIG5vIHBvaW50LCBleGNlcHQgbWF5YmUgZm9yIHRoZSBwb2ludCBvbiBo'
    + 'aXMgcG9pbnR5IGFzcy4gIkplc3VzLCIgSSBzYWlkLCAiR2l2ZSBpdCBhIHJlc3QsIHBhbC4gVGhlcmUncyBvbmx5IHNvIG11Y2ggTW9y'
    + 'ayBEaXNod2FzaGluZyBMaXF1aWQgdG8gZ28gYXJvdW5kLiBObywgbm8sIG5vLiIgKFllYWgsIGxpa2UgdGhhdCBtYXR0ZXJlZCwgd2Fz'
    + 'IGFsbCBhbnlvbmUgY291bGQgdGhpbmsgaW4gdGhvc2UgZGF5cyBvZiBjbGFtbXkgU3BhbSBhbmQgU3ByaXRlLikgIk5vbmUgb2YgdGhh'
    + 'dCdzIGF2YWlsYWJsZSwgbm90IHNpbmNlIHRoZSB3cmVjay4gTWFuLCB5b3Uga25vdyB0aGF0IC0tIHNob3VsZCBrbm93IHRoYXQgYmV0'
    + 'dGVyIHRoYW4gYW55b25lJ3MgY291c2luLiBEb2VzIHRoZSB3b3JkIHBsZXNwZXJvdXMgbWVhbiBhbnl0aGluZyB0byB5b3U/IFBsZWFz'
    + 'ZSBzYXkgbm8gLS0gUGxlYXNlIHNheSBuby4iIFJlYWwgY2FzdWFsIGFuZCBhbGwuIExpa2Ugbm90aGluZyBtYXR0ZXJlZCBhbnltb3Jl'
    + 'LiBUaGVuIGhlIHBpY2tzIHVwIGEgYnJpZ2h0LWdyZWVuIGNodW5rIG9mIGl0IGFuZCBzbmlmZnMgaXQsIGxpY2tzIGl0IHdpdGggaGlz'
    + 'IHRvbmd1ZS4gIkZpcnN0IG9mIGFsbCwgeW91IGNhbid0IHB1dCB0aGF0IHN0dWZmIGluIHlvdXIgbW91dGgsIHlvdSBpZGlvdC4iIEZy'
    + 'YW5rIGhhZCBhIHdheSBvZiB0ZWxsaW5nIGl0IGxpa2UgaGUgc2F3IGl0LiAiTWFuLCBzb21ldGltZXMgSSB0aGluayBJIGhvb2tlZCB1'
    + 'cCB3aXRoIGEgZ29kZGFtbiBtb3Jvbi4iIFRoZSB0aGluZyBGcmFuayBkaWRuJ3QgdW5kZXJzdGFuZCBhYm91dCBtZSAtLSBvbmUgb2Yg'
    + 'dGhlIHRoaW5ncywgYW55d2F5IC0tIHdhcyB0aGF0IG1vcm9uIHNwZWxsZWQgYmFja3dhcmRzIHNwZWxsZWQgIm5vcm9tLiIgVGhhdCBn'
    + 'b3QgbWUgdGhyb3VnaCBhIGxvdCBvZiBsb25lbHkgbmlnaHRzLiBXaGVuIHRoZSBjYXR0bGUgY2FycyBmaW5hbGx5IGNhbWUsIG1lIGFu'
    + 'ZCBGcmFuayB3YW5kZXJlZCBhcm91bmQgdGhlIGJhY2sgZm9yIGEgcXVpY2sgWW9vaG9vLCBidXQgYnkgdGhlbiBldmVyeXRoaW5nIGhh'
    + 'ZCBnb25lIHRvIGhlbGwuICJXaHksIHdoeSwgd2h5LCIgTGFycnkgKEZyYW5rJ3MgYWNjb3VudGFudCkgc2FpZCwgSSB0aGluayB0byBo'
    + 'aW1zZWxmIG1vcmUgdGhhbiBhbnl0aGluZy4gIldlIGFsd2F5cyBnZXQgc3R1Y2sgZG9pbmcgdGhlIHN0dWZmIHRoYXQgbm9ib2R5IGVs'
    + 'c2Ugd2FudHMgdG8gZG8uIFdlIGFsd2F5cyBnZXQgdGhlIHNob3J0IGVuZCBvZiB0aGUgc3RpY2suIFNjcmV3IHRoZW0uIiBMYXJyeSBz'
    + 'b21ldGltZXMgd2VudCBvZmYgbGlrZSB0aGlzIC0tIGJsYWgsIGJsYWgsIGJsYWgsIHdoYXRldmVyLiBTcG9vbnMgYW5kIGZvcmtzLCB3'
    + 'aGF0ZXZlci4gVGhlIHBvaW50IHRvIGhpbSB3YXMgYWx3YXlzIHRoYXQgdGhlcmUgd2FzIG5vIHBvaW50LCBleGNlcHQgbWF5YmUgZm9y'
    + 'IHRoZSBwb2ludCBvbiBoaXMgcG9pbnR5IGFzcy4gIkplc3VzLCIgSSBzYWlkLCAiR2l2ZSBpdCBhIHJlc3QsIHBhbC4gVGhlcmUncyBv'
    + 'bmx5IHNvIG11Y2ggTW9yayBEaXNod2FzaGluZyBMaXF1aWQgdG8gZ28gYXJvdW5kLiBObywgbm8sIG5vLiIgKFllYWgsIGxpa2UgdGhh'
    + 'dCBtYXR0ZXJlZCwgd2FzIGFsbCBhbnlvbmUgY291bGQgdGhpbmsgaW4gdGhvc2UgZGF5cyBvZiBjbGFtbXkgU3BhbSBhbmQgU3ByaXRl'
    + 'LikgIk5vbmUgb2YgdGhhdCdzIGF2YWlsYWJsZSwgbm90IHNpbmNlIHRoZSB3cmVjay4gTWFuLCB5b3Uga25vdyB0aGF0IC0tIHNob3Vs'
    + 'ZCBrbm93IHRoYXQgYmV0dGVyIHRoYW4gYW55b25lJ3MgY291c2luLiBEb2VzIHRoZSB3b3JkIHBsZXNwZXJvdXMgbWVhbiBhbnl0aGlu'
    + 'ZyB0byB5b3U/IFBsZWFzZSBzYXkgbm8gLS0gUGxlYXNlIHNheSBuby4iIFJlYWwgY2FzdWFsIGFuZCBhbGwuIExpa2Ugbm90aGluZyBt'
    + 'YXR0ZXJlZCBhbnltb3JlLiBUaGVuIGhlIHBpY2tzIHVwIGEgYnJpZ2h0LWdyZWVuIGNodW5rIG9mIGl0IGFuZCBzbmlmZnMgaXQsIGxp'
    + 'Y2tzIGl0IHdpdGggaGlzIHRvbmd1ZS4gIkZpcnN0IG9mIGFsbCwgeW91IGNhbid0IHB1dCB0aGF0IHN0dWZmIGluIHlvdXIgbW91dGgs'
    + 'IHlvdSBpZGlvdC4iIEZyYW5rIGhhZCBhIHdheSBvZiB0ZWxsaW5nIGl0IGxpa2UgaGUgc2F3IGl0LiAiTWFuLCBzb21l');

const NUMBER_FORMAT = NumberFormat.getNumberInstance();
const PERCENT_FORMAT = NumberFormat.getPercentInstance();
const LOG_PREFIX = '';

const KB_BYTES = 1024;
const MB_BYTES = KB_BYTES * KB_BYTES;
const GB_BYTES = MB_BYTES * KB_BYTES;
const TB_BYTES = GB_BYTES * KB_BYTES;
const PB_BYTES = TB_BYTES * KB_BYTES;

const IDX_INLINING = 0;
const IDX_SPJ = 1;
const IDX_BS = 2;

/**
 * How often, in milliseconds, an `Extrospector` will 'look' to determine
 * its own state relative to nearby entities such as twinned archives with the
 * same TCP metapaths. This applies to at-rest state as well as when an
 * archive's Koroviev velocity is not near-zero with respect to the local frame.
 */
const DEFAULT_EXTROSPECTOR_LOOK_MILLIS_INTERVAL = 5;

/**
 * The number of `CompressionPellet`s used by default when constructing an
 * archive's hard-shell contingency overlay. The minimum is 512.
 */
const DEFAULT_PELLET_CT = 2048;

/**
 * The length of a 'tick'; after every `TICK_LENGTH_BYTES` bytes are
 * written, `ProgressListener#progressTick()` is called. Note that
 * `progressTick()` is deprecated.
 */
const TICK_LENGTH_BYTES = 2000000;

/**
 * Default `#compressionOptions`, used when these options are not set in
 * the constructor call. These default options enable bilateral
 * pseudo-awareness, inlined PUMP and UNPUMP directives, and subjective
 * packet-jettisoning (SPJ).
 *
 * @see #compressionOptions
 */
const defaultCompressionOptions = new Map()
    .set('inliningEnabled', true)
    .set('spjEnabled', true)
    .set('bpaEnabled', true)
;


/**
 * The `ProgressListener` used if one is not supplied in a constructor
 * call. The default is a `BasicProgressListener` instance, which logs
 * essential information to `System.out`.
 *
 * @see ProgressListener
 * @see BasicProgressListener
 */
const defaultProgressListener = new BasicProgressListener();

module.exports = CompressorDecompressor;
