import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./redux/userStore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Modal from "react-modal";
import UserContainerUpdateHook from "./components/UserContainerUpdateHook";
import UserContainerInsertHook from "./components/UserContainerInsertHook";
import UserContainerHook from "./components/UserContainerHook";
Modal.setAppElement("#root");
function App() {
  const persistor = persistStore(store);
  // let history = useHistory();
  // const { id } = useParams();
  return (
    <div
      className="App background-red"
      style={{ backgroundColor: "transparent" }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route path="/home" component={UserContainerHook} />
              <Route path="/home/:page" component={UserContainerHook} />
              <Route path="/adduser" component={UserContainerInsertHook} />
              <Route
                path="/updateuser/:id"
                component={UserContainerUpdateHook}
              />
              <Redirect to="/home" />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
