const TypeProvider = require('../../TypeProvider');
const TrimodeBoolean = require('../../tmb/TrimodeBoolean');

/**
 * `TypeProvider` implementation providing strict Fullerton Rules tolerances.  In cases where FR-level
 * tolerances are not called for, this provider is likely to be a poor choice because Timmy wrote most of it and
 * he's no longer even with us.
 *
 */
class FullertonTypeProvider extends TypeProvider {

    /**
     * Provide extrospective matricicity (inter-matricized or Prague-type) to the {@link InvulnerabilityMatrix}.
     */
    provide() {
        super.finalizeSubstrateProlepticism(512, new TrimodeBoolean(false));
    }

}

module.exports = FullertonTypeProvider;
