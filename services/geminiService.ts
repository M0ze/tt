
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";
import { VideoIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateVideoIdeas = async (niche: string): Promise<VideoIdea[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 viral TikTok video ideas specifically for the Ugandan market in the "${niche}" niche. Return only valid JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            script: { type: Type.STRING },
            sound: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            whyViral: { type: Type.STRING }
          },
          required: ["title", "script", "sound", "hashtags", "whyViral"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
};

export const analyzeTrendImage = async (base64Image: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
        { text: "Analyze this image (likely a TikTok screenshot or trend visual). Explain why this visual style or content is trending in Uganda and how a creator can replicate its success." }
      ]
    }
  });
  return response.text || "Could not analyze image.";
};

export const speakText = async (text: string, voice: 'Kore' | 'Puck' = 'Kore'): Promise<Uint8Array | null> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) return null;

  return decode(base64Audio);
};

// Helper for decoding base64
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const chatWithGemini = async (message: string, history: { role: 'user' | 'model', text: string }[]): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
        systemInstruction: "You are UgandaTikTrend Assistant. You help Ugandan TikTokers go viral. Be encouraging, local-knowledgeable, and professional."
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text || "I'm sorry, I couldn't process that.";
};
