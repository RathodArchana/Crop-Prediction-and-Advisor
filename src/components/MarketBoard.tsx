import React, { useState } from "react";
import { 
  DollarSign, TrendingUp, HelpCircle, ArrowRight, BarChart4, 
  Sparkles, CheckCircle, Lightbulb, Wallet, Calculator, Coins, Award
} from "lucide-react";
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from "recharts";
import { CROPS_DB } from "../cropData";

interface Commodity {
  id: string;
  name: string;
  mspPrice: number; // Minimum Support Price per quintal (100 kg)
  currentMarketPrice: number; // Average market spot price
  prevPrice: number;
  trend: "up" | "down" | "stable";
  estimatedYieldPerAcre: number; // Tonnes
  priceTrendHistory: { month: string; price: number }[];
}

// Simulated real-world Indian agricultural mandi prices and global commodity trends
const COMMODITIES_DB: Commodity[] = [
  {
    id: "rice",
    name: "Rice (Paddy)",
    mspPrice: 2183,
    currentMarketPrice: 2450,
    prevPrice: 2320,
    trend: "up",
    estimatedYieldPerAcre: 2.2,
    priceTrendHistory: [
      { month: "Jan", price: 2200 },
      { month: "Feb", price: 2240 },
      { month: "Mar", price: 2300 },
      { month: "Apr", price: 2320 },
      { month: "May", price: 2450 }
    ]
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    mspPrice: 2090,
    currentMarketPrice: 1980,
    prevPrice: 2050,
    trend: "down",
    estimatedYieldPerAcre: 3.5,
    priceTrendHistory: [
      { month: "Jan", price: 2120 },
      { month: "Feb", price: 2100 },
      { month: "Mar", price: 2080 },
      { month: "Apr", price: 2050 },
      { month: "May", price: 1980 }
    ]
  },
  {
    id: "chickpeas",
    name: "Chickpeas (Bengal Gram)",
    mspPrice: 5440,
    currentMarketPrice: 6100,
    prevPrice: 5800,
    trend: "up",
    estimatedYieldPerAcre: 1.1,
    priceTrendHistory: [
      { month: "Jan", price: 5450 },
      { month: "Feb", price: 5600 },
      { month: "Mar", price: 5750 },
      { month: "Apr", price: 5800 },
      { month: "May", price: 6100 }
    ]
  },
  {
    id: "cotton",
    name: "Cotton (Kapas)",
    mspPrice: 6620,
    currentMarketPrice: 7250,
    prevPrice: 7200,
    trend: "up",
    estimatedYieldPerAcre: 1.5,
    priceTrendHistory: [
      { month: "Jan", price: 6800 },
      { month: "Feb", price: 7000 },
      { month: "Mar", price: 7150 },
      { month: "Apr", price: 7200 },
      { month: "May", price: 7250 }
    ]
  },
  {
    id: "coffee",
    name: "Coffee (Arabica)",
    mspPrice: 18500, // estimated
    currentMarketPrice: 21000,
    prevPrice: 21000,
    trend: "stable",
    estimatedYieldPerAcre: 0.8,
    priceTrendHistory: [
      { month: "Jan", price: 20500 },
      { month: "Feb", price: 21000 },
      { month: "Mar", price: 20800 },
      { month: "Apr", price: 21000 },
      { month: "May", price: 21000 }
    ]
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    mspPrice: 6500,
    currentMarketPrice: 8500,
    prevPrice: 8100,
    trend: "up",
    estimatedYieldPerAcre: 4.5,
    priceTrendHistory: [
      { month: "Jan", price: 7800 },
      { month: "Feb", price: 8000 },
      { month: "Mar", price: 8150 },
      { month: "Apr", price: 8100 },
      { month: "May", price: 8500 }
    ]
  }
];

