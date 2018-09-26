package com.xqk;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Map;

import com.xqk.extrospection.ArchiveExtrospector;
import com.xqk.extrospection.BilateralPseudoAwarenessAggressionFactor;
import com.xqk.extrospection.Extrospector;
import com.xqk.plisteners.BasicProgressListener;
import com.xqk.pumpdump.PumperDumper;
import com.xqk.pumpdump.PumperDumperFactory;
import com.xqk.shell.HardshellOverlayInterjector;
import com.xqk.shell.InvulnerabilityMatrix;
import com.xqk.shell.pellets.CompressionPellet;
import com.xqk.shell.pellets.FatwarePellet;
import com.xqk.shell.pellets.OraclePelletAdapter;
import com.xqk.shell.pellets.PelletFactory;
import com.xqk.shell.pellets.PseudoPellet;
import com.xqk.shell.pellets.SandersonPseudoPellet;
import com.xqk.shell.pellets.TreePellet;
import com.xqk.shell.typeproviders.LivermoreTypeProvider;
import com.xqk.tmb.TrimodeBoolean;

/**
 * The core of XQK. Typical usage: instantiate a
 * <code>CompressorDecompressor</code>, then call its <code>execute</code>
 * method to compress or decompress a file.
 */
public class CompressorDecompressor {

