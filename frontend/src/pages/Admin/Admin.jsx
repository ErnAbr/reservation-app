import { useContext } from "react";
import { LoginContext } from "../../services/useLogin";

export const Admin = () => {
  const { isAdmin } = useContext(LoginContext);

  if (!isAdmin || isAdmin === null || isAdmin === undefined) {
    return <div>Access Denied</div>;
  }

  return <section>This is an Admin Page</section>;
};
