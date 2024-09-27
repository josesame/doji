import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <h1>Hello from React!</h1>
      <p>We are using React with Electron.</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
