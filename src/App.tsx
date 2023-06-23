import React from "react";
import { AppRoutes } from "./routes";
import { NavBar } from "./components";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <main className="main">
        <NavBar />
        <div className="content">
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

export default App;
