import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";

function Header() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  console.log("User INFO :", userInfo);

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
              <Link
                to="/"
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </Link>
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
