import { store } from "../Store/store";

export type CellValue = "X" | "O" | "";
export type Winner = "X" | "O" | "?" | "Empate";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
