const CompressorDecompressor = require('../CompressorDecompressor');
const ProgressListener = require('../ProgressListener');

/**
 * Implementation of {@link ProgressListener} used if no listener is passed to the {@link CompressorDecompressor} 
 * constructor. Many methods of this implementation are no-ops; the exceptions are the logging-related methods 
 * ({@link #outPrint(Object)}, {@link #outPrintln(Object)}, and {@link #errPrintln(Object)}), as well as 
 * {@link #notifyClossonThorpeSubevent(int, boolean)} (which notifies the user of the Closson-Thorpe via a call 
 * to {@link #outPrintln(Object)}) and {@link #signalFatalException}, which simply throws a `RuntimeException`
 * with the fatal exception as its cause.  Consumers of the XQK API are encouraged to implement their own
 * {@link ProgressListener}.
 *
 */
class BasicProgressListener extends ProgressListener {


    /**
     * Instantiate a `BasicProgressListener`
     */
    constructor () {
        super();
    }


    /**
     * Passes `obj` to `console.info`
     */
    outPrint(obj) {
        console.info(obj);
    }

    /**
     * Passes `obj` to `console.info`
     */
    outPrintln(obj) {
        console.info(obj);
    }

    /**
     * Passes `obj` to `console.error`
     */
    errPrintln(obj) {
        console.error(obj);
    }

    /**
     * <b>No-op for this implementation.</b>
     */
    notifyExpectedTotalBytes(bytes) {
        // the CL listener doesn't use this value
    }

    /**
     * <b>No-op for this implementation.</b>
     */
    notifyBytesWritten(bytes) {
        // the CL listener doesn't use this value
    }

    /**
     * <b>No-op for this implementation.</b>
     * @deprecated
     */
    progressTick() {
        // Noop for this basic listener
    }

    /**
     * <b>No-op for this implementation.</b>
     */
    notifyStartOperation(compress) {
        // Noop for this basic listener
    }

    /**
     * Rethrows the error for this impl.
     */
    signalFatalException(error) {
        throw e;
    }

    /**
     * <b>No-op for this implementation.</b>
     */
    notifyOperationComplete(destFile) {
        // Noop for this basic listener
    }

    /**
     * <b>No-op for this implementation.</b>
     */
    registerPellet(seqId) {
        // Noop for this basic listener
    }

    /**
     * Logs the queuing of the directive to `System.out`, with a timestamp for obvious reasons.
     */
    registerPumpDump(doPump, pdCount) {
        this.outPrintln('');
        this.outPrintln((doPump ? 'PUMP' : 'UNPUMP') + 'ed at ' + new Date());
    }


    /**
     * <b>No-op for this implementation.</b>
     */
    notifyClossonThorpeSubevent(potentialAffectedBytes, fatal) {
        // Noop for this basic listener
    }
}


module.exports = BasicProgressListener;
