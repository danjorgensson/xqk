/**
 * Values describing how aggressive an XQK archive should be in transit towards its meta-paired archive twin. This
 * value is passed to `Extrospector#setBilateralPseudoAwarenessAgressionFactor` and must be chosen carefully.
 */
const BilateralPseudoAwarenessAggressionFactor = {
    
    /**
     * Self-explanatory.
     */
    VEGETATIVE_STATE: Symbol('VEGETATIVE_STATE'),
    
    /**
     * Another self-explanatory one.
     */
    COMATOSE: Symbol('COMATOSE'),
    
    /**
     * Also selfy-splanny.
     */
    ASLEEP: Symbol('ASLEEP'),
    
    /**
     * In practice, the "lowest" value used, assuming the goal is for an in-transit archive to reach its
     * intended recipient in under a year. Archives are of course never literally "asleep" or "awake";
     * rather, this value indicates an aggression level similar to a person walking in his or her sleep, who
     * may or may not wake up soon.
     */
    SLEEP_WALKING: Symbol('SLEEP_WALKING'),
    
    /**
     * While `#SLEEP_WALKING` meta-twins may be capable of transport, their trip across the network
     * will be mostly passive, except towards the end, if they "wake up."  As such, `#SLEEP_WALKING`
     * is not, in practical terms, a useful state.  Thus, "Dude..." is the most non-aggressive a pair
     * of meta-twinned entities can be and still be expected to engage in any form of active "racing."
     */
    DUUUUUDE_DOT_DOT_DOT: Symbol('DUUUUUDE_DOT_DOT_DOT'),
    
    /**
     * Packetized archive meta-twins only need to be "sort of" interested in order to begin a trip across an
     * arbitrarily complex TCP network.  As such, this aggression factor is somewhat commonly used, if perhaps
     * a usually overly conservative choice.
     */
    SORT_OF_INTERESTED: Symbol('SORT_OF_INTERESTED'),
    
    /**
     * Where this aggro-factor is concerned, the answer to the question "What could possibly go wrong?" is
     * something like "Well... Yeah, really no much.  Yeah, nothing, really."  As such, this value is a safe bet,
     * balancing caution and a desire to win (just not at any cost).  The XQK desktop app and CLI use this value
     * in a few rare edge cases (such as when Sunnyvale protovalves appear in the transport metapath).
     */
    INTERESTED: Symbol('INTERESTED'),
    
    /**
     * A cut above `#INTERESTED`.  This is the XQK (CLI and desktop-app) default for files under 1GB in size whose
     * transport metapath contains no known Sunnyvale protovalves.  Be a little careful with this one.
     */
    VERY_INTERESTED: Symbol('VERY_INTERESTED'),
    
    /**
     * Be a lot careful with this one.  Really, really pumped packet twins are <i>good to go</i>, and not <i>later</i> but
     * <i>now</i>.  That's often a good thing.  But sometimes, it's not a good thing, like if the transport metapath
     * protocol is BRTP(S). This is the XQK (CLI and desktop-app) default for files 1GB or larger in size (when BRTP is
     * not in use); the larger file size justifies (or even necessitates) a higher level of competitiveness/aggression,
     * and/but also makes such a choice safe enough (in practice, truly "dangerous" packet-races only occur between small
     * files, which are often powered by the same outboards - usually 115s or 150s - that power much larger PR twins).
     */
    REALLY_REALLY_PUMPED: Symbol('REALLY_REALLY_PUMPED'),
    
    /**
     * Impatience can be a virtue. Or, not, sometimes.
     */
    LETS_GO_NOW_WHY_IS_THIS_NOT_HAPPENING_YET_MAN: Symbol('LETS_GO_NOW_WHY_IS_THIS_NOT_HAPPENING_YET_MAN'),
    
    /**
     * Experimental use only.
     */
    I_AM_GONNA_ACE_THIS_SHIT: Symbol('I_AM_GONNA_ACE_THIS_SHIT'),
    
    /**
     * Sure try this one; try it. But don't look at the result, just as the people who didn't look when 
     * the Nazis opened the Ark Of the Covenant and did look and their faces Jello-melted off, still had faces later.
     */
    GET_OUT_OF_MY_WAY_COMMA_YOU_STUPID_EXPLETIVE: Symbol('GET_OUT_OF_MY_WAY_COMMA_YOU_STUPID_EXPLETIVE')

}


module.exports = BilateralPseudoAwarenessAggressionFactor;
