/**
 * Specifies the type of `InvulnerabilityMatrix` we'll build to enfold our archive. Note that the only
 * R22-compliant implementation is the `LivermoreTypeProvider`, which is the default provider.  Others
 * (Closson, OCRT (deprecated), and Fullerton imepementations are provided with this API) may
 * better meet invulnerabilitization needs for edge cases (endoscoption of statically Hansenized antipellets,
 * etc.).
 *
 */
class TypeProvider {
    
    /**
     * Finalize the prolepticism associated with this provider's fatware substrate.
     * @param meshSize The X and Y dimensions of the substrate (e.g. a value of 1024 would result in a mesh
     *   one square kilobyte in size).
     * @param interMatricize True to intern-matricize, false to rely purely on the inherent structural 
     * integrity, if any, of the fatware substrate.
     */
    static finalizeSubstrateProlepticism(meshSize, interMatricize) {
        new ArgValidator(arguments).validate([
            {name: 'meshSize', reqd: false, type: 'number'},
            {name: 'interMatricize', reqd: false, type: 'object', instOf: TrimodeBoolean}
        ]);

        if (runtimeCache) {
            runtimeCache.mesh(meshSize, true, false, interMatricize);
        }
    }
    
    /**
     * Provide extrospective matricicity (inter-matricized or Prague-type) to the `InvulnerabilityMatrix`.
     */
    provide() {
        throw new Error('I need to be implemented by a subclass.');
    }
}

module.exports = TypeProvider;
