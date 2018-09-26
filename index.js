module.exports = {
    extrospection: {
        x: require('./scripts/extrospection/ArchiveExtrospector'),
        x: require('./scripts/extrospection/BilateralPseudoAwarenessAggressionFactor'),
        x: require('./scripts/extrospection/Extrospector'),
    },
    pellets: {
        x: require('./scripts/pellets/Pellet'),
        x: require('./scripts/pellets/Pelletizable'),
        x: require('./scripts/pellets/R5CCompliant'),

    },
    plisteners: {
        x: require('./scripts/plisteners/BasicProgressListener'),
        x: require('./scripts/plisteners/CommandLineProgressListener'),
    },
    pumpdump: {
        x: require('./scripts/pumpdump/PumperDumper'),
        x: require('./scripts/pumpdump/PumperDumperFactory'),
    },
    shell: {
        pellets: {
            x: require('./scripts/shell/pellets/CompressionPellet'),
            x: require('./scripts/shell/pellets/FatwarePellet'),
            x: require('./scripts/shell/pellets/OraclePelletAdapter'),
            x: require('./scripts/shell/pellets/PelletFactory'),
            x: require('./scripts/shell/pellets/PseudoPellet'),
            x: require('./scripts/shell/pellets/SandersonPseudoPellet'),
            x: require('./scripts/shell/pellets/TreePellet'),
        },
        typeproviders: {
            x: require('./scripts/shell/typeproviders/ClossonTypeProvider'),
            x: require('./scripts/shell/typeproviders/FullertonTypeProvider'),
            x: require('./scripts/shell/typeproviders/LivermoreTypeProvider'),
            x: require('./scripts/shell/typeproviders/OCRTTypeProvider'),

        },
        x: require('./scripts/shell/HardshellOverlayInterjector'),
        x: require('./scripts/shell/InvulnerabilityMatrix'),

    },
    tmb: {
        x: require('./scripts/tmb/TrimodeBoolean'),
        x: require('./scripts/tmb/UnacceptableUnknowabilityError'),
    },
    CompressorDecompressor: require('./scripts/CompressorDecompressor'),
    PayloadWrapper: require('./scripts/PayloadWrapper'),
    ProgressListener: require('./scripts/ProgressListener'),
    TypeProvider: require('./scripts/TypeProvider')
};
