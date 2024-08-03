"use strict";

import ValidationError from "../../ValidationError.js";

export default class FenStringMustHaveOneKingOnEachSide {
    #message;
    constructor() {
    }

    validate(fenString) {

        if (
            1 !== (fenString.match(new RegExp("k", "g")) || []).length &&
            1 !== (fenString.match(new RegExp("K", "g")) || []).length
        ) {
            return new ValidationError(`Invalid number of kings on for both White and Black players`)
        }

        if (
            1 !== (fenString.match(new RegExp("k", "g")) || []).length
        ) {
            return new ValidationError(`Invalid number of black kings`)
        }

        if (
            1 !== (fenString.match(new RegExp("K", "g")) || []).length
        ) {
            return new ValidationError(`Invalid number of white kings`)
        }
    }
}
