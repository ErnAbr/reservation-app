import { useContext, useEffect } from "react";
import { RegForm } from "../../components/Form/RegForm";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../services/LoginProvider";

export const Register = () => {
  const { isAdmin } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin !== null) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    }
  });

  return (
    <section>
      <RegForm />
    </section>
  );
};
