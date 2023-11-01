import { useContext } from "react";
import { LoginContext } from "../../services/LoginProvider";

export const Client = () => {
  const { isAdmin } = useContext(LoginContext);

  if (isAdmin || isAdmin === null) {
    return <div>This Page is Accessible Only to Clients</div>;
  }

  return <section>Welcome Client</section>;
};
