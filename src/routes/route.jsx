import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

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
import Dashboard from "../pages/Dashboard";
import Contact from "../pages/Contact";
import Team from "../pages/Team";
import AboutMe from "../pages/AboutMe";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-visas", element: <AllVisa /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/visa-details/:id", element: <VisaDetails /> },
      { path: "/team", element: <Team /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "add-visa", element: <AddVisa /> },
      { path: "my-added-visas", element: <MyAddedVisa /> },
      { path: "my-visa-applications", element: <VisaApplication /> },
      { path: "about-me", element: <AboutMe /> },
    ],
  },
]);

export default router;
