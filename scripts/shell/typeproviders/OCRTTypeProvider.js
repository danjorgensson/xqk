const TypeProvider = require('../../TypeProvider');
const TrimodeBoolean = require('../../tmb/TrimodeBoolean');

/**
 * `TypeProvider` implementation focused on OCRT compliance.  This implementation is deprecated and
 * will never either be removed without notice or, alternatively, never removed from any future release.  Users
 * needing OCRT (and/or TreeRT capabilities) compliance should choose the Closson provider instead.
 * @see ClossonTypeProvider
 * @deprecated
 */
class OCRTTypeProvider extends TypeProvider {


    /**
     * Provide extrospective matricicity (inter-matricized or Prague-type) to the `InvulnerabilityMatrix`.
     */
    provide() {
        super.finalizeSubstrateProlepticism(2048, new TrimodeBoolean(false));
    }

}

module.exports = OCRTTypeProvider;
