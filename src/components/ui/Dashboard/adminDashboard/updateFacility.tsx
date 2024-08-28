/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetSingleFacilityQuery,
  useUpdateFacilityMutation,
} from "../../../../redux/facilities/facilitiesApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";

const UpdateFacility = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const facilityId = location.pathname.split("/")[3];
  const { data: facilityData, isLoading } =
    useGetSingleFacilityQuery(facilityId);
  const previousFacilityInfo = facilityData?.data;

  const updateAbleField = {
    name: previousFacilityInfo?.name,
    description: previousFacilityInfo?.description,
    pricePerHour: previousFacilityInfo?.price,
    location: previousFacilityInfo?.location,
    img: previousFacilityInfo?.img,
  };

  const { register, handleSubmit, reset, setValue } = useForm();
  const [updateFacility] = useUpdateFacilityMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (previousFacilityInfo) {
      // Populate form with previous data
      Object.keys(updateAbleField).forEach((key) => {
        setValue(key, previousFacilityInfo[key]);
      });
    }
  }, [previousFacilityInfo, setValue]);

  const onSubmit = async (facilityInfo: FieldValues) => {
    const toastId = toast.loading("Updating facility...");
    setIsSubmitting(true);

    const convertedFacilityData = {
      ...facilityInfo,
      pricePerHour: Number(facilityInfo.pricePerHour),
    };
    console.log("converted data", convertedFacilityData);

    try {
      const response = await updateFacility({
        facilityId: previousFacilityInfo?._id,
        facilityData: convertedFacilityData,
      });
      if (response.data?.success) {
        toast.success("Facility updated successfully", { id: toastId });
        reset();
        navigate("/admin-dashboard");
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading previous data...</p>;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <Toaster />
      <h1 className="text-2xl font-bold text-custom-blue mb-6">
        Update Facility
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="border bg-gray-50 p-2 rounded-md"
              type="text"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              className="border bg-gray-50 p-2 rounded-md"
              type="text"
              {...register("description")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pricePerHour">Price Per Hour</label>
            <input
              id="pricePerHour"
              className="border bg-gray-50 p-2 rounded-md"
              type="number"
              {...register("pricePerHour")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              className="border bg-gray-50 p-2 rounded-md"
              type="text"
              {...register("location")}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label htmlFor="img">Image URL from imageBB</label>
            <small className="text-red-500">
              Please provide a valid URL; otherwise, it will not show on the
              website.
            </small>
            <input
              id="img"
              className="border bg-gray-50 p-2 rounded-md"
              type="text"
              {...register("img")}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`p-2 text-white rounded-md ${
            isSubmitting ? "bg-gray-400" : "bg-custom-blue"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Facility"}
        </button>
      </form>
    </div>
  );
};

export default UpdateFacility;
