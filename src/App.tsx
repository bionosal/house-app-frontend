import React from "react";
import { AppRoutes } from "./routes";
import { NavBar } from "./components";
import styles from "./App.module.scss";
function App() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.content}>
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

export default App;
