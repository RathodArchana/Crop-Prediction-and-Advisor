import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, Send, Cpu, User, Sparkles, Volume2, 
  VolumeX, HelpCircle, RefreshCw, ChevronRight, Play, Mic 
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  "How to balance highly acidic soil?",
  "What is the best fertilizer for Rice paddy blast?",
  "Tell me about PM-KISAN subsidy assistance.",
  "How can I reduce water consumption in hot climates?"
];

export default function AIFarmerChatbot({ lang }: { lang: "en" | "kn" | "hi" }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: lang === "kn" 
        ? "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅಗ್ರಿ-ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ. ಮಣ್ಣಿನ ಫಲವತ್ತತೆ, ಬೆಳೆ ರೋಗಗಳು ಮತ್ತು ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ಧಾರಣೆಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ."
        : lang === "hi"
        ? "नमस्ते! मैं आपका एग्रीस्मार्ट सहायक हूँ। मुझसे मिट्टी की उर्वरता, पौधों की बीमारियों और बाजार मूलीयों के बारे में कुछ भी पूछें।"
        : "Greetings! I am your AgriSmart agronomy assistant. Ask me anything about soil fertility, diseases, or local crop pricing.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Trigger browser Speech Synthesis to speak the reply aloud!
  const speakAloud = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    
    // Cancel prior speech first
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Find Hindi/Kannada voices or fallback to English based on language
    const voices = window.speechSynthesis.getVoices();
    
    if (lang === "hi") {
      const hiVoice = voices.find(v => v.lang.startsWith("hi") || v.lang.includes("India"));
      if (hiVoice) utterance.voice = hiVoice;
    } else if (lang === "kn") {
      const knVoice = voices.find(v => v.lang.startsWith("kn") || v.lang.startsWith("te") || v.lang.includes("India"));
      if (knVoice) utterance.voice = knVoice;
    } else {
      const enVoice = voices.find(v => v.lang.startsWith("en-IN") || v.lang.startsWith("en-GB") || v.lang.startsWith("en"));
      if (enVoice) utterance.voice = enVoice;
    }
    
    utterance.rate = 0.95; // Slightly slower, reassuring speed
    window.speechSynthesis.speak(utterance);
  };

  // Scroll to bottom whenever new bubble is appended
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, language: lang })
      });
      const data = await response.json();

      setIsTyping(false);

      if (data.success && data.reply) {
        const botReply: Message = {
          id: Math.random().toString(),
          sender: "bot",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages(prev => [...prev, botReply]);
        speakAloud(data.reply);
      } else {
        throw new Error();
      }
    } catch {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: "err-msg",
          sender: "bot",
          text: "I encountered a minor atmospheric timeout connecting to the AI hub. Please check your network and query again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-100 flex flex-col h-[520px] overflow-hidden" id="chatbot-assistant-main">
      
      {/* Bot Chat Header */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-emerald-900/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center relative">
            <Cpu size={20} className="animate-pulse" />
            <span className="absolute bottom-[-1px] right-[-1px] w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-tight">AI Farming Partner</h4>
            <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold block">Twin Gemini Core</span>
          </div>
        </div>

        {/* Voice synth toggle */}
        <button
          onClick={() => {
            if (!voiceEnabled && window.speechSynthesis) {
              // trigger voices loading
              window.speechSynthesis.getVoices();
            }
            setVoiceEnabled(!voiceEnabled);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            voiceEnabled 
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10" 
              : "bg-white/10 text-slate-300 hover:bg-white/20"
          }`}
          title={voiceEnabled ? "Mute Voice Assistance" : "Enable spoken audio responses"}
        >
          {voiceEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span className="text-[10px] uppercase font-sans tracking-wide">
            {voiceEnabled ? "Voice On" : "Mute Vo"}
          </span>
        </button>
      </div>

      {/* Messages Feed View */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
        
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              msg.sender === "user" ? "bg-indigo-650 text-white" : "bg-emerald-800 text-white"
            }`}>
              {msg.sender === "user" ? <User size={14} /> : <Cpu size={14} />}
            </div>
            
            <div className={`p-4 rounded-3xl text-xs leading-relaxed space-y-1 ${
              msg.sender === "user" 
                ? "bg-indigo-650 text-white rounded-tr-none shadow-sm" 
                : "bg-white border border-slate-200/80 text-slate-800 rounded-tl-none shadow-sm"
            }`}>
              <p>{msg.text}</p>
              <div className={`text-[9px] text-right font-semibold ${msg.sender === "user" ? "text-indigo-200" : "text-slate-400"}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
              <Cpu size={14} className="animate-spin" />
            </div>
            <div className="bg-white border border-slate-200/80 p-3.5 rounded-3xl rounded-tl-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Preset fast select queries */}
      <div className="px-6 py-2 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5">
        {PRESET_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-[10px] font-semibold bg-white hover:bg-emerald-50 hover:text-emerald-950 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex items-center gap-1 text-slate-500"
          >
            <Sparkles size={10} className="text-emerald-600 shrink-0" />
            {q}
          </button>
        ))}
      </div>

      {/* Input panel bar */}
      <div className="p-4 border-t border-slate-200 bg-white flex gap-2 items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(inputText);
          }}
          placeholder={lang === "kn" ? "ಪ್ರಶ್ನೆ ಇಲ್ಲಿ ಬರೆಯಿರಿ..." : lang === "hi" ? "अपना प्रश्न यहाँ दर्ज करें..." : "Ask your agricultural question..."}
          className="flex-1 h-11 px-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 hover:border-slate-350 focus:bg-white outline-none"
        />
        
        {/* Simple Simulated speech recognition icon button */}
        <button
          onClick={() => {
            const simulatedQuestions = [
              "What is the best way to reduce carbon footprint?",
              "Recommend dynamic seasonal crops for May month.",
              "What causes cotton curling leaves?"
            ];
            const randomIndex = Math.floor(Math.random() * simulatedQuestions.length);
            setInputText(simulatedQuestions[randomIndex]);
          }}
          className="w-11 h-11 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center justify-center text-slate-500 transition cursor-pointer"
          title="Simulate Voice Input Speech"
        >
          <Mic size={15} className="text-indigo-600 animate-pulse" />
        </button>

        <button
          onClick={() => handleSendMessage(inputText)}
          className="w-11 h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center transition cursor-pointer h-11 w-11"
        >
          <Send size={15} />
        </button>
      </div>

    </div>
  );
}
