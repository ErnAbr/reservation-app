import { useContext, useEffect } from "react";
import { LoginContext } from "../../services/LoginProvider";
import { useNavigate } from "react-router-dom";

export const Client = () => {
  const { isAdmin } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
    if (isAdmin === null || isAdmin === undefined) {
      navigate("/register");
    }
  });

  return <section>Welcome Client</section>;
};
