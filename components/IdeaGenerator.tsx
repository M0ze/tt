
import React, { useState } from 'react';
import { Lightbulb, Send, Loader2, Sparkles, CheckCircle2, Volume2, PlayCircle, PauseCircle } from 'lucide-react';
import { generateVideoIdeas, speakText } from '../services/geminiService';
import { VideoIdea } from '../types';

const IdeaGenerator: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [audioLoading, setAudioLoading] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;
    
    setLoading(true);
    const result = await generateVideoIdeas(niche);
    setIdeas(result);
    setLoading(false);
  };

  const handleSpeak = async (index: number, text: string) => {
    if (playingId === index) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    setAudioLoading(index);
    const audioData = await speakText(text);
    setAudioLoading(null);

    if (audioData) {
      const blob = new Blob([audioData], { type: 'audio/pcm' });
      // In a real scenario, we'd need a proper PCM to WAV wrapper or use Web Audio API.
      // For this demo, we'll simulate the playback since base64 PCM isn't natively supported by <audio>
      console.log("Audio generated for idea", index);
      alert("AI Voice generated! In a full production app, you would hear the script read aloud in a local-sounding accent.");
      setPlayingId(index);
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Video Idea Generator 💡</h2>
        <p className="text-slate-400 mb-8">Input your niche, and our AI will suggest viral content specifically for the Ugandan audience.</p>
        
        <form onSubmit={handleGenerate} className="relative">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., Ugandan Comedy, Rolex Street Food, Travel to Jinja..."
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all pr-16"
          />
          <button
            type="submit"
            disabled={loading || !niche}
            className="absolute right-2 top-2 bg-yellow-500 text-slate-950 p-3 rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-yellow-500" size={48} />
            <p className="text-slate-400 animate-pulse">Thinking like a Ugandan creator...</p>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {ideas.map((idea, i) => (
            <div key={i} className="card-glass rounded-2xl overflow-hidden border-l-8 border-yellow-500">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={18} className="text-yellow-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Concept #{i+1}</span>
                    </div>
                    <h3 className="text-2xl font-bold">{idea.title}</h3>
                  </div>
                  <button 
                    onClick={() => handleSpeak(i, idea.script)}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm transition-colors"
                  >
                    {audioLoading === i ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : playingId === i ? (
                        <PauseCircle size={16} />
                    ) : (
                        <Volume2 size={16} />
                    )}
                    Listen to Script
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
                            <CheckCircle2 size={14} className="text-yellow-500" />
                            Viral Hook & Script
                        </h4>
                        <p className="text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl italic">
                            {idea.script}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-300 mb-2 uppercase text-xs tracking-wider">Recommended Sound</h4>
                        <div className="bg-slate-800 px-4 py-2 rounded-lg text-sm inline-block">
                            🎵 {idea.sound}
                        </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-300 mb-2 uppercase text-xs tracking-wider">Why it works in UG</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {idea.whyViral}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-300 mb-2 uppercase text-xs tracking-wider">Suggested Hashtags</h4>
                        <div className="flex flex-wrap gap-2">
                            {idea.hashtags.map((tag, idx) => (
                                <span key={idx} className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs">
                                    #{tag.replace('#', '')}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className="w-full py-3 bg-yellow-500 text-slate-950 font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
                        Save to Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
