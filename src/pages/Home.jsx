import React from "react";
import Banner from "../components/Banner";
import LatestVisas from "../components/LatestVisas";

import Contact from "../components/Contact";
import Success from "../components/Success";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <LatestVisas />
      <Success />
      <Contact />
    </div>
  );
};

export default Home;
