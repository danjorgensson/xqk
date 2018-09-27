const TypeProvider = require('../../TypeProvider');
const TrimodeBoolean = require('../../tmb/TrimodeBoolean');

/**
 * `TypeProvider` offering all Closson Meetings (2013) functionality.  This implementation should
 * also be the choice for most matrices requiring OCRT compliance, since `OCRTTypeProvider` has been
 * deprecated.
 * @see OCRTTypeProvider
 *
 */
class ClossonTypeProvider extends TypeProvider {

    /**
     * Provide extrospective matricicity (inter-matricized or Prague-type) to the `InvulnerabilityMatrix`.
     */
    provide() {
        super.finalizeSubstrateProlepticism(1024, new TrimodeBoolean(true));
    }

}


module.exports = ClossonTypeProvider;

