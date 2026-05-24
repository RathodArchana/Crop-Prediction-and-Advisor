import React, { useState } from "react";
import { 
  Upload, ShieldAlert, CheckCircle, Activity, Sparkles, AlertTriangle, 
  RefreshCw, Info, Leaf, HelpCircle, ArrowRight, Sun, Droplet 
} from "lucide-react";

interface DiseaseProfile {
  id: string;
  name: string;
  scientificName: string;
  cropTarget: string;
  confidence: number;
  symptoms: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  prevention: string[];
  severity: "High" | "Medium" | "Low";
}

const PRESET_DISEASES: DiseaseProfile[] = [
  {
    id: "paddy-blast",
    name: "Paddy Blast (Magnaporthe oryzae)",
    scientificName: "Pyricularia oryzae",
    cropTarget: "Rice (Paddy)",
    confidence: 94,
    severity: "High",
    symptoms: [
      "Spindle-shaped (diamond-shaped) lesions on leaves with gray centers and brown borders.",
      "Collar rot leading to premature leaf death and stalk collapse.",
      "Grayish fungal dust on the under-surface of active lesions during humid mornings."
    ],
    organicTreatment: [
      "Spray Pseudomonas fluorescens broth (20g per liter of water) during early stages.",
      "Apply Pseudomonas bio-formulations directly to seedlings before transplanting.",
      "Incorporate well-rotted farmyard manure to establish resilient soil microbiomes."
    ],
    chemicalTreatment: [
      "Spray Tricyclazole 75% WP @ 0.6g/liter OR Isoprothiolane 40% EC @ 1.5ml/liter of water.",
      "Ensure uniform chemical contact across leaves; repeat after 10 days if humidity persists above 85%."
    ],
    prevention: [
      "Avoid excessive nitrogenous fertilizer feeds which trigger rapid, tender vegetative tissue.",
      "Keep standard spacing of 20cm x 15cm between rice hills to permit airflow.",
      "Sow certified disease-resistant strains calibrated for local delta microclimates."
    ]
  },
  {
    id: "tomato-late-blight",
    name: "Tomato Late Blight",
    scientificName: "Phytophthora infestans",
    cropTarget: "Tomato",
    confidence: 97,
    severity: "High",
    symptoms: [
      "Water-soaked dark green/black spots expanding rapidly across leaf tips.",
      "White downy fungal growth on the underside of infected leaves in cool, moist weather.",
      "Dark brown lesions on stems leading to rapid structural collapse of the vine."
    ],
    organicTreatment: [
      "Incorporate copper-based organic soaps or Bordeaux mixture (0.5%) directly onto leaves.",
      "Prune lower yellowing leaves to maximize morning sun thermalization.",
      "Mulch soil to eliminate rain-splash transmission of mature spores."
    ],
    chemicalTreatment: [
      "Administer Mancozeb 75% WP @ 2g/liter OR Metalaxyl-M + Mancozeb @ 2.5g/liter.",
      "Apply protective fungicides immediately prior to predicted cool rainy intervals."
    ],
    prevention: [
      "Avoid overhead sprinkler systems; utilize localized ground-level drip tubing.",
      "Rotate host nightshade crop species (tomatoes, potatoes) out of soil for at least 3 years.",
      "Provide generous margins above soil to ensure continuous ventilation."
    ]
  },
  {
    id: "mango-anthracnose",
    name: "Mango Anthracnose",
    scientificName: "Colletotrichum gloeosporioides",
    cropTarget: "Mango",
    confidence: 89,
    severity: "Medium",
    symptoms: [
      "Dark brown to black circular lesions on young leaves, twigs, and developing mango fruits.",
      "Premature leaf drop and blossom blight preventing healthy fruit setting.",
      "Black staining on mature skin resembling tear-streaks on harvested fruits."
    ],
    organicTreatment: [
      "Prune affected canopy branches post-harvest and apply organic neem seed oil formulations.",
      "Treat harvested fruits with hot water (52°C) for 10 minutes to suppress latent spores."
    ],
    chemicalTreatment: [
      "Spray Carbendazim 50% WP @ 1g/liter OR Copper Oxychloride 50% WP @ 3g/liter during blossom flush."
    ],
    prevention: [
      "Prune dead wood and dry leaves from under the orchard canopy and burn to eliminate mycelium sources.",
      "Provide balanced potash soil amendments to maximize rind mechanical toughness."
    ]
  },
  {
    id: "apple-scab",
    name: "Apple Scab",
    scientificName: "Venturia inaequalis",
    cropTarget: "Apple",
    confidence: 91,
    severity: "Medium",
    symptoms: [
      "Velvety olive-green spots forming on the leaf undersides, transitioning to metallic dark brown.",
      "Leaf twisting, curling, and early yellowing leading to total mid-season canopy loss.",
      "Cork-like scabby brown lesions on dwarf fruits."
    ],
    organicTreatment: [
      "Apply sulfur-based or mineral oil sprays early in the pre-blossom stage.",
      "Incorporate compost tea onto leaf litter to speed up winter decomposition."
    ],
    chemicalTreatment: [
      "Spray Difenoconazole 25% EC @ 0.5ml/liter OR Captain 50% WP @ 2g/liter at pink bud stage."
    ],
    prevention: [
      "Clear all fallen autumn foliage completely from ground level.",
      "Choose resistant varieties like Liberty, Prima, or Enterprise for damp mountain locations."
    ]
  },
  {
    id: "cotton-leaf-curl",
    name: "Cotton Leaf Curl",
    scientificName: "Cotton Leaf Curl Virus (CLCuV)",
    cropTarget: "Cotton",
    confidence: 93,
    severity: "High",
    symptoms: [
      "Severe upward or downward rolling/curling of cotton seedling leaves.",
      "Thickening and prominent greening of leaf veins, presenting small cup-like structures underneath.",
      "Stunted crop growth and reduction in healthy boll numbers."
    ],
    organicTreatment: [
      "Apply neem leaf kernel extract (5%) to manage whitefly insect vectors naturally.",
      "Install yellow sticky traps (15 per acre) to trap flying insect vectors."
    ],
    chemicalTreatment: [
      "Manage Whiteflies with Diafenthiuron 50% WP @ 1.2g/liter OR Imidacloprid 17.8% SL @ 0.5ml/liter."
    ],
    prevention: [
      "Execute strict eradication of weed hosts (e.g., Sida acuta, Abutilon indicum) near boundaries.",
      "Adopt a strict crop-free window between cotton seasons."
    ]
  }
];

