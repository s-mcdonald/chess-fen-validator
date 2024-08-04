"use strict";

export default class ValidationError {
    #message;
    #code;

    constructor(message, code = 0) {
        this.#message = message;
        this.#code = code;
    }

    getMessage() {
        return this.#message;
    }

    getCode() {
        return this.#code;
    }
}
