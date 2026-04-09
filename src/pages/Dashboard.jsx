import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Globe, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toolsApi as api } from '../api';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, dangerous: 0, weak: 0 });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/history');
        setHistory(res.data.scans);
        const total = res.data.count;
        const dangerous = res.data.scans.filter(s => s.result === 'Dangerous').length;
        const weak = res.data.scans.filter(s => s.result === 'Weak').length;
        setStats({ total, dangerous, weak });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getResultColor = (result) => {
    if (result === 'Safe' || result === 'Strong') return '#00ff88';
    if (result === 'Medium' || result === 'Suspicious') return '#f59e0b';
    return '#ff3366';
  };

  const getResultIcon = (result) => {
    if (result === 'Safe' || result === 'Strong') return <CheckCircle className="w-4 h-4" />;
    if (result === 'Medium' || result === 'Suspicious') return <AlertTriangle className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0533]/50 to-[#0f0f1a] pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-b from-[#00f5ff]/10 to-[#7c3aed]/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-20 left-20 w-64 h-64 bg-gradient-to-t from-[#00ff88]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle at 20% 80%,rgba(120,119,198,0.1) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(255,119,198,0.1) 0%,transparent 50%),radial-gradient(circle at 40% 40%,rgba(120,219,255,0.1) 0%,transparent 50%)]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[#00f5ff] text-xs tracking-widest font-cyber mb-2">DASHBOARD</p>
          <h1 className="text-5xl md:text-6xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2e2f0] to-[#00f5ff] tracking-tight">
            WELCOME BACK
          </h1>
          <p className="text-2xl font-cyber font-bold text-white/80">{user?.name?.toUpperCase()}</p>
          <p className="text-[#4a4a6a] mt-4 font-mono text-sm tracking-wider">Your security overview</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: 'TOTAL SCANS', value: stats.total, icon: Shield, color: '#00f5ff', gradient: 'from-[#00f5ff] to-[#00d4ff]' },
            { label: 'THREATS FOUND', value: stats.dangerous, icon: AlertTriangle, color: '#ff3366', gradient: 'from-[#ff3366] to-[#ff1a4d]' },
            { label: 'WEAK PASSWORDS', value: stats.weak, icon: Lock, color: '#f59e0b', gradient: 'from-[#f59e0b] to-[#eab308]' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r bg-opacity-20 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `linear-gradient(135deg, ${stat.gradient})` }}></div>
              <div className="relative z-10">
                <stat.icon className="w-12 h-12 mb-6 p-3 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:scale-110 transition-all" style={{ color: stat.color }} />
                <div className="text-4xl md:text-5xl font-cyber font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[${stat.color}] transition-all">{stat.value}</div>
                <div className="text-sm font-mono text-[#4a4a6a] tracking-widest uppercase">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/5 transition-all duration-500 hover:shadow-xl shadow-cyan-500/5"
          >
            <h3 className="text-xl font-cyber font-bold text-white mb-6 tracking-tight flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#00f5ff]" />
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Link to="/password-checker" className="cyber-btn-outline w-full text-left font-mono">
                🔒 Password Analyzer
              </Link>
              <Link to="/url-checker" className="cyber-btn-primary w-full font-mono">
                🌐 URL Scanner
              </Link>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl p-8"
          >
            <h3 className="text-xl font-cyber font-bold text-white mb-6 tracking-tight flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#00ff88]" />
              Recent Scans
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#00f5ff]/30 border-t-[#00f5ff] rounded-full animate-spin" />
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 font-mono text-sm tracking-wider">No scans yet</p>
                  <p className="text-[#4a4a6a] text-xs mt-1">Try the tools above</p>
                </div>
              ) : (
history.slice(0, 5).map((scan) => (
                  <motion.div
                    key={scan._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-4"
                  >
                    <div className={`w-2 h-2 rounded-full ${scan.type === 'password' ? 'bg-[#f59e0b]' : 'bg-[#00f5ff]'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-mono text-sm truncate" title={scan.input}>{scan.input.length > 30 ? scan.input.substring(0, 30) + '...' : scan.input}</p>
                      <p className="text-xs text-[#4a4a6a] font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(scan.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold" style={{ color: getResultColor(scan.result) }}>
                      {getResultIcon(scan.result)}
                      {scan.result}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
