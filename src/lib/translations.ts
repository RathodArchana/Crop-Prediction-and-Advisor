export type Language = "en" | "kn" | "hi";

export interface TranslationSchema {
  // Navigation & General
  brandTitle: string;
  brandSubtitle: string;
  predictorTab: string;
  encyclopediaTab: string;
  diseaseTab: string;
  weatherTab: string;
  marketTab: string;
  fertilizerTab: string;
  
  // Intro Landing
  landingTitle1: string;
  landingTitle2: string;
  landingDesc: string;
  launchBtn: string;
  browseBtn: string;
  whyTitle1: string;
  whyDesc1: string;
  whyTitle2: string;
  whyDesc2: string;
  whyTitle3: string;
  whyDesc3: string;
  
  // Predictor Form
  formHeader: string;
  formDesc: string;
  nitrogenLabel: string;
  phosphorusLabel: string;
  potassiumLabel: string;
  tempLabel: string;
  humidityLabel: string;
  phLabel: string;
  rainfallLabel: string;
  submitBtn: string;
  computingBtn: string;
  
  // Results / Insights
  insightsHeader: string;
  insightsDesc: string;
  confidenceScore: string;
  topRecommendations: string;
  soilCompat: string;
  climateCompat: string;
  whyRecommended: string;
  viewDetails: string;
  aiAdvisory: string;
  irrigationSchedule: string;
  riskPlan: string;
  marketOutlook: string;
  
