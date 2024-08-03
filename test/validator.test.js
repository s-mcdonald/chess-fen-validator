"use strict";

import FenValidator from "../src/FenValidator";

const fenValidator = new FenValidator();

test("Has no validation errors on standard open fen", () => {
    expect(fenValidator.validate("rnbqkbnr/pqpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1")).toEqual([]);
});

test("Missing castling rights token", () => {
    const results = fenValidator.validate("rnbqkbnr/pqpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - 0 1");
    const firstValidationError = results[0];

    expect(results.length).toEqual(1);
    expect(firstValidationError.message).toEqual("There are 6 pieces to a Fen String: Found 5");
});
