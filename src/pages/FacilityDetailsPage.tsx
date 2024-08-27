import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useGetSingleFacilityQuery } from "../redux/facilities/facilitiesApi";

const FacilityDetailsPage = () => {
  const location = useLocation();
  const facilityId = location.pathname.split("/")[2];
  const { data } = useGetSingleFacilityQuery(facilityId);
  const facilityData = data?.data;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Facility Image */}
        <div>
          <img
            src={facilityData?.img}
            alt={facilityData?.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Facility Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {facilityData?.name}
            </h2>
            <p className="text-gray-600 mb-4">{facilityData?.location}</p>
            <p className="text-gray-800 text-xl font-semibold mb-4">
              ${facilityData?.pricePerHour} / hour
            </p>
            <p className="text-gray-600">{facilityData?.description}</p>
          </div>
          {/* Book Now Button */}
          <Link to={"/booking"} state={{ facilityId }}>
            <Button
              type="primary"
              size="large"
              className="mt-6 w-full lg:w-auto"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
