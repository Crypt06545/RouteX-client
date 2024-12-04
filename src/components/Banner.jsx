import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination } from "swiper/modules";

export default function Banner() {
  return (
    <div className="relative">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 5000, // Slide transition time (5 seconds)
          disableOnInteraction: false,
          delayOnStart: 2000, // Delay before starting autoplay (2 seconds)
        }}
      >
        <SwiperSlide>
          <div
            className="h-[500px] bg-cover bg-center" // Increased height
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/top-view-tourist-objects-frame-with-copy-space_23-2148786099.jpg?t=st=1733292870~exp=1733296470~hmac=c2e3ca76c2e97923b469bef278513b5c7ce62390265d00094ff2d6fa3426a99e&w=996)",
            }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center p-5">
              <div>
                <h2 className="text-4xl font-bold">Welcome to Our Service</h2>
                <p className="mt-2 text-lg">
                  Experience the best service with us.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-[500px] bg-cover bg-center" // Increased height
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/visa-application-composition-with-american-flag_23-2149117752.jpg?t=st=1733293470~exp=1733297070~hmac=9cbac3340f0c4618e358f8219c433dfc84631b6a8dc7663f0136e8e94f98c742&w=740)",
            }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center p-5">
              <div>
                <h2 className="text-4xl font-bold">Quality Products for You</h2>
                <p className="mt-2 text-lg">
                  Check out our premium products now.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-[500px] bg-cover bg-center" // Increased height
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/visa-application-different-countries-arrangement_23-2149117826.jpg?t=st=1733293508~exp=1733297108~hmac=1a9d3edc835286bef558b1eed5982a7ae2d5176f00ae41f6712627c7ec3d2463&w=740)",
            }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center p-5">
              <div>
                <h2 className="text-4xl font-bold">Join Us Today</h2>
                <p className="mt-2 text-lg">
                  Become a member and enjoy exclusive offers.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
}
