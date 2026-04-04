import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../schema/register";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  type IFormInput = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const submitHandler: SubmitHandler<IFormInput> = (data) => {
    console.log("Form Data : ", data);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Register</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label htmlFor="username" className="text-gray-700 font-medium">
          Username
        </label>
        <input
          type="text"
          placeholder="Eg: john_doe"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <label htmlFor="email" className="text-gray-700 font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="Eg: john.doe@example.com"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <label htmlFor="password" className="text-gray-700 font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="Eg: ********"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
          disabled={isSubmitting}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
