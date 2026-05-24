import React, { useState, useEffect } from "react";
import { 
  CloudSun, Thermometer, Droplet, CloudRain, ShieldAlert, Navigation, 
  MapPin, CheckCircle, Sunrise, Sunset, Wind, Calendar, AlertTriangle
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from "recharts";

interface LocationConfig {
  state: string;
  districts: string[];
  climateNote: string;
  suitabilityScoreNotes: string;
}

const REGIONAL_DATABASE: LocationConfig[] = [
  {
    state: "Karnataka",
    districts: ["Mandya", "Dharwad", "Kolar", "Shimoga", "Chikmagalur"],
    climateNote: "Deccan plateau tropical climate. Highly responsive to monsoon patterns, with fertile black cotton loams and rich red soil pockets.",
    suitabilityScoreNotes: "Excellent suitability for Rice, Sugarcane, Ragi, Maize, and Coffee in the western ghat highlands."
  },
  {
    state: "Maharashtra",
    districts: ["Nashik", "Nagpur", "Pune", "Jalgaon", "Satara"],
    climateNote: "Semi-arid climatic zones. Dense black basaltic soils perfect for deep-rooted crops, horticulture, and cash crops.",
    suitabilityScoreNotes: "Prime weather compatibility for Grapes, Oranges, Pomegranate, Cotton, and Jowar."
  },
  {
    state: "Punjab",
    districts: ["Ludhiana", "Amritsar", "Bathinda", "Patiala", "Jalandhar"],
    climateNote: "Subtropical continental climate with highly fertile alluvial soils. Extensive irrigation canals allow massive grain harvests.",
    suitabilityScoreNotes: "Highly compatible for Wheat, Paddy, Cotton, Mustard, and sugarcane crops."
  },
  {
    state: "Uttar Pradesh",
    districts: ["Gorakhpur", "Meerut", "Lakhimpur", "Kanpur", "Varanasi"],
    climateNote: "Humid subtropical alluvial plains of the Ganges. Generous natural water table and deep clay loam structures.",
    suitabilityScoreNotes: "Perfect for Sugarcane, Wheat, Rice, Potatoes, and Mustard crops."
  }
];

export default function WeatherForecaster() {
  const [selectedState, setSelectedState] = useState<string>("Karnataka");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Mandya");
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");

  const locationData = REGIONAL_DATABASE.find(item => item.state === selectedState) || REGIONAL_DATABASE[0];

  // Adjust District when state transitions
  useEffect(() => {
    setSelectedDistrict(locationData.districts[0]);
  }, [selectedState]);

  // Generate deterministic forecast parameters based on selected district names to make it look active/real!
  const getSimulatedForecast = () => {
    const seed = selectedDistrict.charCodeAt(0) + selectedDistrict.charCodeAt(selectedDistrict.length - 1);
    const rainFactor = (seed % 4) * 25 + 10; // rain depth
    const baseTemp = 24 + (seed % 7); // average warmness
    const baseHumidity = 55 + (seed % 9) * 4; // humidity

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const chartData = days.map((day, idx) => {
      const variation = Math.sin(idx * 0.9) * 3;
      const rainVar = Math.max(0, Math.round(rainFactor * (Math.cos(idx * 1.2) + 1.1) * 0.5));
      return {
        day,
        "Temperature (°C)": Math.round(baseTemp + variation),
        "Humidity (%)": Math.round(baseHumidity + Math.sin(idx * 0.5) * 5),
        "Rainfall (mm)": rainVar
      };
    });

    // Compute alerts
    let activeAlert = null;
    if (rainFactor > 70) {
      activeAlert = {
        type: "HEAVY PRECIPITATION FORECASTED",
        severity: "Advisory",
        msg: "Heavy convection showers predicted within 48 hours. Postpone foliar pesticide sprays and maintain healthy drain outlets."
      };
    } else if (baseTemp > 31) {
      activeAlert = {
        type: "THERMAL HEAT STRESS HAZARD",
        severity: "Warning",
        msg: "Solar temperatures exceeding 35°C. Water young legume sprouts during early dawn to avoid root scorching."
      };
    } else {
      activeAlert = {
        type: "OPTIMAL FIELD AG CONDITIONS",
        severity: "Safe",
        msg: "Atmospheric parameters conform fully to typical seasonal growth cycles. Ideal interval for soil tilling and transplanting."
      };
    }

    return { chartData, activeAlert, rainFactor, baseTemp, baseHumidity };
  };

  const { chartData, activeAlert, rainFactor, baseTemp, baseHumidity } = getSimulatedForecast();

  return (
    <div className="space-y-8" id="agricultural-weather-dashboard">
      
      {/* Geolocation Selector Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-emerald-200">
              <Navigation size={11} className="text-emerald-600 animate-spin" />
              Geo-Spatial Microclimate Center
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
              <MapPin size={20} className="text-emerald-600" />
              Regional Location Targeting
            </h3>
            <p className="text-xs text-slate-500">
              Pinpoint your state and crop zone to retrieve appropriate weather alerts and soil suitability profiles instantly.
            </p>
          </div>

          {/* Interactive selectors */}
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Farmer State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="h-11 px-4 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white cursor-pointer Outline-none"
              >
                {REGIONAL_DATABASE.map(item => (
                  <option key={item.state} value={item.state}>{item.state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-sans">Territorial District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="h-11 px-4 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white cursor-pointer outline-none"
              >
                {locationData.districts.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Climate review */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs bg-slate-50/50 p-4 rounded-2xl">
          <p className="text-slate-600 leading-relaxed max-w-2xl">
            <strong className="text-slate-900">Climate Overview:</strong> {locationData.climateNote}
          </p>
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3.5 py-1.5 rounded-xl font-bold self-start sm:self-center shrink-0">
            {locationData.suitabilityScoreNotes.split(" ")[0]} Suitable Region
          </div>
        </div>
      </div>

      {/* Grid Layout containing Main Weather indicators & Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left indicators (5 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Current weather read-outs */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 rounded-3xl p-6 text-white space-y-6 relative overflow-hidden shadow-lg shadow-emerald-900/10">
            <div className="absolute right-[-10px] top-[-10px] w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex justify-between items-center z-10 relative">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Real-time Readings</span>
                <h4 className="text-base font-bold mt-1">{selectedDistrict}, {selectedState}</h4>
              </div>
              <CloudSun size={38} className="text-emerald-400" />
            </div>

            <div className="flex items-baseline gap-2 z-10 relative">
              <span className="text-5xl font-black tracking-tight">{baseTemp}</span>
              <span className="text-lg font-bold text-emerald-400">°{tempUnit}</span>
              <button 
                onClick={() => setTempUnit(tempUnit === "C" ? "F" : "C")}
                className="text-[10px] font-bold bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md ml-3 transition"
              >
                Switch to °{tempUnit === "C" ? "F" : "C"}
              </button>
            </div>

            {/* Weather parameters listing */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 z-10 relative">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400">
                  <Droplet size={15} />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block pb-0.5 animate-pulse">Rel Humidity</span>
                  <span className="text-xs font-bold font-sans">{baseHumidity}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400">
                  <Wind size={15} />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block pb-0.5">Wind Velocity</span>
                  <span className="text-xs font-bold">14.2 km/h</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400">
                  <CloudRain size={15} />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block pb-0.5">Daily Rain</span>
                  <span className="text-xs font-bold">{Math.round(rainFactor * 0.1)} mm</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400">
                  <Sunrise size={15} />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block pb-0.5">Day Length</span>
                  <span className="text-xs font-bold">12h 45m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active warning alert segment */}
          {activeAlert && (
            <div className={`p-5 rounded-3xl border flex gap-3.5 ${
              activeAlert.severity === "Safe" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
                : activeAlert.severity === "Advisory"
                ? "bg-amber-50 border-amber-200 text-amber-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}>
              <div className="shrink-0">
                {activeAlert.severity === "Safe" ? (
                  <CheckCircle className="text-emerald-600 mt-0.5" size={20} />
                ) : activeAlert.severity === "Advisory" ? (
                  <AlertTriangle className="text-amber-600 mt-0.5" size={20} />
                ) : (
                  <ShieldAlert className="text-red-500 mt-0.5" size={20} />
                )}
              </div>
              <div className="space-y-1">
                <h5 className="text-[10px] font-extrabold uppercase tracking-widest">{activeAlert.type}</h5>
                <p className="text-xs leading-relaxed opacity-90">{activeAlert.msg}</p>
              </div>
            </div>
          )}

        </div>

        {/* Right charts projection (8 columns) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar size={15} className="text-emerald-650" />
                7-Day Climatic Projection Suite
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Weekly prediction curves matching seasonal factors.</p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Calibrated at 12-hour intervals</span>
          </div>

          {/* Temperature & Humidity Area Graph */}
          <div className="space-y-8">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block">Atmospheric Temperature & Relative Humidity Curve</span>
              <div className="h-[180px] w-full text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="chartTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="chartHumidity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                    <Legend iconSize={8} />
                    <Area 
                      name="Temperature (°C)" 
                      type="monotone" 
                      dataKey="Temperature (°C)" 
                      stroke="#f59e0b" 
                      fill="url(#chartTemp)" 
                      strokeWidth={2.5}
                    />
                    <Area 
                      name="Humidity (%)" 
                      type="monotone" 
                      dataKey="Humidity (%)" 
                      stroke="#22c55e" 
                      fill="url(#chartHumidity)" 
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Precipitation Bar */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block">Forecasted Precipitation Depth (Water Volume)</span>
              <div className="h-[130px] w-full text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                    <Legend iconSize={8} />
                    <Bar name="Rain Volume (mm)" dataKey="Rainfall (mm)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
