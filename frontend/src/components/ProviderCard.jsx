import { Link } from "react-router-dom";

export default function ProviderCard({ provider }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6">

      {/* Profile Image */}

      <div className="flex justify-center">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Provider"
          className="w-24 h-24 rounded-full border"
        />

      </div>

      {/* Name */}

      <h2 className="text-2xl font-bold text-center mt-4">
        {provider.full_name}
      </h2>

      {/* Category */}

      <p className="text-center text-blue-600 font-medium">
        {provider.category}
      </p>

      {/* Information */}

      <div className="mt-6 space-y-3 text-gray-700">

        <p>
          📍 <span className="font-medium">{provider.location}</span>
        </p>

        <p>
          ⭐{" "}
          {provider.experience == 0
            ? "Fresher"
            : `${provider.experience} Years Experience`}
        </p>

        <p>
          💰 ₹ {provider.price}
        </p>

        <p className="line-clamp-2 text-gray-600">
          {provider.about}
        </p>

      </div>

      {/* View Profile Button */}

      <div className="mt-6">

        <Link
          to={`/provider/${provider.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold transition"
        >
          View Profile
        </Link>

      </div>

    </div>
  );
}