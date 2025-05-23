import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="font-jakarta">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <section className="">
        <Outlet />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
};

export default MainLayout;
