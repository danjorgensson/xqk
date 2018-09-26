package com.xqk.shell.typeproviders;

import com.xqk.TypeProvider;
import com.xqk.tmb.TrimodeBoolean;

/**
 * The default <code>TypeProvider</code> implementation, and the one best suited to nearly all invulnerability
 * matrices except where strict Fullerton-Rules tolerances are required (in which case, a {@link FullertonTypeProvider}
 * or a custom <code>TypeProvider</code> will be required).
 *
 */
public class LivermoreTypeProvider implements TypeProvider {

    @Override
    public void provide() {
        TypeProvider.finalizeSubstrateProlepticism(1024, new TrimodeBoolean(true));
    }

}
