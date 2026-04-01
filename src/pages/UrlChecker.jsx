// pages/UrlChecker.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Shield, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';
import api from '../api';

const UrlChecker = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.post('/check-url', { url });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login required to use this tool');
    } finally {
      setLoading(false);
    }
  };

  const getVerdictColor = (verdict) => {
    if (verdict === 'Safe') return '#00ff88';
    if (verdict === 'Suspicious') return '#f59e0b';
    return '#ff3366';
  };

  const getVerdictIcon = (verdict) => {
    if (verdict === 'Safe') return <CheckCircle className="w-8 h-8" />;
    if (verdict === 'Suspicious') return <AlertTriangle className="w-8 h-8" />;
    return <XCircle className="w-8 h-8" />;
  };

  const exampleUrls = [
    { url: 'http://amaz0n-login.xyz/verify', label: 'Phishing example' },
    { url: 'https://google.com', label: 'Safe example' },
    { url: 'http://paypa1-secure.com/account', label: 'Lookalike example' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#00ff88]/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/20 mb-6">
            <Globe className="w-8 h-8 text-[#00ff88]" />
          </div>
          <p className="text-[#00ff88] text-xs tracking-widest mb-3">SECURITY TOOL</p>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            PHISHING DETECTOR
          </h1>
          <p className="text-[#4a4a6a] leading-relaxed">
            Paste any URL to instantly check if it's a phishing attempt or safe to visit.
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
            PASTE URL TO SCAN
          </label>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setResult(null); }}
              placeholder="https://example.com"
              className="cyber-input font-mono"
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {error} — <a href="/login" className="underline">Login here</a>
            </div>
          )}

          <button
            onClick={handleCheck}
            disabled={loading || !url}
            className="cyber-btn-primary w-full flex items-center justify-center gap-2 text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                SCAN URL
              </>
            )}
          </button>

          {/* Example URLs */}
          <div className="mt-6">
            <p className="text-xs text-[#4a4a6a] tracking-widest mb-3">TRY THESE EXAMPLES</p>
            <div className="flex flex-col gap-2">
              {exampleUrls.map((example) => (
                <button
                  key={example.url}
                  onClick={() => { setUrl(example.url); setResult(null); }}
                  className="text-left px-4 py-2 bg-[#0f0f1a] border border-[#1e1e2e] rounded-lg hover:border-[#00f5ff]/30 transition-all duration-300 group"
                >
                  <span className="text-xs text-[#4a4a6a] tracking-wider group-hover:text-[#00f5ff] transition-colors">
                    {example.label}
                  </span>
                  <span className="block text-xs font-mono text-[#4a4a6a]/60 mt-0.5 truncate">
                    {example.url}
                  </span>
                </button>
              ))}
            </div>
          </div>
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
              {/* Verdict */}
              <div
                className="flex items-center gap-4 mb-6 p-4 rounded-xl border"
                style={{
                  borderColor: `${getVerdictColor(result.verdict)}30`,
                  backgroundColor: `${getVerdictColor(result.verdict)}10`,
                }}
              >
                <div style={{ color: getVerdictColor(result.verdict) }}>
                  {getVerdictIcon(result.verdict)}
                </div>
                <div>
                  <p className="text-xs text-[#4a4a6a] tracking-widest mb-1">VERDICT</p>
                  <p
                    className="text-2xl font-bold tracking-wider"
                    style={{ color: getVerdictColor(result.verdict) }}
                  >
                    {result.verdict.toUpperCase()}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-[#4a4a6a] tracking-widest mb-1">RISK SCORE</p>
                  <p className="text-2xl font-bold text-white">{result.score}</p>
                </div>
              </div>

              {/* Flags */}
              {result.flags?.length > 0 ? (
                <div>
                  <p className="text-xs text-[#4a4a6a] tracking-widest mb-3">
                    THREATS DETECTED ({result.flags.length})
                  </p>
                  {result.flags.map((flag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-2"
                    >
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-red-400 text-sm">{flag}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-lg px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                  <span className="text-[#00ff88] text-sm">No threats detected. This URL appears safe!</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UrlChecker;