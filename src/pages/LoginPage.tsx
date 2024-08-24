import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/auth/authApi";
import { TLoginUserData } from "../types/auth.type";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "userhabib@123.com",
      password: "userhabib@123",
    },
  });
  const [login, { error }] = useLoginMutation();
  // console.log("data =>", data);
  if (error) {
    console.log(error);
  }
  const onSubmit = async (userData: TLoginUserData) => {
    const toastId = toast.loading("logging in...");
    try {
      const res = await login(userData).unwrap();
      if (res?.success) {
        toast.success("you have logged in successfully", { id: toastId });
        dispatch(setUser({ user: res.data, token: res.token }));
        const verifiedToken = verifyToken(res.token);
        console.log(verifiedToken);
        navigate("/");
      } else {
        toast.error(`{"something went wrong"}`, { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-40"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="border bg-gray-50 p-2 rounded-md "
            type="text"
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="border bg-gray-50 p-2 rounded-md "
            type="text"
            {...register("password")}
          />
        </div>
        <Link className="text-custom-blue" to={"/sign-up"}>
          new user?{" "}
        </Link>
        <button className="p-2 bg-custom-blue text-white rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
