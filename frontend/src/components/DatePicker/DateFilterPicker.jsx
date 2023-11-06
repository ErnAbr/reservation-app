import DateFilter from "react-datepicker";
import { registerLocale } from "react-datepicker";
import enGb from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("en-GB", enGb);

export const DateFilterPicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <DateFilter
      showIcon
      dateFormat="dd/MM/yyyy"
      filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
      locale="en-GB"
      onChange={(date) => setSelectedDate(date)}
      selected={selectedDate}
    />
  );
};
