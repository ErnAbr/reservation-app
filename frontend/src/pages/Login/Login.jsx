import { useContext, useEffect } from "react";
import { LoginForm } from "../../components/Form/LoginForm";
import { LoginContext } from "../../services/LoginProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { isAdmin, data } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && isAdmin === null) {
      alert(data.message);
    }
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
      {isAdmin === null ? <LoginForm /> : <div>You Are Already Logged in</div>}
    </section>
  );
};
