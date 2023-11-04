import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../services/LoginProvider";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin, data } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/client");
    }
    if (isAdmin === null || isAdmin === undefined) {
      navigate("/register");
    }
  });

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
