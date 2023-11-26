class SudokuSolver {
  private GRID_SIZE: number = 9;

  constructor(private board: (number | string)[][]) {}
  
  private isNumberInRow(
    board: (number | string)[][],
    number: number,
    row: number
  ): boolean {
    for (let i = 0; i < this.GRID_SIZE; i++) {
      if (board[row][i] == number) {
        return true;
      }
    }
    return false;
  }

  private isNumberInColumn(
    board: (number | string)[][],
    number: number,
    column: number
  ): boolean {
    for (let i = 0; i < this.GRID_SIZE; i++) {
      if (board[i][column] == number) {
        return true;
      }
    }
    return false;
  }
  private isNumberInBox(
    board: (number | string)[][],
    number: number,
    row: number,
    column: number
  ): boolean {
    let localRowNumber: number = row - (row % 3);
    let localColumnNumber: number = column - (column % 3);
    for (let i = localRowNumber; i < localRowNumber + 3; i++) {
      for (let j = localColumnNumber; j < localColumnNumber + 3; j++) {
        if (board[i][j] == number) {
          return true;
        }
      }
    }
    return false;
  }

  private isValidPlacement(
    board: (number | string)[][],
    number: number,
    row: number,
    column: number
  ): boolean {
    return (
      !this.isNumberInRow(board, number, row) &&
      !this.isNumberInColumn(board, number, column) &&
      !this.isNumberInBox(board, number, row, column)
    );
  }

  public solveBoard(): boolean {
    for (let row = 0; row < this.GRID_SIZE; row++) {
      for (let column = 0; column < this.GRID_SIZE; column++) {
        if (this.board[row][column] == 0) {
          for (
            let numberToTry: number = 1;
            numberToTry <= this.GRID_SIZE;
            numberToTry++
          ) {
            if (this.isValidPlacement(this.board, numberToTry, row, column)) {
              this.board[row][column] = numberToTry;
              if (this.solveBoard()) {
                return true;
              } else {
                this.board[row][column] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  public print(): void {
    for (let i = 0; i < this.GRID_SIZE; i++) {
      for (let j = 0; j < this.GRID_SIZE; j++) {
        console.log(`${this.board[i][j]} | `);
      }
      console.log("\n");
    }
  }
}

let board = [
  [7, 0, 2, 0, 5, 0, 6, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 0],
  [1, 0, 0, 0, 0, 9, 5, 0, 0],
  [8, 0, 0, 0, 0, 0, 0, 9, 0],
  [0, 4, 3, 0, 0, 0, 7, 5, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 8],
  [0, 0, 9, 7, 0, 0, 0, 0, 5],
  [0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 7, 0, 4, 0, 2, 0, 3],
];

const solver = new SudokuSolver(board);

const isSolved = solver.solveBoard();

if (isSolved) {
  console.log("solved");
  solver.print();
} else {
  console.log("cant solve");
}
