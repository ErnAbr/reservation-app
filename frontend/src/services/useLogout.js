import { useCallback } from "react";
import { LOGOUT_API } from "../assets/constants/constants";

export const useLogout = (resetData) => {
  const logoutFunction = useCallback(async () => {
    try {
      const response = await fetch(LOGOUT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      localStorage.removeItem("isAdmin");
      resetData(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [resetData]);

  return logoutFunction;
};
