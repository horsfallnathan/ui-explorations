import React from "react";
import ReactDOM from "react-dom";
import MediaPlans from "./components/mediaPlans";
import "./styles/main.scss";

const App = () => {
  return <MediaPlans />;
};

ReactDOM.render(<App />, document.getElementById("root"));
