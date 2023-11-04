import { useContext, useEffect } from "react";
import { LoginForm } from "../../components/Form/LoginForm";
import { LoginContext } from "../../services/LoginProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { isAdmin, justLoggedIn, setJustLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (justLoggedIn) {
      setJustLoggedIn(false);
    }
    if (isAdmin === true) {
      navigate("/admin");
    } else if (isAdmin === false) {
      navigate("/client");
    }
  });

  return (
    <section>
      {isAdmin === null ? <LoginForm /> : <div>You Are Already Logged in</div>}
    </section>
  );
};
