import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

export default function Banner() {
  const slides = [
    {
      id: 1,
      title: "Simplify Your Visa Process",
      description: "Apply for tourist, student, or work visas with ease. Let us handle the complexity for you.",
      image: "https://img.freepik.com/free-photo/top-view-tourist-objects-frame-with-copy-space_23-2148786099.jpg?w=996",
      cta: "Apply Now"
    },
    {
      id: 2,
      title: "Explore Opportunities Worldwide",
      description: "Unlock global opportunities with our expert visa consultancy services tailored for every need.",
      image: "https://img.freepik.com/free-photo/visa-application-composition-with-american-flag_23-2149117752.jpg?w=740",
      cta: "Discover More"
    },
    {
      id: 3,
      title: "Join Thousands of Happy Clients",
      description: "Trusted by thousands, we provide seamless visa assistance for individuals and businesses alike.",
      image: "https://img.freepik.com/free-photo/visa-application-different-countries-arrangement_23-2149117826.jpg?w=740",
      cta: "Get Started"
    }
  ];

  return (
    <div className="flex justify-center w-full pt-20 pb-8"> {/* Added pt-20 for top padding below navbar */}
      <div className="w-[90%] max-w-7xl rounded-xl overflow-hidden shadow-xl">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className} bg-[#83CD20]"></span>`;
            }
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          speed={1000}
          className="h-[500px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="h-full w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="container mx-auto px-6 lg:px-16 text-white">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <Typewriter
                          words={[slide.title]}
                          loop={false}
                          cursor
                          cursorStyle="|"
                          typeSpeed={70}
                          deleteSpeed={50}
                        />
                      </h2>
                      <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                      <button className="bg-[#83CD20] hover:bg-[#034833] text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}