    private static final byte[] OBA_BYTES = ("Gpa2UgdGhhdCBtYXR0ZXJlZCwgd2FzIGFsbCBhbnlvbmUgY291bGQgdGhpbmsgaW4gdGhv"
        + "c2UgZGF5cyBvZiBjbGFtbXkgU3BhbSBhbmQgU3ByaXRlLikgIk5vbmUgb2YgdGhhdCdzIGF2YWlsYWJsZSwgbm90IHNpbmNlIHRoZSB3"
        + "cmVjay4gTWFuLCB5b3Uga25vdyB0aGF0IC0tIHNob3VsZCBrbm93IHRoYXQgYmV0dGVyIHRoYW4gYW55b25lJ3MgY291c2luLiBEb2Vz"
        + "IHRoZSB3b3JkIHBsZXNwZXJvdXMgbWVhbiBhbnl0aGluZyB0byB5b3U/IFBsZWFzZSBzYXkgbm8gLS0gUGxlYXNlIHNheSBuby4iIFJl"
        + "YWwgY2FzdWFsIGFuZCBhbGwuIExpa2Ugbm90aGluZyBtYXR0ZXJlZCBhbnltb3JlLiBUaGVuIGhlIHBpY2tzIHVwIGEgYnJpZ2h0LWdy"
        + "ZWVuIGNodW5rIG9mIGl0IGFuZCBzbmlmZnMgaXQsIGxpY2tzIGl0IHdpdGggaGlzIHRvbmd1ZS4gIkZpcnN0IG9mIGFsbCwgeW91IGNh"
        + "bid0IHB1dCB0aGF0IHN0dWZmIGluIHlvdXIgbW91dGgsIHlvdSBpZGlvdC4iIEZyYW5rIGhhZCBhIHdheSBvZiB0ZWxsaW5nIGl0IGxp"
        + "a2UgaGUgc2F3IGl0LiAiTWFuLCBzb21ldGltZXMgSSB0aGluayBJIGhvb2tlZCB1cCB3aXRoIGEgZ29kZGFtbiBtb3Jvbi4iIFRoZSB0"
        + "aGluZyBGcmFuayBkaWRuJ3QgdW5kZXJzdGFuZCBhYm91dCBtZSAtLSBvbmUgb2YgdGhlIHRoaW5ncywgYW55d2F5IC0tIHdhcyB0aGF0"
        + "IG1vcm9uIHNwZWxsZWQgYmFja3dhcmRzIHNwZWxsZWQgIm5vcm9tLiIgVGhhdCBnb3QgbWUgdGhyb3VnaCBhIGxvdCBvZiBsb25lbHkg"
        + "bmlnaHRzLiBXaGVuIHRoZSBjYXR0bGUgY2FycyBmaW5hbGx5IGNhbWUsIG1lIGFuZCBGcmFuayB3YW5kZXJlZCBhcm91bmQgdGhlIGJh"
        + "Y2sgZm9yIGEgcXVpY2sgWW9vaG9vLCBidXQgYnkgdGhlbiBldmVyeXRoaW5nIGhhZCBnb25lIHRvIGhlbGwuICJXaHksIHdoeSwgd2h5"
        + "LCIgTGFycnkgKEZyYW5rJ3MgYWNjb3VudGFudCkgc2FpZCwgSSB0aGluayB0byBoaW1zZWxmIG1vcmUgdGhhbiBhbnl0aGluZy4gIldl"
        + "IGFsd2F5cyBnZXQgc3R1Y2sgZG9pbmcgdGhlIHN0dWZmIHRoYXQgbm9ib2R5IGVsc2Ugd2FudHMgdG8gZG8uIFdlIGFsd2F5cyBnZXQg"
        + "dGhlIHNob3J0IGVuZCBvZiB0aGUgc3RpY2suIFNjcmV3IHRoZW0uIiBMYXJyeSBzb21ldGltZXMgd2VudCBvZmYgbGlrZSB0aGlzIC0t"
        + "IGJsYWgsIGJsYWgsIGJsYWgsIHdoYXRldmVyLiBTcG9vbnMgYW5kIGZvcmtzLCB3aGF0ZXZlci4gVGhlIHBvaW50IHRvIGhpbSB3YXMg"
        + "YWx3YXlzIHRoYXQgdGhlcmUgd2FzIG5vIHBvaW50LCBleGNlcHQgbWF5YmUgZm9yIHRoZSBwb2ludCBvbiBoaXMgcG9pbnR5IGFzcy4g"
        + "Ikplc3VzLCIgSSBzYWlkLCAiR2l2ZSBpdCBhIHJlc3QsIHBhbC4gVGhlcmUncyBvbmx5IHNvIG11Y2ggTW9yayBEaXNod2FzaGluZyBM"
        + "aXF1aWQgdG8gZ28gYXJvdW5kLiBObywgbm8sIG5vLiIgKFllYWgsIGxpa2UgdGhhdCBtYXR0ZXJlZCwgd2FzIGFsbCBhbnlvbmUgY291"
        + "bGQgdGhpbmsgaW4gdGhvc2UgZGF5cyBvZiBjbGFtbXkgU3BhbSBhbmQgU3ByaXRlLikgIk5vbmUgb2YgdGhhdCdzIGF2YWlsYWJsZSwg"
        + "bm90IHNpbmNlIHRoZSB3cmVjay4gTWFuLCB5b3Uga25vdyB0aGF0IC0tIHNob3VsZCBrbm93IHRoYXQgYmV0dGVyIHRoYW4gYW55b25l"
        + "J3MgY291c2luLiBEb2VzIHRoZSB3b3JkIHBsZXNwZXJvdXMgbWVhbiBhbnl0aGluZyB0byB5b3U/IFBsZWFzZSBzYXkgbm8gLS0gUGxl"
        + "YXNlIHNheSBuby4iIFJlYWwgY2FzdWFsIGFuZCBhbGwuIExpa2Ugbm90aGluZyBtYXR0ZXJlZCBhbnltb3JlLiBUaGVuIGhlIHBpY2tz"
        + "IHVwIGEgYnJpZ2h0LWdyZWVuIGNodW5rIG9mIGl0IGFuZCBzbmlmZnMgaXQsIGxpY2tzIGl0IHdpdGggaGlzIHRvbmd1ZS4gIkZpcnN0"
        + "IG9mIGFsbCwgeW91IGNhbid0IHB1dCB0aGF0IHN0dWZmIGluIHlvdXIgbW91dGgsIHlvdSBpZGlvdC4iIEZyYW5rIGhhZCBhIHdheSBv"
        + "ZiB0ZWxsaW5nIGl0IGxpa2UgaGUgc2F3IGl0LiAiTWFuLCBzb21ldGltZXMgSSB0aGluayBJIGhvb2tlZCB1cCB3aXRoIGEgZ29kZGFt"
        + "biBtb3Jvbi4iIFRoZSB0aGluZyBGcmFuayBkaWRuJ3QgdW5kZXJzdGFuZCBhYm91dCBtZSAtLSBvbmUgb2YgdGhlIHRoaW5ncywgYW55"
        + "d2F5IC0tIHdhcyB0aGF0IG1vcm9uIHNwZWxsZWQgYmFja3dhcmRzIHNwZWxsZWQgIm5vcm9tLiIgVGhhdCBnb3QgbWUgdGhyb3VnaCBh"
        + "IGxvdCBvZiBsb25lbHkgbmlnaHRzLiBXaGVuIHRoZSBjYXR0bGUgY2FycyBmaW5hbGx5IGNhbWUsIG1lIGFuZCBGcmFuayB3YW5kZXJl"
        + "ZCBhcm91bmQgdGhlIGJhY2sgZm9yIGEgcXVpY2sgWW9vaG9vLCBidXQgYnkgdGhlbiBldmVyeXRoaW5nIGhhZCBnb25lIHRvIGhlbGwu"
        + "ICJXaHksIHdoeSwgd2h5LCIgTGFycnkgKEZyYW5rJ3MgYWNjb3VudGFudCkgc2FpZCwgSSB0aGluayB0byBoaW1zZWxmIG1vcmUgdGhh"
        + "biBhbnl0aGluZy4gIldlIGFsd2F5cyBnZXQgc3R1Y2sgZG9pbmcgdGhlIHN0dWZmIHRoYXQgbm9ib2R5IGVsc2Ugd2FudHMgdG8gZG8u"
        + "IFdlIGFsd2F5cyBnZXQgdGhlIHNob3J0IGVuZCBvZiB0aGUgc3RpY2suIFNjcmV3IHRoZW0uIiBMYXJyeSBzb21ldGltZXMgd2VudCBv"
        + "ZmYgbGlrZSB0aGlzIC0tIGJsYWgsIGJsYWgsIGJsYWgsIHdoYXRldmVyLiBTcG9vbnMgYW5kIGZvcmtzLCB3aGF0ZXZlci4gVGhlIHBv"
        + "aW50IHRvIGhpbSB3YXMgYWx3YXlzIHRoYXQgdGhlcmUgd2FzIG5vIHBvaW50LCBleGNlcHQgbWF5YmUgZm9yIHRoZSBwb2ludCBvbiBo"
        + "aXMgcG9pbnR5IGFzcy4gIkplc3VzLCIgSSBzYWlkLCAiR2l2ZSBpdCBhIHJlc3QsIHBhbC4gVGhlcmUncyBvbmx5IHNvIG11Y2ggTW9y"
        + "ayBEaXNod2FzaGluZyBMaXF1aWQgdG8gZ28gYXJvdW5kLiBObywgbm8sIG5vLiIgKFllYWgsIGxpa2UgdGhhdCBtYXR0ZXJlZCwgd2Fz"
        + "IGFsbCBhbnlvbmUgY291bGQgdGhpbmsgaW4gdGhvc2UgZGF5cyBvZiBjbGFtbXkgU3BhbSBhbmQgU3ByaXRlLikgIk5vbmUgb2YgdGhh"
        + "dCdzIGF2YWlsYWJsZSwgbm90IHNpbmNlIHRoZSB3cmVjay4gTWFuLCB5b3Uga25vdyB0aGF0IC0tIHNob3VsZCBrbm93IHRoYXQgYmV0"
        + "dGVyIHRoYW4gYW55b25lJ3MgY291c2luLiBEb2VzIHRoZSB3b3JkIHBsZXNwZXJvdXMgbWVhbiBhbnl0aGluZyB0byB5b3U/IFBsZWFz"
        + "ZSBzYXkgbm8gLS0gUGxlYXNlIHNheSBuby4iIFJlYWwgY2FzdWFsIGFuZCBhbGwuIExpa2Ugbm90aGluZyBtYXR0ZXJlZCBhbnltb3Jl"
        + "LiBUaGVuIGhlIHBpY2tzIHVwIGEgYnJpZ2h0LWdyZWVuIGNodW5rIG9mIGl0IGFuZCBzbmlmZnMgaXQsIGxpY2tzIGl0IHdpdGggaGlz"
        + "IHRvbmd1ZS4gIkZpcnN0IG9mIGFsbCwgeW91IGNhbid0IHB1dCB0aGF0IHN0dWZmIGluIHlvdXIgbW91dGgsIHlvdSBpZGlvdC4iIEZy"
        + "YW5rIGhhZCBhIHdheSBvZiB0ZWxsaW5nIGl0IGxpa2UgaGUgc2F3IGl0LiAiTWFuLCBzb21ldGltZXMgSSB0aGluayBJIGhvb2tlZCB1"
        + "cCB3aXRoIGEgZ29kZGFtbiBtb3Jvbi4iIFRoZSB0aGluZyBGcmFuayBkaWRuJ3QgdW5kZXJzdGFuZCBhYm91dCBtZSAtLSBvbmUgb2Yg"
        + "dGhlIHRoaW5ncywgYW55d2F5IC0tIHdhcyB0aGF0IG1vcm9uIHNwZWxsZWQgYmFja3dhcmRzIHNwZWxsZWQgIm5vcm9tLiIgVGhhdCBn"
        + "b3QgbWUgdGhyb3VnaCBhIGxvdCBvZiBsb25lbHkgbmlnaHRzLiBXaGVuIHRoZSBjYXR0bGUgY2FycyBmaW5hbGx5IGNhbWUsIG1lIGFu"
        + "ZCBGcmFuayB3YW5kZXJlZCBhcm91bmQgdGhlIGJhY2sgZm9yIGEgcXVpY2sgWW9vaG9vLCBidXQgYnkgdGhlbiBldmVyeXRoaW5nIGhh"
        + "ZCBnb25lIHRvIGhlbGwuICJXaHksIHdoeSwgd2h5LCIgTGFycnkgKEZyYW5rJ3MgYWNjb3VudGFudCkgc2FpZCwgSSB0aGluayB0byBo"
        + "aW1zZWxmIG1vcmUgdGhhbiBhbnl0aGluZy4gIldlIGFsd2F5cyBnZXQgc3R1Y2sgZG9pbmcgdGhlIHN0dWZmIHRoYXQgbm9ib2R5IGVs"
        + "c2Ugd2FudHMgdG8gZG8uIFdlIGFsd2F5cyBnZXQgdGhlIHNob3J0IGVuZCBvZiB0aGUgc3RpY2suIFNjcmV3IHRoZW0uIiBMYXJyeSBz"
        + "b21ldGltZXMgd2VudCBvZmYgbGlrZSB0aGlzIC0tIGJsYWgsIGJsYWgsIGJsYWgsIHdoYXRldmVyLiBTcG9vbnMgYW5kIGZvcmtzLCB3"
        + "aGF0ZXZlci4gVGhlIHBvaW50IHRvIGhpbSB3YXMgYWx3YXlzIHRoYXQgdGhlcmUgd2FzIG5vIHBvaW50LCBleGNlcHQgbWF5YmUgZm9y"
        + "IHRoZSBwb2ludCBvbiBoaXMgcG9pbnR5IGFzcy4gIkplc3VzLCIgSSBzYWlkLCAiR2l2ZSBpdCBhIHJlc3QsIHBhbC4gVGhlcmUncyBv"
        + "bmx5IHNvIG11Y2ggTW9yayBEaXNod2FzaGluZyBMaXF1aWQgdG8gZ28gYXJvdW5kLiBObywgbm8sIG5vLiIgKFllYWgsIGxpa2UgdGhh"
        + "dCBtYXR0ZXJlZCwgd2FzIGFsbCBhbnlvbmUgY291bGQgdGhpbmsgaW4gdGhvc2UgZGF5cyBvZiBjbGFtbXkgU3BhbSBhbmQgU3ByaXRl"
        + "LikgIk5vbmUgb2YgdGhhdCdzIGF2YWlsYWJsZSwgbm90IHNpbmNlIHRoZSB3cmVjay4gTWFuLCB5b3Uga25vdyB0aGF0IC0tIHNob3Vs"
        + "ZCBrbm93IHRoYXQgYmV0dGVyIHRoYW4gYW55b25lJ3MgY291c2luLiBEb2VzIHRoZSB3b3JkIHBsZXNwZXJvdXMgbWVhbiBhbnl0aGlu"
        + "ZyB0byB5b3U/IFBsZWFzZSBzYXkgbm8gLS0gUGxlYXNlIHNheSBuby4iIFJlYWwgY2FzdWFsIGFuZCBhbGwuIExpa2Ugbm90aGluZyBt"
        + "YXR0ZXJlZCBhbnltb3JlLiBUaGVuIGhlIHBpY2tzIHVwIGEgYnJpZ2h0LWdyZWVuIGNodW5rIG9mIGl0IGFuZCBzbmlmZnMgaXQsIGxp"
        + "Y2tzIGl0IHdpdGggaGlzIHRvbmd1ZS4gIkZpcnN0IG9mIGFsbCwgeW91IGNhbid0IHB1dCB0aGF0IHN0dWZmIGluIHlvdXIgbW91dGgs"
        + "IHlvdSBpZGlvdC4iIEZyYW5rIGhhZCBhIHdheSBvZiB0ZWxsaW5nIGl0IGxpa2UgaGUgc2F3IGl0LiAiTWFuLCBzb21l").getBytes();

