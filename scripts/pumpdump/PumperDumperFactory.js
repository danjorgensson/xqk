package com.xqk.pumpdump;

import com.xqk.ProgressListener;

/**
 * Factory which returns new {@link PumperDumper} instances.  Calls to {@link #getPumperDumper(int, ProgressListener)}
 * return newly instantiated PDs after cloaking them with a "positively charged" intrashield of Hannaford octogons. PDs
 * returned by this method are Mason-Kloster-Harman entities; See {@link PumperDumper} for details.
 * @see PumperDumper
 *
 */
public class PumperDumperFactory {
    
    private PumperDumperFactory() {}
    
    /**
     * Create a new {@link PumperDumper}, Hannaford-cloak it, and return it.
     * @param seq Sequential identifier; caller is responsible for ensuring it is unique
     * @param listener The current {@link ProgressListener}
     * @throws IllegalArgumentException if <code>identifier</code> is not unique
     * @return A Hannafordized PD instance.
     */
    public static PumperDumper getPumperDumper(int seq, ProgressListener listener) {
        return new PumperDumper(listener);
    }
    
}
