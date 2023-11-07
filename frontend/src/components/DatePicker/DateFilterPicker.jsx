import DateFilter from "react-datepicker";
import { registerLocale } from "react-datepicker";
import enGb from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

registerLocale("en-GB", enGb);

export const DateFilterPicker = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (date) => {
    const dateInEET = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    setSelectedDate(dateInEET);
  };

  return (
    <DateFilter
      showIcon
      dateFormat="dd/MM/yyyy"
      filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
      locale="en-GB"
      onChange={handleDateChange}
      selected={selectedDate}
    />
  );
};

DateFilterPicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  setSelectedDate: PropTypes.func.isRequired,
};
