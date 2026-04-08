import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../schema/login";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../features/api/userapi";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../features/auth/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

function Login() {
  type IFormInput = zod.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const submitHandler: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(getUserInfo({...response.user}));
      toast.success(`${response.message}`);
      console.log("Login successful:", response);
    } catch (error: unknown) {
      toast.error(`${(error as { data: { message: string } }).data.message}`);
      reset();
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Login</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label htmlFor="username" className="text-gray-700 font-medium">
          Email
        </label>
        <input
          type="text"
          placeholder="Enter your email"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <label htmlFor="password" className="text-gray-700 font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", { required: true, maxLength: 20 })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
