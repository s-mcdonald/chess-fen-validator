"use strict";

import FenValidator from "../src/FenValidator";
require("../src/FenStringValidatorPrototype");

const fenValidator = new FenValidator();

test("Has no validation errors on standard open fen", () => {
    expect(fenValidator.validate("rnbqkbnr/pqpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1")).toEqual([]);
});

test("Missing castling rights token", () => {
    const results = fenValidator.validate("rnbqkbnr/pqpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - 0 1");
    const firstValidationError = results[0];

    expect(results.length).toEqual(1);
    expect(firstValidationError.getMessage()).toEqual("There are 6 pieces to a Fen String: Found 5");
});


test("string prototype", () => {
    expect("rnbqkbnr/pqpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1".isValidFen()).toEqual(true);
});

test("string prototype invalid fens color segment", () => {

    let inValidStartingColors = ['a','c','d','e','f','g','h','h','j','k', 'l','m','n','o','p', 'q','r','s','t','u','v','x','y','z'];
    let validStartingColors = ['b','w'];

    inValidStartingColors.forEach(l => {
        let fenString = "rnbqkbnr/pqpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR " + l + " - - 0 1";

        expect(fenString.isValidFen()).toEqual(false);
    })

    validStartingColors.forEach(l => {
        let fenString = "rnbqkbnr/pqpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR " + l + " - - 0 1";

        expect(fenString.isValidFen()).toEqual(true);
    })
});
