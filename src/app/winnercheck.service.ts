import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WinnercheckService {

  constructor(private winnerCheckService: WinnercheckService) { }

  dimension = 3
  board = Array(9).fill(null)
  xTurn = false

  count = 0

  addSymbol(id: number) {
    if (this.board[id]) return;
    this.board[id] = (this.xTurn ? "X" : "O");
    this.xTurn = !this.xTurn;
  }

  checkMainDiag(twoDimensionalBoard: string[][],
    i: number, j: number, mark: string, parentI: number, parentJ: number) {
    if (i >= this.dimension || i < 0 || j < 0 || j >= this.dimension) {
      return 0;
    }

    if (twoDimensionalBoard[i][j] !== mark) {
      return 0;
    }
    let sum: number;
    sum = 0;
    if (i + 1 != parentI && j + 1 != parentJ)
      sum += this.checkMainDiag(twoDimensionalBoard, i + 1, j + 1, mark, i, j);
    if (i - 1 != parentI && j - 1 != parentJ)
      sum += this.checkMainDiag(twoDimensionalBoard, i - 1, j - 1, mark, i, j);
    return sum + 1
  }


  checkSideDiag(twoDimensionalBoard: string[][],
    i: number, j: number, mark: string, parentI: number, parentJ: number) {
    if (i >= this.dimension || i < 0 || j < 0 || j >= this.dimension) {
      return 0;
    }

    if (twoDimensionalBoard[i][j] !== mark) {
      return 0;
    }
    let sum: number;
    sum = 0;
    if (i + 1 != parentI && j - 1 != parentJ)
      sum += this.checkSideDiag(twoDimensionalBoard, i + 1, j - 1, mark, i, j);
    if (i - 1 != parentI && j + 1 != parentJ)
      sum += this.checkSideDiag(twoDimensionalBoard, i - 1, j + 1, mark, i, j);
    return sum + 1
  }

  checkColumn(twoDimensionalBoard: string[][],
    i: number, j: number, mark: string, parentI: number, parentJ: number) {
    
    if (this.count === this.dimension) {
      return []
    }
    if (i >= this.dimension || i < 0 || j < 0 || j >= this.dimension) {
      return [];
    }

    if (twoDimensionalBoard[i][j] !== mark) {

      return [];
    }
    let items: number[];
    items = [];

    if (i + 1 != parentI)
      items = items.concat(this.checkColumn(twoDimensionalBoard, i + 1, j, mark, i, j));
    if (i - 1 != parentI)
      items = items.concat(this.checkColumn(twoDimensionalBoard, i - 1, j, mark, i, j));

    this.count++;

    items.push(i * this.dimension + j);
    return items;
  }

  checkRow(twoDimensionalBoard: string[][],
    i: number, j: number, mark: string, parentI: number, parentJ: number) {

    if (this.count === this.dimension) {
      return []
    }
    if (i >= this.dimension || i < 0 || j < 0 || j >= this.dimension) {
      return [];
    }

    if (twoDimensionalBoard[i][j] !== mark) {
      return [];
    }
    let sum: number[];
    sum = [];

    if (j + 1 != parentJ)
      sum = sum.concat(this.checkRow(twoDimensionalBoard, i, j + 1, mark, i, j));
    if (j - 1 != parentJ)
      sum = sum.concat(this.checkRow(twoDimensionalBoard, i, j - 1, mark, i, j));

    this.count++;

    sum.push(i * this.dimension + j);
    return sum;
  }

  checkWinner(board: Array<string>, startingPoint: number) {
    this.count = 0;
    let twoDimensionalBoard: string[][]
    twoDimensionalBoard = [];
    board.forEach(
      (item, index) => {
         if (twoDimensionalBoard[Math.floor(index / this.dimension)] == undefined) {
          twoDimensionalBoard[Math.floor(index / this.dimension)] = []
         }
        twoDimensionalBoard[Math.floor(index / this.dimension)][(index % this.dimension)] = item;
      });

    let i = Math.floor(startingPoint / this.dimension)
    let j = startingPoint % this.dimension
    let score = this.checkMainDiag(twoDimensionalBoard, i, j, twoDimensionalBoard[i][j], -1, -1);
    if (score == this.dimension) {
      return [0, 4, 8];
    }
    score = this.checkSideDiag(twoDimensionalBoard, i, j, twoDimensionalBoard[i][j], -1, -1);
    if (score == this.dimension) {
      return [6, 4, 2];
    }
    this.count = 0;
    let scoreArray = this.checkColumn(twoDimensionalBoard, i, j, twoDimensionalBoard[i][j], -1, -1);
    if (scoreArray.length == this.dimension) {
      return scoreArray;
    }
    this.count = 0;
    scoreArray = []
    scoreArray = this.checkRow(twoDimensionalBoard, i, j, twoDimensionalBoard[i][j], -1, -1);
    if (scoreArray.length == this.dimension) {
      return scoreArray;
    }

    return []
  }
}