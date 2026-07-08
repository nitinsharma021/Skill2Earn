import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();

  };

  return (

    <nav className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/">

          <h1 className="text-2xl font-bold text-blue-600">
            Skill2Earn
          </h1>

        </Link>

        <div className="flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/services"
            className="hover:text-blue-600"
          >
            Browse Services
          </Link>

          {user ? (

            <>

              {user.role === "provider" && (

                <Link
                  to="/complete-profile"
                  className="hover:text-blue-600"
                >
                  Edit Profile
                </Link>

              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link to="/login">

                <button className="px-4 py-2 border rounded-lg">
                  Login
                </button>

              </Link>

              <Link
                to="/join"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Join
              </Link>

            </>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;