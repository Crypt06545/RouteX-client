import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AllVisa from "../pages/AllVisa";
import AddVisa from "../pages/AddVisa";
import MyAddedVisa from "../pages/MyAddedVisa";
import VisaApplication from "../pages/VisaApplication";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/all-visas", element: <AllVisa /> },
      { path: "/add-visa", element: <AddVisa /> },
      { path: "/my-added-visas", element: <MyAddedVisa /> },
      { path: "/my-visa-applications", element: <VisaApplication /> },
      { path: "/login", element: <Login /> },
      { path: "/resister", element: <Register /> },
    ],
  },
]);

export default router;
