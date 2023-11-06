import { useState } from "react";
import styles from "./styles/card.module.css";
import { Modal } from "../Modal/Modal";

export const Card = ({ reservations }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
  );
  console.log(reservations);

  const handleCancelClick = (_id) => {
    setReservationId(_id);
    setIsModalOpen(true);
  };

  const onClick = () => {
    console.log(reservationId);
  };
  return (
    <>
      {sortedReservations.length === 0 ? (
        <div>NO RESERVATIONS FOR THE DAY</div>
      ) : (
        <div className={styles.cardContainer}>
          {sortedReservations.map((reservation) => {
            return (
              <div key={reservation._id} className={styles.cardData}>
                <p>
                  <strong>First Name: </strong>
                  {reservation.firstName}
                </p>
                <p>
                  <strong>Last Name: </strong>
                  {reservation.lastName}
                </p>
                <p>
                  <strong>Phone Number: </strong>
                  {reservation.phoneNumber}
                </p>
                <p>
                  <strong>Email: </strong>
                  {reservation.email}
                </p>
                <p>
                  <strong>Visit Date: </strong>
                  {new Date(reservation.registrationDate).toLocaleString(
                    "en-GB"
                  )}
                </p>
                <button
                  onClick={() => handleCancelClick(reservation._id)}
                  type="sumbit"
                >
                  X
                </button>
              </div>
            );
          })}
          {isModalOpen && (
            <>
              <Modal setIsModalOpen={setIsModalOpen}>
                <span>Do You Really Want to Cancel a Reservation?</span>
                <div className={styles.modalBtnWrapper}>
                  <button onClick={onClick}>YES</button>
                  <button onClick={() => setIsModalOpen(false)}>NO</button>
                </div>
              </Modal>
            </>
          )}
        </div>
      )}
    </>
  );
};