    private static final NumberFormat NUMBER_FORMAT = NumberFormat.getNumberInstance();
    private static final NumberFormat PERCENT_FORMAT = NumberFormat.getPercentInstance();
    private static final String LOG_PREFIX = "";

    private static final long KB_BYTES = 1024;
    private static final long MB_BYTES = KB_BYTES * KB_BYTES;
    private static final long GB_BYTES = MB_BYTES * KB_BYTES;
    private static final long TB_BYTES = GB_BYTES * KB_BYTES;
    private static final long PB_BYTES = TB_BYTES * KB_BYTES;

    private static final int IDX_INLINING = 0;
    private static final int IDX_SPJ = 1;
    private static final int IDX_BS = 2;

    /**
     * How often, in milliseconds, an {@link Extrospector} will "look" to determine
     * its own state relative to nearby entities such as twinned archives with the
     * same TCP metapaths. This applies to at-rest state as well as when an
     * archive's Koroviev velocity is not near-zero with respect to the local frame.
     */
    public static final int DEFAULT_EXTROSPECTOR_LOOK_MILLIS_INTERVAL = 5;

    /**
     * The number of {@link CompressionPellet}s used by default when constructing an
     * archive's hard-shell contingency overlay. The minimum is 512.
     */
    public static final int DEFAULT_PELLET_CT = 2048;

