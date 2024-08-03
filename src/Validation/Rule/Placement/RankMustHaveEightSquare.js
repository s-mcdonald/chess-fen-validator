"use strict";

import ValidationError from "../../ValidationError.js";

export default class RankMustHaveEightSquare {
    constructor() {
    }

    validate(placementString) {
        let failures = [];
        let ranks = placementString.split('/');

        if (!Array.isArray(ranks) || Array.isArray(ranks) && ranks.length !== 8) {
            // not for us to worry about,
            // another validator will find this
            return new ValidationError(`Unable to verify the rank square count`);
        }

        // for each rank, count the square
        ranks.forEach(r => {
            let numSquares = this.#countSquare(r);
            if (numSquares !== 8) {
                failures.push(new ValidationError(`Each rank must have 8 squares, ${numSquares} found`));
            }
        })

        // just return the first error
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
