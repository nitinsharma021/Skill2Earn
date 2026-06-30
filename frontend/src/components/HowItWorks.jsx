import { FaUserPlus, FaIdCard, FaPhoneAlt } from "react-icons/fa";

export default function HowItWorks() {

    const steps = [

        {
            icon: <FaUserPlus size={40} className="text-blue-600" />,
            title: "Register",
            description: "Create your free Skill2Earn account in just a few minutes."
        },

        {
            icon: <FaIdCard size={40} className="text-blue-600" />,
            title: "Build Your Profile",
            description: "Add your skills, experience, pricing, location and contact details."
        },

        {
            icon: <FaPhoneAlt size={40} className="text-blue-600" />,
            title: "Get Contacted",
            description: "Clients discover your profile and contact you directly."
        }

    ];

    return (

        <section className="py-20 bg-gray-50">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-4">

                    How Skill2Earn Works

                </h2>

                <p className="text-center text-gray-500 mb-14">

                    Start offering your services in just three simple steps.

                </p>

                <div className="grid md:grid-cols-3 gap-8">

                    {steps.map((step, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition"
                        >

                            <div className="flex justify-center mb-5">

                                {step.icon}

                            </div>

                            <h3 className="text-2xl font-semibold mb-3">

                                {step.title}

                            </h3>

                            <p className="text-gray-600">

                                {step.description}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}