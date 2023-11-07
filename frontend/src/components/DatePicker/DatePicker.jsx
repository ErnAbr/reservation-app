import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import enGb from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage } from "formik";
import styles from "./styles/datePicker.module.css";

registerLocale("en-GB", enGb);

export const DatePicker = ({
  name,
  value,
  onChange,
  errorMsg,
  component,
  setRegDateFetch,
  disabledTimes,
}) => {
  const startTime = setHours(setMinutes(new Date(), 0), 8);
  const endTime = setHours(setMinutes(new Date(), 0), 18);

  return (
    <div className={styles.datePickerContainer}>
      <label>Pick a Date</label>
      <div className={styles.datePickerWrapper}>
        <ReactDatePicker
          name={name}
          selected={value}
          onChange={(date) => {
            onChange(name, date);
            setRegDateFetch(date);
          }}
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={new Date()}
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          isClearable
          showYearDropdown
          locale="en-GB"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          minTime={startTime}
          maxTime={endTime}
          id="registrationDate"
          showIcon
          excludeTimes={disabledTimes}
        />
      </div>
      {errorMsg && <ErrorMessage name={name} component={component} />}
    </div>
  );
};