export default function MarketBoard() {
  const [selectedCommId, setSelectedCommId] = useState<string>("rice");
  const [estimateLandArea, setEstimateLandArea] = useState<number>(3); // Acres
  const [cropPriceMultiplier, setCropPriceMultiplier] = useState<number>(100); // % matching density

  const currentComm = COMMODITIES_DB.find(item => item.id === selectedCommId) || COMMODITIES_DB[0];

  // Calculations for Yield estimator
  const harvestYieldTonnes = Math.round((currentComm.estimatedYieldPerAcre * estimateLandArea) * 10) / 10;
  const yieldQuintals = harvestYieldTonnes * 10; // 1 Tonne = 10 Quintals
  const grossIncome = Math.round(yieldQuintals * currentComm.currentMarketPrice);
  const potentialExpenses = Math.round(grossIncome * 0.35); // 35% estimated inputs/costs
  const netEarningsProfits = Math.round(grossIncome - potentialExpenses);

  return (
    <div className="space-y-8" id="agriculture-market-board">
      
      {/* Top row showing statistics metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Mandi Spot Index</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">Agricultural Mandi Board</span>
          </div>
          <div className="w-10 h-10 bg-indigo-50 text-indigo-750 rounded-2xl flex items-center justify-center">
            <Coins size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Highest Profitability Strain</span>
            <span className="text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg block w-max">
              Coffee & Chickpeas
            </span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-750 rounded-2xl flex items-center justify-center">
            <Award size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average Market Trend</span>
            <span className="text-sm font-bold text-amber-700 flex items-center gap-1">
              <TrendingUp size={14} className="text-amber-600" />
              Bullish (+5.4% MoM)
            </span>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Global Trading Status</span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Mandi Spot Active</span>
          </div>
          <div className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 border border-emerald-100 rounded-lg">
            LIVE FEED
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Mandi Rates & Recharts line trend table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Coins size={16} className="text-emerald-600" />
                Commodity Spot Pricing & Historical Trends
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Rates listed per Quintal (100 Kg) alongside minimum benchmark supports (MSP).</p>
            </div>
            
            <select
              value={selectedCommId}
              onChange={(e) => setSelectedCommId(e.target.value)}
              className="h-10 px-4 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 cursor-pointer"
            >
              {COMMODITIES_DB.map(comm => (
                <option key={comm.id} value={comm.id}>{comm.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">Current Market Price</span>
              <span className="text-lg font-black text-slate-900 block mt-1">₹ {currentComm.currentMarketPrice}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">Government MSP</span>
              <span className="text-lg font-black text-slate-600 block mt-1">₹ {currentComm.mspPrice}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">Spot Trend</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mt-1 ${
                currentComm.trend === "up" 
                  ? "bg-emerald-50 text-emerald-800"
                  : currentComm.trend === "down"
                  ? "bg-red-50 text-red-800"
                  : "bg-slate-100 text-slate-600"
              }`}>
                {currentComm.trend === "up" ? "▲ Upward" : currentComm.trend === "down" ? "▼ Downward" : "■ Stable"}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">5-Month Mandi Spot Historical Line Analytics</span>
            <div className="h-[200px] w-full text-[10px]" style={{ minWidth: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentComm.priceTrendHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: "10px" }} />
                  <Line 
                    name="Spot Rate Per Quintal (₹)" 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right crop yield calculator (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-250 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="pb-4 border-b border-dashed border-slate-150">
              <span className="text-[10px] uppercase font-extrabold text-emerald-700 animate-pulse bg-emerald-50 px-2.5 py-1 border border-emerald-100 rounded-full">
                Yield Modeling Suite
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 flex items-center gap-1.5">
                <Calculator size={15} className="text-emerald-600" />
                Yield & Economic Planner
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Project estimated output tonnes and gross earnings based on land sizing.</p>
            </div>

            {/* Input adjustment for Acreage */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">Cultivable Area (Acres)</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  min={1} 
                  max={50} 
                  value={estimateLandArea} 
                  onChange={(e) => setEstimateLandArea(Math.max(1, Number(e.target.value)))}
                  className="flex-1 h-10 px-3.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 text-center"
                />
                <span className="bg-slate-100 border border-slate-200 text-slate-600 text-xs px-4 rounded-xl flex items-center justify-center font-bold shrink-0">
                  Acres
                </span>
              </div>
            </div>

            {/* Simulated Outputs checklist */}
            <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Estimated Crop Biomass</span>
                <span className="font-extrabold text-slate-900">{harvestYieldTonnes} Metric Tonnes</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Equivalent Weight</span>
                <span className="font-extrabold text-slate-900">{yieldQuintals} Quintals (Qtl)</span>
              </div>

              <div className="flex justify-between items-center text-xs pt-2.5 border-t border-slate-200/60 font-sans">
                <span className="text-slate-600 font-semibold flex items-center gap-1">
                  <Coins size={13} className="text-amber-500" />
                  Gross Mandi Value
                </span>
                <span className="font-bold text-slate-900">₹ {grossIncome.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Input Seed & Fertilizers (35% est.)</span>
                <span className="font-semibold text-red-650">- ₹ {potentialExpenses.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-xs pt-2.5 border-t border-emerald-250 font-sans bg-emerald-50/50 p-2 rounded-xl">
                <span className="text-emerald-850 font-bold flex items-center gap-1">
                  <Wallet size={13} className="text-emerald-600" />
                  Estimated Net Profit
                </span>
                <span className="font-black text-emerald-800 text-sm">₹ {netEarningsProfits.toLocaleString()}</span>
              </div>

            </div>
          </div>

          <div className="bg-indigo-50 text-indigo-900 border border-indigo-200/40 p-4 rounded-xl flex items-start gap-2 text-[11px] leading-relaxed mt-6">
            <Lightbulb className="shrink-0 text-indigo-650 mt-0.5" size={14} />
            <div>
              <strong className="block font-bold">Agronomist Recommendation:</strong>
              Selling during peak post-monsoon stock periods (typically May) recovers up to ₹400 extra per quintal over harvesting-month spot rates. Use dry warehouse packing to store {currentComm.name} grains safely.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
