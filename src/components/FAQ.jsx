import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const FAQ = () => {
  const { theme } = useContext(ThemeContext);

  const bg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800";
  const border = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const textColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  const faqs = [
    { q: "How long does visa approval take?", a: "Typically between 5–15 working days depending on the country." },
    { q: "Can I apply without IELTS?", a: "Yes, some countries accept alternate English proof." },
    { q: "Is your consultancy licensed?", a: "Yes, we’re a registered and government-approved agency." },
  ];

  return (
    <section className={`py-16 px-4 ${bg}`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className={`mb-6 border-b pb-4 ${border}`}>
            <h4 className="font-semibold text-lg">{faq.q}</h4>
            <p className={`text-sm mt-2 ${textColor}`}>{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
