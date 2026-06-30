function Hero() {
  return (
    <section className="bg-slate-100 py-20">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">

          Turn Skills Into Income

        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">

          Find trusted service providers for every need—from home services
          to professional expertise—all in one place.

        </p>

        {/* Search Bar */}

        <div className="flex justify-center mt-10">

          <div className="flex w-full max-w-2xl">

            <input
              type="text"
              placeholder="Search services (Teacher, Driver, Tailor...)"
              className="flex-1 p-4 rounded-l-xl border border-gray-300 outline-none"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-r-xl">

              Search

            </button>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex justify-center gap-4 mt-8 flex-wrap">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">

            Find Services

          </button>

          <button className="border border-gray-400 hover:bg-gray-200 px-8 py-3 rounded-xl">

            Become a Service Provider

          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;