import React from "react";
import Banner from "../components/Banner";
import LatestVisas from "../components/LatestVisas";

import Success from "../components/Success";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import VisaTypes from "../components/VisaTypes";
import Team from "./Team";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <WhyChooseUs/>
      <LatestVisas />
      <Testimonials/>
      <FAQ/>
      <VisaTypes/>
      <Success/>
      <Team/>
    </div>
  );
};

export default Home;
