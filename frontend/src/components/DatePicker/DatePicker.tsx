import { Input } from "@chakra-ui/react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

export type DatePickerProps = ReactDatePickerProps;

const DatePicker: React.FC<DatePickerProps> = (props) => (
  <ReactDatePicker {...props} customInput={<Input />} />
);

export default DatePicker;
