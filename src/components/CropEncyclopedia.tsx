import React, { useState } from "react";
import { CROPS_DB } from "../cropData";
import { CropProfile } from "../types";
import { 
  Search, BookOpen, SlidersHorizontal, Eye, X, HelpCircle, 
  Leaf, Thermometer, Droplet, Percent, Landmark, Sun, Award, Sparkles
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid 
} from "recharts";

const getGrowthTimelineData = (crop: CropProfile) => {
  const [minTemp, maxTemp] = crop.optimalClimate.tempRange;
  const avgTemp = (minTemp + maxTemp) / 2;
  const [minRain, maxRain] = crop.optimalClimate.rainfallRange;
  
  const isCereal = crop.category === "Cereal";
  const isFruit = crop.category === "Fruit";
  
  return [
    {
      phase: "Sowing",
      "Moisture (mm)": Math.round(minRain * 0.35 + 10),
      "Nutrient Demand (%)": 15,
      "Ideal Temp (°C)": Math.round(avgTemp - (isCereal ? 2 : 1)),
    },
    {
      phase: "Vegetative",
      "Moisture (mm)": Math.round(minRain * 0.75 + 15),
      "Nutrient Demand (%)": 75,
      "Ideal Temp (°C)": Math.round(avgTemp + 1),
    },
    {
      phase: "Flowering",
      "Moisture (mm)": Math.round(minRain * 1.0 + 20),
      "Nutrient Demand (%)": 100,
      "Ideal Temp (°C)": Math.round(avgTemp + (isFruit ? 2 : 0)),
    },
    {
      phase: "Ripening",
      "Moisture (mm)": Math.round(minRain * 0.65 + 10),
      "Nutrient Demand (%)": 80,
      "Ideal Temp (°C)": Math.round(avgTemp + 0.5),
    },
    {
      phase: "Harvesting",
      "Moisture (mm)": Math.round(minRain * 0.15 + 5),
      "Nutrient Demand (%)": 12,
      "Ideal Temp (°C)": Math.round(avgTemp - 1.5),
    }
  ];
};

