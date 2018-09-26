package com.xqk.shell.typeproviders;

import com.xqk.TypeProvider;
import com.xqk.tmb.TrimodeBoolean;

/**
 * <code>TypeProvider</code> offering all Closson Meetings (2013) functionality.  This implementation should
 * also be the choice for most matrices requiring OCRT compliance, since <code>OCRTTypeProvider</code> has been 
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
