import { Link } from "react-router-dom";
import { Briefcase, Wrench } from "lucide-react";

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="max-w-5xl w-full">

        {/* Heading */}

        <h1 className="text-5xl font-bold text-center mb-4">
          Welcome to Skill2Earn
        </h1>

        <p className="text-center text-gray-600 text-lg mb-12">
          Which describes you best?
        </p>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* Client */}

          <Link
            to="/register?role=client"
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border hover:border-blue-600"
          >

            <div className="bg-blue-50 rounded-xl h-64 flex items-center justify-center">

              <Briefcase size={100} className="text-blue-600" />

            </div>

            <h2 className="text-3xl font-semibold mt-8">
              Client →
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Find services
            </p>

          </Link>

          {/* Professional */}

          <Link
            to="/register?role=provider"
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border hover:border-blue-600"
          >

            <div className="bg-blue-50 rounded-xl h-64 flex items-center justify-center">

              <Wrench size={100} className="text-blue-600" />

            </div>

            <h2 className="text-3xl font-semibold mt-8">
              Professional →
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Work and get hired
            </p>

          </Link>

        </div>

        <p className="text-center mt-10 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log In
          </Link>

        </p>

      </div>

    </div>
  );
}