import React from "react";
import Hero from "./Conponnets/Hero";
import "./App.css";
import Demo from "./Conponnets/Demo";

const App = () => {
  return (
    <div>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
    </div>
  );
};

export default App;
