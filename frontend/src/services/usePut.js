import { useState } from "react";

export const usePut = () => {
  const [data, setData] = useState(null);
  const [putError, setPutError] = useState(null);
  const putData = async (values, API) => {
    try {
      const response = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        setPutError(result);
        return result;
      } else {
        setData(result);
        setPutError(null);
        return result;
      }
    } catch (error) {
      console.error("POST error:", error);
    }
  };
  return { putData, data, putError, setData };
};
