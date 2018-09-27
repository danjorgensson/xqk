package com.xqk.plisteners;

import java.io.File;
import java.io.PrintStream;
import java.text.NumberFormat;
import java.util.Date;

import com.xqk.ProgressListener;
import com.xqk.Xqk;

/**
 * The `ProgressListener` used by the command-line parser ({@link Xqk}). <b>This class is not part of the
 * XQK API, but may be useful for reference.</b>
 *
 */
public class CommandLineProgressListener implements ProgressListener {

    private static final int PROGRESS_TICKS_PER_LINE = 87;

    private PrintStream outPrintStream;
    private PrintStream errPrintStream;
    private String logPrefix;
    
    private int markerCounter = 0;

    /** Construct a `CommandLineProgressListener`
     * @param outPrintStream A `PrintStream` such as `System.out` to which output will be written, for example
     * by {@link CommandLineProgressListener#outPrintln(Object)}
     * @param errPrintStream A `PrintStream` such as `System.err` to which output will be written, for example
     * by {@link CommandLineProgressListener#errPrintln(Object)}
     * @param logPrefix String to precede messages printed to `outPrintStream` or `errPrintStream`
     * @param percentFormat A `NumberFormat` suited to formatting percentages (such as compression ratios expressed as a
     * percentage)
     * @param numberFormat A `NumberFormat` suited to formatting decimals
     */
    public CommandLineProgressListener(PrintStream outPrintStream, PrintStream errPrintStream, String logPrefix,
        NumberFormat percentFormat, NumberFormat numberFormat) {
        this.outPrintStream = outPrintStream;
        this.errPrintStream = errPrintStream;
        this.logPrefix = ""; // logPrefix;
    }

    @Override
    public void outPrint(Object obj) {
        this.outPrintStream.print(obj);

    }

    @Override
    public void outPrintln(Object obj) {
        this.outPrintStream.println(this.logPrefix + obj);
    }

    @Override
    public void errPrintln(Object obj) {
        this.errPrintStream.println(this.logPrefix + obj);
    }

    @Override
    public void notifyExpectedTotalBytes(long bytes) {
        // the CL listener doesn't use this value
    }

    @Override
    public void notifyBytesWritten(long bytes) {
        // the CL listener doesn't use this value
    }

    @Override
    public void progressTick() {
        this.outPrint("|");
        markerCounter++;
        if (markerCounter > PROGRESS_TICKS_PER_LINE) {
            this.outPrintln("");
            this.outPrint(logPrefix);
            markerCounter = 0;
        }

    }

    @Override
    public void notifyStartOperation(boolean compress) {
        // Do nothing for CL listener.
    }

    @Override
    public void signalFatalException(Exception e) {
        // Do nothing for CL listener.        
    }

    @Override
    public void notifyOperationComplete(File destFile) {
        // Do nothing for CL listener.
    }

    @Override
    public void registerPellet(long seqId) {
        this.outPrint("|");      
    }

    @Override
    public void registerPumpDump(boolean doPump, int pdCount) {
        this.outPrintln("");        
        this.outPrintln((doPump ? "PUMP" : "UNPUMP") + "ed at " + new Date());        
    }

    @Override
    public void notifyClossonThorpeSubevent(int potentialAffectedBytes, boolean fatal) {
        // TODO Auto-generated method stub
        
    }
}
