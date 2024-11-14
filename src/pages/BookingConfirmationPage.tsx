import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import { useGetSingleFacilityQuery } from "../redux/facilities/facilitiesApi";
import { convertTo12HourFormat } from "../utils/timeConversion";
import { useConfirmBookingMutation } from "../redux/booking/userBookingApi";
import { toast, Toaster } from "sonner";

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, selectedFacility, startTime, endTime } =
    location.state || {};

  const { data, isLoading } = useGetSingleFacilityQuery(selectedFacility);
  const [confirmBooking] = useConfirmBookingMutation();

  const handleBookingConfirmation = async () => {
    try {
      const bookingData = {
        facility: selectedFacility,
        date: selectedDate,
        startTime,
        endTime,
        transactionId: "abcd",
        paymentStatus: "pending",
        isBooked: "unconfirmed",
      };

      const result = await confirmBooking(bookingData).unwrap();
      window.location.href = result.data.payment_url; // Redirect to payment URL

      // Optional navigation after successful booking
      // toast.success("Your booking is successful.");
      // navigate("/successful-booking", {
      //   state: { bookingId: result?.data?._id },
      // });
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const facilityDetails = data?.data;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        title="Confirm Your Booking"
        bordered={false}
        className="w-full max-w-lg shadow-lg"
        loading={isLoading}
      >
        <Toaster />
        {facilityDetails && (
          <div className="space-y-4">
            <p className="text-lg font-semibold">
              <span className="text-custom-blue">Facility:</span>{" "}
              {facilityDetails.name}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-custom-blue">Location:</span>{" "}
              {facilityDetails.location}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-custom-blue">Slot:</span>{" "}
              {convertTo12HourFormat(startTime)} -{" "}
              {convertTo12HourFormat(endTime)}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-custom-blue">Date:</span> {selectedDate}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-custom-blue">Payment:</span>{" "}
              {facilityDetails.pricePerHour} BDT only
            </p>
            <div className="flex justify-end">
              <Link to={"/booking"} state={{ selectedDate, selectedFacility }}>
                <Button className="bg-red-500 text-white p-2 my-2 rounded hover:text-red-500 hover:bg-white border border-red-500 me-2">
                  Change Slots
                </Button>
              </Link>
              <Button
                onClick={handleBookingConfirmation}
                className="bg-custom-blue text-white p-2 my-2 rounded hover:text-custom-blue hover:bg-white border border-custom-blue"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BookingConfirmationPage;
