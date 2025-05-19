import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Team = () => {
  const { theme } = useContext(ThemeContext);

  const bg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800";
  const card = theme === "dark"
    ? "bg-gray-800 hover:bg-gray-700"
    : "bg-white hover:bg-gray-100";
  const textMuted = "text-green-500";

  const teamMembers = [
    {
      name: "Sarah Khan",
      role: "Senior Visa Consultant",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    },
    {
      name: "Rafiq Ahmed",
      role: "Immigration Specialist",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    },
    {
      name: "Anika Chowdhury",
      role: "Client Advisor",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    },
    {
      name: "Tariq Hossain",
      role: "Document Officer",
      img: "https://randomuser.me/api/portraits/men/52.jpg",
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    }
  ];

  return (
    <section className={`py-16 min-h-screen mt-9 px-4 ${bg}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
        <p className={`mb-12 ${textMuted} max-w-xl mx-auto`}>
          Our team of professionals is committed to making your visa journey smooth and successful.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className={`rounded-xl shadow-lg p-6 transition duration-300 ${card}`}>
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-4 border-emerald-500"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className={`text-sm ${textMuted}`}>{member.role}</p>
              <div className="flex justify-center gap-4 mt-4 text-xl text-emerald-500">
                <a href={member.linkedin}><FaLinkedin /></a>
                <a href={member.facebook}><FaFacebook /></a>
                <a href={member.twitter}><FaTwitter /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
