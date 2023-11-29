import { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// der findes også fullcalender til react https://fullcalendar.io/docs/react 

const MyCalendar = () => {
  const [events, setEvents] = useState([
    // Sample booked slots, you can fetch this data from your backend
    {
      title: "Booked Slot 1",
      start: new Date(2023, 10, 15, 10, 0),
      end: new Date(2023, 10, 15, 12, 0)
    },
    {
      title: "Booked Slot 2",
      start: new Date(2023, 10, 20, 14, 0),
      end: new Date(2023, 10, 20, 16, 0)
    }
  ]);

  const handleSelectSlot = ({ start, end }) => {
    // Logic to handle booking a slot
    // Send a request to the backend to book the selected slot
    console.log("Selected slot:", start, end);
    // Update 'events' state to reflect the newly booked slot
    setEvents([
      ...events,
      {
        title: "New Booking",
        start,
        end
      }
    ]);
  };

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        views={["month", "week", "day"]}
        defaultView={Views.MONTH}
        onSelectSlot={handleSelectSlot}
        selectable
        step={15}
        timeslots={1}
        min={new Date(2023, 10, 1, 8, 0)} // Set your calendar's start time
        max={new Date(2023, 10, 1, 20, 0)} // Set your calendar's end time
      />
    </div>
  );
};

export default MyCalendar;
