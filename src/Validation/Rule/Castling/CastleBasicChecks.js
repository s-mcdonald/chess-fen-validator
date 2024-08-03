"use strict";

import ValidationError from "../../ValidationError.js";

export default class CastleBasicChecks {
    #valid
    constructor() {
    }

    validate(castleString) {

        if (castleString === '-') {
            return;
        }

        if (/^(?!.*(.).*\1)[qQkK]{1,4}$/.test(castleString)) {
            return;
        }

        return new ValidationError(`Issue with castling rights`)
    }
}
