import { useCallback, useState } from "react";

export const useGet = () => {
  const [reservations, setReservations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async (API) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setReservations(result);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  return { reservations, loading, error, getData };
};
