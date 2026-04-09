import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../features/api/userapi";
import { toast } from "react-toastify";
import { clearUserInfo } from "../features/auth/AuthSlice";

function Header() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const Logout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(clearUserInfo());
      toast.success("Logout successful.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed: ", error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link className="text-2xl font-bold text-gray-800" to="/">
          Simple To Do
        </Link>

        <nav className="flex items-center gap-4">
          {userInfo ? (
            <>
              <span className="text-gray-600">Welcome, {userInfo.name}</span>
              <button
                className="px-4 py-2 rounded-lg cursor-pointer bg-red-600 text-white hover:bg-red-700 transition"
                onClick={() => {
                  Logout();
                }}
                disabled={isLoading}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
