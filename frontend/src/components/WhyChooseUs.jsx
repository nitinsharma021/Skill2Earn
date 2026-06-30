import {
  FaSearch,
  FaMapMarkerAlt,
  FaRobot,
  FaUserShield,
} from "react-icons/fa";

const features = [
  {
    icon: <FaSearch className="text-4xl text-blue-600" />,
    title: "Easy Search",
    description:
      "Quickly find skilled service providers based on category and expertise.",
  },
  {
    icon: <FaMapMarkerAlt className="text-4xl text-blue-600" />,
    title: "Location Based",
    description:
      "Discover trusted professionals near your location.",
  },
  {
    icon: <FaRobot className="text-4xl text-blue-600" />,
    title: "AI Recommendations",
    description:
      "Get personalized service suggestions using AI.",
  },
  {
    icon: <FaUserShield className="text-4xl text-blue-600" />,
    title: "Verified Profiles",
    description:
      "View complete profiles with skills, experience and contact details.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">

          Why Choose Skill2Earn?

        </h2>

        <p className="text-center text-gray-500 mb-12">

          Everything you need to find trusted service providers in one place.

        </p>

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-slate-50 rounded-xl shadow-md p-8 text-center hover:shadow-xl transition"
            >

              <div className="flex justify-center mb-5">

                {feature.icon}

              </div>

              <h3 className="text-xl font-semibold mb-3">

                {feature.title}

              </h3>

              <p className="text-gray-600">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}