import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { recommendCrops } from "./src/cropData";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Interactive Agronomist Assistant Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: "Query message is required." });
    }

    const client = getGeminiClient();
    const lang = language || "en";

    if (client) {
      try {
        const prompt = `You are a legendary AI agricultural advisor, agronomist, and soil doctor.
The farmer is asking in language: ${lang}.
Farmer query: "${message}"

Provide a highly realistic, professional, helpful, and scientific answer. Break down recommendations into actionable items (such as natural composting, fertilizer dosage, or water timing). Max 4 sentences. Make sure it is answered directly and with warm concern.`;

        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are a smart, localized agronomist bot. Answer the farmer with extreme clarity and actionable steps. Return a plain text response.",
          }
        });

        const reply = response.text || "";
        return res.json({ success: true, reply });
      } catch (geminiChatErr) {
        console.error("Gemini Chatbot integration error, falling back:", geminiChatErr);
      }
    }

    // Advanced rule-based fallback responses for offline/keyless environments
    const lowerMsg = message.toLowerCase();
    let reply = "";

    if (lang === "kn") {
      if (lowerMsg.includes("fertilizer") || lowerMsg.includes("ಗೊಬ್ಬರ") || lowerMsg.includes("ಪೋಷಕಾಂಶ")) {
        reply = "ಮಣ್ಣಿನಲ್ಲಿ ಸಾರಜನಕ ಹೆಚ್ಚಿಸಲು ಯೂರಿಯಾ ಅಥವಾ ಹಸಿರು ಗೊಬ್ಬರ ಬಳಸಿ. ರಂಜಕ ಕೊರತೆ ನಿವಾರಿಸಲು ಸಿಂಗಲ್ ಸೂಪರ್ ಫಾಸ್ಫೇಟ್ ಸೂಕ್ತವಾಗಿದೆ. ಸಾವಯವ ಕೃಷಿಯಲ್ಲಿ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು ಕಾಂಪೋಸ್ಟ್ ಅನ್ನು ಬಿತ್ತನೆಗೆ ೧೫ ದಿನ ಮೊದಲೇ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.";
      } else if (lowerMsg.includes("water") || lowerMsg.includes("ನೀರಾವರಿ") || lowerMsg.includes("ನೀರು")) {
        reply = "ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರುಣಿಸಿ. ತರಕಾರಿ ಬೆಳೆಗಳಿಗೆ ಹನಿ ನೀರಾವರಿ (Drip Irrigation) ವಿಧಾನ ಅತ್ಯುತ್ತಮವಾಗಿದ್ದು, ಶೇ. ೪೦ ಕ್ಕೂ ಹೆಚ್ಚು ನೀರನ್ನು ಉಳಿಸುತ್ತದೆ. ಹೆಚ್ಚು ನೀರು ನಿಲ್ಲದಂತೆ ಕಾಲುವೆಗಳನ್ನು ಉತ್ತಮಗೊಳಿಸಿ.";
      } else if (lowerMsg.includes("disease") || lowerMsg.includes("ರೋಗ") || lowerMsg.includes("ಕೀಟ")) {
        reply = "ಲಕ್ಷಣಗಳು ಕಂದು ಬಣ್ಣದ ಚುಕ್ಕೆಗಳಾಗಿದ್ದರೆ ಶಿಲೀಂಧ್ರನಾಶಕ (mancozeb) ಸಿಂಪಡಿಸಿ. ಆರಂಭದಲ್ಲಿ ರೋಗಗ್ರಸ್ತ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ನಾಶಪಡಿಸಿ. ಬೇವಿನ ಎಣ್ಣೆ (Neem Oil) ಸಿಂಪಡಿಸುವುದರಿಂದ ಕೀಟಗಳನ್ನು ನೈಸರ್ಗಿಕವಾಗಿ ನಿಯಂತ್ರಿಸಬಹುದು.";
      } else if (lowerMsg.includes("ph") || lowerMsg.includes("ರಸಸಾರ")) {
        reply = "ಅಮ್ಲೀಯ ಮಣ್ಣಿಗೆ (pH < 5.5) ಸುಣ್ಣ (Lime) ಸೇರಿಸುವುದರಿಂದ ತಟಸ್ಥಗೊಳ್ಳುತ್ತದೆ. ಕ್ಷಾರೀಯ ಮಣ್ಣಿಗೆ ಜಿಪ್ಸಮ್ (Gypsum) ಅಥವಾ ಗಂಧಕವನ್ನು ಬಳಸುವುದರಿಂದ ಮಣ್ಣಿನ ಫಸಲು ಸುಧಾರಿಸುತ್ತದೆ.";
      } else {
        reply = "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಸಿಕ್ಕಿದೆ! ಬೆಳೆ ಸಂರಕ್ಷಣೆಗಾಗಿ ಯಾವಾಗಲೂ ಮಣ್ಣಿನ NPK ಮಟ್ಟವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರೀಕ್ಷಿಸಿ. ಬೆಳೆಗಳ ಆರೋಗ್ಯ ವೃದ್ಧಿಸಲು ಸಾವಯವ ಕಾಂಪೋಸ್ಟ್, ಹನಿ ನೀರಾವರಿ ಮತ್ತು ಬೆಳೆ ಬದಲಾವಣೆ (Crop Rotation) ತಂತ್ರಗಳನ್ನು ಅಳವಡಿಸಿಕೊಳ್ಳಿ.";
      }
    } else if (lang === "hi") {
      if (lowerMsg.includes("fertilizer") || lowerMsg.includes("खाद") || lowerMsg.includes("उर्वरक")) {
        reply = "मृदा स्वास्थ्य के लिए संतुलित उर्वरकों का उपयोग करें। नाइट्रोजन बढ़ाने के लिए यूरिया, फॉस्फोरस के लिए सिंगल सुपर फॉस्फेट (SSP) और पोटेशियम के लिए मूरीएट ऑफ पोटाश (MOP) डालें। गोबर की खाद सर्वोत्तम जैविक विकल्प है।";
      } else if (lowerMsg.includes("water") || lowerMsg.includes("सिंचाई") || lowerMsg.includes("पानी")) {
        reply = "सिंचाई हमेशा सुबह या शाम के ठंडे समय में करें। ड्रिप सिंचाई का उपयोग करने से पानी की 50% तक बचत होती है और जड़े सड़ती नहीं हैं। जलभराव होने पर जल निकासी का उचित प्रबंध करें।";
      } else if (lowerMsg.includes("disease") || lowerMsg.includes("बीमारी") || lowerMsg.includes("रोग")) {
        reply = "पत्तियों पर धब्बे दिखने पर जैविक फफूंदनाशक (स्यूडोमोनास) या ट्राइकोडर्मा का छिड़काव करें। कीटों के शुरुआती प्रकोप में 5% नीम के अर्क का छिड़काव करें और ग्रसित हिस्सों को तुरंत नष्ट कर दें।";
      } else if (lowerMsg.includes("ph") || lowerMsg.includes("पीएच")) {
        reply = "अम्लीय मिट्टी (pH 6 से कम) में चूना पाउडर मिलाकर सुधारें, जबकि क्षारीय मिट्टी का उपचार करने के लिए जिप्सम (Gypsum) या जैविक हरी खाद का प्रयोग करें।";
      } else {
        reply = "आपकी कृषि समस्या दर्ज कर ली गई है! स्वस्थ उपज के लिए हमेशा फसल चक्र को अपनाएं। जैविक खाद, समय पर मल्चिंग और एकीकृत कीट प्रबंधन (IPM) का उपयोग करने से पैदावार में 30% तक बढ़ोतरी होती है।";
      }
    } else {
      // English default fallback
      if (lowerMsg.includes("fertilizer") || lowerMsg.includes("npk") || lowerMsg.includes("nutrient")) {
        reply = "Balance is key. If soil tests show low Nitrogen, apply slow-release Urea or organic compost. For Phosphorus deficiency, use Single Super Phosphate. Potash is essential for plant sugar transport and stalk strength.";
      } else if (lowerMsg.includes("water") || lowerMsg.includes("irrigation") || lowerMsg.includes("rain")) {
        reply = "We recommend drip or sprinkler systems rather than flood irrigation. Drip systems deliver moisture directly to the root zone, reducing evapotranspiration losses by up to 45% and curbing fungal spreads.";
      } else if (lowerMsg.includes("disease") || lowerMsg.includes("pest") || lowerMsg.includes("leaf")) {
        reply = "Most leaf spots are fungal (such as Alternaria or Blast). Prune infected foliage immediately to halt spread. Spray cold-pressed neem oil (10ml per liter of water) as a non-toxic preventative shield.";
      } else if (lowerMsg.includes("ph") || lowerMsg.includes("acid")) {
        reply = "For acidic soils (pH below 5.8), integrate agricultural limestone to raise the pH. For alkaline soils (pH above 7.8), supplement with agricultural sulfur or organic peat moss to gradually acidify.";
      } else if (lowerMsg.includes("scheme") || lowerMsg.includes("government")) {
        reply = "Currently, PM-KISAN provides income support of ₹6,000/year. PM Fasal Bima Yojana offers highly subsidized crop insurance policies. Check with your local Gram Panchayat for region-specific subsidized implements.";
      } else {
        reply = "Interesting question! To maximize agricultural yields, ensure balanced mineral loading, dynamic crop rotation, and preventive pest monitoring. Try inspecting our 'Nutrient Planner' or 'Crop Encyclopedia' for phase guidelines.";
      }
    }

    return res.json({ success: true, reply });
  } catch (error) {
    console.error("Agronomy Chatbot server error:", error);
    return res.status(500).json({ success: false, error: "Internal agronomist bot timeout." });
  }
});

