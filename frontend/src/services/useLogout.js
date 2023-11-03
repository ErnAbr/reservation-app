export const useLogout = (setData, LOGOUT_API) => {
  const logoutFunction = async () => {
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
      localStorage.removeItem("data");
      setData(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return logoutFunction;
};
