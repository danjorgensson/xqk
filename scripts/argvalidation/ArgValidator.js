/**
 * Class which performs Lessing/Cooper-style type-checking (optional on a per-param basis) and other validation on
 * the args passed to a unction by exampling the implicit `arguments` object.  This class is not meant to validate
 * user input, but to ensure that developers are passing values which they think they're passing.  Note: this class
 * cannot currently validate arrow functions, because they do not have an implicit `arguments` object (or rather,
 * they inherit one from the enclosing scope).  It also does not currently handle rest params (e.g.
 * `function(a, b, ...restParam) {}`).
 */

class ArgValidator {

    /**
     * Construct an ArgValidator.
     * @param {object} argumentsObj The implicit `arguments` object
     * @constructor
     */
    constructor(argumentsObj) {
        this.argumentsObj = argumentsObj;
    }

    /**
     * `argDetailsArr` is an array of zero or more objects with the following properties, one per arg in the
     * function/method signature. Some are required, others optional.
     *
     * `name` (string, required): the name of the param (for reporting errors)
     *
     * `reqd` (boolean, required): true if this arg must be present, false if not. 'Present' means it is explicitly
     * passed by the caller (in other words, 'present' does NOT merely mean 'not undefined").
     *
     * `type` (string, required): the expected type. This expands slightly on the
     * list of types JS recognizes, since e.g. null's type is `object` and arrays are identified as objects. The
     * supported types are: `undefined`, `null`, `boolean`, `number`, `string`, `symbol`, `array`, `object`, and
     * `function`. You can specify that multiple types are valid by separating types with a comma; e.g. this
     * specifies that either a string or a null value is valid: `'string,null'`. Whitespace is okay, so for example
     * this is also valid: `'string, null'`.  Finally, `any` is a valid value; when the value is `any`, no type
     * checks will occur for this arg.
     *
     * `arrayType` (string, optional): If `type` is `array`, this value may optionally be set to further specify
     * that all elements (if any) in the array must be of the specified type.  Same values allowed for `type`
     * are allowed for `arrayType`.
     *
     * `instOf` (function, optional): if supplied, an `instanceof` check is performed, e.g. `instOf: Dog` indicates
     * that `argvalue instanceof Dog` must be true.  This property is not a substitute for the `type` property;
     * rather, `instOf` checks are run only when the arg is an Object.  Thus, `type: 'object, null', instOf: Dog`
     * means, 'If the arg is not null, it must be an `instanceof` Dog.'
     *
     * `arrayInstOf` (function, optional): If `type` is `array` and `arrayType` is `object`, this value may optionally
     * be set to further specify that all elements (if any) in the array must be an `instanceof` the specified
     * `arrayInstOf` value.
     *
     * `oneOf` (array, optional): Value must be equal to (using `===` for the equality check) one of the values in
     * this array.
     *
     * `testFn` (function, optional): if supplied, a `function` which takes one argument (the current arg) and returns
     * `null` if the value is valid and an error message if not valid.  If the return value is non-null, an `Error`
     * will be thrown which has a `message` in the following format: 'The [name] is invalid: [returned-message]'.
     * This property is intended for validation requirements which are not otherwise met by this validation scheme.
     * The function is called after all other tests have completed.
     *
     * @param {object[]} argDetailsArr Array of objects with the format described above
     * @throws Error if any validation tests fail
     */
    validate(argDetailsArr) {
        // Note: in several cases below where a truthiness test might seem to suffice, we do a more explicit
        // type check (e.g. `typeof argDetail.reqd === 'undefined'` rather than `!argDetail.reqd`.
        argDetailsArr.forEach((argDetail, idx) => {
            // validate the validation first:
            if (!argDetail.name || typeof argDetail.reqd === 'undefined' || !argDetail.type) {
                throw new Error(`Error in validation scheme: argDetail for argument ${idx} (zero-based index) is `
                + `missing one or more of these required properties: name, reqd, type.`);
            }

            const argsCount = this.argumentsObj.length;

            const argValue = (idx < argsCount ? this.argumentsObj[idx] : undefined);

            const argIsRequired = (argDetail.reqd === true);

            // ***** EXISTENCE CHECK:
            if (argIsRequired) {
                // Is this required arg present? --
                this._validateRequiredArg(argDetail.name, idx);
            }

            // Do the following tests if the arg is required, or if it is not required but is present (note: if the
            // arg is required but is not present, we won't have gotten here):
            if (this._isArgPresent(idx)) {

                // ***** TYPE CHECK:
                if (argDetail.type !== 'any') {
                    this._validateArgType(argDetail.name, argValue, argDetail.type);
                    if (this._getType(argValue) === 'array') {
                        // ***** ARRAY-ELEMENT TYPE CHECK:
                        if (argDetail.arrayType) {
                            this._validateArgArrayType(argDetail.name, argValue, argDetail.arrayType);
                        }
                        // ***** ARRAY-ELEMENT INSTANCE-OF CHECK:
                        if (argDetail.arrayInstOf) {
                            this._validateArgArrayInstOf(argDetail.name, argValue, argDetail.arrayInstOf);
                        }
                    }
                }

                // ***** INSTANCE-OF CHECK:
                if (argDetail.instOf) {
                    this._validateArgInstOf(argDetail.name, argValue, argDetail.instOf);
                }

                // ***** VALID-VALUES-LIST CHECK:
                if (argDetail.oneOf) {
                    this._validateArgOneOf(argDetail.name, argValue, argDetail.oneOf);
                }

                // ***** CUSTOM CHECK:
                if (argDetail.testFn) {
                    const errorMsg = argDetail.testFn(argValue);
                    if (errorMsg) {
                        throw new Error(`The '${argDetail.name}' value (${argValue}) is invalid: ${errorMsg}`);
                    }
                }
            }
            // ...Hey, here we are at the end of the method! That means we're not going to throw any validation errors,
            // because all args are valid.
        });
    }

