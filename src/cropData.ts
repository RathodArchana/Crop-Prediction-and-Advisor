import { CropProfile } from "./types";

export const CROPS_DB: CropProfile[] = [
  {
    id: "rice",
    name: "Rice",
    category: "Cereal",
    description: "Highly stable carbohydrate crop requiring extensive standing water and warm conditions. A staple grain across global communities.",
    optimalSoil: {
      nRange: [60, 100],
      pRange: [35, 60],
      kRange: [35, 45],
      phRange: [5.0, 7.0]
    },
    optimalClimate: {
      tempRange: [20, 27],
      humidityRange: [80, 85],
      rainfallRange: [150, 300]
    },
    marketValue: "Medium",
    difficulty: "Medium",
    iconName: "Sprout"
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    category: "Cereal",
    description: "Versatile grain used for food, feed, and products. Requires rich nitrogen inputs, moderate watering, and warm sunny weather.",
    optimalSoil: {
      nRange: [60, 100],
      pRange: [35, 60],
      kRange: [15, 25],
      phRange: [5.5, 7.0]
    },
    optimalClimate: {
      tempRange: [18, 27],
      humidityRange: [55, 70],
      rainfallRange: [60, 110]
    },
    marketValue: "Medium",
    difficulty: "Easy",
    iconName: "Wheat"
  },
  {
    id: "chickpeas",
    name: "Chickpeas (Garbanzo)",
    category: "Legume",
    description: "High-protein legume crop with excellent nitrogen-fixing features. Demands cool, relatively dry climates and highly alkaline soil.",
    optimalSoil: {
      nRange: [20, 60],
      pRange: [55, 80],
      kRange: [75, 85],
      phRange: [5.5, 8.5]
    },
    optimalClimate: {
      tempRange: [17, 21],
      humidityRange: [15, 20],
      rainfallRange: [65, 95]
    },
    marketValue: "High",
    difficulty: "Medium",
    iconName: "Egg"
  },
  {
    id: "kidneybeans",
    name: "Kidney Beans",
    category: "Legume",
    description: "Nutrient-packed legume that grows efficiently with very low initial nitrogen but highly responsive to balanced phosphorus availability.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [35, 60],
      kRange: [15, 25],
      phRange: [5.5, 6.0]
    },
    optimalClimate: {
      tempRange: [15, 25],
      humidityRange: [18, 25],
      rainfallRange: [60, 150]
    },
    marketValue: "Medium",
    difficulty: "Easy",
    iconName: "Gem"
  },
  {
    id: "pigeonpeas",
    name: "Pigeon Peas",
    category: "Legume",
    description: "Drought-hardy woody legume yielding nutritious pulses. Tolerates wide variation of pH and has shallow, nutrient-fixing root systems.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [55, 80],
      kRange: [15, 25],
      phRange: [4.5, 8.5]
    },
    optimalClimate: {
      tempRange: [18, 37],
      humidityRange: [30, 70],
      rainfallRange: [90, 200]
    },
    marketValue: "High",
    difficulty: "Easy",
    iconName: "Flower2"
  },
  {
    id: "mothbeans",
    name: "Moth Beans",
    category: "Legume",
    description: "An exceptionally drought-resistant legume crop native to arid regions, grown for human nutrition and robust soil replenishment.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [35, 60],
      kRange: [15, 25],
      phRange: [3.5, 10.0]
    },
    optimalClimate: {
      tempRange: [24, 30],
      humidityRange: [40, 65],
      rainfallRange: [30, 75]
    },
    marketValue: "Medium",
    difficulty: "Easy",
    iconName: "Leaf"
  },
  {
    id: "mungbean",
    name: "Mung Beans",
    category: "Legume",
    description: "Short-duration warm crop fitting into cereal rotations. Prefers very warm, humid states and loamy soil.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [35, 60],
      kRange: [15, 25],
      phRange: [6.2, 7.2]
    },
    optimalClimate: {
      tempRange: [27, 30],
      humidityRange: [80, 90],
      rainfallRange: [30, 60]
    },
    marketValue: "High",
    difficulty: "Medium",
    iconName: "Salad"
  },
  {
    id: "blackgram",
    name: "Black Gram",
    category: "Legume",
    description: "Dense nutritional black pulse thriving in heavily structured loams, hot days, and dry post-monsoon weather setups.",
    optimalSoil: {
      nRange: [20, 60],
      pRange: [55, 80],
      kRange: [15, 25],
      phRange: [6.5, 7.5]
    },
    optimalClimate: {
      tempRange: [25, 35],
      humidityRange: [60, 70],
      rainfallRange: [60, 75]
    },
    marketValue: "High",
    difficulty: "Medium",
    iconName: "Bean"
  },
  {
    id: "lentil",
    name: "Lentil",
    category: "Legume",
    description: "Historically celebrated cooling-season pulse demanding well-drained loams and highly balanced moisture environments.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [35, 60],
      kRange: [15, 25],
      phRange: [5.9, 6.9]
    },
    optimalClimate: {
      tempRange: [18, 30],
      humidityRange: [60, 70],
      rainfallRange: [30, 55]
    },
    marketValue: "High",
    difficulty: "Easy",
    iconName: "Disc"
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    category: "Fruit",
    description: "Premium perennial crop of semi-arid regions. Extremely resilient to heat and drought once established, yielding sweet antioxident-rich arils.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [5, 30],
      kRange: [35, 45],
      phRange: [5.5, 7.5]
    },
    optimalClimate: {
      tempRange: [18, 25],
      humidityRange: [85, 90],
      rainfallRange: [100, 110]
    },
    marketValue: "High",
    difficulty: "Hard",
    iconName: "Apple"
  },
  {
    id: "banana",
    name: "Banana",
    category: "Fruit",
    description: "Highly heavy-feeding herbaceous perennial requiring massive amounts of potassium, nitrogen, and constant moisture support.",
    optimalSoil: {
      nRange: [80, 120],
      pRange: [70, 95],
      kRange: [45, 55],
      phRange: [5.5, 6.5]
    },
    optimalClimate: {
      tempRange: [25, 29],
      humidityRange: [75, 85],
      rainfallRange: [90, 110]
    },
    marketValue: "Medium",
    difficulty: "Medium",
    iconName: "Flame"
  },
  {
    id: "mango",
    name: "Mango",
    category: "Fruit",
    description: "The King of Tropical Fruits. Grows into a huge long-lived tree demanding dry periods for flowering and dense hot summers to ripen.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [15, 40],
      kRange: [25, 35],
      phRange: [4.5, 7.0]
    },
    optimalClimate: {
      tempRange: [27, 36],
      humidityRange: [45, 55],
      rainfallRange: [80, 100]
    },
    marketValue: "High",
    difficulty: "Medium",
    iconName: "Sun"
  },
  {
    id: "grapes",
    name: "Grapes",
    category: "Fruit",
    description: "Vitis vine crop requiring highly specialized structural support, extremely high potash content, and precise dry maturation cycles.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [120, 145],
      kRange: [195, 205],
      phRange: [5.5, 6.0]
    },
    optimalClimate: {
      tempRange: [8, 40],
      humidityRange: [80, 83],
      rainfallRange: [65, 75]
    },
    marketValue: "High",
    difficulty: "Hard",
    iconName: "Grape"
  },
  {
    id: "watermelon",
    name: "Watermelon",
    category: "Fruit",
    description: "Sandy loam crop requiring substantial nitrogen, very low phosphate, and intense solar heat for high sugar concentration.",
    optimalSoil: {
      nRange: [80, 120],
      pRange: [5, 30],
      kRange: [45, 55],
      phRange: [6.0, 7.0]
    },
    optimalClimate: {
      tempRange: [24, 27],
      humidityRange: [80, 90],
      rainfallRange: [40, 55]
    },
    marketValue: "Medium",
    difficulty: "Easy",
    iconName: "CircleDot"
  },
  {
    id: "muskmelon",
    name: "Muskmelon",
    category: "Fruit",
    description: "Delectable desert fruit demanding high Nitrogen, low phosphorus, extremely humid conditions, and hot days for perfect netting.",
    optimalSoil: {
      nRange: [80, 120],
      pRange: [5, 30],
      kRange: [45, 55],
      phRange: [6.0, 7.0]
    },
    optimalClimate: {
      tempRange: [27, 30],
      humidityRange: [90, 95],
      rainfallRange: [20, 30]
    },
    marketValue: "High",
    difficulty: "Medium",
    iconName: "Globe"
  },
  {
    id: "apple",
    name: "Apple",
    category: "Fruit",
    description: "Deciduous orchard tree demanding dynamic chilling phases, highly abundant Phosphorus/Potash soils, and moist humid days.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [120, 145],
      kRange: [195, 205],
      phRange: [5.5, 6.5]
    },
    optimalClimate: {
      tempRange: [21, 24],
      humidityRange: [90, 95],
      rainfallRange: [100, 125]
    },
    marketValue: "High",
    difficulty: "Hard",
    iconName: "Apple"
  },
  {
    id: "orange",
    name: "Orange (Citrus)",
    category: "Fruit",
    description: "Citrus crop needing very sweet, neutral soils, extremely low phosphate, high atmospheric moisture, and temperate weather patterns.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [5, 30],
      kRange: [5, 15],
      phRange: [6.0, 8.0]
    },
    optimalClimate: {
      tempRange: [10, 35],
      humidityRange: [90, 95],
      rainfallRange: [100, 120]
    },
    marketValue: "Medium",
    difficulty: "Medium",
    iconName: "Citrus"
  },
  {
    id: "papaya",
    name: "Papaya",
    category: "Fruit",
    description: "Fast-growing tropical herbaceous tree requiring excellent soil drainage, rich balanced inputs, and constant heavy moisture.",
    optimalSoil: {
      nRange: [30, 70],
      pRange: [45, 70],
      kRange: [45, 55],
      phRange: [6.5, 7.0]
    },
    optimalClimate: {
      tempRange: [23, 44],
      humidityRange: [90, 95],
      rainfallRange: [240, 250]
    },
    marketValue: "Medium",
    difficulty: "Medium",
    iconName: "Activity"
  },
  {
    id: "coconut",
    name: "Coconut",
    category: "Cash Crop",
    description: "Coastal palm tree highly tolerant to salinity, thriving on organic sand, high humidity, warm sea temperatures, and plentiful rainfall.",
    optimalSoil: {
      nRange: [0, 40],
      pRange: [5, 30],
      kRange: [25, 35],
      phRange: [5.5, 6.5]
    },
    optimalClimate: {
      tempRange: [25, 30],
      humidityRange: [90, 99],
      rainfallRange: [130, 230]
    },
    marketValue: "High",
    difficulty: "Medium",
    iconName: "Palm"
  },
  {
    id: "cotton",
    name: "Cotton",
    category: "Fiber",
    description: "Invaluable fiber crop demanding deep, slightly alkaline black clay soils, extreme sun exposure, and hot, dry harvesting periods.",
    optimalSoil: {
      nRange: [100, 140],
      pRange: [35, 60],
      kRange: [15, 25],
      phRange: [7.5, 8.5]
    },
    optimalClimate: {
      tempRange: [22, 26],
      humidityRange: [75, 85],
      rainfallRange: [60, 100]
    },
    marketValue: "Medium",
    difficulty: "Medium",
    iconName: "Shirt"
  },
  {
    id: "jute",
    name: "Jute (Golden Fiber)",
    category: "Fiber",
    description: "Golden natural fiber growing in alluvial delta riverbeds, demanding rapid standing water, heavy relative humidity, and constant warmth.",
    optimalSoil: {
      nRange: [60, 100],
      pRange: [35, 60],
      kRange: [35, 45],
      phRange: [6.0, 8.0]
    },
    optimalClimate: {
      tempRange: [23, 28],
      humidityRange: [70, 90],
      rainfallRange: [150, 200]
    },
    marketValue: "Medium",
    difficulty: "Hard",
    iconName: "Scissors"
  },
  {
    id: "coffee",
    name: "Coffee",
    category: "Cash Crop",
    description: "High-value mountain cash crop requiring shaded, highly volcanic rich acidic soils, moderate humidity, and ample altitude drainage.",
    optimalSoil: {
      nRange: [80, 120],
      pRange: [15, 40],
      kRange: [25, 35],
      phRange: [6.0, 8.0]
    },
    optimalClimate: {
      tempRange: [23, 28],
      humidityRange: [50, 65],
      rainfallRange: [110, 190]
    },
    marketValue: "High",
    difficulty: "Hard",
    iconName: "Coffee"
  }
];

