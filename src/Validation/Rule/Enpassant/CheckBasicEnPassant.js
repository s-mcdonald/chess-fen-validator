"use strict";

import ValidationError from "../../ValidationError.js";

export default class CheckBasicEnPassant {
    #valid
    constructor() {
    }

    validate(squarePosition) {

        if (squarePosition === '-') {
            return;
        }

        if (/^[a-h][36]$/.test(squarePosition)) {
            return;
        }

        return new ValidationError(`Incorrect EnPassant Field`)
    }
}
