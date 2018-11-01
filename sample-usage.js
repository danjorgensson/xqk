const CompressorDecompressor = require('./scripts/CompressorDecompressor');

function compressFile(inFileName, outFileName) {
    new CompressorDecompressor().execute(true, inFilename, outFilename);
}

function extractFile(inFileName, outFileName) {
    new CompressorDecompressor().execute(false, inFilename, outFilename);
}

compressFile('/home/steve/Desktop/Screenshot from 2018-03-13 17-27-08.png',
    '/home/steve/Desktop/Screenshot from 2018-03-13 17-27-08.png.xqk');
