import { useEffect, useState } from "react";
import styles from "./styles/card.module.css";
import { Modal } from "../Modal/Modal";
import { deleteApiRouteWithId } from "../../assets/constants/constants";
import { useDelete } from "../../services/useDelete";

export const Card = ({ reservations, setRefreshData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const { error, deleteData, deleteResult, setDeleteResult, setError } =
    useDelete();
  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
  );

  const handleCancelClick = (id) => {
    setReservationId(id);
    setIsModalOpen(true);
  };

  const handleReservationDelete = async () => {
    console.log(reservationId);
    const DELETE_RESERVATION_API = deleteApiRouteWithId(reservationId);
    await deleteData(DELETE_RESERVATION_API);
    setRefreshData(true);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (deleteResult) {
      alert(deleteResult);
      setDeleteResult(null);
    } else if (error) {
      alert(error);
      setError(null);
    }
  }, [deleteResult, error, setDeleteResult, setError]);

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
                  Cancel Reservation
                </button>
              </div>
            );
          })}
          {isModalOpen && (
            <>
              <Modal setIsModalOpen={setIsModalOpen}>
                <span>Do You Really Want to Cancel a Reservation?</span>
                <div className={styles.modalBtnWrapper}>
                  <button onClick={handleReservationDelete}>YES</button>
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
