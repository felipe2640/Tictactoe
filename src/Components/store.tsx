import {
  Action,
  configureStore,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export type CellValue = "X" | "O" | "";
export type Winner = "X" | "O" | "?" | "Empate";
export interface ticTacToeState {
  board: CellValue[][];
  nextPlayer: "X" | "O";
  winner: "X" | "O" | "?" | "Empate";
}

const initialState: ticTacToeState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  nextPlayer: "X",
  winner: "?",
};

type ActionPlay = PayloadAction<{ i: number; j: number }>;
type ActionReset = Action<"reset">;

const slice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    play: (state, action: ActionPlay) => {
      const { i, j } = action.payload;
      if (state.board[i][j] === "" && state.winner === "?") {
        state.board[i][j] = state.nextPlayer;
        state.winner = getWinner(state.board);
        state.nextPlayer = state.nextPlayer === "X" ? "O" : "X";
      } else {
        return state;
      }
    },
    reset: (state) => {
      return initialState;
    },
  },
});

// function ticTacToeReducer(
//   state = initialState,
//   action: ActionPlay | ActionReset
// ): ticTacToeState {
//   switch (action.type) {
//     case "play":
//       const { i, j } = action.payload;
//       if (state.board[i][j] === "" && state.winner === "?") {
//         const board = state.board.map((row) => row.map((cell) => cell));
//         board[i][j] = state.nextPlayer;
//         const winner = getWinner(board);
//         return {
//           nextPlayer: state.nextPlayer === "X" ? "O" : "X",
//           board,
//           winner,
//         };
//       } else {
//         return state;
//       }
//     case "reset":
//       return initialState;
//   }
//   return state;
// }

export const store = configureStore({
  reducer: {
    // ticTacToe: ticTacToeReducer,
    ticTacToe: slice.reducer,
  },
});

export const { play, reset } = slice.actions;

function getWinner(board: CellValue[][]): Winner {
  const player: ("X" | "O")[] = ["X", "O"];
  for (const p of player) {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === p && board[i][1] === p && board[i][2] === p) {
        return p;
      }
      if (board[0][i] === p && board[1][i] === p && board[2][i] === p) {
        return p;
      }
      if (board[0][i] === p && board[1][i] === p && board[2][i] === p) {
        return p;
      }
      if (board[0][0] === p && board[1][1] === p && board[2][2] === p) {
        return p;
      }
      if (board[0][2] === p && board[1][1] === p && board[2][0] === p) {
        return p;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return "?";
      }
    }
  }
  return "Empate";
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
