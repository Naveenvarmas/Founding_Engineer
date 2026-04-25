import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CollegeCard from "../components/CollegeCard";
import CompareTable from "../components/CompareTable";
import useCollegeStore from "../store/useCollegeStore";

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Input states
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [maxFees, setMaxFees] = useState("");

  // Applied filters
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    rating: "",
    maxFees: "",
  });

  const selectedColleges = useCollegeStore(
    (state) => state.selectedColleges
  );

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const res = await api.get("/colleges");
        setColleges(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadColleges();
  }, []);

  const handleApplyFilters = () => {
    setFilters({
      search,
      location,
      rating,
      maxFees,
    });
  };

  const handleResetFilters = () => {
    setSearch("");
    setLocation("");
    setRating("");
    setMaxFees("");

    setFilters({
      search: "",
      location: "",
      rating: "",
      maxFees: "",
    });
  };

  const filteredColleges = useMemo(() => {
    let result = [...colleges];

    if (filters.search) {
      result = result.filter((college) =>
        college.name
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }

    if (filters.location) {
      result = result.filter((college) =>
        college.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    if (filters.rating) {
      result = result.filter(
        (college) =>
          Number(college.rating) >= Number(filters.rating)
      );
    }

    if (filters.maxFees) {
      result = result.filter(
        (college) =>
          Number(college.fees) <= Number(filters.maxFees)
      );
    }

    return result;
  }, [colleges, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <Navbar />

      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Find & Compare Top Colleges
        </h1>

        <p className="text-slate-500 mt-3">
          Make smarter admission decisions with side-by-side comparison.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by college name"
            className="border rounded-xl px-4 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filter by location"
            className="border rounded-xl px-4 py-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="border rounded-xl px-4 py-3"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Min Rating</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
          </select>

          <select
            className="border rounded-xl px-4 py-3"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
          >
            <option value="">Max Fees</option>
            <option value="250000">₹2.5L</option>
            <option value="300000">₹3L</option>
            <option value="400000">₹4L</option>
            <option value="500000">₹5L</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={handleApplyFilters}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>

          <button
            onClick={handleResetFilters}
            className="bg-slate-200 px-6 py-3 rounded-xl hover:bg-slate-300 transition"
          >
            Reset
          </button>
        </div>

        {selectedColleges.length >= 2 && <CompareTable />}

        {loading ? (
          <p className="text-center">Loading colleges...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => (
              <CollegeCard
                key={college._id}
                college={college}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;