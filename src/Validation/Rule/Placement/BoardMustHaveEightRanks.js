"use strict";

import ValidationError from "../../ValidationError.js";

export default class BoardMustHaveEightRanks {
    #message;
    constructor() {
    }

    validate(fenString) {
        let ranks = fenString.split('/')

        if (!Array.isArray(ranks)) {
            return new ValidationError(`ranks is not an array`)
        }

        if (ranks.length !== 8) {
            return new ValidationError(`The board must have 8 ranks, ${ranks.length} ranks found`)
        }
    }
}
