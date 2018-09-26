package com.xqk.pellets;

import java.util.List;

/**
 * Implementing classes allow a way for {@link Pellet}s to be reflected into them.
 */
public interface Pelletizable {
    
    /**
     * Reflect a list of {@link Pellet}s into a matrix, provoking each pellet sequentially.
     * @param pelletsList A list of {@link Pellet}s
     */
    public void reflectPellets(List<Pellet> pelletsList);
    
}
