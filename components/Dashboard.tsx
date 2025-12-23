
import React from 'react';
import { TrendingUp, Users, Eye, Zap, ArrowUpRight, Play } from 'lucide-react';
import { MOCK_TRENDS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { name: 'Mon', views: 4000 },
  { name: 'Tue', views: 3000 },
  { name: 'Wed', views: 5000 },
  { name: 'Thu', views: 2780 },
  { name: 'Fri', views: 1890 },
  { name: 'Sat', views: 2390 },
  { name: 'Sun', views: 3490 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Good morning, John! 🇺🇬</h2>
          <p className="text-slate-400">Here's what's going viral in Uganda today.</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1 flex items-center gap-2 text-yellow-500">
          <Zap size={16} fill="currentColor" />
          <span className="text-sm font-bold">PRO ACCOUNT ACTIVE</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Viral Views', value: '1.2M', growth: '+12%', icon: Eye, color: 'text-blue-400' },
          { label: 'Avg Engagement', value: '8.4%', growth: '+2.1%', icon: TrendingUp, color: 'text-green-400' },
          { label: 'Local Reach', value: '92%', growth: 'Steady', icon: Users, color: 'text-yellow-400' },
          { label: 'Trend Score', value: '94/100', growth: '+5', icon: Zap, color: 'text-red-400' },
        ].map((stat, i) => (
          <div key={i} className="card-glass p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold ${stat.growth.startsWith('+') ? 'text-green-400' : 'text-slate-400'}`}>
                {stat.growth}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-glass p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Uganda Market View Growth</h3>
            <select className="bg-slate-800 border-none text-xs rounded-lg px-2 py-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#facc15' }}
                />
                <Area type="monotone" dataKey="views" stroke="#facc15" fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-glass p-6 rounded-2xl flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-lg mb-4">Top Sounds 🎵</h3>
                <div className="space-y-4">
                    {MOCK_TRENDS.slice(0, 3).map((trend, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="relative group cursor-pointer">
                                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                                    <Play size={16} fill="white" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{trend.sound}</p>
                                <p className="text-xs text-slate-500 uppercase">{trend.category}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold text-yellow-500">+{trend.growth}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="w-full mt-6 py-2 border border-slate-700 rounded-xl text-sm hover:bg-slate-800 transition-colors">
                View All Sounds
            </button>
        </div>
      </div>

      {/* Breakout Trends */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            Breakout Trends <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase">Hot</span>
          </h3>
          <button className="text-yellow-500 text-sm font-semibold flex items-center gap-1 hover:underline">
            See Discover <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_TRENDS.map((trend) => (
            <div key={trend.id} className="card-glass p-4 rounded-xl hover:translate-y-[-4px] transition-transform cursor-pointer border-t-4 border-yellow-500">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold bg-slate-800 px-2 py-1 rounded text-slate-400 uppercase">
                        {trend.category}
                    </span>
                    <span className="text-xs text-green-400 font-bold flex items-center gap-0.5">
                        <TrendingUp size={12} /> {trend.growth}%
                    </span>
                </div>
                <h4 className="font-bold mb-2 leading-tight">{trend.title}</h4>
                <div className="flex flex-wrap gap-1 mb-4">
                    {trend.hashtags.map((tag, i) => (
                        <span key={i} className="text-[10px] text-yellow-500">#{tag.replace('#', '')}</span>
                    ))}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{trend.views} views</span>
                    <button className="bg-slate-800 p-1.5 rounded-lg hover:bg-yellow-500 hover:text-slate-950 transition-colors">
                        <Zap size={14} />
                    </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
