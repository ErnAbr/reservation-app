import { Formik, Form } from "formik";
import * as Yup from "yup";
import { emailRegex } from "../../assets/constants/constants";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { DatePicker } from "../DatePicker/DatePicker";
import { TextErrorRadio } from "../TextError/TextErrorRadio";
import { usePost } from "../../services/usePost";
import { CLIENT_REG_API } from "../../assets/constants/constants";
import { getBookedDates } from "../../assets/constants/constants";
import { useEffect } from "react";
import { useGet } from "../../services/useGet";
import { useState } from "react";
import PropTypes from "prop-types";

export const ClientRegForm = ({ setIsModalOpen }) => {
  const { postData, data, error } = usePost();
  const { getData, reservations } = useGet();
  const [regDateFetch, setRegDateFetch] = useState(new Date());
  const [disabledTimes, setDisabledTimes] = useState([]);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    registrationDate: null,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().matches(emailRegex).required(),
    phoneNumber: Yup.string()
      .required()
      .test((value) => /^\+?\d+$/.test(value)),
    registrationDate: Yup.date().nullable().required("required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    await postData(values, CLIENT_REG_API);
    resetForm();
  };

  const formatDateAsLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (regDateFetch) {
        const formattedDate = formatDateAsLocalISOString(regDateFetch);
        const BOOKING_API = getBookedDates(formattedDate);
        await getData(BOOKING_API);
      }
    };

    if (regDateFetch) {
      fetchBookedSlots();
    }
  }, [regDateFetch, getData]);

  useEffect(() => {
    if (reservations?.bookedSlots) {
      const newDisabledTimes = reservations.bookedSlots.map((slot) => {
        const date = new Date(
          slot.year,
          slot.month,
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

  useEffect(() => {
    if (data) {
      alert(data.message);
      setIsModalOpen(false);
    } else if (error) {
      alert(error.message);
    }
  });

  return (
    <>
      <span>Register a Client for a Visit</span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Input
              labelName="First Name"
              name="firstName"
              type="text"
              id="firstName"
            />
            <Input
              labelName="Last Name"
              name="lastName"
              type="text"
              id="lastName"
            />
            <Input labelName="E-Mail" name="email" type="email" id="email" />
            <Input
              labelName="Phone Number"
              name="phoneNumber"
              type="text"
              id="phoneNumber"
            />
            <DatePicker
              name="registrationDate"
              value={values.registrationDate}
              onChange={setFieldValue}
              errorMsg={true}
              component={TextErrorRadio}
              setRegDateFetch={setRegDateFetch}
              disabledTimes={disabledTimes}
            />
            <Button
              type="submit"
              btnName="Register Client"
              className="btnStyle"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

ClientRegForm.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};
