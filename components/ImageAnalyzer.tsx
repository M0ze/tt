
import React, { useState } from 'react';
import { Upload, ImageIcon, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { analyzeTrendImage } from '../services/geminiService';

const ImageAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await analyzeTrendImage(image);
      setAnalysis(result);
    } catch (error) {
      setAnalysis("Error analyzing image. Please ensure your API key is valid.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Trend Image Analyzer 📸</h2>
        <p className="text-slate-400">Upload a screenshot of a TikTok trend or viral creator. Gemini will break down why it's working and how you can hop on it.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-glass p-8 rounded-3xl flex flex-col items-center justify-center border-dashed border-2 border-slate-700">
          {!image ? (
            <>
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                <ImageIcon size={32} />
              </div>
              <p className="text-slate-400 mb-6 text-center">Drag and drop or click to upload screenshot</p>
              <input 
                type="file" 
                id="image-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="image-upload" 
                className="bg-yellow-500 text-slate-950 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-yellow-400 transition-colors flex items-center gap-2"
              >
                <Upload size={20} /> Select File
              </label>
            </>
          ) : (
            <div className="w-full">
              <img src={image} alt="To analyze" className="w-full h-auto rounded-xl mb-4 border border-slate-700" />
              <div className="flex gap-2">
                <button 
                  onClick={() => setImage(null)} 
                  className="flex-1 py-3 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Remove
                </button>
                <button 
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex-[2] py-3 bg-yellow-500 text-slate-950 rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                  {loading ? 'Analyzing...' : 'Analyze Trend'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="card-glass p-8 rounded-3xl min-h-[400px]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            AI Insight Report
          </h3>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
              <Loader2 className="animate-spin text-yellow-500" size={32} />
              <p>Scanning visual patterns...</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
              {analysis}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500 text-center">
              <AlertCircle size={48} className="opacity-20" />
              <p>Upload an image to see the breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