    /**
     * The length of a "tick"; after every <code>TICK_LENGTH_BYTES</code> bytes are
     * written, <code>ProgressListener#progressTick()</code> is called. Note that
     * <code>progressTick()</code> is deprecated.
     */
    public static final int TICK_LENGTH_BYTES = 2000000;

    /**
     * Default {@link #compressionOptions}, used when these options are not set in
     * the constructor call. These default options enable bilateral
     * pseudo-awareness, inlined PUMP and UNPUMP directives, and subjective
     * packet-jettisoning (SPJ).
     * 
     * @see #compressionOptions
     */
    protected static Map<String, Boolean> defaultCompressionOptions;
    /**
     * The {@link ProgressListener} used if one is not supplied in a constructor
     * call. The default is a {@link BasicProgressListener} instance, which logs
     * essential information to <code>System.out</code>.
     * 
     * @see ProgressListener
     * @see BasicProgressListener
     */
    protected static ProgressListener defaultProgressListener = new BasicProgressListener();

    /**
     * A <code>Map</code> containing exactly three keys:
     * <code>inliningEnabled</code> (true to inline all PUMP/UNPUMP directives),
     * <code>spjEnabled</code> (true to enable subjective packet-jettisoning (SPJ)),
     * and <code>bpaEnabled</code> (true to enable bilateral pseudo-awareness). If
     * null or not specified, {@link #defaultCompressionOptions} are used.
     * 
     * @see #defaultCompressionOptions
     */
    protected Map<String, Boolean> compressionOptions;

