

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            CollegeCompare
          </h1>
          <p className="text-sm text-slate-500">
            Compare colleges smarter
          </p>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#"
            className="text-slate-600 hover:text-blue-600 transition"
          >
            Home
          </a>

          <a
            href="#"
            className="text-slate-600 hover:text-blue-600 transition"
          >
            Compare
          </a>

          <a
            href="#"
            className="text-slate-600 hover:text-blue-600 transition"
          >
            Explore
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;