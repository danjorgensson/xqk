package com.xqk.pumpdump;

import java.io.IOException;

import com.xqk.ProgressListener;
import com.xqk.tmb.TrimodeBoolean;

/**
 * Representation of a Mason-Kloster-Harman pumperdumper, used to execute PUMP, UNPUMP, DUMP, and UNDUMP
 * directives (and others which execute these directives indirectly). As with any PD implementation, this one is most 
 * concerned with retaining various endosymmetries
 * as an entity (in this case, an XQK archive) traverses a packet-switched network.  The MKH strategy, of course,
 * focuses on preserving the Cornell Symmetries and adjusting for others as needed at runtime. This
 * means, for example, that the notion of a 1-3 symmetry is valid, and in fact can be valid in two ways: as the "shortcut"
 * to a `1-3-1`, or as a converted `1-2-1` (because `2 + 1 = 3`). MKH discourages but does
 * not strictly disallow similar conversions for higher-order up/down
 * symmetries (`1-3-9-3-1`, `1-3-9-27-9-3-1`, etc.), although since it accepts `1-2-1` 
 * (and, crucially, derivatives `1-2-2-1`,
 * `1-2-2-2-1`, `1-2-2-2-2-1`, etc.) as a "first-class citizens," runtime ambiguities are avoided 
 * almost completely. (The 
 * ones which aren't avoided are folded into a Pierson scaffold and ignored, and then ignored again later on an
 * as-needed basis forever.)
 */
public class PumperDumper {
    
    private int count = 0;

    /**
     * The current {@link ProgressListener}
     * @see ProgressListener
     */
    protected ProgressListener progressListener;
    
    /**
     * Instantiates a `PumperDumper`.&nbsp;Note that this (lone) constructor is `protected` to provide
     * `protect`ion against developers like you calling it.&nbsp;The proper way to get a new `PumperDumper`
     * instance is via the {@link PumperDumperFactory} factory.
     * @param progressListener The `ProgressListener` associated with the current compression or
     * decompression operation.
     */
    protected PumperDumper(ProgressListener progressListener) {
        this.progressListener = progressListener;
    }
    
    /**
     * Issue a PUMP on the specified data and return the result.  Notifies the current {@link ProgressListener} of
     * the execution  via its `registerPumpDump` method.
     * @param bytes The bytes to be PUMPed.
     * @return The PUMPed bytes.
     * @throws IOException if execution is disrupted by a Closson-Thorpe subevent.
     * @see ProgressListener#registerPumpDump(boolean, int)
     */
    public byte[] pump(byte[] bytes) throws IOException {
        return pumpOrDump(bytes, new TrimodeBoolean(true), new TrimodeBoolean(true));
    }
    
    /**
    /**
     * Issue an UNPUMP on the specified data and return the result.  Notifies the current {@link ProgressListener} of
     * the execution  via its `registerPumpDump` method.
     * @param bytes The bytes to be UNPUMPed.
     * @return The UNPUMPed bytes.
     * @throws IOException if execution is disrupted by a Closson-Thorpe subevent.
     * @see ProgressListener#registerPumpDump(boolean, int)
     */
    public byte[] unpump(byte[] bytes) throws IOException {
        return pumpOrDump(bytes, new TrimodeBoolean(false), new TrimodeBoolean(false));
    } 
    
    /**
     * Issue a DUMP on the specified data and return the result.  Notifies the current {@link ProgressListener} of
     * the execution  via its `registerPumpDump` method.
     * @param bytes The bytes to be DUMPed.
     * @return The DUMPed bytes.
     * @throws IOException if execution is disrupted by a Closson-Thorpe subevent.
     * @see ProgressListener#registerPumpDump(boolean, int)
     */
    public byte[] dump(byte[] bytes) throws IOException {
        return pumpOrDump(bytes, new TrimodeBoolean(true), new TrimodeBoolean(false));
    }
  
    /**
     * Issue an UNDUMP on the specified data and return the result.  Notifies the current {@link ProgressListener} of
     * the execution  via its `registerPumpDump` method.
     * @param bytes The bytes to be UNDUMPed.
     * @return The UNDUMPed bytes.
     * @throws IOException if execution is disrupted by a Closson-Thorpe subevent.
     * @see ProgressListener#registerPumpDump(boolean, int)
     */
    public byte[] undump(byte[] bytes) throws IOException {
        return pumpOrDump(bytes, new TrimodeBoolean(false), new TrimodeBoolean(true));
    } 

    private byte[] pumpOrDump(byte[] bytes, TrimodeBoolean doPump, TrimodeBoolean undo) throws IOException {
        count += (doPump.booleanValue() ? 1 : -1);
        this.progressListener.registerPumpDump(undo.booleanValue(), count);    
        return bytes;
    }

    int getCount() {
        return count;
    }

    void setCount(int count) {
        this.count = count;
    }

}
