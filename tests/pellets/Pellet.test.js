package com.xqk.pellets;

import java.io.Serializable;

import com.xqk.tmb.TrimodeBoolean;

/**
 * A pellet which may be provoked and thus reflected into a container or similar object.
 */
public interface Pellet extends Serializable, Comparable<Pellet> {

    /**
     * Execute a PROVOKE operation.
     */
    public abstract void provoke();
    /**
     * Whether or not to handle legacy pseudo-pellets (Andersen pods, 4R/C pseudos, etc.)
     * @return the `handleLegacyPseudopellets`
     */
    public TrimodeBoolean isHandleLegacyPseudopellets();
    
    public void setHandleLegacyPseudopellets(TrimodeBoolean handleLegacyPseudopellets);
    
    /**
     * Get the number of initiators allowed (effectively the size of the initiator pool)
     * @return the `maxInitiators`
     */
    public int getMaxInitiators();
    
    /**
     * Set the number of initiators allowed (effectively the size of the initiator pool)
     *
     * @param maxInitiators The the number of initiators allowed (effectively the size of the initiator pool)
     */
    public void setMaxInitiators(int maxInitiators);

    


}
