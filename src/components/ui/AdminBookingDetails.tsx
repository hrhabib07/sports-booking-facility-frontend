import { useLocation } from "react-router-dom";

const AdminBookingDetails = () => {
  const location = useLocation();
  const bookingId = location.pathname.split("/")[3];
  console.log(bookingId);
  return (
    <div>
      <h1>Hello, From AdminBookingDetails!</h1>
    </div>
  );
};

export default AdminBookingDetails;
