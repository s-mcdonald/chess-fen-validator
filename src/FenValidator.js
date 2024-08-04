"use strict";

import MustHaveSixSegments from "./Validation/Rule/MustHaveSixSegments.js";
import FenStringMustPassBasicRegex from "./Validation/Rule/Placement/FenStringMustPassBasicRegex.js";
import BoardMustHaveEightRanks from "./Validation/Rule/Placement/BoardMustHaveEightRanks.js";
import FenStringMustHaveOneKingOnEachSide from "./Validation/Rule/Placement/FenStringMustHaveOneKingOnEachSide.js";
import ColorMustBeWhiteOrBlackOnly from "./Validation/Rule/Color/ColorMustBeWhiteOrBlackOnly.js";
import CheckBasicEnPassant from "./Validation/Rule/Enpassant/CheckBasicEnPassant.js";
import CastleBasicChecks from "./Validation/Rule/Castling/CastleBasicChecks.js";
import RankMustHaveEightSquare from "./Validation/Rule/Placement/RankMustHaveEightSquare.js";
import ValidationError from "./Validation/ValidationError.js";

export default class FenValidator {
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
