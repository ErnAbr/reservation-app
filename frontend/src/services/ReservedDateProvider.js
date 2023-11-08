import { createContext, useEffect, useState } from "react";
import { getBookedDates } from "../assets/constants/constants";
import { useGet } from "./useGet";

export const ReservedContext = createContext({
  disabledTimes: [],
  setRegDateFetch: () => {},
  reservedDates: [],
  refreshDisabledTimes: () => {},
});

export const ReservedDateProvider = ({ children }) => {
  const [reservedDates, setReservedDates] = useState([]);
  const [regDateFetch, setRegDateFetch] = useState(new Date());
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const { getData, reservations } = useGet();

  const refreshDisabledTimes = () => {
    setTriggerRefresh((prev) => !prev);
  };

  const formatDateAsLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const formattedDate = formatDateAsLocalISOString(regDateFetch);
      const BOOKING_API = getBookedDates(formattedDate);
      const bookedSlots = await getData(BOOKING_API);
      setReservedDates(bookedSlots);
    };

    fetchBookedSlots();
  }, [regDateFetch, getData, triggerRefresh]);

  useEffect(() => {
    if (reservations?.bookedSlots) {
      const newDisabledTimes = reservations.bookedSlots.map((slot) => {
        const date = new Date(
          slot.year,
          slot.month - 1,
          slot.day,
          slot.hour,
          slot.minute
        );
        date.setHours(date.getHours() + 2);
        return date;
      });
      setDisabledTimes(newDisabledTimes);
    }
  }, [reservations]);

  const contextValue = {
    disabledTimes,
    setRegDateFetch,
    reservedDates,
    refreshDisabledTimes,
  };

  return (
    <ReservedContext.Provider value={contextValue}>
      {children}
    </ReservedContext.Provider>
  );
};
