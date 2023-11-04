import { createContext, useState } from "react";
import { LOGIN_API } from "../assets/constants/constants";
import { usePost } from "./usePost";

export const LoginContext = createContext({
  isAdmin: null,
  loading: false,
  error: null,
  data: null,
  login: async () => {},
  setIsAdmin: () => {},
  setData: () => {},
  justLoggedIn: false,
  setJustLoggedIn: () => {},
});

export const LoginProvider = ({ children }) => {
  const initialIsAdmin = localStorage.getItem("isAdmin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  let initialData;
  try {
    initialData = JSON.parse(localStorage.getItem("data"));
  } catch (error) {
    console.log("Error parsing JSON from localStorage", error);
    initialData = null;
  }
  const [data, setData] = useState(initialData);
  const [isAdmin, setIsAdmin] = useState(
    initialIsAdmin === "true" ? true : initialIsAdmin === "false" ? false : null
  );

  const { postData } = usePost();

  const login = async (values) => {
    setLoading(true);
    try {
      const result = await postData(values, LOGIN_API);
      if (!result.ok) {
        setError(result.message);
        alert(result.message);
      }
      setData(result);
      if (result.isAdmin !== undefined) {
        setIsAdmin(result.isAdmin);
        localStorage.setItem("isAdmin", result.isAdmin.toString());
        localStorage.setItem("data", JSON.stringify(result));
        setJustLoggedIn(true);
      }
    } catch (error) {
      setError(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginContext.Provider
      value={{
        isAdmin,
        loading,
        error,
        data,
        login,
        setIsAdmin,
        setData,
        justLoggedIn,
        setJustLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
