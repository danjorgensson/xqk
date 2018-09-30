const CompressorDecompressor = require('../CompressorDecompressor');
const ProgressListener = require('../ProgressListener');

/**
 * Implementation of `ProgressListener` used if no listener is passed to the `CompressorDecompressor`
 * constructor. Many methods of this implementation are no-ops; the exceptions are the logging-related methods 
 * (`#outPrint(Object)`, `#outPrintln(Object)`, and `#errPrintln(Object)`), as well as
 * `#notifyClossonThorpeSubevent(int, boolean)` (which notifies the user of the Closson-Thorpe via a call
 * to `#outPrintln(Object)`) and `#signalFatalException`, which simply throws a `RuntimeException`
 * with the fatal exception as its cause.  Consumers of the XQK API are encouraged to implement their own
 * `ProgressListener`.
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
        console.info(obj || '');
    }

    /**
     * Passes `obj` to `console.info`
     */
    outPrintln(obj) {
        console.info(obj || '');
    }

    /**
     * Passes `obj` to `console.error`
     */
    errPrintln(obj) {
        console.error(obj || '');
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
        new ArgValidator(arguments).validate([
            {name: 'doPump', reqd: true, type: 'boolean'},
            {name: 'pdCount', reqd: true, type: 'number'}
        ]);

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
