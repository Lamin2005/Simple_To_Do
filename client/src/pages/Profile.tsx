import { Link } from "react-router-dom";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../schema/updateprofile";
import { useUpdateProfileMutation } from "../features/api/userapi";
import { SubmitHandler,useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { getUserInfo } from "../features/auth/AuthSlice";


function Profile() {
  type IFormInput = zod.infer<typeof updateProfileSchema>;
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFormInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      password: "",
    },
  });

  const [updateProfile] = useUpdateProfileMutation();

  const submit : SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await updateProfile(data).unwrap();
      dispatch(getUserInfo({...response.user}));
      toast.success(`${response.message}`);
      console.log("Profile updated successfully:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          Update Profile
        </button>
      </form>
      <br />
      <p className="text-gray-600">
        This is the profile page. You can view and edit your profile information
        here.
      </p>
      <p>
        Back to{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          home page
        </Link>
        .
      </p>
    </div>
  );
}

export default Profile;