export default function CropEncyclopedia() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("All");
  const [selectedCrop, setSelectedCrop] = useState<CropProfile | null>(null);

  // Extract unique categories
  const categories = ["All", "Cereal", "Legume", "Fruit", "Fiber", "Cash Crop"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // Filter crops
  const filteredCrops = CROPS_DB.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          crop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || crop.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "All" || crop.difficulty === activeDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100" id="crop-encyclopedia-root">
      {/* Title & Filter Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-850 flex items-center gap-2">
            <BookOpen className="text-emerald-600 font-bold" />
            Global Crop Encyclopedia
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse the comprehensive environmental and chemical requirements for 22 vital global crop classes
          </p>
        </div>

        {/* Filters and Inputs grouping */}
        <div className="flex flex-col sm:flex-row gap-3 xl:max-w-2xl w-full">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search cereals, legumes, fruits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 text-xs font-medium text-slate-700 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="relative">
            <select
              value={activeDifficulty}
              onChange={(e) => setActiveDifficulty(e.target.value)}
              className="appearance-none h-11 px-4 pr-10 text-xs font-semibold text-slate-600 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer transition-all"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy Cultivation</option>
              <option value="Medium">Medium Cultivation</option>
              <option value="Hard">Hard/Expert</option>
            </select>
            <SlidersHorizontal className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* Category Horizontal scroll tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 shrink-0 cursor-pointer ${
              activeCategory === cat
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100/80 hover:text-slate-800"
            }`}
          >
            {cat === "All" ? "🌿 Show All" : cat}
          </button>
        ))}
      </div>

      {/* Crops Grid */}
      {filteredCrops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCrops.map((crop) => {
            const hasHighValue = crop.marketValue === "High";
            const diffColorClass = crop.difficulty === "Easy" 
              ? "text-emerald-700 bg-emerald-50 border-emerald-100" 
              : crop.difficulty === "Medium"
                ? "text-amber-700 bg-amber-50 border-amber-100"
                : "text-red-700 bg-red-50 border-red-100";

            return (
              <div 
                key={crop.id}
                className="bg-slate-50/40 hover:bg-white p-5 rounded-2xl border border-slate-100 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col justify-between h-[210px] group relative"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                      {crop.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${diffColorClass}`}>
                      {crop.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition duration-150">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 lines-clamp-3 leading-relaxed line-clamp-3">
                    {crop.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100/60 pt-3 mt-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-medium">Market Value:</span>
                    <span className={`text-[10px] font-bold ${hasHighValue ? "text-emerald-600 bg-emerald-50/50 px-1.5 py-0.5 rounded" : "text-slate-600"}`}>
                      {crop.marketValue}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCrop(crop)}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-all cursor-pointer group-hover:translate-x-0.5"
                  >
                    <Eye size={12} />
                    Inspect Needs
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-slate-100">
          <BookOpen size={30} className="mx-auto text-slate-300 mb-2" />
          <h4 className="text-sm font-bold text-slate-600">No matching crops detected</h4>
          <p className="text-xs text-slate-400 mt-1">Try modifying your search or applying other filters</p>
        </div>
      )}

      {/* Detail Inspector Drawer Panel */}
      {selectedCrop && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative border border-slate-100">
            
            {/* Close trigger button */}
            <button
              onClick={() => setSelectedCrop(null)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl transition duration-150 cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Header profile info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-2xl">
                <Leaf size={24} className="animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                    {selectedCrop.category}
                  </span>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <Award size={12} />
                    Difficulty: {selectedCrop.difficulty}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{selectedCrop.name} Requirement Profile</h3>
              </div>
            </div>

            {/* General Description */}
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl mb-6">
              {selectedCrop.description}
            </p>

            {/* Threshold Ranges Map */}
            <div className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100 flex items-center gap-1">
                <SlidersHorizontal size={12} />
                Physiological Threshold Map (N-P-K & Weather Ranges)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Nitrogen Zone */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700">Nitrogen Range (N)</span>
                    <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-black">
                      {selectedCrop.optimalSoil.nRange[0]} - {selectedCrop.optimalSoil.nRange[1]} <span className="text-[10px] font-normal text-slate-400 font-sans">mg/kg</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Nutrients zone necessary to fuel chloroplast output and vegetative shoots.</p>
                </div>

                {/* Phosphorus Zone */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700">Phosphorus Range (P)</span>
                    <span className="font-mono text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded font-black">
                      {selectedCrop.optimalSoil.pRange[0]} - {selectedCrop.optimalSoil.pRange[1]} <span className="text-[10px] font-normal text-slate-400 font-sans">mg/kg</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Enables dynamic cell division and root expansion to source moisture.</p>
                </div>

                {/* Potassium Zone */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700">Potassium Range (K)</span>
                    <span className="font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-black">
                      {selectedCrop.optimalSoil.kRange[0]} - {selectedCrop.optimalSoil.kRange[1]} <span className="text-[10px] font-normal text-slate-400 font-sans">mg/kg</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Maintains structural turgor pressure and defends cellular membranes against fungus.</p>
                </div>

                {/* Soil pH Zone */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700">Optimal pH Reaction</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-black">
                      {selectedCrop.optimalSoil.phRange[0].toFixed(1)} - {selectedCrop.optimalSoil.phRange[1].toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Ideal electrochemical soil environment to prevent heavy-metal locks and root rot.</p>
                </div>

                {/* Temperature Range */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Thermometer size={14} className="text-rose-500" />
                      Atmospheric Temperature
                    </span>
                    <span className="font-mono font-bold text-rose-700">
                      {selectedCrop.optimalClimate.tempRange[0]}°C - {selectedCrop.optimalClimate.tempRange[1]}°C
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full relative">
                    <div 
                      className="absolute h-full bg-rose-500 rounded-full"
                      style={{ 
                        left: `${(selectedCrop.optimalClimate.tempRange[0] / 45) * 100}%`,
                        width: `${((selectedCrop.optimalClimate.tempRange[1] - selectedCrop.optimalClimate.tempRange[0]) / 45) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Humidity Range */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Sun size={14} className="text-yellow-500" />
                      Climate Humidity
                    </span>
                    <span className="font-mono font-bold text-blue-700">
                      {selectedCrop.optimalClimate.humidityRange[0]}% - {selectedCrop.optimalClimate.humidityRange[1]}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full relative">
                    <div 
                      className="absolute h-full bg-blue-500 rounded-full"
                      style={{ 
                        left: `${selectedCrop.optimalClimate.humidityRange[0]}%`,
                        width: `${selectedCrop.optimalClimate.humidityRange[1] - selectedCrop.optimalClimate.humidityRange[0]}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Rainfall Volume Range */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 sm:col-span-2">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Droplet size={14} className="text-sky-500" />
                      Optimal Annual Rainfall Volume
                    </span>
                    <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {selectedCrop.optimalClimate.rainfallRange[0]}mm - {selectedCrop.optimalCropRange ? selectedCrop.optimalCropRange : selectedCrop.optimalClimate.rainfallRange[1]}mm
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full relative">
                    <div 
                      className="absolute h-full bg-sky-500 rounded-full"
                      style={{ 
                        left: `${(selectedCrop.optimalClimate.rainfallRange[0] / 300) * 100}%`,
                        width: `${((selectedCrop.optimalClimate.rainfallRange[1] - selectedCrop.optimalClimate.rainfallRange[0]) / 300) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Seasonal Timeline Visualization */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-1.5">
                <Sparkles size={16} className="text-emerald-500 animate-pulse" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Growth Cycle Timeline & Seasonal Inputs
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                A custom dynamic projection of required irrigation level, nutrient uptake sensitivity, and temperature conditions as <strong className="text-slate-800">{selectedCrop.name}</strong> progresses through its five core evolutionary phases.
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="h-[200px] w-full text-[10px]" style={{ minWidth: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={getGrowthTimelineData(selectedCrop)}
                      margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorNutrient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="phase" stroke="#64748b" fontSize={9} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#ffffff", 
                          borderColor: "#e2e8f0",
                          borderRadius: "12px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          fontSize: "11px"
                        }}
                      />
                      <Legend iconSize={8} wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                      <Area 
                        name="Required Water (mm)" 
                        type="monotone" 
                        dataKey="Moisture (mm)" 
                        stroke="#0ea5e9" 
                        fillOpacity={1} 
                        fill="url(#colorMoisture)" 
                        strokeWidth={2}
                      />
                      <Area 
                        name="Nutrient Uptake (%)" 
                        type="monotone" 
                        dataKey="Nutrient Demand (%)" 
                        stroke="#10b981" 
                        fillOpacity={1} 
                        fill="url(#colorNutrient)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick action button to dismiss */}
            <div className="mt-8 flex justify-end border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedCrop(null)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition cursor-pointer"
              >
                Close Investigator
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
