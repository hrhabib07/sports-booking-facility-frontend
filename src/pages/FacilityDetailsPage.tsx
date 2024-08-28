import { Button, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteFacilityMutation,
  useGetSingleFacilityQuery,
} from "../redux/facilities/facilitiesApi";
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

  const [deleteFacility, { data: deletedFacilityData, error }] =
    useDeleteFacilityMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("data", deletedFacilityData);
  console.log("ERROR: ", error);

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
          {userRole !== "admin" && (
            <Link to={"/booking"} state={{ facilityId }}>
              <Button
                type="primary"
                size="large"
                className="mt-6 w-full lg:w-auto"
              >
                Book Now
              </Button>
            </Link>
          )}
          {userRole === "admin" && (
            <div>
              <Link
                to={`/admin-dashboard/update-facility/${facilityId}`}
                // state={{ facilityId }}
              >
                <Button
                  type="primary"
                  size="large"
                  className="mt-6 me-4 w-full lg:w-auto"
                >
                  Update Facility
                </Button>
              </Link>

              <Button
                type="primary"
                danger
                size="large"
                onClick={showModal}
                className="mt-6 w-full lg:w-auto"
              >
                Delete Facility
              </Button>

              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Are you sure you want to delete this facility ?</p>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
