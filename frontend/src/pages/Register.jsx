import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "provider"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const response = await api.post("/users/register", formData);

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.message || "Registration Failed");

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Join Skill2Earn 🚀
        </h1>

        <p className="text-gray-500 mb-6">
          Create your account
        </p>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={formData.full_name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={formData.password}
            onChange={handleChange}
          />          <select
            name="role"
            className="w-full border p-3 rounded-lg"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="provider">Service Provider</option>
            <option value="client">Client</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;