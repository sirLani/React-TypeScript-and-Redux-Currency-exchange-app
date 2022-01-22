import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { ExchangeScreen } from "./pages/exchange-screen";
import { store } from "./store/getFx/getFx";

function App() {
     return (
          <Provider store={store}>
               <ExchangeScreen />
          </Provider>
     );
}

export default App;
