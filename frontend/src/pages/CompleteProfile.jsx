import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CompleteProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState({
   
    phone: "",
    whatsapp: "",
    profession: "",
    category: "",
    experience: "",
    price: "",
    location: "",
    availability: "Available",
    about: ""
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {

    const loadProfile = async () => {

        try {

          const check = await api.get(`/profile/check/${user.id}`);

if (!check.data.exists) {
    return;
}
            const response = await api.get(`/profile/${user.id}`);

            setProfile(response.data);

            setIsEdit(true);

        } catch (error) {

            console.log("New user. Create profile.");

        }

    };

    loadProfile();

}, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.phone.trim()) {
    alert("Phone number is required");
    return;
}

if (!profile.whatsapp.trim()) {
    alert("WhatsApp number is required");
    return;
}

if (!profile.category) {
    alert("Please select a category");
    return;
}

if (!profile.location.trim()) {
    alert("Location is required");
    return;
}

if (!profile.price.trim()) {
    alert("Service charge is required");
    return;
}

if (!profile.about.trim()) {
    alert("Please write something about yourself");
    return;
}
    setLoading(true);

    try {
      let response;

if (isEdit) {

    response = await api.put(`/profile/${user.id}`, {

        user_id:  user.id,
       
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        profession: profile.profession,
        category: profile.category,
        experience: profile.experience,
        location: profile.location,
        price: profile.price,
        about: profile.about,
       availability: profile.availability

    });

} else {

    response = await api.post("/profile", {

        user_id: user.id,

        phone: profile.phone,
        whatsapp: profile.whatsapp,
       
        category: profile.category,
        experience: profile.experience,
        location: profile.location,
        price: profile.price,
        about: profile.about,
        availability: profile.availability

    });

}
     alert(response.data.message);

navigate("/services");
    } catch (error) {
      console.error(error);
      alert("Profile creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-center">Complete Your Profile</h1>
        <p className="text-center text-gray-500 mt-2 mb-10">
          Help clients know more about your services.
        </p>

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold mb-5">Profile Photo</h2>
            <input type="file" className="w-full border rounded-lg p-3" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
             

              

              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full border rounded-lg p-3"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">WhatsApp Number</label>
                <input
                  type="text"
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  className="w-full border rounded-lg p-3"
                  value={profile.whatsapp}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Professional Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              

              <div>
                <label className="block mb-2 font-medium">Category</label>
                <select
                  name="category"
                  className="w-full border rounded-lg p-3"
                  value={profile.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Tailor">Tailor</option>
                  <option value="Driver">Driver</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Cook">Cook</option>
                  <option value="Home Cleaning">Home Cleaning</option>
                  <option value="Painter">Painter</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of Experience"
                  className="w-full border rounded-lg p-3"
                  value={profile.experience}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Service Charge</label>
                <input
                  type="text"
                  name="price"
                  placeholder="₹500/hour or ₹1000/day"
                  className="w-full border rounded-lg p-3"
                  value={profile.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="City"
                  className="w-full border rounded-lg p-3"
                  value={profile.location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Availability</label>
                <select
                  name="availability"
                  className="w-full border rounded-lg p-3"
                  value={profile.availability}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">About You</label>
            <textarea
              name="about"
              placeholder="Tell clients about yourself and your services"
              className="w-full border rounded-lg p-3"
              rows="5"
              value={profile.about}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
           {
  loading
    ? "Saving..."
    : isEdit
    ? "Update Profile"
    : "Complete Profile"
}
          </button>
        </form>
      </div>
    </div>
  );
}
          