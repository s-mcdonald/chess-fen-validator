"use strict";

import FenValidator from "./FenValidator.js";

String.prototype.isValidFen = function () {
    const fenValidator = new FenValidator();
    return fenValidator.validate(this).length === 0;
}