// Crop Prediction & Intelligence Diagnostic Endpoint
app.post("/api/predict", async (req, res) => {
  try {
    const { n, p, k, temperature, humidity, ph, rainfall } = req.body;

    // Validate inputs
    if (
      n === undefined || p === undefined || k === undefined ||
      temperature === undefined || humidity === undefined ||
      ph === undefined || rainfall === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing parameters. Please provide full values for N, P, K, Temperature, Humidity, pH, and Rainfall."
      });
    }

    const soil = {
      n: Number(n),
      p: Number(p),
      k: Number(k),
      temperature: Number(temperature),
      humidity: Number(humidity),
      ph: Number(ph),
      rainfall: Number(rainfall)
    };

    // Calculate analytical predictions
    const predictions = recommendCrops(soil);
    const primaryRecommendation = predictions[0];

    // Build the AI diagnostic if API Key is available
    const client = getGeminiClient();
    let aiDiagnostic = null;

    if (client) {
      try {
        const prompt = `You are a world-class Agronomist and Soil Science scientist.
Analyse this farm's current parameters and diagnostic metrics:
- Soil Nutrients: Nitrogen (N): ${soil.n} mg/kg, Phosphorus (P): ${soil.p} mg/kg, Potassium (K): ${soil.k} mg/kg
- Environment: Temperature: ${soil.temperature}°C, Humidity: ${soil.humidity}%, Rainfall: ${soil.rainfall}mm
- Soil Electrochemistry: pH level: ${soil.ph}
- Our algorithm predicts the optimal matching crops in order of suitability: ${predictions.slice(0, 3).map(p => `${p.crop} (${p.score}% match)`).join(", ")}.

Generate a scientific Soil Health Score and complete agricultural advisory package for the primary recommended crop ("${primaryRecommendation.crop}"). Make sure to suggest exact corrective actions for nutrient deviance (Low/Excess N, P, K) and irrigation management. Keep responses highly technical yet actionable for farmers.`;

        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are an expert agronomy diagnostic system. Produce structured advisory answers in JSON format according to the requested schema. Provide clear, highly professional insight.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                recommendedCrop: { 
                  type: Type.STRING, 
                  description: "The primary recommended crop based on overall compatibility" 
                },
                summary: { 
                  type: Type.STRING, 
                  description: "Scientific evaluation summary of soil and environmental conditions" 
                },
                fertilizerAdvice: {
                  type: Type.OBJECT,
                  properties: {
                    nitrogenAction: { type: Type.STRING, description: "Detailed directive to amend, supplement, or reduce Nitrogen" },
                    phosphorusAction: { type: Type.STRING, description: "Detailed directive to amend, supplement, or reduce Phosphorus" },
                    potassiumAction: { type: Type.STRING, description: "Detailed directive to amend, supplement, or reduce Potassium" }
                  },
                  required: ["nitrogenAction", "phosphorusAction", "potassiumAction"]
                },
                irrigationPlan: { 
                  type: Type.STRING, 
                  description: "Watering schedule and scheduling recommendations based on rainfall and crop requirement" 
                },
                riskMitigation: { 
                  type: Type.STRING, 
                  description: "Pest, atmospheric disease, or physiological disorder risks for this scenario and mitigation" 
                },
                economicOutlook: { 
                  type: Type.STRING, 
                  description: "Estimated market value analysis, demand expectations, and harvesting cost advisory" 
                }
              },
              required: ["recommendedCrop", "summary", "fertilizerAdvice", "irrigationPlan", "riskMitigation", "economicOutlook"]
            }
          }
        });

        const jsonText = response.text?.trim() || "";
        aiDiagnostic = JSON.parse(jsonText);
      } catch (geminiErr: any) {
        console.error("Gemini API error, falling back:", geminiErr);
        // Provide structured fallback advisory if API fails or rate limits
        aiDiagnostic = generateFallbackDiagnostic(primaryRecommendation.crop, soil);
      }
    } else {
      // Lazy API key not configured yet, generate a high-quality fallback based on standard rules
      aiDiagnostic = generateFallbackDiagnostic(primaryRecommendation.crop, soil);
    }

    return res.json({
      success: true,
      predictions: predictions.slice(0, 5), // return top 5 crops
      aiDiagnostic
    });

  } catch (error: any) {
    console.error("Backend prediction error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "An unexpected error occurred during prediction analysis."
    });
  }
});

