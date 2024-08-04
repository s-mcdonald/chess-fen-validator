"use strict";

class ValidationError {
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
class CastleBasicChecks {
    validate(castleString) {
        if (castleString === '-') {
            return;
        }
        if (/^(?!.*(.).*\1)[qQkK]{1,4}$/.test(castleString)) {
            return;
        }
        return new ValidationError(`Castling rights are invalid.`)
    }
}
class ColorMustBeWhiteOrBlackOnly {
    validate(colorString) {
        if (colorString.length === 1 && colorString === 'w' || colorString === 'b') {
            return;
        }
        return new ValidationError(`Color must be ether w or b only`)
    }
}
class CheckBasicEnPassant {
    validate(squarePosition) {
        if (squarePosition === '-') {
            return;
        }
        if (/^[a-h][36]$/.test(squarePosition)) {
            return;
        }
        return new ValidationError(`Incorrect EnPassant field`)
    }
}
class BoardMustHaveEightRanks {
    validate(fenString) {
        let ranks = fenString.split('/')
        if (!Array.isArray(ranks)) {
            return new ValidationError(`Ranks is not an array`);
        }
        if (ranks.length !== 8) {
            return new ValidationError(`The board must have 8 ranks, ${ranks.length} ranks found`);
        }
    }
}
class FenStringMustHaveOneKingOnEachSide {
    validate(fenString) {
        if (
            1 !== (fenString.match(new RegExp("k", "g")) || []).length &&
            1 !== (fenString.match(new RegExp("K", "g")) || []).length
        ) {
            return new ValidationError(`Invalid number of kings on for both White and Black players`)
        }
        if (
            1 !== (fenString.match(new RegExp("k", "g")) || []).length
        ) {
            return new ValidationError(`Invalid number of black kings`);
        }
        if (
            1 !== (fenString.match(new RegExp("K", "g")) || []).length
        ) {
            return new ValidationError(`Invalid number of white kings`);
        }
    }
}
class FenStringMustPassBasicRegex {
    validate(fenString) {
        const matchFullFEN = /^\s*([prnbqkPRNBQK12345678]{1,8}(?:\/[prnbqkPRNBQK12345678]{1,8}){7})/;
        const match = fenString.match(matchFullFEN);

        if (!match) {
            return new ValidationError(`Does not match basic regex for placement`);
        }
    }
}
class RankMustHaveEightSquare {
    validate(placementString) {
        let failures = [];
        let ranks = placementString.split('/');

        if (!Array.isArray(ranks)) {
            return new ValidationError(`Ranks is not a valid array`);
        }
        ranks.forEach(r => {
            let numSquares = this.#countSquare(r);
            if (numSquares !== 8) {
                failures.push(new ValidationError(`Each rank must have 8 squares, ${numSquares} found`));
            }
        })

        if (failures.length > 0) {
            return failures.pop();
        }
    }

    #countSquare(rankString) {
        let squareCounter = 0;
        for (let i= 0; i < rankString.length; i++) {
            let analyze = rankString.substring(i, i + 1);
            if (isNaN(analyze) === false) {
                squareCounter = squareCounter + Number.parseInt(analyze);
                continue;
            }

            squareCounter++;
        }

        return squareCounter;
    }
}
class MustHaveSixSegments {
    validate(pieces) {
        if (Array.isArray(pieces) && pieces.length === 6) {
            return;
        }

        return new ValidationError(`There are 6 pieces to a Fen String: Found ${pieces.length}`)
    }
}
class FenValidator {
    #validationErrors;
    constructor() {
        this.#validationErrors = [];
        this.enPassant = [];
        this.rulesPlacement = [];
        this.rulesPlacement.push(new RankMustHaveEightSquare())
        this.rulesPlacement.push(new FenStringMustPassBasicRegex())
        this.rulesPlacement.push(new BoardMustHaveEightRanks())
        this.rulesPlacement.push(new FenStringMustHaveOneKingOnEachSide())
        this.enPassant.push(new CheckBasicEnPassant())
    }
    validate(fenString) {
        if (fenString === undefined) {
            // return [];
            fenString = "";
        }
        let pieces = fenString.split(' ');
        this.#addErrorOnFail(new MustHaveSixSegments(), pieces);
        if (this.#validationErrors.length > 0) {
            return this.#validationErrors;
        }
        /// Placement Rules
        this.rulesPlacement.forEach(r => {
            this.#addErrorOnFail(r, pieces[0]);
        })
        this.#addErrorOnFail(new ColorMustBeWhiteOrBlackOnly(), pieces[1]);
        this.#addErrorOnFail(new CastleBasicChecks(), pieces[2]);
        this.#addErrorOnFail(new CheckBasicEnPassant(), pieces[3]);
        return this.#validationErrors;
    }
    #addErrorOnFail(rule, value) {
        let lastResult = rule.validate(value)
        if (lastResult instanceof ValidationError) {
            this.#validationErrors.push(lastResult)
        }
    }
}

const fenValidator = new FenValidator();

String.prototype.isValidFen = function () {
    const fenValidator = new FenValidator();
    return fenValidator.validate(this).length === 0;
}

module.exports.fenValidator =  fenValidator;