// Helper function to evaluate compatibility score
export function calcCropScore(soil: { n: number; p: number; k: number; temperature: number; humidity: number; ph: number; rainfall: number }, crop: CropProfile) {
  const calcFactor = (val: number, range: [number, number]) => {
    const [min, max] = range;
    if (val >= min && val <= max) return 1.0;
    
    // Smooth decay outside range
    const margin = Math.max(10, (max - min) * 0.5);
    if (val < min) {
      return Math.max(0.1, 1 - (min - val) / margin);
    } else {
      return Math.max(0.1, 1 - (val - max) / margin);
    }
  };

  const nScore = calcFactor(soil.n, crop.optimalSoil.nRange);
  const pScore = calcFactor(soil.p, crop.optimalSoil.pRange);
  const kScore = calcFactor(soil.k, crop.optimalSoil.kRange);
  const phScore = calcFactor(soil.ph, crop.optimalSoil.phRange);

  const tScore = calcFactor(soil.temperature, crop.optimalClimate.tempRange);
  const hScore = calcFactor(soil.humidity, crop.optimalClimate.humidityRange);
  const rScore = calcFactor(soil.rainfall, crop.optimalClimate.rainfallRange);

  const soilComp = (nScore * 0.35 + pScore * 0.3 + kScore * 0.25 + phScore * 0.1) * 100;
  const climateComp = (tScore * 0.35 + hScore * 0.3 + rScore * 0.35) * 100;

  const totalScore = (soilComp * 0.5) + (climateComp * 0.5);

  const evaluateParam = (val: number, range: [number, number]) => {
    const [min, max] = range;
    if (val >= min && val <= max) return "Optimal";
    const margin = Math.max(10, (max - min) * 1.0);
    if (val < min - margin || val > max + margin) return "Critical";
    return "Suboptimal";
  };

  return {
    score: Math.round(totalScore),
    soilCompatibility: Math.round(soilComp),
    climateCompatibility: Math.round(climateComp),
    parametersMatch: {
      n: evaluateParam(soil.n, crop.optimalSoil.nRange) as "Optimal" | "Suboptimal" | "Critical",
      p: evaluateParam(soil.p, crop.optimalSoil.pRange) as "Optimal" | "Suboptimal" | "Critical",
      k: evaluateParam(soil.k, crop.optimalSoil.kRange) as "Optimal" | "Suboptimal" | "Critical",
      temp: evaluateParam(soil.temperature, crop.optimalClimate.tempRange) as "Optimal" | "Suboptimal" | "Critical",
      humidity: evaluateParam(soil.humidity, crop.optimalClimate.humidityRange) as "Optimal" | "Suboptimal" | "Critical",
      ph: evaluateParam(soil.ph, crop.optimalSoil.phRange) as "Optimal" | "Suboptimal" | "Critical",
      rainfall: evaluateParam(soil.rainfall, crop.optimalClimate.rainfallRange) as "Optimal" | "Suboptimal" | "Critical"
    }
  };
}

export function recommendCrops(soil: { n: number; p: number; k: number; temperature: number; humidity: number; ph: number; rainfall: number }) {
  const matches = CROPS_DB.map(crop => {
    const metrics = calcCropScore(soil, crop);
    return {
      crop: crop.name,
      ...metrics
    };
  });

  // Sort descending by match score and return top predictions
  return matches.sort((a, b) => b.score - a.score);
}
