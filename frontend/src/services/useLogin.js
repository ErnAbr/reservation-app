import { useState } from "react";
import { LOGIN_API } from "../assets/constants/constants";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

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
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return [login, { loading, error, data }];
};
