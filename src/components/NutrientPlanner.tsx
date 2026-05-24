import React, { useState } from "react";
import { 
  Dna, HelpCircle, ArrowRight, Save, Library, AlertTriangle, 
  Sparkles, ShieldCheck, RefreshCw, BarChart4, Beaker, CheckCircle 
} from "lucide-react";
import { CROPS_DB } from "../cropData";

export default function NutrientPlanner() {
  const [targetCropId, setTargetCropId] = useState<string>("rice");
  const [currentN, setCurrentN] = useState<number>(45);
  const [currentP, setCurrentP] = useState<number>(25);
  const [currentK, setCurrentK] = useState<number>(20);
  const [landArea, setLandArea] = useState<number>(1); // Acres

  const selectedCrop = CROPS_DB.find(c => c.id === targetCropId) || CROPS_DB[0];

  // Nutrient deficit calculations
  const calculateDeficits = () => {
    const [minN, maxN] = selectedCrop.optimalSoil.nRange;
    const [minP, maxP] = selectedCrop.optimalSoil.pRange;
    const [minK, maxK] = selectedCrop.optimalSoil.kRange;

    const deficitN = Math.max(0, minN - currentN);
    const deficitP = Math.max(0, minP - currentP);
    const deficitK = Math.max(0, minK - currentK);

    // Heuristic chemical conversion formula (e.g. Urea contains 46% N, SSP contains 16% P2O5, MOP contains 60% K2O)
    const ureaDosage = Math.round((deficitN * 2.17) * landArea);
    const sspDosage = Math.round((deficitP * 6.25) * landArea);
    const mopDosage = Math.round((deficitK * 1.66) * landArea);

    // Organic alternatives
    const compostDosage = Math.round((deficitN * 25) * landArea); // kg of compost
    const boneMealDosage = Math.round((deficitP * 8) * landArea); // kg of bone meal
    const woodAshDosage = Math.round((deficitK * 12) * landArea); // kg of wood ash

    return {
      deficitN,
      deficitP,
      deficitK,
      ureaDosage,
      sspDosage,
      mopDosage,
      compostDosage,
      boneMealDosage,
      woodAshDosage,
      optimalN: `${minN}-${maxN}`,
      optimalP: `${minP}-${maxP}`,
      optimalK: `${minK}-${maxK}`
    };
  };

  const results = calculateDeficits();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100/50 p-6 sm:p-8" id="nutrient-fertilizer-planner-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <Beaker size={11} className="text-emerald-600 animate-pulse" />
            Active Bio-Chemical Soil Recommender
          </div>
          <h3 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <Sparkles className="text-amber-500 animate-bounce" size={20} />
            Smart Fertilizer & Dosage Calculator
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Simulate Nitrogen (N), Phosphorus (P), and Potassium (K) mineral adjustments tailored specifically for your target crop yield.
          </p>
        </div>

        {/* Target crop dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Crop Species</label>
            <select
              value={targetCropId}
              onChange={(e) => setTargetCropId(e.target.value)}
              className="h-10 px-3.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white cursor-pointer outline-none"
            >
              {CROPS_DB.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-sans">Terrace Land Size (Acres)</label>
            <input
              type="number"
              min={1}
              max={100}
              value={landArea}
              onChange={(e) => setLandArea(Math.max(1, Number(e.target.value)))}
              className="h-10 w-24 px-3 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white text-center"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left hand side adjustments (5 cols) */}
        <div className="lg:col-span-5 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-4">
            <RefreshCw size={12} className="text-emerald-600 animate-spin" />
            1. Configure Current Mineral Status
          </h4>

          {/* Nitrogen N */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Nitrogen Level (N)</span>
              <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg border border-indigo-100 text-[10px]">{currentN} mg/kg</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={150} 
              value={currentN} 
              onChange={(e) => setCurrentN(Number(e.target.value))} 
              className="w-full accent-emerald-600 h-1.5 bg-slate-150 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>Deficient (0)</span>
              <span>Ideal for {selectedCrop.name}: {results.optimalN} mg/kg</span>
              <span>Rich (150)</span>
            </div>
          </div>

          {/* Phosphorus P */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Phosphorus Level (P)</span>
              <span className="font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg border border-amber-100 text-[10px]">{currentP} mg/kg</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={150} 
              value={currentP} 
              onChange={(e) => setCurrentP(Number(e.target.value))} 
              className="w-full accent-emerald-600 h-1.5 bg-slate-150 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>Deficient (0)</span>
              <span>Ideal for {selectedCrop.name}: {results.optimalP} mg/kg</span>
              <span>Rich (150)</span>
            </div>
          </div>

          {/* Potassium K */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Potassium Level (K)</span>
              <span className="font-mono bg-red-50 text-red-700 px-2 py-0.5 rounded-lg border border-red-100 text-[10px]">{currentK} mg/kg</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={250} 
              value={currentK} 
              onChange={(e) => setCurrentK(Number(e.target.value))} 
              className="w-full accent-emerald-600 h-1.5 bg-slate-150 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>Deficient (0)</span>
              <span>Ideal for {selectedCrop.name}: {results.optimalK} mg/kg</span>
              <span>Rich (250)</span>
            </div>
          </div>

          {/* Fertilizer tips warning */}
          <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-4 flex gap-3 text-amber-900 mt-6">
            <AlertTriangle className="shrink-0 mt-0.5" size={16} />
            <div className="text-[11px] leading-relaxed">
              <strong className="font-bold uppercase tracking-wide block mb-0.5">Application Precaution</strong>
              Chemical fertilizers should only be top-dressed when soil is suitably moist. Never apply during intense dry afternoons to avoid rapid mineral volatilization.
            </div>
          </div>

        </div>

        {/* Right hand side calculated plan (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <BarChart4 size={14} className="text-emerald-600" />
            2. Calibrated Supplement & Dosage Recommendation System ({landArea} Acre Field)
          </h4>

          {/* Supplement Table blocks */}
          <div className="space-y-4">
            
            {/* Deficit metrics check */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">N-Deficit</span>
                <span className={`text-sm font-extrabold block mt-1 ${results.deficitN > 0 ? "text-red-650" : "text-emerald-600"}`}>
                  {results.deficitN > 0 ? `${results.deficitN} mg/kg` : "None (Stable)"}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">P-Deficit</span>
                <span className={`text-sm font-extrabold block mt-1 ${results.deficitP > 0 ? "text-red-650" : "text-emerald-600"}`}>
                  {results.deficitP > 0 ? `${results.deficitP} mg/kg` : "None (Stable)"}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">K-Deficit</span>
                <span className={`text-sm font-extrabold block mt-1 ${results.deficitK > 0 ? "text-red-650" : "text-emerald-600"}`}>
                  {results.deficitK > 0 ? `${results.deficitK} mg/kg` : "None (Stable)"}
                </span>
              </div>
            </div>

            {/* Core chemical solution card */}
            <div className="bg-indigo-50/40 border border-indigo-500/10 rounded-2xl p-5 space-y-4">
              <h5 className="text-xs font-extrabold text-indigo-950 uppercase tracking-widest flex items-center justify-between">
                <span>Chemical Option (Precision Compounds)</span>
                <span className="text-[10px] bg-indigo-105 text-indigo-950 px-2 py-0.5 rounded-md">Balanced NPK Ratio</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">UREA dosage</span>
                  <span className="text-base font-black text-slate-900">{results.ureaDosage} <span className="text-xs font-semibold text-slate-500">kg</span></span>
                  <p className="text-[9px] text-slate-500 mt-1 leading-none">Yields {results.deficitN}mg Nitrogen</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">SSP dosage</span>
                  <span className="text-base font-black text-slate-900">{results.sspDosage} <span className="text-xs font-semibold text-slate-500">kg</span></span>
                  <p className="text-[9px] text-slate-500 mt-1 leading-none">Yields {results.deficitP}mg Phosphate</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">MOP dosage</span>
                  <span className="text-base font-black text-slate-900">{results.mopDosage} <span className="text-xs font-semibold text-slate-500">kg</span></span>
                  <p className="text-[9px] text-slate-500 mt-1 leading-none">Yields {results.deficitK}mg Potash</p>
                </div>

              </div>
            </div>

            {/* Organic option card */}
            <div className="bg-emerald-50/40 border border-emerald-500/10 rounded-2xl p-5 space-y-4 font-sans">
              <h5 className="text-xs font-extrabold text-emerald-950 uppercase tracking-widest flex items-center justify-between">
                <span>Organic Option (Ecological Substitutes)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md font-bold">100% Safe Soil Microbiome</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">ROTTED COMPOST</span>
                  <span className="text-base font-black text-emerald-850">{results.compostDosage} <span className="text-xs font-semibold text-slate-500">kg</span></span>
                  <p className="text-[9px] text-emerald-700 mt-1">Rich composted humus</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">RAW BONE MEAL</span>
                  <span className="text-base font-black text-emerald-850">{results.boneMealDosage} <span className="text-xs font-semibold text-slate-500">kg</span></span>
                  <p className="text-[9px] text-emerald-700 mt-1">Organic phosphate source</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">LEAF WOOD ASH</span>
                  <span className="text-base font-black text-emerald-850">{results.woodAshDosage} <span className="text-xs font-semibold text-slate-500">kg</span></span>
                  <p className="text-[9px] text-emerald-700 mt-1">Natural slow potassium</p>
                </div>

              </div>
            </div>

          </div>

          {/* Perfect matching tick */}
          <div className="bg-emerald-50 text-emerald-900 border border-emerald-200/50 p-4 rounded-xl flex items-start gap-2 text-xs">
            <CheckCircle className="shrink-0 text-emerald-600 mt-0.5" size={16} />
            <div>
              <strong className="block font-bold">Application Calendar Recommendation:</strong>
              Apply 50% of Urea dose alongside 100% of SSP and MOP dosages during the baseline tillage pre-sowing phase. Dress the pending 50% Urea evenly at 30 days post-germination (Vegetative phase) matching natural morning rainfall intervals.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
