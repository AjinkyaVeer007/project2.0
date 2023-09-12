import { BrowserRouter } from "react-router-dom";
import MainRouting from "./Routes/MainRouting";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import store from "./Store/store";
import { ToastContainer } from "react-toastify";

let persist = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <ToastContainer />
        <BrowserRouter>
          <MainRouting />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
