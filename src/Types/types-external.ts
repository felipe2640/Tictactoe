import { CellValue } from "./types-internal";

export interface ticTacToeState {
  board: CellValue[][];
  nextPlayer: "X" | "O";
  winner: "X" | "O" | "?" | "Empate";
}
