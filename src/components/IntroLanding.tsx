import React from "react";
import { Sprout, Cpu, Compass, BookOpen, ShieldAlert, Sparkles, Sliders, ChevronRight, BarChart4, Globe } from "lucide-react";

interface IntroLandingProps {
  onEnterApp: () => void;
}

export default function IntroLanding({ onEnterApp }: IntroLandingProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col relative overflow-hidden font-sans" id="intro-landing-container">
      
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] left-[-5%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Global Header inside Intro */}
      <header className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-6 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
            <Sprout size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">AgriSmart Engine</h2>
            <p className="text-[9px] font-bold text-emerald-600 tracking-wider uppercase leading-none mt-0.5">Precise Soil Analysis</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-400 bg-slate-100/80 px-3.5 py-1.5 rounded-xl border border-slate-200/50">
          Precision Ag Core v2.4
        </div>
      </header>

      {/* Hero Welcome Segment */}
      <main className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto px-6 py-12 md:py-20 z-10 relative text-center">
        
        {/* Generative Tech Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full border border-emerald-500/15 text-xs font-bold mb-6 animate-pulse">
          <Sparkles size={13} className="text-emerald-600" />
          Powered by Gemini Generative Agronomy Advice
        </div>

        {/* Display Heading Statement */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Sow with Certainty.<br />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Grow with Intelligence.
          </span>
        </h1>

        {/* Short Descriptive Ceiling */}
        <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed mb-10">
          Transform physical land samples into highly compatible agriculture yield forecasts. AgriSmart decodes N-P-K electrochemistry, relative humidity, and rainfall indicators to prescribe immediate corrective soil treatments.
        </p>

        {/* Captivating Action entry trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto h-14 px-10 rounded-2xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/15 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Launch Precision Simulator
            <ChevronRight size={16} className="text-emerald-400 group-hover:translate-x-0.5 transition duration-150" />
          </button>
          
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold text-sm text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50/50 border border-slate-200 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen size={16} className="text-emerald-600" />
            Browse Seed Encyclopedia
          </button>
        </div>

        {/* Value Pillars Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm shadow-slate-100 flex flex-col justify-between h-[215px] hover:border-emerald-500/20 hover:shadow-md transition duration-300">
            <div className="bg-emerald-50 text-emerald-700 w-10 h-10 rounded-xl flex items-center justify-center">
              <Sliders size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">1. Soil Matrix Scanner</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Provide Nitrogen, Phosphorus, Potash (N-P-K) levels alongside geological pH and water volume to map baseline conditions.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm shadow-slate-100 flex flex-col justify-between h-[215px] hover:border-emerald-500/20 hover:shadow-md transition duration-300">
            <div className="bg-amber-50 text-amber-700 w-10 h-10 rounded-xl flex items-center justify-center">
              <BarChart4 size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">2. Suitability Scoring</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Compare dynamic thresholds against our pre-fitted 22 FAO classes to compute precise atmospheric and chemical fitness metrics.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm shadow-slate-100 flex flex-col justify-between h-[215px] hover:border-emerald-500/20 hover:shadow-md transition duration-300">
            <div className="bg-indigo-50 text-indigo-700 w-10 h-10 rounded-xl flex items-center justify-center">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">3. Generative Advisory</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Harness advanced Gemini diagnostics to calculate targeted mineral additives, risk mitigation systems, and micro-watering forecasts.
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* Bottom Information Statistics Overview */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 mt-12 z-10 relative bg-white/40">
        <div className="flex flex-wrap justify-center sm:justify-start gap-6 font-semibold">
          <span className="flex items-center gap-1.5">
            <Globe className="text-emerald-600" size={14} />
            22+ Key Crop Classes Covered
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="text-indigo-600" size={14} />
            Real-Time Diagnostic Feedback
          </span>
        </div>
        <div className="font-mono text-[10px]">
          Calibrated using Food & Agriculture Organization (FAO) Guidelines • UTC 2026
        </div>
      </footer>

    </div>
  );
}
