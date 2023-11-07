import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../services/LoginProvider";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { ClientRegForm } from "../../components/Form/ClientRegForm";
import { DateFilterPicker } from "../../components/DatePicker/DateFilterPicker";
import { getApiRouteWithDate } from "../../assets/constants/constants";
import styles from "./styles/admin.module.css";
import { useGet } from "../../services/useGet";
import { Card } from "../../components/Card/Card";

export const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isAdmin, data } = useContext(LoginContext);
  const { reservations, loading, error, getData } = useGet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/client");
    }
    if (isAdmin === null || isAdmin === undefined) {
      navigate("/register");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = selectedDate.toISOString();
      const DATE_FILTER_API = getApiRouteWithDate(formattedDate);
      await getData(DATE_FILTER_API);
      setRefreshData(false);
    };

    fetchData();
  }, [selectedDate, getData, isModalOpen, refreshData]);

  if (!data) {
    return <div>LOADING...</div>;
  }

  return (
    <section>
      <h3>Welcome {data.firstName}</h3>
      <div className={styles.adminContainter}>
        <Button
          onClick={() => setIsModalOpen(true)}
          btnName="Add Client Reservation"
          className="btnStyle"
        />
        <h4>Filter Reservation Date For Administration</h4>
        <DateFilterPicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className={styles.reservationContainer}>
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching data: {error.message}</p>}
          {reservations && (
            <Card
              setRefreshData={setRefreshData}
              reservations={reservations.result}
            />
          )}
        </div>
      </div>
      {isModalOpen && (
        <>
          <Modal setIsModalOpen={setIsModalOpen}>
            <ClientRegForm setIsModalOpen={setIsModalOpen} />
          </Modal>
        </>
      )}
    </section>
  );
};
