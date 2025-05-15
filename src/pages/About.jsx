import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const About = () => {
  const { theme } = useContext(ThemeContext);

  // Theme classes
  const containerClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800";
  const headingClass =
    theme === "dark" ? "text-emerald-400" : "text-emerald-600";
  const sectionBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`${containerClass} mt-10 py-12 px-4 sm:px-6 lg:px-8 min-h-screen`}>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section 1: About Our Mission */}
        <section
          className={`rounded-lg shadow-md p-6 md:flex items-center gap-8 ${sectionBgClass} border ${borderColor}`}
        >
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="Our Mission"
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="mt-6 md:mt-0 md:w-1/2">
            <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
              Our Mission
            </h2>
            <p className="text-base leading-relaxed">
              At GlobalVisa, our mission is to simplify international travel and
              migration. Whether you're a tourist, student, or official, we
              provide expert guidance and a streamlined application process to
              make your visa journey stress-free and successful.
            </p>
          </div>
        </section>

        {/* Section 2: How We Help */}
        <section
          className={`rounded-lg shadow-md p-6 md:flex flex-row-reverse items-center gap-8 ${sectionBgClass} border ${borderColor}`}
        >
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="How We Help"
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="mt-6 md:mt-0 md:w-1/2">
            <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
              How We Help
            </h2>
            <p className="text-base leading-relaxed">
              We analyze your needs, match you with the best visa options, and
              walk you through every step. From documents to deadlines, our
              experts ensure you're always one step ahead.
            </p>
          </div>
        </section>

        {/* Section 3: Trusted by Thousands */}
        <section
          className={`rounded-lg shadow-md p-6 md:flex items-center gap-8 ${sectionBgClass} border ${borderColor}`}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="Trusted Clients"
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="mt-6 md:mt-0 md:w-1/2">
            <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
              Trusted by Thousands
            </h2>
            <p className="text-base leading-relaxed">
              Over 50,000 successful visas and counting! Our team is dedicated to
              building trust with every application. Join thousands of satisfied
              clients who've reached their destination with us.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;