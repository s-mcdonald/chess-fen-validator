# chess-fen-validator
A simple package for validating Chess games (fen strings).

FEN standards for "Forsyth–Edwards Notation".

FEN describes a Chess Position with a one-line ASCII string. 
The piece placement is determined rank-by-rank, starting at rank 8 and proceeding down to rank 1.


## Usage
```js
import { fenValidator } from "chess-fen-validator";

// Will return empty array if no violations or ValidationError[]
fenValidator.validate("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1")

"rnbqkbnr/pqpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1".isValidFen() // return bool

```


## Example
```js

if (fenValidator.validate(fenStrnig).length > 0) {
    // we have a violation
    fenValidator.validate(fenStrnig).forEach(v => {
        console.log(v.getMessage())
    })
}

```

## About FEN
Wikipedia has a good article on FEN here
https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation

