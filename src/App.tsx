import React, { useState, useEffect } from "react";
import { SoilParameters, PredictionDetail, AIDiagnostic } from "./types";
import CropPredictorForm from "./components/CropPredictorForm";
import PredictionInsights from "./components/PredictionInsights";
import CropEncyclopedia from "./components/CropEncyclopedia";
import IntroLanding from "./components/IntroLanding";
import DiseaseDiagnoser from "./components/DiseaseDiagnoser";
import WeatherForecaster from "./components/WeatherForecaster";
import NutrientPlanner from "./components/NutrientPlanner";
import MarketBoard from "./components/MarketBoard";
import AIFarmerChatbot from "./components/AIFarmerChatbot";
import { TRANSLATIONS, Language } from "./lib/translations";
import { 
  Sprout, BookOpen, AlertCircle, Sparkles, Compass, 
  HelpCircle, ChevronRight, Activity, Cpu, ShieldAlert,
  User, CheckCircle, Flame, History, Globe, Leaf, Briefcase, Landmark
} from "lucide-react";

interface SavedRecord {
  id: string;
  name: string;
  timestamp: string;
  params: SoilParameters;
}

export default function App() {
  const [viewMode, setViewMode] = useState<"intro" | "app">("intro");
  const [activeTab, setActiveTab] = useState<"predictor" | "disease" | "fertilizer" | "weather" | "market" | "chatbot" | "encyclopedia">("predictor");
  const [lang, setLang] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authentication & Profile local state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [farmerName, setFarmerName] = useState("Ramesh Gowda");
  const [farmLocation, setFarmLocation] = useState("Mandya, Karnataka");
  const [farmAcreage, setFarmAcreage] = useState(5);
  const [savedRecords, setSavedRecords] = useState<SavedRecord[]>([]);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  // Results State
  const [predictions, setPredictions] = useState<PredictionDetail[]>([]);
  const [aiDiagnostic, setAiDiagnostic] = useState<AIDiagnostic | undefined>(undefined);
  const [lastEvaluatedParams, setLastEvaluatedParams] = useState<SoilParameters>({
    n: 80,
    p: 45,
    k: 40,
    temperature: 24,
    humidity: 75,
    ph: 6.5,
    rainfall: 150
  });

  const t = TRANSLATIONS[lang];

  // Load Saved Soil Records from LocalStorage
  useEffect(() => {
    const cached = localStorage.getItem("agrismart_saved_records");
    if (cached) {
      try {
        setSavedRecords(JSON.parse(cached));
      } catch (err) {
        console.error("Failed to parse cached soil records", err);
      }
    } else {
      const initialPresets: SavedRecord[] = [
        {
          id: "rec-1",
          name: "South Boundary Paddy Field",
          timestamp: "2026-05-20 10:30 AM",
          params: { n: 85, p: 48, k: 38, temperature: 25, humidity: 82, ph: 6.5, rainfall: 220 }
        },
        {
          id: "rec-2",
          name: "West Silt Lowland Orchard",
          timestamp: "2026-05-22 04:15 PM",
          params: { n: 20, p: 135, k: 198, temperature: 22, humidity: 92, ph: 5.8, rainfall: 110 }
        }
      ];
      setSavedRecords(initialPresets);
      localStorage.setItem("agrismart_saved_records", JSON.stringify(initialPresets));
    }
  }, []);

  const handleSaveCurrentSoil = (name: string) => {
    const newRecord: SavedRecord = {
      id: "rec-" + Date.now(),
      name: name || `Soil Check (${new Date().toLocaleDateString()})`,
      timestamp: new Date().toLocaleString([], { hour: "2-digit", minute: "2-digit", year: "numeric", month: "short", day: "numeric" }),
      params: lastEvaluatedParams
    };
    const updated = [newRecord, ...savedRecords];
    setSavedRecords(updated);
    localStorage.setItem("agrismart_saved_records", JSON.stringify(updated));
    alert("Soil chemistry matrix successfully logged to your farmer profile archives!");
  };

  const handleRestoreRecord = (rec: SavedRecord) => {
    setLastEvaluatedParams(rec.params);
    handleEvaluateSoil(rec.params);
    setActiveTab("predictor");
    setShowProfileDrawer(false);
  };

  const handleDeleteRecord = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = savedRecords.filter(r => r.id !== id);
    setSavedRecords(filtered);
    localStorage.setItem("agrismart_saved_records", JSON.stringify(filtered));
  };

  // Carbon footprint estimation based on Nitrogen level
  const computeCarbonFootprint = () => {
    // Estimating N2O greenhouse emissions from urea/nitrogen concentrations
    const nCoeff = 0.054; // tonnes CO2e per kg N applied
    const estimatedNAppliedKg = lastEvaluatedParams.n * farmAcreage * 1.5;
    const co2EquivalentTonnes = Math.round((estimatedNAppliedKg * nCoeff) * 100) / 100;
    return {
      co2EquivalentTonnes,
      status: co2EquivalentTonnes > 25 ? "High Mitigation Required" : co2EquivalentTonnes > 10 ? "Moderate Sustainable" : "Highly Certified Eco-Safe",
      color: co2EquivalentTonnes > 25 ? "text-red-600 bg-red-50 border-red-100" : co2EquivalentTonnes > 10 ? "text-amber-700 bg-amber-50 border-amber-100" : "text-emerald-700 bg-emerald-50 border-emerald-100"
    };
  };

  const carbonStats = computeCarbonFootprint();

  // Execute prediction on soil parameters
  const handleEvaluateSoil = async (params: SoilParameters) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Server failed to analyze the soil matrix.");
      }

      setPredictions(data.predictions);
      setAiDiagnostic(data.aiDiagnostic);
      setLastEvaluatedParams(params);
    } catch (err: any) {
      console.error("Prediction analysis failure:", err);
      setError(
        err.message || 
        "Failed to reach the agronomy analysis service. Ensure the server is listening and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Populate default prediction on startup
  useEffect(() => {
    handleEvaluateSoil(lastEvaluatedParams);
  }, []);

  if (viewMode === "intro") {
    return <IntroLanding onEnterApp={() => setViewMode("app")} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white relative" id="agri-applet-root">
      
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[400px] left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="border-b border-slate-200/60 bg-white/85 backdrop-blur-md sticky top-0 z-40 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <button 
            onClick={() => setViewMode("intro")} 
            className="flex items-center gap-2.5 hover:opacity-85 text-left focus:outline-none transition group cursor-pointer"
            title="Return to Welcome Screen"
            id="home-navigation-trigger"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/10 text-white group-hover:scale-105 transition duration-150">
              <Sprout size={22} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                {t.brandTitle}
              </h1>
              <p className="text-[10px] text-emerald-700 font-bold tracking-wide uppercase leading-none flex items-center gap-1">
                {t.brandSubtitle} • <span className="underline decoration-emerald-500/50 group-hover:text-emerald-950 transition">← Welcome Screen</span>
              </p>
            </div>
          </button>

          {/* Controls: Language toggle & Profile dashboard drawer button */}
          <div className="flex items-center gap-3">
            
            {/* Language switch Dropdown */}
            <div className="flex items-center bg-slate-100/80 p-1.5 rounded-xl border border-slate-200">
              <Globe size={13} className="text-slate-400 mx-1.5" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer pr-1"
                aria-label="Toggle Regional Language"
              >
                <option value="en">English (EN)</option>
                <option value="kn">ಕನ್ನಡ (KN)</option>
                <option value="hi">हिंदी (HI)</option>
              </select>
            </div>

            {/* Profile Drawer Toggle button */}
            <button
              onClick={() => setShowProfileDrawer(!showProfileDrawer)}
              className="px-3.5 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer relative"
              title="Farmer Profile & Sustainability Panel"
            >
              <User size={14} className="text-emerald-400" />
              <span className="hidden sm:inline">Farmer Profile</span>
              {savedRecords.length > 0 && (
                <span className="absolute top-[-4px] right-[-4px] w-5 h-5 rounded-full bg-emerald-500 border-2 border-white text-[9px] flex items-center justify-center font-black">
                  {savedRecords.length}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Action Tabs Subheader (horizontal scrollable bar for rich tabs selection) */}
        <div className="bg-slate-50 border-t border-b border-slate-200/60 overflow-x-auto select-none scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 flex space-x-1.5 py-2.5 min-w-[700px]">
            <button
              onClick={() => setActiveTab("predictor")}
              className={`flex items-center gap-2 px-4.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
                activeTab === "predictor"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Compass size={14} />
              {t.predictorTab}
            </button>

            <button
              onClick={() => setActiveTab("disease")}
              className={`flex items-center gap-2 px-4.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
                activeTab === "disease"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Leaf size={14} />
              {t.diseaseTab}
            </button>

            <button
              onClick={() => setActiveTab("fertilizer")}
              className={`flex items-center gap-2 px-4.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
                activeTab === "fertilizer"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Cpu size={14} />
              {t.fertilizerTab}
            </button>

            <button
              onClick={() => setActiveTab("weather")}
              className={`flex items-center gap-2 px-4.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
                activeTab === "weather"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Activity size={14} />
              {t.weatherTab}
            </button>

            <button
              onClick={() => setActiveTab("market")}
              className={`flex items-center gap-2 px-4.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
                activeTab === "market"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Briefcase size={14} />
              {t.marketTab}
            </button>

            <button
              onClick={() => setActiveTab("chatbot")}
              className={`flex items-center gap-2 px-4.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
                activeTab === "chatbot"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Sparkles size={14} />
              AI Advisor Chat
            </button>

            <button
              onClick={() => setActiveTab("encyclopedia")}
              className={`flex items-center gap-2 px-4.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
                activeTab === "encyclopedia"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen size={14} />
              {t.encyclopediaTab}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* Profile Drawer Sliding overlay when showProfileDrawer is active */}
        {showProfileDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fadeIn">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowProfileDrawer(false)}></div>
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="text-emerald-600" size={18} />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Farmer Account Control</h3>
                  </div>
                  <button 
                    onClick={() => setShowProfileDrawer(false)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-800 px-2 py-1 rounded bg-slate-50 border border-slate-150 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {/* Account Details Form */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Farmer Holder Name</label>
                    <input 
                      type="text" 
                      value={farmerName} 
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Farm Location / Region</label>
                    <input 
                      type="text" 
                      value={farmLocation} 
                      onChange={(e) => setFarmLocation(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acreage Land Ownership</label>
                    <input 
                      type="number" 
                      value={farmAcreage} 
                      onChange={(e) => setFarmAcreage(Math.max(1, Number(e.target.value)))}
                      className="w-full h-10 px-3 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none"
                    />
                  </div>
                </div>

                {/* Dynamic Carbon Footprint assessment */}
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                    <Flame size={14} className="text-amber-500" />
                    Carbon / Eco footprint analysis
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Based on current Nitrogen parameters across your <strong>{farmAcreage} Acres</strong> crop cycle:
                  </p>
                  
                  <div className="flex items-center justify-between font-sans">
                    <span className="text-xs font-semibold text-slate-600">Simulated N2O Output:</span>
                    <span className="text-sm font-black text-slate-800">{carbonStats.co2EquivalentTonnes} T CO₂e</span>
                  </div>

                  <div className={`p-2 rounded-lg text-[10px] font-extrabold text-center border uppercase tracking-wider ${carbonStats.color}`}>
                    {carbonStats.status}
                  </div>
                </div>

                {/* PM-KISAN & Welfare Programs */}
                <div className="bg-emerald-50/50 border border-emerald-250/10 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 uppercase">
                    <Landmark size={14} className="text-emerald-700 animate-bounce" />
                    Govt Welfare Recommendations
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-2 list-none pl-1">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <strong>PM Krishi Sinchayee Yojana:</strong> Eligible for 55% subsidy on localized micro-irrigation lines.
                      </div>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <strong>Soil Health Card Protocol:</strong> Eligible for zero-cost baseline laboratory test validations.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Saved soil evaluations log list */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <History size={14} className="text-slate-500" />
                    Saved Soil Analytics Records ({savedRecords.length})
                  </div>

                  {savedRecords.length > 0 ? (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {savedRecords.map(rec => (
                        <div
                          key={rec.id}
                          onClick={() => handleRestoreRecord(rec)}
                          className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-150 hover:border-emerald-300 rounded-xl cursor-pointer transition text-left flex justify-between items-center group"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-800 block group-hover:text-emerald-900 line-clamp-1">{rec.name}</span>
                            <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{rec.timestamp}</span>
                            <span className="text-[9px] font-mono text-emerald-700 block mt-1">N:{rec.params.n} P:{rec.params.p} K:{rec.params.k} ph:{rec.params.ph}</span>
                          </div>
                          <button
                            onClick={(e) => handleDeleteRecord(rec.id, e)}
                            className="text-[9px] text-red-500 hover:text-red-700 px-2 py-1 rounded bg-red-50 hover:bg-red-150 border border-red-100 shrink-0 cursor-pointer"
                            title="Delete this backup log"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">No saved soils logged. Submit a soil chemical check on the main page to create records!</p>
                  )}
                </div>

              </div>

              {/* Saved actions footer */}
              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => {
                    const recName = prompt("Enter a representative title for this Soil Chemistry log:");
                    handleSaveCurrentSoil(recName || "");
                  }}
                  className="flex-1 h-10 border border-emerald-500 text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <History size={13} />
                  Log Soil Baseline
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("agrismart_saved_records");
                    setSavedRecords([]);
                    alert("Local profile archives purged.");
                  }}
                  className="h-10 px-4 border border-slate-200 text-slate-500 hover:text-red-650 hover:bg-red-50 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer"
                  title="Purge all logs"
                >
                  Purge
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Error notification block */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3 mb-8" id="error-alert-banner">
            <AlertCircle className="shrink-0 mt-0.5 text-red-600" size={18} />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">Evaluation Diagnostic Error</h4>
              <p className="text-xs mt-1 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Dynamic Views rendering */}
        {activeTab === "predictor" && (
          <div className="space-y-8 animate-fadeIn animate-duration-300" id="predictor-tab-view">
            
            {/* Top row soil forms */}
            <div className="grid grid-cols-1 gap-8">
              <CropPredictorForm onSubmit={handleEvaluateSoil} isLoading={isLoading} />
            </div>

            {/* Results Insights Breakdown */}
            <div className="pt-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5 tracking-tight">
                    <Activity size={18} className="text-emerald-600" />
                    {t.insightsHeader}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.insightsDesc}
                  </p>
                </div>
                {isLoading && (
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 animate-pulse flex items-center gap-1">
                    <Cpu size={11} className="animate-spin" />
                    {t.computingBtn}
                  </span>
                )}
              </div>

              <PredictionInsights 
                predictions={predictions} 
                aiDiagnostic={aiDiagnostic} 
                inputParameters={lastEvaluatedParams} 
              />
            </div>

          </div>
        )}

        {activeTab === "disease" && (
          <div className="animate-fadeIn" id="disease-tab-view">
            <DiseaseDiagnoser lang={lang} />
          </div>
        )}

        {activeTab === "fertilizer" && (
          <div className="animate-fadeIn" id="fertilizer-tab-view">
            <NutrientPlanner />
          </div>
        )}

        {activeTab === "weather" && (
          <div className="animate-fadeIn" id="weather-tab-view">
            <WeatherForecaster />
          </div>
        )}

        {activeTab === "market" && (
          <div className="animate-fadeIn" id="market-tab-view">
            <MarketBoard />
          </div>
        )}

        {activeTab === "chatbot" && (
          <div className="animate-fadeIn" id="chatbot-tab-view">
            <AIFarmerChatbot lang={lang} />
          </div>
        )}

        {activeTab === "encyclopedia" && (
          <div className="animate-fadeIn" id="encyclopedia-tab-view">
            <CropEncyclopedia />
          </div>
        )}

      </main>

      {/* Modern Footer */}
      <footer className="border-t border-slate-200/60 bg-white py-8 mt-16" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs font-bold text-slate-700">
              <Sprout size={14} className="text-emerald-600" />
              AgriSmart Precision Crop Systems & Soil Diagnostics
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
              Standard 22-class FAO agricultural database compatibility. Pre-fitted crop thresholds calibrated against regional global microclimates.
            </p>
          </div>
          <div className="text-[10px] font-mono text-slate-400 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100">
            Precision Ag-Data • UTC 2026-05-24
          </div>
        </div>
      </footer>

    </div>
  );
}
