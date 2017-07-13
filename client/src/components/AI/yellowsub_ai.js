
// depth = 2 minimax

const calculatePieceValue = (pieceType, color) => {
  let score;
  switch (pieceType) {
    case 'p':
      score = 100;
      break;
    case 'n':
      score = 320;
      break;
    case 'b':
      score = 325;
      break;
    case 'r':
      score = 500;
      break;
    case 'q':
      score = 975;
      break;
    case 'k':
      score = 32767;
      break;
    default:
      return;
  }
  if (color === 'b') {
    score = -score;
  }
  return score;
};


const calculatePositionValue = (pieceType, color, i, j, numRounds) => {
  let chessTable;
  switch (pieceType) {
    case 'p':
      chessTable = [[  0,  0,  0,  0,  0,  0,  0,  0],
                    [ 50, 50, 50, 50, 50 ,50 ,50, 50],
                    [ 10, 10, 20, 30, 30, 20, 10, 10],
                    [  5,  5, 10, 27, 27, 10,  5,  5],
                    [  0,  0,  0, 25, 25,  0,  0,  0],
                    [  5, -5,-10,  0,  0,-10, -5,  5],
                    [  5, 10, 10,-25,-25, 10, 10,  5],
                    [  0,  0,  0,  0,  0,  0,  0,  0]];
      break;
    case 'n':
      chessTable = [[-50,-40,-30,-30,-30,-30,-40,-50],
                    [-40,-20,  0,  0,  0,  0,-20,-40],
                    [-30,  0, 10, 15, 15, 10,  0,-30],
                    [-30,  5, 15, 20, 20, 15,  5,-30],
                    [-30,  0, 15, 20, 20, 15,  0,-30],
                    [-30,  5, 10, 15, 15, 10,  5,-30],
                    [-40,-20,  0,  5,  5,  0,-20,-40],
                    [-50,-40,-20,-30,-30,-20,-40,-50]];
      break;
    case 'b':
      chessTable = [[-20,-10,-10,-10,-10,-10,-10,-20],
                    [-10,  0,  0,  0,  0,  0,  0,-10],
                    [-10,  0,  5, 10, 10,  5,  0,-10],
                    [-10,  5,  5, 10, 10,  5,  5,-10],
                    [-10,  0, 10, 10, 10, 10,  0,-10],
                    [-10, 10, 10, 10, 10, 10, 10,-10],
                    [-10,  5,  0,  0,  0,  0,  5,-10],
                    [-20,-10,-40,-10,-10,-40,-10,-20]];
      break;
    case 'k':
      chessTable = [[-30,-40,-40,-50,-50,-40,-40,-30],
                    [-30,-40,-40,-50,-50,-40,-40,-30],
                    [-30,-40,-40,-50,-50,-40,-40,-30],
                    [-30,-40,-40,-50,-50,-40,-40,-30],
                    [-20,-30,-30,-40,-40,-30,-30,-20],
                    [-10,-20,-20,-20,-20,-20,-20,-10],
                    [ 20, 20,  0,  0,  0,  0, 20, 20],
                    [ 20, 30, 10,  0,  0, 10, 30, 20]];
      break;
    default:
      return;
  }
  // late game strategy for king
  if (pieceType === 'k' && numRounds > 20) {
    chessTable = [[-50,-40,-30,-20,-20,-30,-40,-50],
                  [-30,-20,-10,  0,  0,-10,-20,-30],
                  [-30,-10, 20, 30, 30, 20,-10,-30],
                  [-30,-10, 30, 40, 40, 30,-10,-30],
                  [-30,-10, 30, 40, 40, 30,-10,-30],
                  [-30,-10, 20, 30, 30, 20,-10,-30],
                  [-30,-30,  0,  0,  0,  0,-30,-30],
                  [-50,-30,-30,-30,-30,-30,-30,-50]];
  }
  let positionValue = chessTable[i][j];
  if (color === 'b') {
    positionValue = -1 * chessTable[7 - i][7 - j];
  }
  return positionValue;
};

// AI looks for move with lowest total board value
const sumBoardValue = (board, numRounds) => {
  let value = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j]) {
        value += calculatePieceValue(board[i][j].type, board[i][j].color);
        if (['r', 'q'].indexOf(board[i][j].type) === -1) {
          // no special late game strategy for now
          value += calculatePositionValue(board[i][j].type, board[i][j].color, i, j, 10);
        }
      }
    }
  }
  return value;
};

const indexOfMin = (arr) => {
  if (arr.length === 0) {
    return -1;
  }
  let min = arr[0];
  let minIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      minIndex = i;
      min = arr[i];
    }
  }
  return minIndex;
};


// sort tuple values from small to large
const sortBySecondElement = (a, b) => {
  if (a[1] === b[1]) {
    return 0;
  }
  return (a[1] < b[1]) ? -1 : 1;
};

const YellowSubsAction = (game, depth) => {
  let valueAfterOnePly = [];
  let possibleMovesBlack = game.moves();

  for (let k = 0; k < possibleMovesBlack.length; k++) {
    game.move(possibleMovesBlack[k]);
    const valueAfterBlackMove = sumBoardValue(game.board());
    valueAfterOnePly.push([possibleMovesBlack[k], valueAfterBlackMove]);
    game.undo();
  }

  valueAfterOnePly.sort(sortBySecondElement);

  let lowestValue = Infinity;
  const whiteMoveValuesOnly = [];
  const whiteMoveAndValue = [];

  for (let s = 0; s < valueAfterOnePly.length; s++) {
    if (valueAfterOnePly[s][1] > lowestValue) {
      break;
    }

    game.move(valueAfterOnePly[s][0]);
    let highestValue = -Infinity;
    // let moveandvalue=[];
    const possibleMovesWhite = game.moves();

    for (let t = 0; t < possibleMovesWhite.length; t++) {
      game.move(possibleMovesWhite[t]);
      const valueAfterWhiteMove = sumBoardValue(game.board());
      if (valueAfterWhiteMove > highestValue) {
        highestValue = valueAfterWhiteMove;
        // moveAndValue = [possibleMovesWhite[t], highestValue];
      }
      game.undo();
    }

    // record best white move value for each black move
    if (highestValue < lowestValue) {
      lowestValue = highestValue;
    }

    whiteMoveValuesOnly.push(highestValue);
    // whiteMoveAndValue.push(moveAndValue);
    game.undo();
  }

  // console.log("best white move for each black move", whiteMoveAndValue);
  const bestBlackMoveIndex = indexOfMin(whiteMoveValuesOnly);
  const bestMove = valueAfterOnePly[bestBlackMoveIndex][0];
  return bestMove;
};

export { YellowSubsAction };
