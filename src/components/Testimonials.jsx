import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Dummy review data
const reviews = [
  {
    name: "Sara Johnson",
    country: "Canada",
    image: "https://i.pravatar.cc/150?img=1",
    feedback: "This team handled my visa within days. I'm impressed by their support and service.",
  },
  {
    name: "Liam Smith",
    country: "Australia",
    image: "https://i.pravatar.cc/150?img=2",
    feedback: "Reliable and friendly consultants. I highly recommend them to everyone.",
  },
  {
    name: "Amina Khan",
    country: "UAE",
    image: "https://i.pravatar.cc/150?img=3",
    feedback: "A seamless visa process. I felt supported every step of the way.",
  },
  {
    name: "Carlos Mendoza",
    country: "Mexico",
    image: "https://i.pravatar.cc/150?img=4",
    feedback: "Outstanding service. Fast, friendly, and professional.",
  },
];

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);

  const bg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800";
  const card = theme === "dark" ? "bg-gray-800" : "bg-white";
  const iconColor = theme === "dark" ? "text-emerald-400" : "text-emerald-600";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <section className={`py-16 px-4 md:px-12 ${bg}`}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              <div className={`p-6 rounded-xl shadow-lg ${card} mx-2`}>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold">{r.name}</h4>
                    <p className="text-xs text-gray-400">{r.country}</p>
                  </div>
                </div>
                <FaQuoteLeft className={`text-xl mb-2 ${iconColor}`} />
                <p className={`text-sm italic ${textColor}`}>{r.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