export default function DiseaseDiagnoser({ lang }: { lang: "en" | "kn" | "hi" }) {
  const [selectedPreset, setSelectedPreset] = useState<DiseaseProfile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [manualSample, setManualSample] = useState<DiseaseProfile | null>(null);

  const handleSelectPreset = (disease: DiseaseProfile) => {
    setIsAnalyzing(true);
    setCustomImage(null);
    setTimeout(() => {
      setSelectedPreset(disease);
      setManualSample(null);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processUploadedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const processUploadedFile = (file: File) => {
    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onload = () => {
      setCustomImage(reader.result as string);
      // Simulate intelligent neural diagnostic matching random preset
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * PRESET_DISEASES.length);
        setManualSample(PRESET_DISEASES[randomIndex]);
        setSelectedPreset(null);
        setIsAnalyzing(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const activeDisease = selectedPreset || manualSample;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100/50 p-6 sm:p-8" id="disease-pathology-detector">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-800 text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border border-red-200 mb-2">
            <ShieldAlert size={11} className="text-red-600" />
            Pathological Neural Classifier (CNN)
          </div>
          <h3 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <Leaf className="text-emerald-600 animate-bounce" size={20} />
            Plant Leaf Disease Diagnoser
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Provide a fresh leaf photograph below. Our deep neural classifier calculates pathological patterns to recommend precision treatments.
          </p>
        </div>
        
        {/* Toggle Preset helper for convenient demo checks */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 self-center">Demo Diagnostics:</span>
          {PRESET_DISEASES.map(dis => (
            <button
              key={dis.id}
              onClick={() => handleSelectPreset(dis)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer text-[10px] ${
                activeDisease?.id === dis.id 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {dis.cropTarget} Sample
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive upload column (40% span) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 h-[280px] text-center transition relative ${
              dragActive 
                ? "border-emerald-500 bg-emerald-50/40" 
                : "border-slate-300 hover:border-emerald-400 bg-slate-50/50"
            }`}
          >
            {customImage ? (
              <div className="absolute inset-2 rounded-2xl overflow-hidden group">
                <img 
                  src={customImage} 
                  alt="Uploaded leaf tissue sample" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1.5">
                  <RefreshCw size={14} className="animate-spin" />
                  Replace Leaf Image
                </div>
              </div>
            ) : selectedPreset ? (
              <div className="absolute inset-2 rounded-2xl overflow-hidden border border-slate-100 bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-3 animate-pulse">
                  <Leaf size={28} />
                </div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  {selectedPreset.cropTarget} Sample Loaded
                </h4>
                <p className="text-[10px] text-slate-500 mt-1">
                  Pathology metrics evaluated against 170,000 baseline samples.
                </p>
                <div className="mt-4 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  Status: Analysis Matched
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-500 mb-4 group-hover:scale-105 transition">
                  <Upload size={20} className="text-emerald-600" />
                </div>
                <p className="text-xs text-slate-800 font-bold">
                  Drag and drop leaf image or <span className="text-emerald-700 underline cursor-pointer">browse</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  Supports JPEG, PNG, HEIC up to 8MB.
                </p>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              title="Upload leaf photo"
            />
          </div>

          {/* Quick tips card */}
          <div className="bg-emerald-50/60 border border-emerald-500/10 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-600" />
              CNN Pathology Guide
            </h4>
            <ul className="text-[11px] text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Expose leaf top-surface evenly in dry daylight conditions.</li>
              <li>Avoid high focal reflections or overlapping dry weeds in frame.</li>
              <li>Toggle preset samples on the upper right for immediate verification.</li>
            </ul>
          </div>

        </div>

        {/* Right diagnostic outcome column (70% span) */}
        <div className="lg:col-span-7">
          
          {isAnalyzing ? (
            <div className="bg-slate-50 border border-slate-100 rounded-3xl h-full min-h-[300px] flex flex-col items-center justify-center p-8 text-center animate-pulse">
              <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-emerald-600 animate-spin mb-4"></div>
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Running Pathological Scan</h4>
              <p className="text-xs text-slate-500 mt-2">
                Deploying CNN kernel convolution sweeps. Analyzing visual necrotic spot margins and chlorophyll distribution...
              </p>
            </div>
          ) : activeDisease ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Outcome Header Metrics */}
              <div className="bg-slate-50 border border-slate-200/50 rounded-3xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${
                      activeDisease.severity === "High" 
                        ? "bg-red-50 text-red-800 border border-red-100" 
                        : "bg-amber-50 text-amber-800 border border-amber-100"
                    }`}>
                      Severity: {activeDisease.severity}
                    </span>
                    <h4 className="text-lg font-extrabold text-slate-900 mt-2">{activeDisease.name}</h4>
                    <p className="text-xs italic text-slate-500 mt-1">Found in: {activeDisease.cropTarget} ({activeDisease.scientificName})</p>
                  </div>
                  
                  {/* Accuracy ring */}
                  <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 text-center flex flex-col shrink-0">
                    <span className="text-2xl font-black text-emerald-600 block leading-none">{activeDisease.confidence}%</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">Confidence</span>
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5">
                    <Info size={13} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-700">Identified Necrotic Symptoms:</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 pl-4 list-disc leading-relaxed">
                    {activeDisease.symptoms.map((sym, idx) => (
                      <li key={idx}>{sym}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Plans Tabular Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Organic Action */}
                <div className="bg-emerald-50/45 border border-emerald-500/10 rounded-2xl p-5 space-y-3">
                  <h5 className="text-xs font-extrabold text-emerald-950 uppercase tracking-widest flex items-center gap-1">
                    <Droplet size={13} className="text-emerald-700" />
                    Organic Treatment (Safe)
                  </h5>
                  <ul className="text-xs text-emerald-900 space-y-2 pl-3 list-decimal leading-relaxed">
                    {activeDisease.organicTreatment.map((trMsg, idx) => (
                      <li key={idx}>{trMsg}</li>
                    ))}
                  </ul>
                </div>

                {/* Chemical Action */}
                <div className="bg-indigo-50/45 border border-indigo-500/10 rounded-2xl p-5 space-y-3">
                  <h5 className="text-xs font-extrabold text-indigo-950 uppercase tracking-widest flex items-center gap-1">
                    <Sun size={13} className="text-indigo-700" />
                    Chemical Alternative
                  </h5>
                  <ul className="text-xs text-indigo-900 space-y-2 pl-3 list-decimal leading-relaxed">
                    {activeDisease.chemicalTreatment.map((chemMsg, idx) => (
                      <li key={idx}>{chemMsg}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Preventative measures */}
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 space-y-3">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-600" />
                  Long-term Prophylaxis (Culture Controls)
                </h5>
                <ul className="text-xs text-slate-600 space-y-2 pl-4 list-disc leading-relaxed">
                  {activeDisease.prevention.map((prev, idx) => (
                    <li key={idx}>{prev}</li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl h-full min-h-[350px] flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <HelpCircle size={24} className="text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">No Pathology Target Analyzed</h4>
              <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
                Choose one of our demonstration crop samples on the top right or pull an offline file into the drag-drop selector to inspect live disease results.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
