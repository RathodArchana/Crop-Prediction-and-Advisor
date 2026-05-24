import React, { useState } from "react";
import { PredictionDetail, AIDiagnostic, SoilParameters } from "../types";
import { CROPS_DB } from "../cropData";
import { 
  Sprout, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, Sparkles, 
  Droplet, ShieldAlert, TrendingUp, Info, BarChart4, ChevronRight
} from "lucide-react";

interface PredictionInsightsProps {
  predictions: PredictionDetail[];
  aiDiagnostic?: AIDiagnostic;
  inputParameters: SoilParameters;
}

export default function PredictionInsights({ predictions, aiDiagnostic, inputParameters }: PredictionInsightsProps) {
  const [selectedCropName, setSelectedCropName] = useState<string>(
    predictions && predictions.length > 0 ? predictions[0].crop : ""
  );

  if (!predictions || predictions.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center" id="empty-predictions-slate">
        <Sprout className="mx-auto text-slate-300 mb-2 animate-bounce" size={40} />
        <h3 className="text-base font-bold text-slate-700">Waiting for Ecosystem Evaluation</h3>
        <p className="text-xs text-slate-500 mt-1">Configure your soil matrix and trigger the algorithm above to see results.</p>
      </div>
    );
  }

  // Find detailed crop definition
  const selectedCropDetail = predictions.find((p) => p.crop === selectedCropName) || predictions[0];
  const selectedCropProfile = CROPS_DB.find((c) => c.name === selectedCropName);

  // Helper status color
  const getStatusColor = (status: "Optimal" | "Suboptimal" | "Critical") => {
    switch (status) {
      case "Optimal":
        return "bg-emerald-500 text-white border-emerald-600";
      case "Suboptimal":
        return "bg-amber-500 text-white border-amber-600";
      case "Critical":
        return "bg-red-500 text-white border-red-600";
    }
  };

  // Helper status labels
  const getStatusLabelColor = (status: "Optimal" | "Suboptimal" | "Critical") => {
    switch (status) {
      case "Optimal":
        return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "Suboptimal":
        return "text-amber-700 bg-amber-50 border-amber-100";
      case "Critical":
        return "text-red-700 bg-red-50 border-red-100";
    }
  };

  return (
    <div className="space-y-8" id="prediction-insights-container">
      {/* Top section: Candidate Match & Comparative Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* L-SIDE: Top Match candidate list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Highly Compatible Candidates
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Algorithm Results
            </span>
          </div>

          <div className="space-y-3">
            {predictions.map((p, index) => {
              const profile = CROPS_DB.find((c) => c.name === p.crop);
              const isSelected = selectedCropName === p.crop;

              return (
                <button
                  key={p.crop}
                  onClick={() => setSelectedCropName(p.crop)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-emerald-950 text-white border-emerald-500 shadow-lg shadow-emerald-900/10 scale-[1.01]"
                      : "bg-white text-slate-700 border-slate-100 hover:border-emerald-500/20 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      isSelected ? "bg-emerald-800 text-emerald-300" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      <Sprout size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold">{p.crop}</span>
                        {index === 0 && (
                          <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                            isSelected ? "bg-emerald-500 text-white" : "bg-emerald-600 text-white"
                          }`}>
                            Best
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        {profile?.category || "Agricultural"} • Difficulty: {profile?.difficulty || "Medium"}
                      </span>
                    </div>
                  </div>

                  {/* Suitability Score Ring */}
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold">{p.score}%</div>
                      <div className={`text-[8px] uppercase tracking-tighter ${isSelected ? "text-emerald-300" : "text-emerald-600"}`}>
                        Compatibility
                      </div>
                    </div>
                    <ChevronRight size={16} className={`${isSelected ? "text-emerald-400" : "text-slate-300"}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* R-SIDE: Dynamic Parameter Overlap Map */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                  <BarChart4 size={18} className="text-emerald-600" />
                  Ecosystem Fit Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  How your parameters align with the requirements of <strong className="text-emerald-700">{selectedCropName}</strong>
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 self-start sm:self-center">
                Soil Compat: <strong className="text-emerald-600 font-bold">{selectedCropDetail.soilCompatibility}%</strong>
              </span>
            </div>

            {/* Custom Interactive Comparative Table mapping user input onto target */}
            <div className="space-y-4">
              
              {/* Nitrogen (N) comparison */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-600">Nitrogen Level (N)</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusLabelColor(selectedCropDetail.parametersMatch.n)}`}>
                    {selectedCropDetail.parametersMatch.n} (Soil: {inputParameters.n} mg/kg)
                  </span>
                </div>
                {selectedCropProfile && (
                  <div className="relative pt-1.5 pb-2">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                      {/* Crop zone bar */}
                      <div 
                        className="absolute h-full bg-emerald-500/20 border-x border-emerald-500/30"
                        style={{
                          left: `${(selectedCropProfile.optimalSoil.nRange[0] / 150) * 100}%`,
                          width: `${((selectedCropProfile.optimalSoil.nRange[1] - selectedCropProfile.optimalSoil.nRange[0]) / 150) * 100}%`
                        }}
                      ></div>
                      {/* User's parameter pointer */}
                      <div 
                        className="absolute top-0 w-3 h-3 -mt-0.5 rounded-full bg-emerald-700 shadow border-2 border-white transition-all duration-500"
                        style={{ left: `calc(${(inputParameters.n / 150) * 100}% - 6px)` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                      <span>0 mg/kg</span>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">Target Zone: {selectedCropProfile.optimalSoil.nRange[0]}-{selectedCropProfile.optimalSoil.nRange[1]}</span>
                      <span>150 mg/kg</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Phosphorus (P) comparison */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-600">Phosphorus Level (P)</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusLabelColor(selectedCropDetail.parametersMatch.p)}`}>
                    {selectedCropDetail.parametersMatch.p} (Soil: {inputParameters.p} mg/kg)
                  </span>
                </div>
                {selectedCropProfile && (
                  <div className="relative pt-1.5 pb-2">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                      {/* Crop zone bar */}
                      <div 
                        className="absolute h-full bg-cyan-500/20 border-x border-cyan-500/30"
                        style={{
                          left: `${(selectedCropProfile.optimalSoil.pRange[0] / 150) * 100}%`,
                          width: `${((selectedCropProfile.optimalSoil.pRange[1] - selectedCropProfile.optimalSoil.pRange[0]) / 150) * 100}%`
                        }}
                      ></div>
                      {/* User's parameter pointer */}
                      <div 
                        className="absolute top-0 w-3 h-3 -mt-0.5 rounded-full bg-cyan-700 shadow border-2 border-white transition-all duration-500"
                        style={{ left: `calc(${(inputParameters.p / 150) * 100}% - 6px)` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                      <span>5mg/kg</span>
                      <span className="font-semibold text-cyan-700 bg-cyan-50 px-1 rounded">Target Zone: {selectedCropProfile.optimalSoil.pRange[0]}-{selectedCropProfile.optimalSoil.pRange[1]}</span>
                      <span>150mg/kg</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Potassium (K) comparison */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-600">Potassium Level (K)</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusLabelColor(selectedCropDetail.parametersMatch.k)}`}>
                    {selectedCropDetail.parametersMatch.k} (Soil: {inputParameters.k} mg/kg)
                  </span>
                </div>
                {selectedCropProfile && (
                  <div className="relative pt-1.5 pb-2">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                      {/* Crop zone bar */}
                      <div 
                        className="absolute h-full bg-purple-500/20 border-x border-purple-500/30"
                        style={{
                          left: `${(selectedCropProfile.optimalSoil.kRange[0] / 220) * 100}%`,
                          width: `${((selectedCropProfile.optimalSoil.kRange[1] - selectedCropProfile.optimalSoil.kRange[0]) / 220) * 100}%`
                        }}
                      ></div>
                      {/* User's parameter pointer */}
                      <div 
                        className="absolute top-0 w-3 h-3 -mt-0.5 rounded-full bg-purple-700 shadow border-2 border-white transition-all duration-500"
                        style={{ left: `calc(${(inputParameters.k / 220) * 100}% - 6px)` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                      <span>5mg/kg</span>
                      <span className="font-semibold text-purple-700 bg-purple-50 px-1 rounded">Target Zone: {selectedCropProfile.optimalSoil.kRange[0]}-{selectedCropProfile.optimalSoil.kRange[1]}</span>
                      <span>220mg/kg</span>
                    </div>
                  </div>
                )}
              </div>

              {/* pH comparison */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-600">Soil Electrochemical Reaction (pH)</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusLabelColor(selectedCropDetail.parametersMatch.ph)}`}>
                    {selectedCropDetail.parametersMatch.ph} (Soil pH: {inputParameters.ph.toFixed(1)})
                  </span>
                </div>
                {selectedCropProfile && (
                  <div className="relative pt-1.5 pb-1">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                      {/* Crop zone bar */}
                      <div 
                        className="absolute h-full bg-orange-500/20 border-x border-orange-500/30"
                        style={{
                          left: `${((selectedCropProfile.optimalSoil.phRange[0] - 3.5) / 6.5) * 100}%`,
                          width: `${((selectedCropProfile.optimalSoil.phRange[1] - selectedCropProfile.optimalSoil.phRange[0]) / 6.5) * 100}%`
                        }}
                      ></div>
                      {/* User's parameter pointer */}
                      <div 
                        className="absolute top-0 w-3 h-3 -mt-0.5 rounded-full bg-orange-600 shadow border-2 border-white transition-all duration-500"
                        style={{ left: `calc(${((inputParameters.ph - 3.5) / 6.5) * 100}% - 6px)` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                      <span>Acidic (3.5)</span>
                      <span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">Optimal pH Zone: {selectedCropProfile.optimalSoil.phRange[0].toFixed(1)}-{selectedCropProfile.optimalSoil.phRange[1].toFixed(1)}</span>
                      <span>Alkaline (10.0)</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-500/15 flex items-start gap-2.5 mt-6">
            <Info size={16} className="text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-800 leading-relaxed">
              <strong>Quick Agronomy Principle:</strong> To pull up suitability score above 90%, optimize Nitrogen or correct soil pH to match target thresholds. Check the customized AI advice below to learn exact soil amendment remedies.
            </div>
          </div>
        </div>

      </div>

      {/* Bottom section: Breathtaking AI Advisor (Custom Diagnostics and amendment report) */}
      {aiDiagnostic && (
        <div className="bg-slate-900 text-slate-50 rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl relative overflow-hidden" id="ai-agronomist-advisor">
          {/* Subtle background decoration */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.03] select-none text-9xl">
            🌾
          </div>
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-emerald-500 to-green-300 text-slate-950 p-2 rounded-xl">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold tracking-tight">AI Agronomy Diagnostic</h4>
                <p className="text-xs text-slate-400 mt-0.5">Specialist Soil Health & Treatment Advice</p>
              </div>
            </div>
            <div className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/30">
              Generative Analysis for <span className="font-bold underline text-white">{aiDiagnostic.recommendedCrop || selectedCropName}</span>
            </div>
          </div>

          {/* Diagnostic overview text */}
          <div className="mb-8 bg-white/5 p-4 md:p-5 rounded-2xl border border-white/5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
              <Info size={14} />
              Geological Context Evaluation
            </h5>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {aiDiagnostic.summary}
            </p>
          </div>

          {/* Detailed advisory blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Nutrient deficiency action */}
            <div className="space-y-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
                <Sprout size={14} />
                Nutrient Interventions
              </h5>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Nitrogen (N) Supplement</span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{aiDiagnostic.fertilizerAdvice.nitrogenAction}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Phosphorus (P) Refinement</span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{aiDiagnostic.fertilizerAdvice.phosphorusAction}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Potassium (K) Fortification</span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{aiDiagnostic.fertilizerAdvice.potassiumAction}</p>
                </div>
              </div>
            </div>

            {/* 2. Irrigation scheduling */}
            <div className="space-y-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
                  <Droplet size={14} />
                  Irrigation & Moisture
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {aiDiagnostic.irrigationPlan}
                </p>
              </div>
              <div className="text-[10px] text-slate-500 font-mono italic mt-4">
                Calibrated to regional weather data.
              </div>
            </div>

            {/* 3. Risk mitigations */}
            <div className="space-y-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
                  <ShieldAlert size={14} />
                  Biological Protection
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {aiDiagnostic.riskMitigation}
                </p>
              </div>
              <div className="text-[10px] text-slate-500 font-mono italic mt-4">
                Check leaves for atypical spotting.
              </div>
            </div>

            {/* 4. Commodities & Economic Outlook */}
            <div className="space-y-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
                  <TrendingUp size={14} />
                  Industrial Economics
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {aiDiagnostic.economicOutlook}
                </p>
              </div>
              <div className="text-[10px] text-slate-500 font-mono italic mt-4">
                Check active grain trade indices.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