  // Farmer Assistant / Chatbot
  botTitle: string;
  botDesc: string;
  botWelcome: string;
  botInputPlaceholder: string;
  sendBtn: string;
  voiceToggleOn: string;
  voiceToggleOff: string;
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: {
    brandTitle: "AgriSmart Precision Platform",
    brandSubtitle: "AI-Powered Precision Agronomy System",
    predictorTab: "Crop Predictor",
    encyclopediaTab: "Crop Encyclopedia",
    diseaseTab: "Disease Pathologist",
    weatherTab: "Agri-Weather",
    marketTab: "Market Board",
    fertilizerTab: "Nutrient Planner",
    
    landingTitle1: "Sow with Certainty.",
    landingTitle2: "Grow with Intelligence.",
    landingDesc: "Transform physical land samples into highly compatible agriculture yield forecasts. AgriSmart decodes N-P-K electrochemistry, relative humidity, and rainfall indicators to prescribe immediate corrective soil treatments.",
    launchBtn: "Launch Precision Simulator",
    browseBtn: "Browse Crop Encyclopedia",
    whyTitle1: "Soil Matrix Scanner",
    whyDesc1: "Provide Nitrogen, Phosphorus, Potash (N-P-K) levels alongside geological pH and water volume to map baseline conditions.",
    whyTitle2: "Suitability Scoring",
    whyDesc2: "Compare dynamic thresholds against our pre-fitted 22 FAO classes to compute precise atmospheric and chemical fitness metrics.",
    whyTitle3: "Generative Advisory",
    whyDesc3: "Harness advanced Gemini diagnostics to calculate targeted mineral additives, risk mitigation systems, and micro-watering forecasts.",
    
    formHeader: "Agronomic Chemistry Input",
    formDesc: "Configure active soil parameters accurately to calibrate optimal yield matching parameters.",
    nitrogenLabel: "Nitrogen (N)",
    phosphorusLabel: "Phosphorus (P)",
    potassiumLabel: "Potassium (K)",
    tempLabel: "Temperature (°C)",
    humidityLabel: "Relative Humidity (%)",
    phLabel: "Soil pH (0-14)",
    rainfallLabel: "Precipitation (mm)",
    submitBtn: "Evaluate Soil Suite",
    computingBtn: "Computing Soil Diagnostics...",
    
    insightsHeader: "Ecological Recommendation Engine",
    insightsDesc: "Based on local soil chemistry. Select any crop card below to review range details.",
    confidenceScore: "Match Quality",
    topRecommendations: "Optimal Matching Species",
    soilCompat: "Nutrient Harmony",
    climateCompat: "Climatic Viability",
    whyRecommended: "Agronomic Justification",
    viewDetails: "Examine Growth Cycle",
    aiAdvisory: "Gemini Generative Advisory Summary",
    irrigationSchedule: "Irrigation Schedule Projections",
    riskPlan: "Pest & Pathogen Risk Management",
    marketOutlook: "Economic Feasibility & Outlook",
    
    botTitle: "Farmer's AI Companion",
    botDesc: "Ask specialized agronomy questions in your native tongue. Supported by synthetic spoken voice feedback.",
    botWelcome: "Greetings! I am your AgriSmart agronomy assistant. Ask me anything about soil fertility, diseases, or local crop pricing.",
    botInputPlaceholder: "Type your query here or choose one of the preset prompts...",
    sendBtn: "Send Query",
    voiceToggleOn: "Voice Assistance Enabled",
    voiceToggleOff: "Voice Assistance Muted"
  },
  kn: {
    brandTitle: "ಅಗ್ರಿ-ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ವೇದಿಕೆ",
    brandSubtitle: "ಎಐ-ಚಾಲಿತ ನಿಖರ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ ವ್ಯವಸ್ಥೆ",
    predictorTab: "ಬೆಳೆ ಮುನ್ಸೂಚನೆ",
    encyclopediaTab: "ಬೆಳೆ ವಿಶ್ವಕೋಶ",
    diseaseTab: "ಸಸ್ಯ ರೋಗ ಪತ್ತೆ",
    weatherTab: "ಹವಾಮಾನ ಮಾಹಿತಿ",
    marketTab: "ಮಾರುಕಟ್ಟೆ ಮೌಲ್ಯಗಳು",
    fertilizerTab: "ರಸಗೊಬ್ಬರ ಯೋಜನೆ",
    
    landingTitle1: "ಖಾತರಿಯೊಂದಿಗೆ ಬಿತ್ತನೆ ಮಾಡಿ.",
    landingTitle2: "ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಬೆಳೆಯಿರಿ.",
    landingDesc: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಮಾದರಿಗಳನ್ನು ಅಧಿಕ ಬೆಳೆ ಇಳುವರಿ ಮುನ್ಸೂಚನೆಗಳಾಗಿ ಪರಿವರ್ತಿಸಿ. ಅಗ್ರಿ-ಸ್ಮಾರ್ಟ್ ವ್ಯವಸ್ಥೆಯು ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಶ್, ಆರ್ದ್ರತೆ ಮತ್ತು ಮಳೆಯ ಪ್ರಮಾಣವನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಸೂಕ್ತ ಪರಿಹಾರವನ್ನು ನೀಡುತ್ತದೆ.",
    launchBtn: "ಕೃಷಿ ಸಿಮ್ಯುಲೇಟರ್ ಪ್ರಾರಂಭಿಸಿ",
    browseBtn: "ಬೆಳೆ ವಿಶ್ವಕೋಶ ವೀಕ್ಷಿಸಿ",
    whyTitle1: "ಮಣ್ಣಿನ ಮ್ಯಾಟ್ರಿಕ್ಸ್ ಸ್ಕ್ಯಾನರ್",
    whyDesc1: "ಬೇಸ್‌ಲೈನ್ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಾರಜನಕ, ರಂಜಕ ಮತ್ತು ಪೊಟ್ಯಾಶಿಯಂ ಮಟ್ಟಗಳನ್ನು ಮಣ್ಣಿನ ರಸಸಾರ ಮತ್ತು ಮಳೆಯೊಂದಿಗೆ ನಮೂದಿಸಿ.",
    whyTitle2: "ಹೊಂದಾಣಿಕೆಯ ಅಂಕಗಳು",
    whyDesc2: "ನಿಮ್ಮ ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ನಮ್ಮ ೨೨ ಎಫ್‌ಎಓ ಬೆಳೆಗಳ ಶ್ರೇಣಿಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ ನಿಖರ ಸ್ಕೋರ್ ಲೆಕ್ಕಹಾಕಿ.",
    whyTitle3: "ಜೆಮಿನಿ ಬುದ್ಧಿವಂತ ಸಲಹೆಗಾರ",
    whyDesc3: "ಸುಧಾರಿತ ಜೆಮಿನಿ ಎಐ ಬಳಸಿಕೊಂಡು ಖನಿಜ ಪೂರಕಗಳು, ರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ನೀರಾವರಿ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    
    formHeader: "ಕೃಷಿ ರಸಾಯನಶಾಸ್ತ್ರದ ನಿಯತಾಂಕಗಳು",
    formDesc: "ಅತ್ಯುತ್ತಮ ಇಳುವರಿಯನ್ನು ಪಡೆಯಲು ಮಣ್ಣಿನ ಸಕ್ರಿಯ ನಿಯತಾಂಕಗಳನ್ನು ನಿಖರವಾಗಿ ಕಾನ್ಫಿಗರ್ ಮಾಡಿ.",
    nitrogenLabel: "ಸಾರಜನಕ (N/Nitrogen)",
    phosphorusLabel: "ರಂಜಕ (P/Phosphorus)",
    potassiumLabel: "ಪೊಟ್ಯಾಶಿಯಂ (K/Potassium)",
    tempLabel: "ತಾಪಮಾನ (°C/Temperature)",
    humidityLabel: "ಸಾಪೇಕ್ಷ ಆರ್ದ್ರತೆ (%/Humidity)",
    phLabel: "ಮಣ್ಣಿನ ರಸಸಾರ (pH 0-14)",
    rainfallLabel: "ಮಳೆಯ ಪ್ರಮಾಣ (mm/Rainfall)",
    submitBtn: "ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ ವಿಶ್ಲೇಷಿಸಿ",
    computingBtn: "ವಿಶ್ಲೇಷಣೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ...",
    
    insightsHeader: "ಪರಿಸರ ಬೆಳೆ ಶಿಫಾರಸು ಎಂಜಿನ್",
    insightsDesc: "ಸ್ಥಳೀಯ ಮಣ್ಣಿನ ರಸಾಯನಶಾಸ್ತ್ರದ ಆಧಾರದ ಮೇಲೆ. ಬೆಳೆ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಕೆಳಗಿನ ಬೆಳೆ ಕಾರ್ಡ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.",
    confidenceScore: "ಹೊಂದಾಣಿಕೆಯ ಗುಣಮಟ್ಟ",
    topRecommendations: "ಅತ್ಯುತ್ತಮ ಬೆಳೆ ಜೋಡಿಗಳು",
    soilCompat: "ಪೋಷಕಾಂಶಗಳ ಸಮತೋಲನ",
    climateCompat: "ಹವಾಮಾನ ಹೊಂದಾಣಿಕೆ",
    whyRecommended: "ಕೃಷಿ ವೈಜ್ಞಾನಿಕ ಸಮರ್ಥನೆ",
    viewDetails: "ಬೆಳವಣಿಗೆ ಚಕ್ರವನ್ನು ವೀಕ್ಷಿಸಿ",
    aiAdvisory: "ಜೆಮಿನಿ ಎಐ ಕೃಷಿ ಸಲಹಾ ಸಾರಾಂಶ",
    irrigationSchedule: "ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ ಮುನ್ಸೂಚನೆಗಳು",
    riskPlan: "ಕೀಟ ಮತ್ತು ರೋಗ ನಿಯಂತ್ರಣ ಯೋಜನೆ",
    marketOutlook: "ಆರ್ಥಿಕ ಕಾರ್ಯಸಾಧ್ಯತೆ ಮತ್ತು ಮೌಲ್ಯ",
    
    botTitle: "ರೈತರ ಎಐ ಸಹಾಯಕ",
    botDesc: "ಕೃಷಿ ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳನ್ನು ಕನ್ನಡದಲ್ಲೇ ಕೇಳಿ. ಧ್ವನಿ ಸಂಶ್ಲೇಷಣಾ ಸಹಾಯದೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
    botWelcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅಗ್ರಿ-ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ. ಮಣ್ಣಿನ ಫಲವತ್ತತೆ, ಬೆಳೆ ರೋಗಗಳು ಮತ್ತು ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ಧಾರಣೆಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.",
    botInputPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ ಅಥವಾ ಮೊದಲೇ ಹೊಂದಿಸಲಾದ ಪ್ರಶ್ನೆಗಳನ್ನು ಆರಿಸಿ...",
    sendBtn: "ಪ್ರಶ್ನೆ ಕಳುಹಿಸಿ",
    voiceToggleOn: "ಧ್ವನಿ ಸಹಾಯ ಸಕ್ರಿಯವಾಗಿದೆ",
    voiceToggleOff: "ಧ್ವನಿ ಸಹಾಯ ಮೌನಗೊಳಿಸಲಾಗಿದೆ"
  },
  hi: {
    brandTitle: "एग्रीस्मार्ट परिशुद्धता मंच",
    brandSubtitle: "एआई-संचालित सटीक कृषि प्रणाली",
    predictorTab: "फसल भविष्यवक्ता",
    encyclopediaTab: "फसल विश्वकोश",
    diseaseTab: "संयंत्र रोगविज्ञानी",
    weatherTab: "कृषि मौसम",
    marketTab: "बाजार बोर्ड",
    fertilizerTab: "पोषक तत्व नियोजक",
    
    landingTitle1: "निश्चितता के साथ बोएं।",
    landingTitle2: "बुद्धिमानी से फसल उगाएं।",
    landingDesc: "मिट्टी के भौतिक नमूनों को अत्यधिक उपयुक्त कृषि उपज पूर्वानुमानों में बदलें। एग्रीस्मार्ट नाइट्रोजन, फास्फोरस, पोटाश, सापेक्ष आर्द्रता और वर्षा के स्तर का विश्लेषण कर तुरंत सुधारात्मक समाधान प्रदान करता है।",
    launchBtn: "सटीकता सिम्युलेटर शुरू करें",
    browseBtn: "फसल विश्वकोश ब्राउज़ करें",
    whyTitle1: "मृदा मैट्रिक्स स्कैनर",
    whyDesc1: "बुनियादी स्थिति जानने के लिए नाइट्रोजन, फास्फोरस और पोटाश के स्तर के साथ मिट्टी के पीएच और वर्षा की मात्रा दर्ज करें।",
    whyTitle2: "अनुकूलता स्कोरिंग",
    whyDesc2: "आपकी मिट्टी के अनुकूल फसलों का पता लगाने के लिए हमारी 22 एफएओ फसल श्रेणियों के साथ मापदंडों की तुलना कर सटीक मिलान की गणना करें।",
    whyTitle3: "जेमिनी एआई सलाहकार",
    whyDesc3: "पोषक तत्वों की कमी का उपचार, रोग नियंत्रण और वर्षा-आधारित सिंचाई की योजना जैसी उन्नत सिफारिशें प्राप्त करें।",
    
    formHeader: "कृषि रसायन विज्ञान मापदंड",
    formDesc: "सर्वोत्तम उपज प्राप्त करने के लिए मिट्टी के रासायनिक मापदंडों को सही ढंग से कॉन्फ़िगर करें।",
    nitrogenLabel: "नाइट्रोजन (N/Nitrogen)",
    phosphorusLabel: "फास्फोरस (P/Phosphorus)",
    potassiumLabel: "पोटेशियम (K/Potassium)",
    tempLabel: "तापमान (°C/Temperature)",
    humidityLabel: "सापेक्ष आर्द्रता (%/Humidity)",
    phLabel: "मिट्टी का पीएच (pH 0-14)",
    rainfallLabel: "वर्षा की मात्रा (mm/Rainfall)",
    submitBtn: "मिट्टी गुणवत्ता विश्लेषण करें",
    computingBtn: "विश्लेषण किया जा रहा है...",
    
    insightsHeader: "पारिस्थितिक फसल अनुशंसा इंजन",
    insightsDesc: "स्थानीय मिट्टी रसायन विज्ञान के आधार पर। फसल की जानकारी देखने के लिए नीचे दिए गए फसल कार्ड का चयन करें।",
    confidenceScore: "संगतता प्रतिशत",
    topRecommendations: "उत्कृष्ट फसल विकल्प",
    soilCompat: "पोषक तत्व संतुलन",
    climateCompat: "जलवायु उपयुक्तता",
    whyRecommended: "कृषि वैज्ञानिक कारण",
    viewDetails: "विकास चक्र की जाँच करें",
    aiAdvisory: "जेमिनी एआई कृषि सलाहकार सारांश",
    irrigationSchedule: "सिंचाई कार्यक्रम का अनुमान",
    riskPlan: "कीट एवं सूक्ष्मजीव जोखिम नियंत्रण",
    marketOutlook: "आर्थिक व्यवहार्यता एवं संभावना",
    
    botTitle: "किसानों का एआई साथी",
    botDesc: "अपनी मातृभाषा में विशेष कृषि प्रश्न पूछें। सिंथेटिक स्वर प्रतिक्रिया द्वारा समर्थित सहायता उपलब्ध है।",
    botWelcome: "नमस्ते! मैं आपका एग्रीस्मार्ट सहायक हूँ। मुझसे मिट्टी की उर्वरता, पौधों की बीमारियों और बाजार मूलीयों के बारे में कुछ भी पूछें।",
    botInputPlaceholder: "अपना प्रश्न यहाँ दर्ज करें या नीचे दिए विकल्पों में से चुनें...",
    sendBtn: "प्रश्न भेजें",
    voiceToggleOn: "ध्वनि सहायता सक्रिय है",
    voiceToggleOff: "ध्वनि सहायता मौन है"
  }
};
