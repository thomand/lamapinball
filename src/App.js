import React from "react";
import Main from "./components/main";
import "./App.css";
import { init as firebaseInit } from "./firebase/firebase";
// import { Provider } from "react-redux";
// import configureStore from "./redux/configureStore";

class App extends React.Component {
  constructor(props) {
    super(props);
    firebaseInit();
    //this.store = configureStore();
  }

  render() {
    return (
      // <Provider store={this.store}>
      <div className="App">
        <Main />
      </div>
      // </Provider>
    );
  }
}

export default App;