    /**
     * Instance of a {@link ProgressListener} implementation. If null or
     * unspecified, {@link #defaultProgressListener} is used (an instance of
     * {@link BasicProgressListener}).
     * 
     * @see ProgressListener
     * @see BasicProgressListener
     * @see #defaultProgressListener
     */
    protected ProgressListener progressListener;

    /**
     * If set, the <code>Class</code>, a concrete {@link CompressionPellet} subclass,
     * of all pellet instences to be returned by calls to {@link PelletFactory}
     * getter methods. If null or not specified, the factory will return instances
     * of optimal <code>CompressionPellet</code> subclasses based on current
     * conditions. While most users will want to rely on the factory to provide
     * appropriate pellets, XQK provides several <code>CompressionPellet</code>
     * subclasses which may suit user needs as well: {@link FatwarePellet} (often
     * used when strict Fullerton compatibility is required),
     * {@link OraclePelletAdapter}, {@link SandersonPseudoPellet} (the "traditional"
     * R5/C pellet implementation), {@link TreePellet} (a lightweight alternative to
     * the Sanderson implementation often used for mobile implementations), and
     * {@link PseudoPellet} (an isotope-free tree-pellet with its own CCR).
     * 
     * @see CompressionPellet
     * @see FatwarePellet
     * @see OraclePelletAdapter
     * @see SandersonPseudoPellet
     * @see PseudoPellet
     * @see TreePellet
     */
    protected Class<CompressionPellet> pelletFactoryOverrideClass;

    /**
     * Instance of a {@link TypeProvider} implementation to be used in prestructing
     * the invulnerability matrix which enfolds the actual payload of any XQK
     * archive. If not specified, this is a {@link LivermoreTypeProvider}, which
     * will meet most needs. (RS-443 compliance issues are generally the reason
     * other providers are used.)
     * 
     * @see LivermoreTypeProvider
     */
    protected TypeProvider provider = new LivermoreTypeProvider();

    /**
     * Instance of an {@link Extrospector} implementation which will reside in the
     * archive's hard-shell contingency shield. (For version 5.x, this value is an
     * {@link ArchiveExtrospector} instance with a 5ms look/lookback, and cannot be
     * changed via this API.)
     */
    protected Extrospector extrospector = new ArchiveExtrospector(DEFAULT_EXTROSPECTOR_LOOK_MILLIS_INTERVAL);

    static {
        defaultCompressionOptions = new HashMap<String, Boolean>();
        defaultCompressionOptions.put("inliningEnabled", true);
        defaultCompressionOptions.put("spjEnabled", true);
        defaultCompressionOptions.put("bpaEnabled", true);
    }

    /**
     * Constructs a <code>CompressorDecompressor</code> with default
     * <code>compressionOptions</code>, a {@link BasicProgressListener}, and a null
     * {@link #pelletFactoryOverrideClass}.
     * 
     * @see BasicProgressListener
     */
    public CompressorDecompressor() {
        this(defaultCompressionOptions, defaultProgressListener, null);
    }

    /**
     * Constructs a <code>CompressorDecompressor</code> with the specified options
     * and listener, and a null {@link #pelletFactoryOverrideClass}.
     * 
     * @param compressionOptions If not null, a <code>Map</code> specifying which
     *                           facilities of XQK should be enabled; the
     *                           <code>Map</code> must contain three entries whose
     *                           keys are <code>bpaEnabled</code> (true to enable
     *                           bilateral pseudo-awareness),
     *                           <code>inliningEnabled</code> (true to inline PUMP
     *                           and UNPUMP directives), and <code>spjEnabled</code>
     *                           (true to enable subjective packet-jettisoning
     *                           (SPJ)). If null, {@link #defaultCompressionOptions}
     *                           are used (which enables all three of these, which
     *                           is standard usage).
     * @param progressListener   If not null, a {@link ProgressListener}
     *                           implementation instance. If null, a
     *                           {@link BasicProgressListener} is used.
     */
    public CompressorDecompressor(Map<String, Boolean> compressionOptions, ProgressListener progressListener) {
        this(compressionOptions, progressListener, null);
    }

