import { useEffect, useState } from "react";
import api from "../services/api";
import ProviderCard from "../components/ProviderCard";

export default function BrowseServices() {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await api.get("/providers");

      setProviders(response.data);
      setFilteredProviders(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to load service providers."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = providers.filter((provider) => {
      const name = (provider.full_name || "").toLowerCase();
      const category = (provider.category || "").toLowerCase();
      const location = (provider.location || "").toLowerCase();
      const keyword = value.toLowerCase();

      return (
        name.includes(keyword) ||
        category.includes(keyword) ||
        location.includes(keyword)
      );
    });

    setFilteredProviders(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-xl font-semibold">
            Loading Service Providers...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-center">
          Find Skilled Professionals
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Search trusted service providers near you.
        </p>

        {/* Search */}

        <div className="max-w-3xl mx-auto mb-10">

          <input
            type="text"
            placeholder="Search by name, category or location..."
            className="w-full border border-gray-300 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={handleSearch}
          />

        </div>

        {/* Providers */}

        {filteredProviders.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
              />
            ))}

          </div>

        ) : (

          <div className="text-center mt-20">

            <h2 className="text-3xl font-bold">
              No Service Providers Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching with another profession or location.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}