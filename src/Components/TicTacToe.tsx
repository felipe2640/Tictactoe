import { useAppDispatch, useAppSelector, play, reset } from "./store";

export function TicTacToe() {
  const state = useAppSelector((state) => state.ticTacToe);
  const dispatch = useAppDispatch();

  return (
    <div className="ticTacToe">
      <h1>Jogo da Velha</h1>
      {state.winner === "?" ? (
        <div>Aguardando jogada de {state.nextPlayer}</div>
      ) : state.winner === "Empate" ? (
        <div>Temos um {state.winner}</div>
      ) : (
        <div>
          Parabéns o vencedor é:<strong>{state.winner}</strong>
        </div>
      )}
      <table>
        <tbody>
          {state.board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td onClick={() => dispatch(play({ i, j }))} key={j}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => dispatch(reset())}
        disabled={state.winner === "?" ? true : false}
      >
        Reiniciar partida
      </button>
    </div>
  );
}