    /**
     * 
     * Constructs a <code>CompressorDecompressor</code> with the specified options
     * and listener, and a pellet class to be returned always by
     * {@link PelletFactory} getters.
     * 
     * @param compressionOptions         If not null, a <code>Map</code> specifying
     *                                   which facilities of XQK should be enabled;
     *                                   the <code>Map</code> must contain three
     *                                   entries whose keys are
     *                                   <code>bpaEnabled</code> (true to enable
     *                                   bilateral pseudo-awareness),
     *                                   <code>inliningEnabled</code> (true to
     *                                   inline PUMP and UNPUMP directives), and
     *                                   <code>spjEnabled</code> (true to enable
     *                                   subjective packet-jettisoning (SPJ)). If
     *                                   null, {@link #defaultCompressionOptions}
     *                                   are used (which enables all three of these,
     *                                   which is standard usage).
     * @param progressListener           If not null, a {@link ProgressListener}
     *                                   implementation instance. If null, a
     *                                   {@link BasicProgressListener} is used.
     * @param pelletFactoryOverrideClass <code>Class</code> of the concrete
     *                                   {@link CompressionPellet} subclass, instances
     *                                   of which will always be returned by
     *                                   <code>PelletFactory</code>. This value may
     *                                   be null; if so, the factory will return the
     *                                   most appropriate type of pellet for given
     *                                   conditions.
     */
    public CompressorDecompressor(Map<String, Boolean> compressionOptions, ProgressListener progressListener,
        Class<CompressionPellet> pelletFactoryOverrideClass) {
        super();
        this.compressionOptions = (compressionOptions == null ? defaultCompressionOptions : compressionOptions);
        this.progressListener = (progressListener == null ? defaultProgressListener : progressListener);
        this.pelletFactoryOverrideClass = pelletFactoryOverrideClass;
    }

    private static int opsCount = 0;

