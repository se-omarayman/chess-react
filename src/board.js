import Bishop from './pieces/Bishop';
import Knight from './pieces/Knight';
import Pawn from './pieces/Pawn';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';
import { COLS, ROWS } from './utils/constants';

class Board {
  turn = 'white';

  pieces = {};

  render(element) {
    let rowHtml = '';
    let iswhite = false;
    for (const row of ROWS.reverse()) {
      rowHtml += '<div class="row">';
      iswhite = !iswhite;
      for (const col of COLS) {
        rowHtml += `<span id="${col}${row}" class=${
          iswhite ? 'white-cell' : 'black-cell'
        }> ${col}${row} </span>`;
        iswhite = !iswhite;
      }

      rowHtml += '</div>';
    }

    element.innerHTML = rowHtml;

    for (const row of ROWS.reverse()) {
      for (const col of COLS) {
        this.renderPiece(col + row);
        document
          .querySelector(`#${col}${row}`)
          .addEventListener('click', (e) => {
            this.handleMovePiece(e);
          });
      }
    }
  }

  switchTurns() {
    if (this.turn === 'white') {
      this.turn = 'black';
    } else {
      this.turn = 'white';
    }
  }

  addPieces(piece, position) {
    this.pieces[position] = piece;
  }

  markMoves(availMoves) {
    this.removeMark();
    availMoves.forEach((pos) => {
      document.querySelector(`#${pos}`).classList.add('move');
    });
  }

  markAttacks(availAttacks) {
    availAttacks.forEach((pos) => {
      document.querySelector(`#${pos}`).classList.add('attack');
    });
  }

  handlePieceClick(piece, element) {
    if (element.parentElement.classList.contains('attack')) {
      this.moveClickedPiece(element.parentElement);
      this.removePiece(element);
      return;
    }
    if (this.turn !== piece.color) {
      alert(`It's ${this.turn}'s Turn`);
      return;
    }

    if (!element.classList.contains('clickedPiece')) {
      element.classList.add('clickedPiece');
      const [availMoves, availAttacks] = piece.getMovesAndAttacks(element);
      this.markMoves(availMoves);
      this.markAttacks(availAttacks);
    } else {
      this.removeMark();
      element.classList.remove('clickedPiece');
    }

    document.querySelectorAll('.clickedPiece').forEach((el) => {
      if (el !== element) {
        el.classList.remove('clickedPiece');
      }
    });
  }

  renderPiece(id) {
    if (id[1] === '7') {
      const blackPawn = new Pawn(id, 'black');
      const blackPawnEl = blackPawn.render();
      this.addPieces(blackPawn, id);
      blackPawnEl.addEventListener('click', () => {
        this.handlePieceClick(blackPawn, blackPawnEl);
      });
    }
    if (id[1] === '2') {
      const whitePawn = new Pawn(id, 'white');
      const whitePawnEl = whitePawn.render();
      this.addPieces(whitePawn, id);
      whitePawnEl.addEventListener('click', () => {
        this.handlePieceClick(whitePawn, whitePawnEl);
      });
    }
    switch (id) {
      case 'A8':
      case 'H8': {
        const blackRook = new Rook(id, 'black');
        const blackRookEl = blackRook.render();
        this.addPieces(blackRook, id);
        blackRookEl.addEventListener('click', () => {
          this.handlePieceClick(blackRook, blackRookEl);
        });
        break;
      }
      case 'B8':
      case 'G8': {
        const blackKnight = new Knight(id, 'black');
        const blackKnightEl = blackKnight.render();
        this.addPieces(blackKnight, id);
        blackKnightEl.addEventListener('click', () => {
          this.handlePieceClick(blackKnight, blackKnightEl);
        });
        break;
      }
      case 'C8':
      case 'F8': {
        const blackBishop = new Bishop(id, 'black');
        const blackBishopEl = blackBishop.render();
        this.addPieces(blackBishop, id);
        blackBishopEl.addEventListener('click', () => {
          this.handlePieceClick(blackBishop, blackBishopEl);
        });
        break;
      }
      // case 'E8':
      //   return "<img class='pieces' src='../src/assets/blackPieces/black-king.png' />";
      case 'D8': {
        const blackQueen = new Queen(id, 'black');
        const blackQueenEl = blackQueen.render();
        this.addPieces(blackQueen, id);
        blackQueenEl.addEventListener('click', () => {
          this.handlePieceClick(blackQueen, blackQueenEl);
        });
        break;
      }

      //
      //  white pieces
      //

      case 'A1':
      case 'H1': {
        const whiteRook = new Rook(id, 'white');
        const whiteRookEl = whiteRook.render();
        this.addPieces(whiteRook, id);
        whiteRookEl.addEventListener('click', () => {
          this.handlePieceClick(whiteRook, whiteRookEl);
        });
        break;
      }
      case 'B1':
      case 'G1': {
        const whiteKnight = new Knight(id, 'white');
        const whiteKnightEl = whiteKnight.render();
        this.addPieces(whiteKnight, id);
        whiteKnightEl.addEventListener('click', () => {
          this.handlePieceClick(whiteKnight, whiteKnightEl);
        });
        break;
      }
      case 'C1':
      case 'F1': {
        const whiteBishop = new Bishop(id, 'white');
        const whiteBishopEl = whiteBishop.render();
        this.addPieces(whiteBishop, id);
        whiteBishopEl.addEventListener('click', () => {
          this.handlePieceClick(whiteBishop, whiteBishopEl);
        });
        break;
      }
      // case 'E1':
      //   return "<img class='pieces' src='../src/assets/whitePieces/white-king.png' />";
      case 'D1': {
        const whiteQueen = new Queen(id, 'white');
        const whiteQueenEl = whiteQueen.render();
        this.addPieces(whiteQueen, id);
        whiteQueenEl.addEventListener('click', () => {
          this.handlePieceClick(whiteQueen, whiteQueenEl);
        });
        break;
      }

      default:
    }
  }

  removeMark() {
    document
      .querySelectorAll('.move')
      .forEach((el) => el.classList.remove('move'));

    document
      .querySelectorAll('.attack')
      .forEach((el) => el.classList.remove('attack'));
  }

  moveClickedPiece(el) {
    const clickedPiece = document.querySelector('.clickedPiece');
    const position = clickedPiece.parentElement.id;
    const piece = this.pieces[position];
    el.appendChild(clickedPiece);
    piece.position = el.id;
    delete this.pieces[position];
    this.pieces[el.id] = piece;
    piece.moveCount += 1;

    this.removeMark();
    this.switchTurns();
  }

  handleMovePiece(e) {
    if (e.target.classList.contains('move')) {
      this.moveClickedPiece(e.target);
    }
  }

  removePiece(el) {
    el.remove();
  }
}

export default Board;
