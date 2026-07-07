import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function ProviderDetails() {

  const { id } = useParams();

  const [provider, setProvider] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProvider();

  }, []);

  const fetchProvider = async () => {

    try {

      const response = await api.get(`/providers/${id}`);

      setProvider(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load provider.");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 font-semibold">
            Loading Profile...
          </p>

        </div>

      </div>

    );

  }

  if (!provider) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <h2 className="text-2xl font-bold">
          Provider Not Found
        </h2>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        <div className="flex flex-col items-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-36 h-36 rounded-full"
          />

          <h1 className="text-4xl font-bold mt-5">

            {provider.full_name}

          </h1>

          <p className="text-blue-600 text-xl mt-2">

            {provider.category}

          </p>

        </div>
                {/* Information */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-slate-100 p-5 rounded-xl">
            <h3 className="font-semibold text-lg">Experience</h3>
            <p className="mt-2 text-gray-700">
              {provider.experience == 0
                ? "Fresher"
                : `${provider.experience} Years`}
            </p>
          </div>

          <div className="bg-slate-100 p-5 rounded-xl">
            <h3 className="font-semibold text-lg">Location</h3>
            <p className="mt-2 text-gray-700">
              {provider.location}
            </p>
          </div>

          <div className="bg-slate-100 p-5 rounded-xl">
            <h3 className="font-semibold text-lg">Service Charge</h3>
            <p className="mt-2 text-gray-700">
              ₹ {provider.price}
            </p>
          </div>

          <div className="bg-slate-100 p-5 rounded-xl">
            <h3 className="font-semibold text-lg">Availability</h3>
            <p className="mt-2 text-green-600 font-semibold">
              {provider.availability}
            </p>
          </div>

        </div>

        {/* About */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            About
          </h2>

          <p className="text-gray-700 leading-7">
            {provider.about}
          </p>

        </div>

        {/* Contact Buttons */}

        <div className="grid md:grid-cols-2 gap-4 mt-10">

          <a
            href={`tel:${provider.phone}`}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center font-semibold"
          >
            📞 Call Now
          </a>

          <a
            href={`https://wa.me/91${provider.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-semibold"
          >
            💬 WhatsApp
          </a>

        </div>

        {/* Back Button */}

        <div className="mt-8 text-center">

          <Link
            to="/services"
            className="inline-block border border-gray-400 hover:bg-gray-100 px-8 py-3 rounded-xl"
          >
            ← Back to Services
          </Link>

        </div>

      </div>

    </div>

  );

}