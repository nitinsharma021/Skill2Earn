function Register() {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Join Skill2Earn 🚀
        </h1>

        <p className="text-gray-500 mb-6">
          Create your account
        </p>

        <form className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
          />

          <select className="w-full border p-3 rounded-lg">
            <option>Freelancer</option>
            <option>Client</option>
          </select>

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;