import MyBookings from "../components/ui/MyBooking";

const BookingPage = () => {
  return (
    <div>
      <div>
        <h2> my booking </h2>
        <MyBookings></MyBookings>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>div1</div>
        <div>dvi2</div>
      </div>
    </div>
  );
};

export default BookingPage;
