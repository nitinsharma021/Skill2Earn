import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const initialProfileState = {
  phone: "",
  whatsapp: "",
  category: "",
  experience: "",
  price: "",
  location: "",
  availability: "Available",
  about: "",
};

export default function CompleteProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState(initialProfileState);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [resumeDetails, setResumeDetails] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const resumeInputRef = useRef(null);

  useEffect(() => {
    if (!user.id) {
      return;
    }

    const loadProfile = async () => {
      try {
        const checkResponse = await api.get(`/profile/check/${user.id}`);
        if (!checkResponse.data.exists) {
          setIsEdit(false);
          return;
        }

        const response = await api.get(`/profile/${user.id}`);
        const data = response.data;

        setProfile({
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          category: data.category || "",
          experience: data.experience || "",
          price: data.price || "",
          location: data.location || "",
          availability: data.availability || "Available",
          about: data.about || "",
        });
        setIsEdit(true);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    loadProfile();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateProfile = () => {
    const nextErrors = {};

    if (!profile.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!profile.whatsapp.trim()) {
      nextErrors.whatsapp = "WhatsApp number is required.";
    }

    if (!profile.category.trim()) {
      nextErrors.category = "Please select a category.";
    }

    if (!profile.location.trim()) {
      nextErrors.location = "Location is required.";
    }

    if (!profile.price.trim()) {
      nextErrors.price = "Service charge is required.";
    }

    if (!profile.about.trim()) {
      nextErrors.about = "Please write something about yourself.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      setErrors((prev) => ({ ...prev, resume: "Please select a resume file." }));
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    setAiLoading(true);
    setAnalysis(null);
    setResumeDetails(null);

    try {
      const response = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const aiProfile = response.data.profile || {};

      setProfile((prev) => ({
        ...prev,
        phone: aiProfile.phone || prev.phone,
        category: aiProfile.category || prev.category,
        experience: aiProfile.experience || prev.experience,
        location: aiProfile.location || prev.location,
        price: aiProfile.price || prev.price,
        availability: aiProfile.availability || prev.availability || "Available",
        about: aiProfile.about || prev.about,
      }));

      setAnalysis(response.data.analysis || null);
      setResumeDetails(response.data.resume || null);
      setErrors((prev) => ({ ...prev, resume: "" }));
    } catch (error) {
      console.error("Resume upload failed", error);
      alert("Resume upload failed. Please try again.");
    } finally {
      setAiLoading(false);
      setResumeFile(null);
      if (resumeInputRef.current) {
        resumeInputRef.current.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        category: profile.category,
        experience: profile.experience,
        location: profile.location,
        price: profile.price,
        about: profile.about,
        availability: profile.availability,
      };

      const response = isEdit
        ? await api.put(`/profile/${user.id}`, payload)
        : await api.post("/profile", { user_id: user.id, ...payload });

      alert(response.data.message);
      navigate("/services");
    } catch (error) {
      console.error("Profile save failed", error);
      alert("Profile save failed. Please try again.");
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

        <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 mb-8 bg-blue-50">
          <h2 className="text-xl font-semibold mb-2">Upload Resume & Auto Fill</h2>
          <p className="text-gray-600 mb-4">
            Upload your resume and let AI automatically fill your profile.
          </p>

          <input
            ref={resumeInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => {
              setResumeFile(e.target.files?.[0] || null);
              setErrors((prev) => ({ ...prev, resume: "" }));
            }}
            className="w-full border rounded-lg p-3"
            disabled={aiLoading || loading}
          />
          {errors.resume && (
            <p className="mt-2 text-sm text-red-600">{errors.resume}</p>
          )}

          <button
            type="button"
            onClick={handleResumeUpload}
            disabled={aiLoading || loading}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {aiLoading ? "Analyzing resume..." : "Auto Fill with AI"}
          </button>

          {aiLoading && (
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mt-6">
              <h3 className="font-semibold">🤖 AI is analyzing your resume...</h3>
              <p className="text-sm text-gray-700 mt-2">
                Extracting profile information and generating recommendations.
              </p>
            </div>
          )}

          {!aiLoading && (analysis || resumeDetails) && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold mb-3">AI Resume Analysis</h3>
              {analysis && <p className="text-gray-700 mb-4">{analysis}</p>}
              {resumeDetails?.skills?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium">Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {resumeDetails.skills.map((skill, index) => (
                      <span
                        key={`skill-${index}`}
                        className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resumeDetails?.education?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium">Education</h4>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    {resumeDetails.education.map((item, index) => (
                      <li key={`education-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {resumeDetails?.projects?.length > 0 && (
                <div>
                  <h4 className="font-medium">Projects</h4>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    {resumeDetails.projects.map((item, index) => (
                      <li key={`project-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold mb-5">Profile Photo</h2>
            <input
              type="file"
              className="w-full border rounded-lg p-3"
              disabled={loading}
            />
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
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
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
                  disabled={loading}
                />
                {errors.whatsapp && (
                  <p className="mt-2 text-sm text-red-600">{errors.whatsapp}</p>
                )}
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
                  disabled={loading}
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
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                )}
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
                  disabled={loading}
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
                  disabled={loading}
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                )}
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
                  disabled={loading}
                />
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Availability</label>
                <select
                  name="availability"
                  className="w-full border rounded-lg p-3"
                  value={profile.availability}
                  onChange={handleChange}
                  disabled={loading}
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
              disabled={loading}
            />
            {errors.about && (
              <p className="mt-2 text-sm text-red-600">{errors.about}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Saving..." : isEdit ? "Update Profile" : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
