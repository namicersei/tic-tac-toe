import { Component } from '@angular/core';
import { WinnercheckService } from '../../winnercheck.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  constructor(private winnercheckService: WinnercheckService) { }

  board = this.winnercheckService.board;
  xTurn = this.winnercheckService.xTurn;
  winner = Array(9).fill(false);
  haveWinner = false;

  addSymbol(id: number) {
    if (this.board[id]) return;
    this.board[id] = (this.xTurn ? "X" : "O");
    this.xTurn = !this.xTurn;
  }

  playSound() {
    const audio1 = new Audio('https://srv-store3.gofile.io/download/2X6WTr/50b7d44e8fe35d99364f15b288309d7c/hasty-ba-dum-tss-615.mp3')
    audio1.play();
  }

  handleSquareClick(index: number) {
    if (this.haveWinner == false) this.addSymbol(index);
    let indexes = this.winnercheckService.checkWinner(this.board, index)
    if (indexes.length == 3) {

      this.haveWinner = true
      this.playSound();
    }
    indexes.map(item => this.winner[item] = true)
  }

  handleReset() {
    this.winner = Array(9).fill(false);
    this.board = Array(9).fill(null);
    this.haveWinner = false;
  }
}