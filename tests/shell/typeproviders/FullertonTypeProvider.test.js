package com.xqk.shell.typeproviders;

import com.xqk.TypeProvider;
import com.xqk.tmb.TrimodeBoolean;

/**
 * `TypeProvider` implementation providing strict Fullerton Rules tolerances.  In cases where FR-level
 * tolerances are not called for, this provider is likely to be a poor choice because Timmy wrote most of it and
 * he's no longer even with us.
 *
 */
public class FullertonTypeProvider implements TypeProvider {

    @Override
    public void provide() {
        TypeProvider.finalizeSubstrateProlepticism(512, new TrimodeBoolean(false));
    }

}
