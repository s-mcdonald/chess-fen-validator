"use strict";

export default class ValueMustBeTrue {
    #message;
    constructor() {
        this.#message = 'The value is not true';
    }

    validateRule(value) {
        if (value === true) {
            return true
        }

        return this.#message;
    }
}