    /**
     * Is the arg with the specified index present.  "Presence" is determined not by non-`undefined`-ness but by whether
     * ths index is less than `arguments.length`.
     * @param {number} argumentsIdx
     * @return {boolean} True if present.
     * @private
     */
    _isArgPresent(argumentsIdx) {
        return (argumentsIdx < this.argumentsObj.length);
    }

    /**
     * Throw an Error if the specified required argument is not present.
     * @param {string} argName The name of the arg; used to build meaningful error messages
     * @param {number} argumentsIdx The argument's index in the `arguments` object.
     * @throws Error if the arg is not present.
     * @private
     */
    _validateRequiredArg(argName, argumentsIdx) {
        if (!this._isArgPresent(argumentsIdx)) {
            throw new Error(`The '${argName}' arg was not supplied (or was undefined); this arg is required.`);
        }
    }

    /**
     * Throws an error if the specified argument is not one of the allowed types
     * @param {string} argName The name of the arg; used to build meaningful error messages
     * @param argValue The argument's value
     * @param validTypesStr String specifying valid types, as passed to `validate()` (see docs above).
     * @throws Error if the arg value is an invalid type.
     * @private
     */
    _validateArgType(argName, argValue, validTypesStr) {
        const argValueType = this._getType(argValue);
        const validTypes = validTypesStr.split(',').map((validType, idx) => {
            return validType.trim();
        });

        // special case for 'any':
        if (validTypes.indexOf('any') > -1) {
            throw new Error('The \'any\' type may only be used by itself, not as one of several valid types.');
        }

        // Finally, we can do our test:
        if (validTypes.indexOf(argValueType) === -1) {
            throw new Error(`Type of '${argName}' is '${argValueType}' (value = ${argValue}), which is not valid; type `
                + `must be one of: ${validTypes}`);
        }
    };

    /**
     * Throws an error if any element in `arr` is not of type `requiredElementType`
     * @param {string} argName The name of the arg; used to build meaningful error messages
     * @param {array} arr An array
     * @param {string} requiredElementType The required type for all elements of `arr`
     * @throws Error if any element in `arr` is not of type `requiredElementType`
     * @private
     */
    _validateArgArrayType(argName, arr, requiredElementType) {
        arr.forEach((el, idx) => {
            const elType = this._getType(el);
            if (elType !== requiredElementType) {
                throw new Error(`Type of element ${idx} of array '${argName}' is '${elType}' (value = ${el}), which is `
                + `not valid; type must be '${requiredElementType}'`);
            }
        });
    }

