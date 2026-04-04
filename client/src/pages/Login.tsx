import { SubmitHandler, useForm } from "react-hook-form";

function Login() {
  interface IFormInput {
    name: string;
    email: string;
    password: string;
  }

  const { register, handleSubmit } = useForm<IFormInput>();

  const submitHandler: SubmitHandler<IFormInput> = (data) => {
    console.log("Form Data : ", data);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Login</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label htmlFor="username" className="text-gray-700 font-medium">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name", { required: true })}
        />

        <label htmlFor="password" className="text-gray-700 font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", { required: true, maxLength: 20 })}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
