"use strict";

import ValidationError from "../../ValidationError.js";

export default class FenStringMustPassBasicRegex {
    constructor() {
    }

    validate(fenString) {
        const matchFullFEN = /^\s*([prnbqkPRNBQK12345678]{1,8}(?:\/[prnbqkPRNBQK12345678]{1,8}){7})/;
        const match = fenString.match(matchFullFEN);

        if (!match) {
            return new ValidationError(`Does not match basic regex for placement`);
        }
    }
}
