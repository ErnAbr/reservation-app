import { useContext } from "react";
import { LoginContext } from "../../services/LoginProvider";

export const Admin = () => {
  const { isAdmin, data } = useContext(LoginContext);

  if (!isAdmin || isAdmin === null || isAdmin === undefined) {
    return <div>Access Denied</div>;
  }

  if (!data) {
    return <div>LOADING...</div>;
  }

  return (
    <section>
      <h4>Welcome {data.firstName}</h4>
    </section>
  );
};
