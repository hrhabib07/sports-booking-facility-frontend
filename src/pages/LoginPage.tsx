import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { verifyToken } from "../utils/verifyToken";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const slotData = location?.state?.from?.state || {};

  const { register, handleSubmit } = useForm();
  const [login, { error }] = useLoginMutation();

  if (error) {
    console.log(error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (userData: any) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(userData).unwrap();
      if (res?.success) {
        toast.success("You have logged in successfully", { id: toastId });

        const verifiedToken = verifyToken(res.token);
        if (verifiedToken) {
          dispatch(
            setUser({
              user: { ...res.data, role: verifiedToken?.role },
              token: res.token,
            })
          );
        }

        navigate(from, { replace: true, state: { ...slotData } });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-custom-blue mb-4">
          Login to Your Account
        </h2>

        <div className="grid grid-cols-1 gap-4">
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
              type="password"
              {...register("password")}
            />
          </div>

          <Link className="text-custom-blue hover:underline" to={"/sign-up"}>
            New user? Sign up here
          </Link>
          <button className="p-2 bg-custom-blue text-white rounded-md">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
