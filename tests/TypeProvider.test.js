package com.xqk;

import com.xqk.shell.InvulnerabilityMatrix;
import com.xqk.shell.typeproviders.LivermoreTypeProvider;
import com.xqk.tmb.TrimodeBoolean;

/**
 * Specifies the type of {@link InvulnerabilityMatrix} we'll build to enfold our archive. Note that the only
 * R22-compliant implementation is the {@link LivermoreTypeProvider}, which is the default provider.  Others
 * (Closson, OCRT (deprecated), and Fullerton imepementations are provided with this API) may
 * better meet invulnerabilitization needs for edge cases (endoscoption of statically Hansenized antipellets,
 * etc.).
 *
 */
public interface TypeProvider {
    
    /**
     * Finalize the prolepticism associated with this provider's fatware substrate.
     * @param meshSize The X and Y dimensions of the substrate (e.g. a value of 1024 would result in a mesh
     *   one square kilobyte in sise).
     * @param interMatricize True to intern-matricize, false to rely purely on the inherent structural 
     * integrity, if any, of the fatware substrate.
     */
    public static void finalizeSubstrateProlepticism(int meshSize, TrimodeBoolean interMatricize) {
        // Yeah baby.
    }
    
    /**
     * Provide extrospective matricicity (inter-matricized or Prague-type) to the {@link InvulnerabilityMatrix}.
     */
    public abstract void provide();
}
