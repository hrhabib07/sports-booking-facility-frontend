import { Button, Modal, Carousel, Rate, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteFacilityMutation,
  useGetSingleFacilityQuery,
} from "../redux/facilities/facilitiesApi";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { useState } from "react";

const { Text } = Typography;

const customerReviews = [
  {
    name: "John Doe",
    review:
      "Booking was seamless and the facility was top-notch. Highly recommend!",
    rating: 5,
  },
  {
    name: "Jane Smith",
    review:
      "Great experience! The booking process was easy and the staff was very helpful.",
    rating: 4,
  },
  {
    name: "Mark Wilson",
    review: "The facility was clean and well-maintained. Will book again.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    review: "Good value for money. The booking system is user-friendly.",
    rating: 4,
  },
];

const CustomerReview = () => {
  return (
    <div className="md:max-w-7xl mx-auto">
      <div className=" bg-gray-50 py-4 rounded-lg">
        <h2 className="text-xl font-bold text-center text-custom-blue">
          Reviews
        </h2>
        <Carousel autoplay={true} autoplaySpeed={3000}>
          {customerReviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8"
            >
              <div>
                <Rate disabled defaultValue={review.rating} className="mb-4" />
              </div>
              <div>
                <Text className="text-lg text-gray-600 italic">{`"${review.review}"`}</Text>
              </div>
              <div>
                <Text className="mt-4 font-semibold text-gray-800">
                  {review.name}
                </Text>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

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
            <div>
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
                <div className="flex gap-4">
                  <div>
                    <Link to={`/admin-dashboard/update-facility/${facilityId}`}>
                      <Button type="primary" size="large" className="">
                        Update Facility
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      danger
                      size="large"
                      onClick={showModal}
                      className=""
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
                </div>
              )}
            </div>
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

        {/* Customer Reviews Section */}
        <div className="mt-8">
          <CustomerReview />
        </div>

        {/* Location Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Location
          </h3>
          <div className="bg-gray-300 rounded-lg">
            <LoadScript googleMapsApiKey="AIzaSyA0NjeVi4tX27IWkSbTRTJNtGQ_5BXnEW0">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
