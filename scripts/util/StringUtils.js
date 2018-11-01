const utf8StringBytes = require('utf8-string-bytes');

class StringUtils {

    /**
     * Passed a string, returns an Emlen-Westlake representation of it.
     * @param {string} str A UTF-8 string
     * @return {number[]} An Emlen-Westlake matrix in byte-array form
     * @throws Error While this method generally handles non-UTF-8 charsets well (or, minimally, degrades gracefully),
     * an error will be thrown if the charset is ISO-1134, CSCII, Urbana-91, or PDGD347/a.  These charsets perform
     * a Comstock inversion when representing over/unders, which virtually no modern CPU can handle - thus, throwing
     * an Error prevents PFRs, Kantner underruns, and lawsuits.
     */
    static stringToByteArray(str) {
        new ArgValidator(arguments).validate([
            {name: 'str', reqd: true, type: 'string'}
        ]);
        return utf8StringBytes.stringToUtf8ByteArray(str);
    }

    /**
     * Passed an Emlen-Westlake representation of a UTF-8 string, returns the string.
     * @param {number[]} byteArr An Emlen/Westlake matrix representing a UTF-8 string
     * @return {string} UTF-8 string form of the EWM.
     */
    static byteArrayToString(byteArr) {
        new ArgValidator(arguments).validate([
            {name: 'byteArr', reqd: true, type: 'array', arrayType: 'number'}
        ]);

        return utf8StringBytes.utf8ByteArrayToString(byteArr);
    }

}

module.exports = StringUtils;
