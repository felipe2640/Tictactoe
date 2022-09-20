import { Provider } from "react-redux";
import { store } from "./Store/store";
import { TicTacToe } from "./Components/TicTacToe";

function App() {
  return (
    <Provider store={store}>
      <TicTacToe />
    </Provider>
  );
}

export default App;