// Fallback Diagnostic Generator
function generateFallbackDiagnostic(cropName: string, soil: any) {
  // Simple heuristic guidance
  const nNote = soil.n < 50 ? "Low Nitrogen. Apply 120 kg/ha of Urea or well-decomposed organic manure." : soil.n > 120 ? "Ample Nitrogen. Avoid extra nitrogenous feeds to prevent physiological leaf burn." : "Stable Nitrogen levels.";
  const pNote = soil.p < 30 ? "Deficient Phosphorus. Incorporate Single Super Phosphate (SSP) or bone meal." : soil.p > 90 ? "Excellent Phosphorus reserve; no supplemental phosphates required." : "Healthy Phosphorus equilibrium.";
  const kNote = soil.k < 30 ? "Insufficient Potassium. Administer Muriate of Potash (MOP) to optimize disease tolerance." : "Potash reserves are adequate for standard vegetative growth.";

  return {
    recommendedCrop: cropName,
    summary: `Your soil currently supports the growth of ${cropName}. The electrochemical balance (pH ${soil.ph}) lies in an acceptable agricultural range. Climate factors are stable. Note: For optimal AI-powered recommendations, add a GEMINI_API_KEY in the Secrets menu.`,
    fertilizerAdvice: {
      nitrogenAction: nNote,
      phosphorusAction: pNote,
      potassiumAction: kNote
    },
    irrigationPlan: soil.rainfall < 100 
      ? `Estimated water deficit due to low rainfall (${soil.rainfall}mm). Implement precise drip irrigation tracking twice weekly.` 
      : `Precipitation (${soil.rainfall}mm) is sufficient. Ensure healthy drainage channels to prevent waterlogging around roots.`,
    riskMitigation: "Monitor for fungal sheath infections and nutrient uptake blockages during humid intervals.",
    economicOutlook: "Steady global commodity demand. High grade yield potential with premium quality organic pricing."
  };
}

// Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] AgriSmart Server listening on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
