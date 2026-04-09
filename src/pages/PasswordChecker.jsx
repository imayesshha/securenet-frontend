// pages/PasswordChecker.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { toolsApi as api } from '../api';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!password) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/check-password', { password });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login required to use this tool');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = (label) => {
    if (label === 'Strong') return '#00ff88';
    if (label === 'Medium') return '#f59e0b';
    return '#ff3366';
  };

  const getStrengthWidth = (score) => `${score}%`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#00f5ff]/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00f5ff]/10 border border-[#00f5ff]/20 mb-6">
            <Lock className="w-8 h-8 text-[#00f5ff]" />
          </div>
          <p className="text-[#00f5ff] text-xs tracking-widest mb-3">SECURITY TOOL</p>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            PASSWORD ANALYZER
          </h1>
          <p className="text-[#4a4a6a] leading-relaxed">
            Check how strong your password is and get suggestions to improve it.
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="cyber-card mb-6"
        >
          <label className="text-xs text-[#4a4a6a] tracking-widest mb-3 block">
            ENTER YOUR PASSWORD
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setResult(null); }}
              placeholder="Type your password here..."
              className="cyber-input pr-12 text-base"
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a4a6a] hover:text-[#00f5ff] transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {error} — <a href="/login" className="underline">Login here</a>
            </div>
          )}

          <button
            onClick={handleCheck}
            disabled={loading || !password}
            className="cyber-btn-primary w-full flex items-center justify-center gap-2 text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
            ) : (
              <>
                <Shield className="w-4 h-4" />
                ANALYZE PASSWORD
              </>
            )}
          </button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="cyber-card"
            >
              {/* Score */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-[#4a4a6a] tracking-widest mb-1">STRENGTH</p>
                  <p
                    className="text-3xl font-bold tracking-wider"
                    style={{ color: getStrengthColor(result.label) }}
                  >
                    {result.label.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#4a4a6a] tracking-widest mb-1">SCORE</p>
                  <p className="text-3xl font-bold text-white">{result.score}<span className="text-[#4a4a6a] text-lg">/100</span></p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-[#1e1e2e] rounded-full mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: getStrengthWidth(result.score) }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getStrengthColor(result.label) }}
                />
              </div>

              {/* Flags */}
              {result.flags?.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs text-[#4a4a6a] tracking-widest mb-3">WARNINGS</p>
                  {result.flags.map((flag, i) => (
                    <div key={i} className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-red-400 text-sm">{flag}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div>
                  <p className="text-xs text-[#4a4a6a] tracking-widest mb-3">SUGGESTIONS</p>
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#0f0f1a] border border-[#1e1e2e] rounded-lg px-4 py-3 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[#e2e2f0] text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* All good */}
              {result.suggestions?.length === 0 && result.flags?.length === 0 && (
                <div className="flex items-center gap-3 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-lg px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                  <span className="text-[#00ff88] text-sm">Your password is excellent! No issues found.</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PasswordChecker;