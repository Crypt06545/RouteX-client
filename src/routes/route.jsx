import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AllVisa from "../pages/AllVisa";
import AddVisa from "../pages/AddVisa";
import MyAddedVisa from "../pages/MyAddedVisa";
import VisaApplication from "../pages/VisaApplication";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import VisaDetails from "../pages/VisaDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/all-visas",
        element: <AllVisa />,
      },
      {
        path: "/visa-details/:id",
        element: (
          <PrivateRoute>
            <VisaDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_BASE_URL}/visa-details/${params.id}`
          ),
      },
      {
        path: "/add-visa",
        element: (
          <PrivateRoute>
            <AddVisa />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-visas",
        element: (
          <PrivateRoute>
            <MyAddedVisa />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-visa-applications",
        element: (
          <PrivateRoute>
            <VisaApplication />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
