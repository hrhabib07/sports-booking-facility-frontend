import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUserSignUpMutation } from "../redux/auth/authApi";
import { toast, Toaster } from "sonner";

const SignUpPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [userSignUp, { data, error }] = useUserSignUpMutation();
  console.log("data =>", data);
  if (error) {
    console.log(error);
  }
  const onSubmit = async (userData: FieldValues) => {
    const toastId = toast.loading("creating user");

    const registerUserData = {
      ...userData,
      role: "user",
    };
    try {
      const response = await userSignUp(registerUserData);
      if (response?.data?.success) {
        toast.success("user created successfully", { id: toastId });
        navigate("/login");
      } else {
        toast.error("something went wrong", { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="border bg-gray-50 p-2 rounded-md "
              type="text"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="border bg-gray-50 p-2 rounded-md "
              type="text"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              className="border bg-gray-50 p-2 rounded-md "
              type="text"
              {...register("phone")}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              className="border bg-gray-50 p-2 rounded-md "
              type="text"
              {...register("address")}
            />
          </div>
        </div>

        <Link className="text-custom-blue" to={"/login"}>
          already have account?{" "}
        </Link>
        <button className="p-2 bg-custom-blue text-white rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
