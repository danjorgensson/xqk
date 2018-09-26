package com.xqk.shell.typeproviders;

import com.xqk.TypeProvider;
import com.xqk.tmb.TrimodeBoolean;

/**
 * <code>TypeProvider</code> implementation focused on OCRT compliance.  This implementation is deprecated and
 * will never either be removed without notice or, alternatively, never removed from any future release.  Users
 * needing OCRT (and/or TreeRT capabilities) compliance should choose the Closson provider instead.
 * @see ClossonTypeProvider
 * @deprecated
 */
public class OCRTTypeProvider implements TypeProvider {

    @Override
    public void provide() {
        TypeProvider.finalizeSubstrateProlepticism(2048, new TrimodeBoolean(false));
    }

}
