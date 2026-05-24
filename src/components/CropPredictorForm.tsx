import React, { useState } from "react";
import { SoilParameters } from "../types";
import { Sliders, HelpCircle, RefreshCw, Sprout, Compass, Droplet, Thermometer, Wind, Percent } from "lucide-react";

export interface SoilPreset {
  name: string;
  description: string;
  region: string;
  params: SoilParameters;
  colorClass: string;
}

export const SOIL_PRESETS: SoilPreset[] = [
  {
    name: "Coastal Delta Clay",
    description: "Highly alluvial, heavy clays with deep moisture retention and stable macronutrients.",
    region: "Ideal for Rice & Jute",
    colorClass: "from-blue-600/20 to-emerald-600/20 border-emerald-500/30 text-emerald-800",
    params: { n: 85, p: 48, k: 38, temperature: 25, humidity: 82, ph: 6.5, rainfall: 220 }
  },
  {
    name: "Volcanic High Altitude",
    description: "Richly draining volcanic ash, highly acidic with substantial nitrogen but low potash.",
    region: "Ideal for High-grade Coffee",
    colorClass: "from-amber-600/20 to-red-600/20 border-amber-500/30 text-amber-800",
    params: { n: 95, p: 25, k: 30, temperature: 24, humidity: 58, ph: 6.2, rainfall: 140 }
  },
  {
    name: "Black Cotton Soil",
    description: "Self-ploughing black regur clay containing rich lime, iron, and high humidity tolerance.",
    region: "Ideal for Long-Staple Cotton",
    colorClass: "from-slate-700/20 to-slate-900/20 border-slate-500/30 text-slate-800",
    params: { n: 115, p: 42, k: 20, temperature: 24, humidity: 80, ph: 7.9, rainfall: 82 }
  },
  {
    name: "Sandy Desert Arid Loft",
    description: "Highly porous sand with negligible nitrogen and low rain, but highly alkaline.",
    region: "Ideal for Hardy Mothbeans",
    colorClass: "from-yellow-600/20 to-orange-600/20 border-yellow-500/30 text-amber-900",
    params: { n: 15, p: 40, k: 22, temperature: 28, humidity: 50, ph: 8.2, rainfall: 45 }
  },
  {
    name: "Cool Mountain Orchards",
    description: "Very rich organic humus, heavily loaded with potash and phosphorous reserves, cool days.",
    region: "Ideal for Premium Apples & Grapes",
    colorClass: "from-purple-600/20 to-pink-600/20 border-purple-500/30 text-purple-800",
    params: { n: 20, p: 135, k: 198, temperature: 22, humidity: 92, ph: 5.8, rainfall: 110 }
  }
];

interface CropPredictorFormProps {
  onSubmit: (params: SoilParameters) => void;
  isLoading: boolean;
}

