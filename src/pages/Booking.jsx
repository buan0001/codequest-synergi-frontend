import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import da from "date-fns/locale/da";
registerLocale("da", da);
setDefaultLocale("da");

export default function Booking() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <h1>Booking</h1>
      <p>Welcome to the booking page!</p>

      <DatePicker locale="da" selected={startDate} onChange={(date) => setStartDate(date)} />
    </>
  );
}
