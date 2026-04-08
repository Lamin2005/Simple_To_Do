import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer, Bounce } from "react-toastify";

function Layout() {
  return (
    <main className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Header />
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default Layout;
