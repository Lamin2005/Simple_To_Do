import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/layout.tsx";
import Notelist from "./components/Notelist.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import Error from "./pages/Error.tsx";
import Profile from "./pages/Profile.tsx";
import ProtectRoute from "./pages/ProtectRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Notelist />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
