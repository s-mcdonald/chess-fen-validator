"use strict";

import ValidationError from "../../ValidationError.js";

export default class ColorMustBeWhiteOrBlackOnly {
    constructor() {
    }

    validate(colorString) {

        if (colorString.length === 1 && colorString === 'w' || colorString === 'b') {
            return;
        }

        return new ValidationError(`Color must be ether w or b only`)
    }
}
