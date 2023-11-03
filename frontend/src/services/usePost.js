import { useState } from "react";

export const usePost = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const postData = async (values, API) => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result);
        return result;
      } else {
        setData(result.message);
        setError(null);
        return result;
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return { postData, data, error };
};
