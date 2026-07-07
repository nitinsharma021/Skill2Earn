import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600">
            Skill2Earn
          </h1>
        </Link>

        <div className="flex gap-6 items-center">

          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/gigs" className="hover:text-blue-600">
            Browse Services
          </Link>

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

        </div>

      </div>
    </nav>
  );
}

export default Navbar;