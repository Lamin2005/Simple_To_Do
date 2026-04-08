import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link className="text-2xl font-bold text-gray-800" to="/">
          Simple To Do
        </Link>

        <nav className="flex items-center gap-4">
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
        </nav>
      </div>
    </header>
  );
}

export default Header;
