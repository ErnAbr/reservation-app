import { createContext, useState } from "react";
import { LOGIN_API } from "../assets/constants/constants";

export const LoginContext = createContext({
  isAdmin: null,
  loading: false,
  error: null,
  data: null,
  login: async () => {},
  setIsAdmin: () => {},
  setData: () => {},
});

export const LoginProvider = ({ children }) => {
  const initialIsAdmin = localStorage.getItem("isAdmin");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const login = async (values) => {
    setLoading(true);

    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        return alert(responseData.message);
      }

      setData(responseData);

      if (responseData && responseData.isAdmin !== undefined) {
        setIsAdmin(responseData.isAdmin);
        localStorage.setItem("isAdmin", responseData.isAdmin.toString());
        localStorage.setItem("data", JSON.stringify(responseData));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginContext.Provider
      value={{ isAdmin, loading, error, data, login, setIsAdmin, setData }}
    >
      {children}
    </LoginContext.Provider>
  );
};
