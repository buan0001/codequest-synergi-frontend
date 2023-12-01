import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import da from "date-fns/locale/da";
import { setHours, setMinutes } from "date-fns";
registerLocale("da", da);
setDefaultLocale("da");
setHours;

export default function Booking() {
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 0), 0));
  return (
    <>
      <h1>Booking</h1>
      <p>Welcome to the booking page!</p>

      <DatePicker
        locale="da"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        injectTimes={[setHours(setMinutes(new Date(), 1), 0), setHours(setMinutes(new Date(), 5), 12), setHours(setMinutes(new Date(), 59), 23)]}
        dateFormat="dd/MM/yyyy HH:mm"
      />
    </>
  );
}
