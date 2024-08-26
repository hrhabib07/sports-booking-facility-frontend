import { useLocation } from "react-router-dom";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const { selectedDate, selectedFacility, startTime, endTime } =
    location.state || {};

  //   console.log(selectedSlot, selectedFacility);
  return (
    <div>
      <h1>Confirm Your Booking</h1>
      <div>
        <p>Facility: {selectedFacility}</p>
        <p>
          Slot: {startTime} - {endTime}
        </p>
        <p>date: {selectedDate}</p>
        {/* You can add more details or actions here */}
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
