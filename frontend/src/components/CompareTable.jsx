
import useCollegeStore from "../store/useCollegeStore";

const CompareTable = () => {
  const selectedColleges = useCollegeStore(
    (state) => state.selectedColleges
  );

  const clearCompare = useCollegeStore(
    (state) => state.clearCompare
  );

  if (selectedColleges.length < 2) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 mb-10 overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Compare Colleges
          </h2>
          <p className="text-slate-500 mt-1">
            Side-by-side comparison to help smarter decisions.
          </p>
        </div>

        <button
          onClick={clearCompare}
          className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
        >
          Clear Compare
        </button>
      </div>

      {/* Table */}
      <table className="w-full min-w-[800px] border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="text-left px-4 py-3 text-slate-500 font-semibold">
              Field
            </th>

            {selectedColleges.map((college) => (
              <th
                key={college._id}
                className="bg-blue-600 text-white px-4 py-3 rounded-2xl text-left"
              >
                {college.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Location */}
          <tr>
            <td className="px-4 py-3 font-semibold text-slate-700">
              Location
            </td>

            {selectedColleges.map((college) => (
              <td
                key={college._id}
                className="bg-slate-50 px-4 py-3 rounded-2xl"
              >
                📍 {college.location}
              </td>
            ))}
          </tr>

          {/* Fees */}
          <tr>
            <td className="px-4 py-3 font-semibold text-slate-700">
              Annual Fees
            </td>

            {selectedColleges.map((college) => (
              <td
                key={college._id}
                className="bg-slate-50 px-4 py-3 rounded-2xl"
              >
                ₹{college.fees?.toLocaleString()}
              </td>
            ))}
          </tr>

          {/* Rating */}
          <tr>
            <td className="px-4 py-3 font-semibold text-slate-700">
              Rating
            </td>

            {selectedColleges.map((college) => (
              <td
                key={college._id}
                className="bg-slate-50 px-4 py-3 rounded-2xl font-semibold text-yellow-500"
              >
                ⭐ {college.rating} / 5
              </td>
            ))}
          </tr>

          {/* Courses */}
          <tr>
            <td className="px-4 py-3 font-semibold text-slate-700">
              Courses
            </td>

            {selectedColleges.map((college) => (
              <td
                key={college._id}
                className="bg-slate-50 px-4 py-3 rounded-2xl"
              >
                {college.courses?.length
                  ? college.courses.join(", ")
                  : "N/A"}
              </td>
            ))}
          </tr>

          {/* Verdict */}
          <tr>
            <td className="px-4 py-3 font-semibold text-slate-700">
              Best For
            </td>

            {selectedColleges.map((college) => (
              <td
                key={college._id}
                className="bg-green-50 text-green-700 px-4 py-3 rounded-2xl font-medium"
              >
                {college.rating >= 4.7
                  ? "Top Ranked"
                  : college.fees <= 280000
                  ? "Budget Friendly"
                  : "Balanced Choice"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;