export default function CropPredictorForm({ onSubmit, isLoading }: CropPredictorFormProps) {
  const [params, setParams] = useState<SoilParameters>({
    n: 80,
    p: 45,
    k: 40,
    temperature: 24,
    humidity: 75,
    ph: 6.5,
    rainfall: 150
  });

  const handlePresetSelect = (preset: SoilPreset) => {
    setParams(preset.params);
  };

  const handleInputChange = (field: keyof SoilParameters, value: number) => {
    setParams((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  const resetToDefault = () => {
    setParams({
      n: 80,
      p: 45,
      k: 40,
      temperature: 24,
      humidity: 75,
      ph: 6.5,
      rainfall: 150
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-950/5 border border-emerald-500/10" id="soil-input-form-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sliders className="text-emerald-600" size={24} />
            Soil & Weather Matrix
          </h2>
          <p className="text-sm text-slate-500 mt-1">Configure parameters or select a regional preset profile</p>
        </div>
        <button
          type="button"
          onClick={resetToDefault}
          className="self-start sm:self-center flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3.5 py-2 rounded-xl transition duration-200"
          title="Reset to default levels"
        >
          <RefreshCw size={14} />
          Reset Parameters
        </button>
      </div>

      {/* Extreme Presets Carousel */}
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5Selector">
          <Compass size={13} className="text-slate-400" />
          Quick-Load Geological Regions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SOIL_PRESETS.map((preset) => {
            const isMatch =
              params.n === preset.params.n &&
              params.p === preset.params.p &&
              params.k === preset.params.k &&
              params.ph === preset.params.ph &&
              params.rainfall === preset.params.rainfall;

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`text-left p-3.5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[105px] group ${
                  isMatch
                    ? "bg-emerald-950 border-emerald-500 text-white shadow-md shadow-emerald-900/10 scale-[1.02]"
                    : "bg-slate-50/60 hover:bg-slate-50 border-slate-100 hover:border-emerald-500/30 hover:scale-[1.01]"
                }`}
              >
                <div>
                  <h4 className={`text-xs font-bold line-clamp-1 ${isMatch ? "text-emerald-300" : "text-slate-800 group-hover:text-emerald-700"}`}>
                    {preset.name}
                  </h4>
                  <p className={`text-[10px] line-clamp-2 mt-1 leading-relaxed ${isMatch ? "text-slate-300" : "text-slate-500"}`}>
                    {preset.description}
                  </p>
                </div>
                <div className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${isMatch ? "text-emerald-200" : "text-emerald-700"}`}>
                  {preset.region}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Macronutrients Section */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 pb-2 border-b border-slate-100 mb-5 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            Soil Macronutrients (mg/kg)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nitrogen Input */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  Nitrogen (N)
                  <span className="text-[10px] font-medium text-slate-400 font-mono">(0-150)</span>
                </label>
                <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                  {params.n} <span className="text-[9px] text-emerald-500 font-sans">mg/kg</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3">Fuels initial leaf growth & foliage branching</p>
              <input
                type="range"
                min="0"
                max="150"
                value={params.n}
                onChange={(e) => handleInputChange("n", Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>Low (&lt;40)</span>
                <span>Optimal (70)</span>
                <span>Heavy (140+)</span>
              </div>
            </div>

            {/* Phosphorus Input */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  Phosphorus (P)
                  <span className="text-[10px] font-medium text-slate-400 font-mono">(5-150)</span>
                </label>
                <span className="text-xs font-bold font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-lg border border-cyan-100">
                  {params.p} <span className="text-[9px] text-cyan-500 font-sans">mg/kg</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3">Enables strong roots & flower development</p>
              <input
                type="range"
                min="5"
                max="150"
                value={params.p}
                onChange={(e) => handleInputChange("p", Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>Low (&lt;25)</span>
                <span>Optimal (50)</span>
                <span>Heavy (120+)</span>
              </div>
            </div>

            {/* Potassium Input */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  Potassium (K)
                  <span className="text-[10px] font-medium text-slate-400 font-mono">(5-220)</span>
                </label>
                <span className="text-xs font-bold font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-100">
                  {params.k} <span className="text-[9px] text-purple-500 font-sans">mg/kg</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3">Regulates water absorption & disease defense</p>
              <input
                type="range"
                min="5"
                max="220"
                value={params.k}
                onChange={(e) => handleInputChange("k", Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>Low (&lt;20)</span>
                <span>Optimal (45)</span>
                <span>Heavy (190+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental & Soil Electrochemistry Section */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 pb-2 border-b border-slate-100 mb-5 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            Climate & Soil pH Matrix
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {/* Temperature */}
            <div className="bg-slate-50/30 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Thermometer size={14} className="text-rose-500 animate-pulse" />
                  Temperature
                </span>
                <span className="text-xs font-bold font-mono text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                  {params.temperature}°C
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="0.5"
                value={params.temperature}
                onChange={(e) => handleInputChange("temperature", Number(e.target.value))}
                className="w-full accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                <span>Cold (5°C)</span>
                <span>Hot (45°C)</span>
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-slate-50/30 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Wind size={14} className="text-blue-500" />
                  Humidity
                </span>
                <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                  {params.humidity}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={params.humidity}
                onChange={(e) => handleInputChange("humidity", Number(e.target.value))}
                className="w-full accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                <span>Arid (10%)</span>
                <span>Saturated (100%)</span>
              </div>
            </div>

            {/* pH level */}
            <div className="bg-slate-50/30 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Percent size={12} className="text-yellow-600" />
                  Soil pH Level
                </span>
                <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                  params.ph < 5.5 ? "bg-red-50 text-red-700" : params.ph > 7.5 ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"
                }`}>
                  {params.ph.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="3.5"
                max="10.0"
                step="0.1"
                value={params.ph}
                onChange={(e) => handleInputChange("ph", Number(e.target.value))}
                className="w-full accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                <span>Acidic (3.5)</span>
                <span>Neutral (7)</span>
                <span>Alkaline (10)</span>
              </div>
            </div>

            {/* Rainfall */}
            <div className="bg-slate-50/30 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Droplet size={14} className="text-sky-500" />
                  Rainfall Volume
                </span>
                <span className="text-xs font-bold font-mono text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                  {params.rainfall}mm
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                value={params.rainfall}
                onChange={(e) => handleInputChange("rainfall", Number(e.target.value))}
                className="w-full accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                <span>Dry (20mm)</span>
                <span>Monsoon (300mm)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Submission Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 text-center sm:text-right flex items-center gap-1">
            <HelpCircle size={12} />
            Instant heuristic matching with Gemini advanced agronomic diagnostics.
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-lg shadow-emerald-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Evaluating Ecosystem...
              </>
            ) : (
              <>
                <Sprout size={16} />
                Generate Prediction & Soil Advice
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
