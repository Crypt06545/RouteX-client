import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

// Import Simple Typewriter
import { Typewriter } from "react-simple-typewriter";

export default function Banner() {
  return (
    <div className="relative">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-[500px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/top-view-tourist-objects-frame-with-copy-space_23-2148786099.jpg?w=996)",
            }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center p-5">
              <div>
                <h2 className="text-4xl font-bold">
                  <Typewriter
                    words={["Simplify Your Visa Process"]}
                    loop={false}
                    cursor
                  />
                </h2>
                <p className="mt-2 text-lg">
                  Apply for tourist, student, or work visas with ease. Let us
                  handle the complexity for you.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-[500px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/visa-application-composition-with-american-flag_23-2149117752.jpg?w=740)",
            }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center p-5">
              <div>
                <h2 className="text-4xl font-bold">
                  <Typewriter
                    words={["Explore Opportunities Worldwide"]}
                    loop={false}
                    cursor
                  />
                </h2>
                <p className="mt-2 text-lg">
                  Unlock global opportunities with our expert visa consultancy
                  services tailored for every need.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-[500px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/visa-application-different-countries-arrangement_23-2149117826.jpg?w=740)",
            }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center p-5">
              <div>
                <h2 className="text-4xl font-bold">
                  <Typewriter
                    words={["Join Thousands of Happy Clients"]}
                    loop={false}
                    cursor
                  />
                </h2>
                <p className="mt-2 text-lg">
                  Trusted by thousands, we provide seamless visa assistance for
                  individuals and businesses alike.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
