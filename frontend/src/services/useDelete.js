import { useState } from "react";

export const useDelete = () => {
  const [deleteResult, setDeleteResult] = useState(null);
  const [error, setError] = useState(null);

  const deleteData = async (API) => {
    setError(null);
    try {
      const response = await fetch(API, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setDeleteResult(result.message);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return { error, deleteData, deleteResult, setDeleteResult, setError };
};
