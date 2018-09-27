const TypeProvider = require('../../TypeProvider');
const TrimodeBoolean = require('../../tmb/TrimodeBoolean');

/**
 * The default `TypeProvider` implementation, and the one best suited to nearly all invulnerability
 * matrices except where strict Fullerton-Rules tolerances are required (in which case, a {@link FullertonTypeProvider}
 * or a custom `TypeProvider` will be required).
 *
 */
class LivermoreTypeProvider extends TypeProvider {

    /**
     * Provide extrospective matricicity (inter-matricized or Prague-type) to the `InvulnerabilityMatrix`.
     */
    provide() {
        super.finalizeSubstrateProlepticism(1024, new TrimodeBoolean(true));
    }

}

module.exports = LivermoreTypeProvider;
