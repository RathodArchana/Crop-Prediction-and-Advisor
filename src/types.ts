export interface SoilParameters {
  n: number; // Nitrogen (mg/kg)
  p: number; // Phosphorus (mg/kg)
  k: number; // Potassium (mg/kg)
  temperature: number; // (°C)
  humidity: number; // (%)
  ph: number; // (0-14)
  rainfall: number; // (mm)
}

export interface CropProfile {
  id: string;
  name: string;
  category: "Cereal" | "Legume" | "Fruit" | "Cash Crop" | "Fiber";
  description: string;
  optimalSoil: {
    nRange: [number, number];
    pRange: [number, number];
    kRange: [number, number];
    phRange: [number, number];
  };
  optimalClimate: {
    tempRange: [number, number];
    humidityRange: [number, number];
    rainfallRange: [number, number];
  };
  marketValue: "Low" | "Medium" | "High";
  difficulty: "Easy" | "Medium" | "Hard";
  iconName: string;
}

export interface PredictionDetail {
  crop: string;
  score: number; // Match percentage (0-100)
  soilCompatibility: number;
  climateCompatibility: number;
  parametersMatch: {
    n: "Optimal" | "Suboptimal" | "Critical";
    p: "Optimal" | "Suboptimal" | "Critical";
    k: "Optimal" | "Suboptimal" | "Critical";
    temp: "Optimal" | "Suboptimal" | "Critical";
    humidity: "Optimal" | "Suboptimal" | "Critical";
    ph: "Optimal" | "Suboptimal" | "Critical";
    rainfall: "Optimal" | "Suboptimal" | "Critical";
  };
}

export interface AIDiagnostic {
  recommendedCrop: string;
  summary: string;
  fertilizerAdvice: {
    nitrogenAction: string;
    phosphorusAction: string;
    potassiumAction: string;
  };
  irrigationPlan: string;
  riskMitigation: string;
  economicOutlook: string;
}

export interface PredictionResponse {
  success: boolean;
  predictions: PredictionDetail[];
  aiDiagnostic?: AIDiagnostic;
  error?: string;
}
