import { useContext, useState } from "react";
import { LoginContext } from "../../services/LoginProvider";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";

export const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <Button
        onClick={() => setIsModalOpen(true)}
        btnName="Add Client Reservation"
        className="btnStyle"
      />

      {isModalOpen && (
        <>
          <Modal setIsModalOpen={setIsModalOpen}>TEST</Modal>
        </>
      )}
    </section>
  );
};
