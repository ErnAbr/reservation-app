import { createContext, useContext, useEffect, useState } from "react";
import { getBookedDates } from "../assets/constants/constants";
import { useGet } from "./useGet";
import { LoginContext } from "./LoginProvider";

export const ReservedContext = createContext({
  disabledTimes: [],
  setRegDateFetch: () => {},
  reservedDates: [],
  refreshDisabledTimes: () => {},
  setTriggerRefresh: () => {},
});

export const ReservedDateProvider = ({ children }) => {
  const [reservedDates, setReservedDates] = useState([]);
  const [regDateFetch, setRegDateFetch] = useState(new Date());
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const { getData, reservations } = useGet();
  const { isAdmin } = useContext(LoginContext);

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
      if (isAdmin !== null) {
        const formattedDate = formatDateAsLocalISOString(regDateFetch);
        const BOOKING_API = getBookedDates(formattedDate);
        try {
          const bookedSlots = await getData(BOOKING_API);
          setReservedDates(bookedSlots);
        } catch (error) {
          console.error("Failed to fetch booked slots:", error);
        }
      }
    };

    fetchBookedSlots();
  }, [regDateFetch, getData, triggerRefresh, isAdmin]);

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
  }, [reservations, triggerRefresh]);

  const contextValue = {
    disabledTimes,
    setRegDateFetch,
    reservedDates,
    refreshDisabledTimes,
    setTriggerRefresh,
  };

  return (
    <ReservedContext.Provider value={contextValue}>
      {children}
    </ReservedContext.Provider>
  );
};
