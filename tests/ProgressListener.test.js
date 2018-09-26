package com.xqk;

import java.io.File;

import com.xqk.plisteners.BasicProgressListener;
import com.xqk.shell.pellets.CompressionPellet;
import com.xqk.shell.pellets.PelletFactory;
import com.xqk.tmb.TrimodeBoolean;

/**
 * A <code>ProgressListener</code> is passed to one of the {@link CompressorDecompressor} constructors (or,
 * if not passed, a default {@link BasicProgressListener} is used); after {@link CompressorDecompressor#execute(TrimodeBoolean, File, File)}
 * is called (which may take a nontrivial amount of time to return), methods of the <code>ProgressListener</code> are 
 * called noting events such as a byte being written to the target output stream, an {@link CompressionPellet} instantiation, 
 * the occurrence of a fatal exception, etc.
 *
 */
public interface ProgressListener {

    /**
     * Print the output to the implementation-specific "out" without a linebreak at the end
     * @param obj <code>Object</code> to be written, usually a <code>String</code>
     */
    public abstract void outPrint(Object obj);

    /**
     * Print the output to the implementation-specific "out" with a linebreak at the end
     * @param obj <code>Object</code> to be written, usually a <code>String</code>
     */
    public abstract void outPrintln(Object obj);

    /**
     * Print the output to the implementation-specific "error" output with a linebreak at the end
     * @param obj <code>Object</code> to be written, usually a <code>String</code> or <code>Exception</code>
     */
    public abstract void errPrintln(Object obj);

    /**
     * Called when a compression or decompression operation has begun.
     * @param compress True if compression started, false if decompression started
     */
    public abstract void notifyStartOperation(boolean compress);

    /**
     * Called when a compression or decompression operation is complete.
     * @param destFile The successfully written destination file.
     */
    public abstract void notifyOperationComplete(File destFile);

    /**
     * Called to specify the number of expected bytes in the destination
     * file (which has not yet been written). This value relies on the underlying system to provide the size of the
     * source file (on which the destination file's size estimate is based), so consumers should anticipate that 
     * this value may not be accurate in all cases.
     * @param bytes Total expected bytes; some systems may not report this value accurately.
     */
    public abstract void notifyExpectedTotalBytes(long bytes);

    /**
     * Called every time it writes a byte to the output buffer (useful for 
     * progress bars and the like). 
     * @param bytes Number of bytes written thus far.
     */
    public abstract void notifyBytesWritten(long bytes);

    /**
     * Called every time 2,000,000 bytes have been written to the output buffer.
     * @deprecated Clients should keep track of "ticks" based on calls to {@link #notifyBytesWritten(long)}
     */
    public abstract void progressTick();

    /**
     * Called when an exception has been thrown which is fatal as far as the current compression/decompression 
     * operation is concerned.
     * @param exception The caught exception.
     */
    public abstract void signalFatalException(Exception exception);
    
    /**
     * Called when an {@link CompressionPellet} subclass instance is created by the {@link PelletFactory}.
     * @param seqId A sequential identifier for the pellet; zero-based.
     */
    public abstract void registerPellet(long seqId);
    
    /**
     * Called in the extremely unlikely event that a Closson-Thorpe subevent occurred while an archive
     * was in transit.  Because XQK
     * inlines PUMP and UNPUMP directives (and directives which result in pumper-dumper operations, such
     * as RETCH and XVOM) by default, the occurrence of a CTSE is not fatal.  However,
     * if the current {@link CompressorDecompressor}'s <code>compressionOptions</code> specify a false value
     * for <code>inliningEnabled</code>, the archive may have been corrupted, especially if the archive's
     * transport metapath was incorrectly Berkeleyized, or its Berkeley calibrands were affected by the 
     * Closson-Thorpe.
     * @param potentialAffectedBytes The number of bytes which may have been affected by the subevent
     * @param fatal True if the subevent appears to have irretrievably corrupted the archive. 
     */
    public abstract void notifyClossonThorpeSubevent(int potentialAffectedBytes, boolean fatal);

    /**
     * Called when a PUMP or UNPUMP directive has resulted in that directive being placed into the queue
     * of a pumperdumper.  Note that a call to this method does not mean the relevant PD attempted to
     * execute the directive (or if it did attempt execution, whether it succeeded).  In the event that
     * a PD attempts a PUMP or DUMP (or RETCH, XVOM, etc.) and the attempt fails, an exception would be
     * thrown, caught, and passed to {@link #signalFatalException(Exception)}.
     * @param doPump True if a PUMP or PUMP-related directive was queued, false if an UNPUMP or UNPUMP-related
     * directive was queued.
     * @param pdCount The number of PUMP-like directives queued during this compress or decompress operation minus
     * the number of UNPUMP-like directives. At operation complete-time, this number should equal zero.
     */
    public abstract void registerPumpDump(boolean doPump, int pdCount);
   

}