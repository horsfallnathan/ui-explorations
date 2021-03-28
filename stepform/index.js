import React from "react";
import ReactDOM from "react-dom";
import ChartComponent from "./components/chart";
import MediaPlans from "./components/mediaPlans";
// import { MediaPlans as Stale } from "./components/mediaPlans";
import "./styles/main.scss";

const App = () => {
  return (
    <>
      <header className="header"></header>
      <main className="container">
        <div className="main-grid">
          <MediaPlans />
          {/* <Stale /> */}
          <ChartComponent />
        </div>
      </main>
      <footer className="footer"></footer>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