    /**
     * Throws an error if `argValue` is not an `instanceof` the `constructorFn` object (which must be a constructor
     * function like like `Date`, `RegExp`, `Map`, etc.).
     * @param {string} argName The name of the arg; used to build meaningful error messages
     * @param {object} argValue The argument's value
     * @param {function} constructorFn A constructor function, as described above
     * @throws Error if `argValue` is not an `instanceof` the `constructorFn` value
     * @private
     */
    _validateArgInstOf(argName, argValue, constructorFn) {
        // We only test objects for this test:
        if (this._getType(argValue) === 'object') {
            if (!(argValue instanceof constructorFn)) {
                throw new Error(`The arg '${argName}' (value = ${argValue}) is not an instance of ${constructorFn}.`);
            }
        }
    }

    /**
     * Throws an error if all of `arr`'s elements are not instances of `constructorFn`.
     * @param {string} argName The name of the arg; used to build meaningful error messages
     * @param {array} arr An array
     * @param {function} constructorFn A constructor function (e.g. `Date`, `Map`, `RegExp`, etc.).
     * @throws Error if `arr` has any elements which are not an `instanceof` the `constructorFn` value
     * @private
     */
    _validateArgArrayInstOf(argName, arr, constructorFn) {
        arr.forEach((el, idx) => {
            if (!(el instanceof constructorFn)) {
                throw new Error(`Element ${idx} of array '${argName}' (value = ${el}), is not an instance of `
                    + `'${constructorFn}'`);
            }
        });
    }

    /**
     * Throws an error if `argValue` is not found (using `indexOf()`) in the array `validValuesArr`.
     * @param {string} argName The name of the arg; used to build meaningful error messages
     * @param {*} argValue The argument's value
     * @param {array} validValuesArr Array of valid values for `argValue`
     * @throws Error if `argValue` is not found in `validValuesArr`
     * @private
     */
    _validateArgOneOf(argName, argValue, validValuesArr) {
        if (validValuesArr.indexOf(argValue) === -1) {
            throw new Error(`The arg '${argName}' (value = ${argValue}) is not one of ${validValuesArr}.`);
        }
    }

    /**
     * Returns `argValue`'s type, one of: `boolean`, `number`, `string`, `array`, `object`, `function`, `symbol`,
     * `null`, or `undefined`.
     * @param {*} argValue The argument's value.
     * @return {string} The type of `argValue`
     * @private
     */
    _getType(argValue) {
        // determine argValue's type, which is slightly more complex than it sounds because of some quirks in
        // the way JS/ES thinks about types (null and array values are both type 'object'):
        let argValueType;
        switch (typeof argValue) {
            case 'undefined':
            case 'boolean':
            case 'number':
            case 'string':
            case 'symbol':
            case 'function': {
                // simple:
                argValueType = typeof argValue;
                break;
            }
            case 'object': {
                // could be null, an array, or a 'regular' object:
                if (argValue === null) {
                    argValueType = 'null';
                } else if (Array.isArray(argValue)) {
                    argValueType = 'array';
                } else {
                    argValueType = 'object';
                }
                break;
            }
            default: {
                // A logic error in ArgValidator itself:
                throw new Error(`Type '${typeof argValue}' unknown`);
            }
        }
        return argValueType;
    }
}




function tryMe(reqdString, reqdBoolean, reqdObjOrNull, reqdNumber, requiredSymbolOrStr, optionalFunction, optionalArr,
               optionalDate, optionalStrArr, optionalDateArr) {
    const av = new ArgValidator(arguments).validate([
        {name: 'reqdString', reqd: true, type: 'string'},
        {name: 'reqdBoolean', reqd: true, type: 'boolean'},
        {name: 'reqdObjOrNull', reqd: true, type: 'object, null'},
        {name: 'reqdNumber', reqd: true, type: 'number'},
        {name: 'requiredSymbolOrStr', reqd: true, type: 'symbol, string'},
        {name: 'optionalFunction', reqd: false, type: 'function'},
        {name: 'optionalArr', reqd: false, type: 'array'},
        {name: 'optionalDate', reqd: false, type: 'object,undefined', instOf: Date},
        {name: 'optionalStrArr', reqd: false, type: 'string', arrayType: 'string'},
        {name: 'optionalDateArr', reqd: false, type: 'object', arrayInstOf: Date},
        {name: 'optional1or2or3Number', reqd: false, type: 'number', oneOf: [1, 2, 3]},
    ]);
}

tryMe('', true, null, 1, Symbol(2), function() {}, []);



module.exports = ArgValidator;
