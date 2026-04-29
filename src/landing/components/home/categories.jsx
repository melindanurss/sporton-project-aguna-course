import { FiArrowRight } from "react-icons/fi";

const categories = [
  { name: "Football", icon: "⚽", bg: "bg-purple-50" },
  { name: "Badminton", icon: "🏸", bg: "bg-yellow-50" },
  { name: "Running", icon: "🏃", bg: "bg-blue-50" },
  { name: "Tennis", icon: "🎾", bg: "bg-green-50" },
  { name: "Swimming", icon: "🏊", bg: "bg-cyan-50" },
  { name: "Basketball", icon: "🏀", bg: "bg-orange-50" },
];

const Categories = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">
            Browse By <span className="text-primary">Categories</span>
          </h2>
          <a href="#" className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            <span>See All Categories</span>
            <FiArrowRight />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="group text-center cursor-pointer">
              <div className={`${cat.bg} rounded-2xl p-6 mb-3 transition-all group-hover:shadow-lg group-hover:-translate-y-1`}>
                <div className="text-5xl">{cat.icon}</div>
              </div>
              <h3 className="font-semibold text-gray-800">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;