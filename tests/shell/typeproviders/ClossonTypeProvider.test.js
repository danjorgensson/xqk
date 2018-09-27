package com.xqk.shell.typeproviders;

import com.xqk.TypeProvider;
import com.xqk.tmb.TrimodeBoolean;

/**
 * `TypeProvider` offering all Closson Meetings (2013) functionality.  This implementation should
 * also be the choice for most matrices requiring OCRT compliance, since `OCRTTypeProvider` has been
 * deprecated.
 * @see OCRTTypeProvider
 *
 */
public class ClossonTypeProvider implements TypeProvider {

    @Override
    public void provide() {
        TypeProvider.finalizeSubstrateProlepticism(1024, new TrimodeBoolean(true));
    }

}
