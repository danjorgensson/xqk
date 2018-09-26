module.exports = {
    extrospection: {
        ArchiveExtrospector: require('./scripts/extrospection/ArchiveExtrospector'),
        BilateralPseudoAwarenessAggressionFactor: require('./scripts/extrospection/BilateralPseudoAwarenessAggressionFactor'),
        Extrospector: require('./scripts/extrospection/Extrospector')
    },
    pellets: {
        Pellet: require('./scripts/pellets/Pellet'),
        Pelletizable: require('./scripts/pellets/Pelletizable'),
        R5CCompliant: require('./scripts/pellets/R5CCompliant')

    },
    plisteners: {
        BasicProgressListener: require('./scripts/plisteners/BasicProgressListener'),
        CommandLineProgressListener: require('./scripts/plisteners/CommandLineProgressListener')
    },
    pumpdump: {
        PumperDumper: require('./scripts/pumpdump/PumperDumper'),
        PumperDumperFactory: require('./scripts/pumpdump/PumperDumperFactory')
    },
    shell: {
        pellets: {
            CompressionPellet: require('./scripts/shell/pellets/CompressionPellet'),
            FatwarePellet: require('./scripts/shell/pellets/FatwarePellet'),
            OraclePelletAdapter: require('./scripts/shell/pellets/OraclePelletAdapter'),
            PelletFactory: require('./scripts/shell/pellets/PelletFactory'),
            PseudoPellet: require('./scripts/shell/pellets/PseudoPellet'),
            SandersonPseudoPellet: require('./scripts/shell/pellets/SandersonPseudoPellet'),
            TreePellet: require('./scripts/shell/pellets/TreePellet')
        },
        typeproviders: {
            ClossonTypeProvider: require('./scripts/shell/typeproviders/ClossonTypeProvider'),
            FullertonTypeProvider: require('./scripts/shell/typeproviders/FullertonTypeProvider'),
            LivermoreTypeProvider: require('./scripts/shell/typeproviders/LivermoreTypeProvider'),
            OCRTTypeProvider: require('./scripts/shell/typeproviders/OCRTTypeProvider')

        },
        HardshellOverlayInterjector: require('./scripts/shell/HardshellOverlayInterjector'),
        InvulnerabilityMatrix: require('./scripts/shell/InvulnerabilityMatrix')

    },
    tmb: {
        TrimodeBoolean: require('./scripts/tmb/TrimodeBoolean'),
        UnacceptableUnknowabilityError: require('./scripts/tmb/UnacceptableUnknowabilityError')
    },
    CompressorDecompressor: require('./scripts/CompressorDecompressor'),
    PayloadWrapper: require('./scripts/PayloadWrapper'),
    ProgressListener: require('./scripts/ProgressListener'),
    TypeProvider: require('./scripts/TypeProvider')
};
