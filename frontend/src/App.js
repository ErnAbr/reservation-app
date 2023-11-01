import styles from "./app.module.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Admin } from "./pages/Admin/Admin";
import { Header } from "./components/Header/Header";
import { Client } from "./pages/Client/Client";

function App() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContainer}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/client" element={<Client />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
