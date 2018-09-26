package com.xqk.plisteners;

import java.io.File;
import java.io.PrintStream;
import java.util.Date;

import com.xqk.CompressorDecompressor;
import com.xqk.ProgressListener;

/**
 * Implementation of {@link ProgressListener} used if no listener is passed to the {@link CompressorDecompressor} 
 * constructor. Many methods of this implementation are no-ops; the exceptions are the logging-related methods 
 * ({@link #outPrint(Object)}, {@link #outPrintln(Object)}, and {@link #errPrintln(Object)}), as well as 
 * {@link #notifyClossonThorpeSubevent(int, boolean)} (which notifies the user of the Closson-Thorpe via a call 
 * to {@link #outPrintln(Object)}) and {@link #signalFatalException}, which simply throws a <code>RuntimeException</code>
 * with the fatal exception as its cause.  Consumers of the XQK API are encouraged to implement their own
 * {@link ProgressListener}.
 *
 */
public class BasicProgressListener implements ProgressListener {

    
    private static PrintStream systemOut = System.out;
    private static PrintStream systemErr = System.err;
    private static String logPrefix = "";
    
    /**
     * Instantiate a <code>BasicProgressListener</code>
     */
    public BasicProgressListener() {
        super();
    }


    /**
     * Passes <code>obj</code> to <code>System.out.print</code>
     */
    public void outPrint(Object obj) {
        systemOut.print(obj);
    }

    /**
     * Passes <code>obj</code> to <code>System.out.println</code>
     */
    public void outPrintln(Object obj) {
        systemOut.println(logPrefix + obj);
    }

    /**
     * Passes <code>obj</code> to <code>System.err.println</code>
     */
    public void errPrintln(Object obj) {
        systemErr.println(logPrefix + obj);
    }

    /**
     * <b>No-op for this implementation.</b>
     * {@inheritDoc}
     */
    public void notifyExpectedTotalBytes(long bytes) {
        // the CL listener doesn't use this value
    }

    /**
     * <b>No-op for this implementation.</b>
     * {@inheritDoc}
     */
    public void notifyBytesWritten(long bytes) {
        // the CL listener doesn't use this value
    }

    /**
     * <b>No-op for this implementation.</b>
     * {@inheritDoc}
     * @deprecated
     */
    public void progressTick() {
        // Noop for this basic listener
    }

    /**
     * <b>No-op for this implementation.</b>
     * {@inheritDoc}
     */
    public void notifyStartOperation(boolean compress) {
        // Noop for this basic listener
    }

    /**
     * Throws a <code>RuntimeException</code> with <code>exception</code> as its cause.
     */
    public void signalFatalException(Exception exception) {
        throw new RuntimeException(exception);
    }

    /**
     * <b>No-op for this implementation.</b>
     * {@inheritDoc}
     */
    public void notifyOperationComplete(File destFile) {
        // Noop for this basic listener
    }

    /**
     * <b>No-op for this implementation.</b>
     * {@inheritDoc}
     */
    public void registerPellet(long seqId) {
        // Noop for this basic listener
    }

    /**
     * Logs the queuing of the directive to <code>System.out</code>, with a timestamp for obvious reasons.
     */
    public void registerPumpDump(boolean doPump, int pdCount) {
        this.outPrintln("");        
        this.outPrintln((doPump ? "PUMP" : "UNPUMP") + "ed at " + new Date());        
    }


    /**
     * <b>No-op for this implementation.</b>
     * {@inheritDoc}
     */
    public void notifyClossonThorpeSubevent(int potentialAffectedBytes, boolean fatal) {
        // Noop for this basic listener
    }
}
