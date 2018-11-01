const CompressorDecompressor = require('../index').CompressorDecompressor;
const should = require('chai').should();

describe('CompressorDecompressor constructor should function properly', function () {
    it('should throw when passed no args', function () {
        (function() {new CompressorDecompressor()}).should.throw();
    });
    /*it('should throw when passed a non-array/non-arguments-object value', function () {
        (function() {new CompressorDecompressor()}).should.throw();
    });*/
});

