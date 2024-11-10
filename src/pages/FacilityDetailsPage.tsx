import { Button, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteFacilityMutation,
  useGetSingleFacilityQuery,
} from "../redux/facilities/facilitiesApi";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { useState } from "react";

const FacilityDetailsPage = () => {
  const location = useLocation();
  const facilityId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { data } = useGetSingleFacilityQuery(facilityId);
  const facilityData = data?.data;
  const auth = useAppSelector((state) => state.auth);
  const verifiedToken = verifyToken(auth?.token as string);
  const userRole = verifiedToken?.role;

  const [deleteFacility] = useDeleteFacilityMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    deleteFacility(facilityId);
    navigate("/admin-dashboard");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const mapContainerStyle = {
    height: "300px",
    width: "100%",
  };

  const center = {
    lat: 51.505,
    lng: -0.09,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Facility Image */}
          <div>
            <img
              src={facilityData?.img}
              alt={facilityData?.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Facility Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {facilityData?.name}
              </h2>
              <p className="text-gray-600 mb-2">{facilityData?.location}</p>
              <p className="text-gray-800 text-xl font-semibold mb-4">
                ${facilityData?.pricePerHour} / hour
              </p>
              <p className="text-gray-600 mb-6">{facilityData?.description}</p>
            </div>
            {userRole !== "admin" && (
              <Link to={"/booking"} state={{ facilityId }}>
                <Button
                  type="primary"
                  size="large"
                  className="mt-4 w-full lg:w-auto"
                >
                  Book Now
                </Button>
              </Link>
            )}
            {userRole === "admin" && (
              <div className="flex flex-col gap-4">
                <Link to={`/admin-dashboard/update-facility/${facilityId}`}>
                  <Button
                    type="primary"
                    size="large"
                    className="w-full lg:w-auto"
                  >
                    Update Facility
                  </Button>
                </Link>
                <Button
                  type="primary"
                  danger
                  size="large"
                  onClick={showModal}
                  className="w-full lg:w-auto"
                >
                  Delete Facility
                </Button>
                <Modal
                  title="Confirm Deletion"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Are you sure you want to delete this facility?</p>
                </Modal>
              </div>
            )}
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Amenities
          </h3>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600">
            <li>Free Wi-Fi</li>
            <li>Parking Available</li>
            <li>Air Conditioning</li>
            <li>Audio/Visual Equipment</li>
            <li>Whiteboards</li>
            <li>Coffee/Tea</li>
          </ul>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-800 font-semibold">John Doe</p>
              <p className="text-gray-600">
                "Excellent space with all necessary amenities!"
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-800 font-semibold">Jane Smith</p>
              <p className="text-gray-600">
                "The facility was clean and well-organized."
              </p>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-8 ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Location
          </h3>
          <div className=" bg-gray-300 rounded-lg">
            {/* Ideally, add a map component here */}
            <LoadScript googleMapsApiKey="AIzaSyA0NjeVi4tX27IWkSbTRTJNtGQ_5BXnEW0">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
            {/* <p className="text-gray-600 text-center pt-24">Map Placeholder</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
