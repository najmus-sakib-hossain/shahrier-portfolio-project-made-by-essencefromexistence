import { useState } from "react";
import All from "./All";

const categoryIcons = [
  { id: "all", label: "All", icon: "/assets/life_events/all.svg" },
  { id: "work", label: "Work", icon: "/assets/life_events/work.svg" },
  { id: "education", label: "Education", icon: "/assets/life_events/education.svg" },
  { id: "meetup", label: "Meetup", icon: "/assets/life_events/meetup.svg" },
  { id: "family", label: "Family", icon: "/assets/life_events/family.svg" },
  { id: "travel", label: "Travel", icon: "/assets/life_events/travel.svg" },
  { id: "achievement", label: "Achievement", icon: "/assets/life_events/achievement.svg" },
];

const Category = ({ lifeEvents = [], categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Build categories from database if available, otherwise use default icons
  const availableCategories = categories.length > 0 
    ? [{ id: "all", label: "All", icon: "/assets/life_events/all.svg" }, ...categories.map(cat => {
        const iconData = categoryIcons.find(c => c.id.toLowerCase() === cat.toLowerCase());
        return {
          id: cat.toLowerCase(),
          label: cat,
          icon: iconData?.icon || "/assets/life_events/all.svg"
        };
      })]
    : categoryIcons;

  // Filter life events by selected category
  const filteredEvents = selectedCategory === "all" 
    ? lifeEvents 
    : lifeEvents.filter(event => event.category?.toLowerCase() === selectedCategory);

  return (
    <div className="bg-slate-950 py-12">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        {/* Category Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {availableCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-blue-600 shadow shadow-blue-500/50 scale-105"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              <div className="transition-transform duration-300 ease-in-out">
                <img
                  src={category.icon}
                  alt={category.label}
                  className="w-10 h-10"
                />
              </div>
              <p
                className={`text-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "text-white"
                    : "text-gray-300"
                }`}
              >
                {category.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content Section */}
      <div className="mt-10 text-white">
        <All lifeEvents={filteredEvents} />
      </div>
    </div>
  );
};

export default Category;
