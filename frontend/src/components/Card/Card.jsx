import { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./styles/card.module.css";
import { Modal } from "../Modal/Modal";
import { deleteApiRouteWithId } from "../../assets/constants/constants";
import { useDelete } from "../../services/useDelete";
import PropTypes from "prop-types";
import { ReservedContext } from "../../services/ReservedDateProvider";
import { DatePicker } from "../DatePicker/DatePicker";
import { CLIENT_PUT_API } from "../../assets/constants/constants";
import { usePut } from "../../services/usePut";

export const Card = ({ reservations, setRefreshData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateReservationModal, setUpdateReservationModal] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const { error, deleteData, deleteResult, setDeleteResult, setError } =
    useDelete();
  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
  );
  const { putData, data, putError } = usePut();
  const { refreshDisabledTimes, disabledTimes } = useContext(ReservedContext);

  const initialValues = {
    registrationDate: null,
  };

  const validationSchema = Yup.object().shape({
    registrationDate: Yup.date().nullable().required("required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const changeReservetionData = {
      _id: reservationId,
      values: values,
    };
    await putData(changeReservetionData, CLIENT_PUT_API);
    resetForm();
    refreshDisabledTimes();
    setRefreshData(true);
    setUpdateReservationModal(false);
  };

  const handleReservationChangeClick = (id) => {
    setReservationId(id);
    setUpdateReservationModal(true);
  };

  const handleCancelClick = (id) => {
    setReservationId(id);
    setIsModalOpen(true);
  };

  const handleReservationDelete = async () => {
    const DELETE_RESERVATION_API = deleteApiRouteWithId(reservationId);
    await deleteData(DELETE_RESERVATION_API);
    refreshDisabledTimes();
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

  useEffect(() => {
    if (data) {
      alert(data.message);
    } else if (putError) {
      alert(putError.message);
    }
  }, [data, putError]);

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
                <div className={styles.cardBtnWrapper}>
                  <button
                    onClick={() => handleCancelClick(reservation._id)}
                    type="sumbit"
                  >
                    Cancel Reservation
                  </button>
                  <button
                    onClick={() =>
                      handleReservationChangeClick(reservation._id)
                    }
                    type="sumbit"
                  >
                    Change Reservation
                  </button>
                </div>
              </div>
            );
          })}
          {isModalOpen && (
            <>
              <Modal closeModal={() => setIsModalOpen(false)}>
                <span>Do You Really Want to Cancel a Reservation?</span>
                <div className={styles.modalBtnWrapper}>
                  <button onClick={handleReservationDelete}>YES</button>
                  <button onClick={() => setIsModalOpen(false)}>NO</button>
                </div>
              </Modal>
            </>
          )}
          {updateReservationModal && (
            <>
              <Modal closeModal={() => setUpdateReservationModal(false)}>
                <span>Change Client Reservation Date</span>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ setFieldValue, values }) => (
                    <Form>
                      <DatePicker
                        name="registrationDate"
                        value={values.registrationDate}
                        onChange={setFieldValue}
                        disabledTimes={disabledTimes}
                      />
                      <div className={styles.modalBtnWrapper}>
                        <button type="submit">Update Date</button>
                        <button
                          onClick={() => setUpdateReservationModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal>
            </>
          )}
        </div>
      )}
    </>
  );
};

Card.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      registrationDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  setRefreshData: PropTypes.func.isRequired,
};
