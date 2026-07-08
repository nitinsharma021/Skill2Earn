import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Hero() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {

    if (search.trim() === "") {
      navigate("/services");
      return;
    }

    navigate(`/services?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="bg-slate-100 py-20">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Find Trusted Service Professionals Near You
        </h1>

        {/* Description */}

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Connect with teachers, drivers, electricians, plumbers,
          carpenters, tailors, mechanics, designers, developers,
          photographers, cooks, and many other skilled professionals.
          Browse profiles and contact them directly.
        </p>

        {/* Search */}

        <div className="flex justify-center mt-10">

          <div className="flex w-full max-w-2xl">

            <input
              type="text"
              placeholder="Search Teacher, Driver, Electrician..."
              className="flex-1 p-4 border border-gray-300 rounded-l-xl outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-r-xl"
            >
              Search
            </button>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex justify-center gap-4 mt-8 flex-wrap">

         

          
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold text-blue-600">100+</h2>
            <p className="mt-2 text-gray-600">
              Service Categories
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
            <p className="mt-2 text-gray-600">
              Easy Contact with Professionals
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold text-blue-600">Direct</h2>
            <p className="mt-2 text-gray-600">
              Connect Without Middlemen
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;