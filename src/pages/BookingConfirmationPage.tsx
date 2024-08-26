import { useLocation } from "react-router-dom";
import { Card, Button } from "antd";
import { useGetSingleFacilityQuery } from "../redux/facilities/facilitiesApi";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const { selectedDate, selectedFacility, startTime, endTime } =
    location.state || {};

  const { data } = useGetSingleFacilityQuery(selectedFacility);
  // console.log(data.data);
  const facilityDetails = data?.data;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        title="Confirm Your Booking"
        bordered={false}
        className="w-full max-w-lg shadow-lg"
      >
        <div className="space-y-4">
          <p className="text-lg font-semibold">
            <span className="text-custom-blue">Facility:</span>{" "}
            {facilityDetails.name}
          </p>
          <p className="text-lg font-semibold">
            <span className="text-custom-blue">Slot:</span> {startTime} -{" "}
            {endTime}
          </p>
          <p className="text-lg font-semibold">
            <span className="text-custom-blue">Date:</span> {selectedDate}
          </p>
          <p className="text-lg font-semibold">
            <span className="text-custom-blue">Payment:</span> 500 BDT only
          </p>
          <div className="flex justify-end">
            <Button
              type="primary"
              className="bg-custom-blue text-white p-2 my-2 rounded hover:text-custom-blue hover:bg-white border border-custom-blue"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingConfirmationPage;
