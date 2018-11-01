const ArgValidator = require('../../index').argvalidation.ArgValidator;
const should = require('chai').should();

/**
 * Used below to test the `testFn` functionality.
 */
function testFunction1(dateArgValue) {
    let errorMsg = null;
    if (dateArgValue.getTime() !== 0) {
        errorMsg = `The Date must have a getTime() value of zero.`;
    }
    return errorMsg;
}

describe('ArgValidator should function properly', function () {
    it('Missing required arg should throw', function () {
        function aFunction(reqdArg) {
            new ArgValidator(arguments).validate([{name: 'reqdArg', type: 'any', reqd: true}]);
        }
        (function() {aFunction();}).should.throw();
    });
    it('Absent optional number arg should not throw', function () {
        function aFunction(optionalArg) {
            new ArgValidator(arguments).validate([{name: 'optionalArg', type: 'number', reqd: false}]);
        }
        (function() {aFunction();}).should.not.throw();
    });
    it('Number optional but string passed should throw', function () {
        function aFunction(optionalArg) {
            new ArgValidator(arguments).validate([{name: 'optionalArg', type: 'number', reqd: false}]);
        }
        (function() {aFunction('');}).should.throw();
    });
    it('Number required but string passed should throw', function () {
        function aFunction(numberArg) {
            new ArgValidator(arguments).validate([{name: 'numberArg', type: 'number', reqd: true}]);
        }
        (function() {aFunction('hi!');}).should.throw();
    });
    it('String or null required but number passed should throw', function () {
        function aFunction(stringOrNullArg) {
            new ArgValidator(arguments).validate([{name: 'stringOrNullArg', type: 'string, null', reqd: true}]);
        }
        (function() {aFunction(1);}).should.throw();
    });
    it('String or null required but undefined passed should throw', function () {
        function aFunction(stringOrNullArg) {
            new ArgValidator(arguments).validate([{name: 'stringOrNullArg', type: 'string, null', reqd: true}]);
        }
        (function() {aFunction(undefined);}).should.throw();
    });
    it('String or null required and string passed should not throw', function () {
        function aFunction(stringOrNullArg) {
            new ArgValidator(arguments).validate([{name: 'stringOrNullArg', type: 'string, null', reqd: true}]);
        }
        (function() {aFunction('');}).should.not.throw();
    });
    it('String or null required and null passed should not throw', function () {
        function aFunction(stringOrNullArg) {
            new ArgValidator(arguments).validate([{name: 'stringOrNullArg', type: 'string, null', reqd: true}]);
        }
        (function() {aFunction(null);}).should.not.throw();
    });
    it('Object required and Date object passed should not throw', function () {
        function aFunction(objectArg) {
            new ArgValidator(arguments).validate([{name: 'objectArg', type: 'object', reqd: true}]);
        }
        (function() {aFunction(new Date());}).should.not.throw();
    });
    it('Object optional and Date object passed should not throw', function () {
        function aFunction(objectArg) {
            new ArgValidator(arguments).validate([{name: 'objectArg', type: 'object', reqd: false}]);
        }
        (function() {aFunction(new Date());}).should.not.throw();
    });
    it('Date object optional and Date object passed should not throw', function () {
        function aFunction(dateArg) {
            new ArgValidator(arguments).validate([{name: 'dateArg', type: 'object', reqd: false, instOf: Date}]);
        }
        (function() {aFunction(new Date());}).should.not.throw();
    });
    it('Date object optional but Map object passed should throw', function () {
        function aFunction(dateArg) {
            new ArgValidator(arguments).validate([{name: 'dateArg', type: 'object', reqd: false, instOf: Date}]);
        }
        (function() {aFunction(new Map());}).should.throw();
    });
    it('Date object optional but generic object passed should throw', function () {
        function aFunction(dateArg) {
            new ArgValidator(arguments).validate([{name: 'dateArg', type: 'object', reqd: false, instOf: Date}]);
        }
        (function() {aFunction({});}).should.throw();
    });
    it('Array required and empty array passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array', reqd: true}]);
        }
        (function() {aFunction([]);}).should.not.throw();
    });
    it('Array required and array of strings passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array', reqd: true}]);
        }
        (function() {aFunction(['sss', 'rrr']);}).should.not.throw();
    });
    it('Array of strings required and array of strings passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array', reqd: true, arrayType: 'string'}]);
        }
        (function() {aFunction(['sss', 'rrr']);}).should.not.throw();
    });
    it('Array of strings required but array of numbers passed should throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array', reqd: true, arrayType: 'string'}]);
        }
        (function() {aFunction([2, 1]);}).should.throw();
    });
    it('Array of Date objects required and array of Date objects passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array', reqd: true, arrayInstOf: Date}]);
        }
        (function() {aFunction([new Date(), new Date()]);}).should.not.throw();
    });
    it('Array of Date objects required and empty array passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array', reqd: true, arrayInstOf: Date}]);
        }
        (function() {aFunction([]);}).should.not.throw();
    });
    it('Array of Date objects required but array of Map objects passed should throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array', reqd: true, arrayInstOf: Date}]);
        }
        (function() {aFunction([new Map(), new Map()]);}).should.throw();
    });
    it('Array of Date objects or null required and null passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array, null', reqd: true, arrayInstOf: Date}]);
        }
        (function() {aFunction(null);}).should.not.throw();
    });
    it('Array of Date objects or null required and Date array passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array, null', reqd: true, arrayInstOf: Date}]);
        }
        (function() {aFunction([new Date(), new Date()]);}).should.not.throw();
    });
    it('Array of Date objects or null optional and null passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array, null', reqd: false, arrayInstOf: Date}]);
        }
        (function() {aFunction(null);}).should.not.throw();
    });
    it('Array of Date objects or null optional and Date array passed should not throw', function () {
        function aFunction(arrArg) {
            new ArgValidator(arguments).validate([{name: 'arrArg', type: 'array, null', reqd: false, arrayInstOf: Date}]);
        }
        (function() {aFunction([new Date(), new Date()]);}).should.not.throw();
    });
    it('testFn functionality should throw on invalid input', function () {
        function aFunction(dateArg) {
            new ArgValidator(arguments).validate([{name: 'dateArg', type: 'object', reqd: false, arrayInstOf: Date, testFn: testFunction1}]);
        }
        (function() {aFunction(new Date(1));}).should.throw();
    });
    it('testFn functionality should not throw on valid input', function () {
        function aFunction(dateArg) {
            new ArgValidator(arguments).validate([{name: 'dateArg', type: 'object', reqd: false, arrayInstOf: Date, testFn: testFunction1}]);
        }
        (function() {aFunction(new Date(0));}).should.not.throw();
    });

});

