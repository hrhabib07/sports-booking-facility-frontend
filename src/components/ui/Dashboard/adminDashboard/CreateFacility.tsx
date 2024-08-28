import { FieldValues, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { useCreateFacilityMutation } from "../../../../redux/facilities/facilitiesApi";

const CreateFacility = () => {
  const { register, handleSubmit, reset } = useForm();

  const [createFacility, { data, error }] = useCreateFacilityMutation();
  console.log("data =>", data);
  if (error) {
    console.log(error);
  }
  const onSubmit = async (facilityData: FieldValues) => {
    const toastId = toast.loading("creating facility");
    // console.log(facilityData);
    const convertedFacilityData = {
      ...facilityData,
      pricePerHour: Number(facilityData.pricePerHour),
    };
    // console.log(convertedFacilityData);

    try {
      const response = await createFacility(convertedFacilityData);
      // console.log("data.success", response.data?.success);
      if (response.data?.success) {
        toast.success("Facility created successfully", { id: toastId });
        reset();
      } else {
        toast.error("something went wrong", { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <Toaster />
      <h1 className="text-2xl font-bold text-custom-blue mb-6">
        Create a New Facility
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
              className="border bg-gray-50 p-2 rounded-md "
              type="text"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              className="border bg-gray-50 p-2 rounded-md "
              type="text"
              {...register("description")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pricePerHour">Price Per Hour</label>
            <input
              id="pricePerHour"
              className="border bg-gray-50 p-2 rounded-md "
              type="number"
              {...register("pricePerHour")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              className="border bg-gray-50 p-2 rounded-md "
              type="text"
              {...register("location")}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label htmlFor="img">Image Url from imageBB</label>
            <small className="text-red-500">
              Please provide a valid url otherwise it will not show on the
              website
            </small>
            <input
              id="img"
              className="border bg-gray-50 p-2 rounded-md "
              type="text"
              {...register("img")}
            />
          </div>
        </div>

        <button className="p-2 bg-custom-blue text-white rounded-md">
          Create Facility{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateFacility;
