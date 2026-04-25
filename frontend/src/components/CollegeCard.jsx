import useCollegeStore from "../store/useCollegeStore";

const CollegeCard = ({ college }) => {
  const selectedColleges = useCollegeStore(
    (state) => state.selectedColleges
  );

  const toggleCompare = useCollegeStore(
    (state) => state.toggleCompare
  );

  const isSelected = selectedColleges.some(
    (item) => item._id === college._id
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-200 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-in-out">
      
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <h2 className="text-2xl font-bold text-slate-800">
        {college.name}
      </h2>

      <p className="text-slate-500 mt-2">
        📍 {college.location}
      </p>

      <p className="mt-3 font-semibold text-slate-700">
        Fees: ₹{college.fees.toLocaleString()}
      </p>

      <p className="text-yellow-500 mt-2 font-medium">
        ⭐ {college.rating} / 5
      </p>

      <button
        onClick={() => toggleCompare(college)}
        className={`w-full mt-5 py-3 rounded-xl font-medium transition ${
          isSelected
            ? "bg-red-500 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isSelected ? "Remove Compare" : "Add to Compare"}
      </button>
    </div>
  );
};

export default CollegeCard;