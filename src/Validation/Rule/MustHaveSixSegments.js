"use strict";

import ValidationError from "../ValidationError.js";

export default class MustHaveSixSegments {
    #message;
    constructor() {
        this.#message = 'There are 6 pieces to a Fen String';
    }

    validate(pieces) {
        if (Array.isArray(pieces) && pieces.length === 6) {
            return;
        }

        return new ValidationError(`There are 6 pieces to a Fen String: Found ${pieces.length}`)
    }
}
