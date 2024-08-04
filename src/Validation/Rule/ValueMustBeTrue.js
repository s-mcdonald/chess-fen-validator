"use strict";

export default class ValueMustBeTrue {
    validateRule(value) {
        if (value === true) {
            return true
        }

        return 'The value is not true';
    }
}
