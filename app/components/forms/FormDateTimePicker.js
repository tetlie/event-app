import React, { useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

function FormDateTimePicker({ name }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setFieldValue(name, date);
  };

  return (
    <>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"datetime"}
        minimumDate={date}
        display="default"
        onChange={onChange}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormDateTimePicker;
