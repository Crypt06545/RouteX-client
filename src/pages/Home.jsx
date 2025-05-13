import React from "react";
import Banner from "../components/Banner";
import LatestVisas from "../components/LatestVisas";

import Success from "../components/Success";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <LatestVisas />
      <Success />
    </div>
  );
};

export default Home;
