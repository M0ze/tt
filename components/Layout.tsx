
import React from 'react';
import { LayoutDashboard, Compass, Lightbulb, BarChart3, MessageSquare, Image as ImageIcon, CreditCard, LogOut, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userTier: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userTier }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discover', label: 'Trend Discovery', icon: Compass },
    { id: 'generator', label: 'Idea Generator', icon: Lightbulb },
    { id: 'analyzer', label: 'Image Analysis', icon: ImageIcon },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'analytics', label: 'My Analytics', icon: BarChart3 },
    { id: 'subscription', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full uganda-gradient"></div>
            <h1 className="font-bold text-xl tracking-tight">UgandaTikTrend</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 transform
        md:translate-x-0 md:static md:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
            <div className="hidden md:flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl uganda-gradient shadow-lg shadow-yellow-500/20"></div>
                <h1 className="font-extrabold text-2xl tracking-tighter">TikTrend <span className="text-yellow-400">UG</span></h1>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                            activeTab === item.id 
                            ? 'bg-yellow-500 text-slate-950 font-semibold' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <item.icon size={20} className={activeTab === item.id ? 'text-slate-950' : 'group-hover:text-yellow-400'} />
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-yellow-400 font-bold">
                    JD
                </div>
                <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider">{userTier} Tier</span>
                </div>
            </div>
            <button className="w-full flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm">
                <LogOut size={16} /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
