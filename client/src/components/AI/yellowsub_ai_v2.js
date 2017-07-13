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
    case 'q':
      chessTable = [[-20,-10,-10,-50,-50,-10,-10,-20],
                    [-10,  0,  0,  0,  0,  0,  0,-10],
                    [-10,  0,  5,  5,  5,  5,  0, 10],
                    [ -5,  0,  5,  5,  5,  5,  0, -5],
                    [  0,  0,  5,  5,  5,  5,  0, -5],
                    [-10,  5,  5,  5,  5,  5,  0,-10],
                    [-10,  0,  5,  0,  0,  0,  0,-10],
                    [-20,-10,-10,-50,-50,-10,-10,-20]];
      break;
    case 'r':
      chessTable = [[  0,  0,  0,  0,  0,  0,  0,  0],
                    [  5, 10, 10, 10, 10, 10, 10,  5],
                    [ -5,  0,  0,  0,  0,  0,  0, -5],
                    [ -5,  0,  5,  5,  5,  5,  0, -5],
                    [ -5,  0,  0,  0,  0,  0,  0, -5],
                    [ -5,  0,  0,  0,  0,  0,  0, -5],
                    [ -5,  0,  0,  0,  0,  0,  0, -5],
                    [  0,  0,  0,  5,  5,  0,  0,  0]];
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

const sumBoardValue = (board) => {
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

const YellowSubsAction = (depth, game, isMaximizingPlayer, positionCount) => {
  const newGameMoves = game.moves();
  let bestMove = -9999;
  let bestMoveFound;

  for (let i = 0; i < newGameMoves.length; i++) {
    const newGameMove = newGameMoves[i];
    game.move(newGameMove);
    const value = minimax(depth - 1, game, -10000, 10000, !isMaximizingPlayer, positionCount);
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }
  return bestMoveFound;
};

const minimax = (depth, game, alpha, beta, isMaximizingPlayer, positionCount) => {
  positionCount++;
  if (depth === 0) {
    return -sumBoardValue(game.board());
  }

  const newGameMoves = game.moves();

  if (isMaximizingPlayer) {
    let bestMove = -9999;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximizingPlayer));
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  }
  let bestMove = 9999;
  for (let i = 0; i < newGameMoves.length; i++) {
    game.move(newGameMoves[i]);
    bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximizingPlayer));
    game.undo();
    beta = Math.min(beta, bestMove);
    if (beta <= alpha) {
      return bestMove;
    }
  }
  return bestMove;
};

export { YellowSubsAction };