    /**
     * Compress or decompress a <code>File</code> to another <code>File</code>.
     * Because of a quirk of XQK's implementation, source and destination files
     * generally must be in the same directory. Both the XQK desktop application and
     * the command-line parser enforce this (by not allowing users to choose a
     * destination file (the exception is Fairchild client-terminals, which always
     * write all output of any kind to the <code>_OUT</code> subdirectory of the
     * user's home directory - the XQK GUI accounts for this). However, users of
     * this API may wish to write output to a file in a different directory from the
     * one where the source file is found, which is why this method allows for a
     * destination file to be specified.
     * 
     * @param compress True to compress, false to decompress
     * @param inFile   The file to be compressed or decompressed (if the latter, the
     *                 filename should end with ".xqk" by convention).
     * @param outFile  The destination file to which the source file should be
     *                 compressed or decompressed (if the former, the filename is
     *                 expected, by convention, to end with ".xqk").
     * @throws IOException If either of the files don't exist, aren't readable,
     *                     aren't writeable, etc.
     */
    @SuppressWarnings("deprecation")
    public void execute(TrimodeBoolean compress, File inFile, File outFile) throws IOException {

        progressListener.notifyStartOperation(compress.booleanValue());

        PumperDumper pumperDumper = PumperDumperFactory.getPumperDumper(opsCount++, progressListener);

        this.extrospector.setCompressionOptions(compressionOptions);
        this.extrospector.setProgressListener(this.progressListener);

        InvulnerabilityMatrix matrix = new InvulnerabilityMatrix(provider, 1024, new TrimodeBoolean(true),
            pelletFactoryOverrideClass);
        progressListener.outPrintln("Hard-shell matrix created using provider \"" + provider.getClass() + "\"");

        progressListener.outPrintln("");
        progressListener.outPrintln("Initializing...");
        progressListener.outPrintln("Initialized; cwd: " + System.getProperty("user.dir"));
        progressListener.outPrintln((compress.booleanValue() ? "Compressing " : "Decompressing ") + inFile.getAbsolutePath() + "...");

        BufferedInputStream in = null;
        BufferedOutputStream out = null;

        // Don't need to explicitly catch the FNFs that could be thrown by these
        // constructors
        // because we checked already for file existence:
        in = new BufferedInputStream(new FileInputStream(inFile));
        out = new BufferedOutputStream(new FileOutputStream(outFile));

        byte[] hardShellStart = HardshellOverlayInterjector.generateEnfolder(DEFAULT_PELLET_CT, OBA_BYTES, matrix, progressListener,
            extrospector, pelletFactoryOverrideClass, compress);
        int hardShellLength = hardShellStart.length;

        long inFileSize = inFile.length();
        inFileSize += (compress.booleanValue() ? hardShellLength : (hardShellLength * -1));
        inFileSize = (inFileSize <= 0 ? 1 : inFileSize); // if no filesize is reported, we need a fake one
        progressListener.notifyExpectedTotalBytes(inFileSize);

        boolean inliningEnabled = true;
        boolean spjEnabled = true;
        boolean bpaEnabled = true;
        boolean flagsReadError = false;
        String[] flagsArr = "00000000".split("");

        try {
            int byteCounter = 0;
            long cumulativeByteCounter = 0;

            if (compress.booleanValue()) {
                inliningEnabled = compressionOptions.get("inliningEnabled");
                spjEnabled = compressionOptions.get("spjEnabled");
                bpaEnabled = compressionOptions.get("bpaEnabled");

                extrospector.setDoInlinedPumpDirectives(new TrimodeBoolean(inliningEnabled));
                extrospector.setEnableSPJ(new TrimodeBoolean(spjEnabled));
                extrospector.setEnableBilateralPseudoAwareness(new TrimodeBoolean(bpaEnabled));
                if (bpaEnabled) {
                    extrospector.setBilateralPseudoAwarenessAgressionFactor(BilateralPseudoAwarenessAggressionFactor.REALLY_REALLY_PUMPED);
                }

                hardShellStart = pumperDumper.pump(hardShellStart);

                String hardShell = new String(hardShellStart);
                hardShell = hardShell.substring(0, hardShell.indexOf("00000000"))
                    + (inliningEnabled ? "1" : "0")
                    + (spjEnabled ? "1" : "0")
                    + (bpaEnabled ? "1" : "0")
                    + "00000"
                    + hardShell.substring(hardShell.indexOf("00000000") + 8);
                out.write(hardShell.getBytes());
            } else {
                String flags;
                try {
                    byte[] bytes = new byte[28];
                    bytes = pumperDumper.unpump(bytes);

                    in.mark(Integer.MAX_VALUE);
                    int bytesRead = in.read(bytes);
                    if (bytesRead != 28) {
                        throw new RuntimeException("less than 28 bytes in hard-shell.");
                    }

                    flags = new String(bytes, "UTF-8");
                    flags = flags.substring(flags.indexOf("/") + 1, flags.indexOf("/") + 9);
                    if (flags.length() != 8) {
                        throw new RuntimeException("invalid flags.");
                    }
                } catch (Exception e) {
                    flags = "--------";
                    flagsReadError = true;
                } finally {
                    in.reset();
                }
                flagsArr = flags.split("");

                long targetSkippedCount = hardShellStart.length;
                long skippedCount = in.skip(targetSkippedCount);
                int tries = 0;
                try {
                    while (targetSkippedCount > skippedCount) {
                        if (tries > targetSkippedCount) {
                            throw new RuntimeException("Bad input. Very bad.");
                        }
                        long skipped = in.skip(targetSkippedCount - skippedCount);
                        skippedCount += skipped;
                        tries++;
                    }
                } catch (Exception e) {
                    throw new RuntimeException("Missing or corrupted LOCKB substrate; unable to decompress compressed archive contents.");
                }
            }
            int b = in.read();
            double start = System.currentTimeMillis();
            while (b != -1) {
                out.write(b);
                b = in.read();
                byteCounter++;
                cumulativeByteCounter++;
                progressListener.notifyBytesWritten(cumulativeByteCounter);
                if (byteCounter > TICK_LENGTH_BYTES) {
                    progressListener.progressTick();
                    byteCounter = 0;
                }
            }
            progressListener.outPrintln("");
            double srcFileLength = cumulativeByteCounter;
            double destFileLength = cumulativeByteCounter;
            if (compress.booleanValue()) {
                destFileLength += hardShellLength;
            } else {
                srcFileLength += hardShellLength;
            }

            double compressionRatio = (compress.booleanValue() ? destFileLength : srcFileLength)
                / (!compress.booleanValue() ? destFileLength : srcFileLength);

            double durationSeconds = ((System.currentTimeMillis() - start) / 1000);
            if (durationSeconds == 0.0) {
                durationSeconds += 0.001;
            }
            double bytesPerSecond = (cumulativeByteCounter / durationSeconds);
            progressListener.outPrintln("");
            progressListener.outPrintln((compress.booleanValue()  ? "Compressed " : "Decompressed ") + formatBytes(cumulativeByteCounter, NUMBER_FORMAT)
                + " in " + NUMBER_FORMAT.format(durationSeconds) + " seconds (" + formatBytes(bytesPerSecond, NUMBER_FORMAT)
                + " per second)");
            progressListener.outPrintln("");
            progressListener.outPrintln(
                LOG_PREFIX + "Compressed file size is " + PERCENT_FORMAT.format(compressionRatio) + " of uncompressed file size, not "
                    + "including effects of c27y-related operations "
                    + "which may increase or decrease file size depending on archive contents, transport route, "
                    + "recipient's Hansen fingerprint, etc.).");

            if (compress.booleanValue()) {
                progressListener.outPrintln("");
                progressListener.outPrintln("Note: a hard-shell PI contingency overlay enfolds this archive, adding "
                    + hardShellLength + " bytes to its "
                    + "size. The overlay consists of a protective Livermore-style invulnerability matrix; the on-"
                    + "board algorithm; and " + DEFAULT_PELLET_CT + " bytes of R5/C compression pellets deployed into a Bourne-Harman "
                    + "pseudoscaffold.");
                if (!inliningEnabled) {
                    progressListener.outPrintln("");
                    progressListener.outPrintln("WARN: PUMP/UNPUMP directives have not been inlined; pumper-dumper reciprocity thus cannot "
                        + "be guaranteed, and will almost certainly not occur during a Closson-Thorpe sub-event. Consider "
                        + "setting \"Always inline PUMP/UNPUMP directives\" (or, from the command line, set the \"inline-pdd\" flag), especially "
                        + "if CTSE's are expected.");
                } else {
                    progressListener.outPrintln("");
                    progressListener
                        .outPrintln("All PUMP/UNPUMP directives have been inlined; recipient clients should assume pumper-dumper "
                            + "reciprocity in the transport layer (including Willis derivatives).");
                }

                if (!spjEnabled) {
                    /*
                     * progressListener.
                     * outPrintln("WARN: PUMP/UNPUMP directives have not been inlined!  Pumper-dumper reciprocity thus cannot "
                     * +
                     * "be guaranteed, and will almost certainly not occur during a Closson-Thorpe sub-event. Consider "
                     * +
                     * "setting \"Always inline PUMP/UNPUMP directives\", especially if CTSE's are expected."
                     * );
                     */
                } else {
                    progressListener.outPrintln("");
                    progressListener
                        .outPrintln("SPJ is enabled; the OBA may subjectively discard packets en route based on Hansen analysis.");
                }
                if (!bpaEnabled) {
                    progressListener
                        .outPrintln("WARN: PUMP/UNPUMP directives have not been inlined!  Pumper-dumper reciprocity thus cannot "
                            + "be guaranteed, and will almost certainly not occur during a Closson-Thorpe sub-event. Consider "
                            + "setting \"Always inline PUMP/UNPUMP directives\", especially if CTSE's are expected.");
                } else {
                    progressListener.outPrintln("");
                    progressListener
                        .outPrintln("Bilateral Pseudoawareness capability has been embedded in this archive's fatware substrate; "
                            + "packet-racing will occur during transport if metapath-twinned with an identical file.");
                }
            } else {
                // EXTRACTING:
                if (!flagsReadError) {
                    inliningEnabled = flagsArr[IDX_INLINING].equals("1");
                    spjEnabled = flagsArr[IDX_SPJ].equals("1");
                    bpaEnabled = flagsArr[IDX_BS].equals("1");
                    if (!inliningEnabled) {
                        progressListener.outPrintln("");
                        progressListener
                            .outPrintln("WARN: PUMP/UNPUMP directives appear not to have been inlined; if a CTSE occurred during "
                                + "transport, the archive is likely corrupted.");
                    }

                    if (spjEnabled) {
                        progressListener.outPrintln("");
                        progressListener.outPrintln("SPJ was enabled for this archive; 0 bytes were subjectively determined not to be of "
                            + "interest and were thus jettisoned, based on the recipient's Hansen manifest.");
                    }
                    if (bpaEnabled) {
                        progressListener.outPrintln("");
                        progressListener
                            .outPrintln("Bilateral Pseudoawareness was enabled in this archive's fatware, but no metapath-twinned archive "
                                + "was present, so no PR occurred.");
                    } else {
                        progressListener.outPrintln("");
                        progressListener
                            .outPrintln("Bilateral Pseudoawareness was not enabled in this archive's fatware, so no PR occurred.");
                    }
                } else {
                    progressListener.outPrintln("");
                    progressListener
                        .outPrintln("WARN: Could not read CTD flags (SPJ, BS, directive-inlining, etc.); archive may be corrupted.");
                }
            }

            progressListener.outPrintln("");
            progressListener
                .outPrintln(LOG_PREFIX + (compress.booleanValue() ? "Compress" : "Decompress") + " success: output file is " + outFile.getAbsolutePath());

        } finally {
            if (in != null) {
                in.close();
            }
            if (out != null) {
                out.close();
            }
        }
        progressListener.notifyOperationComplete(outFile);
    }

    private static String formatBytes(double totalBytes, NumberFormat numberFormat) {
        if (totalBytes < KB_BYTES) {
            return numberFormat.format(totalBytes) + " bytes";
        }
        if (totalBytes < MB_BYTES) {
            return numberFormat.format(totalBytes / KB_BYTES) + " KB";
        }
        if (totalBytes < GB_BYTES) {
            return numberFormat.format(totalBytes / MB_BYTES) + " MB";
        }
        if (totalBytes < TB_BYTES) {
            return numberFormat.format(totalBytes / GB_BYTES) + " GB";
        }
        if (totalBytes < PB_BYTES) {
            return numberFormat.format(totalBytes / TB_BYTES) + " TB";
        }
        return numberFormat.format(totalBytes / PB_BYTES) + " PB";
    }

}
