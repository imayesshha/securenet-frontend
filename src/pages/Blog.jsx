import { motion } from 'framer-motion';
import { BookOpen, Clock, Shield, Lock, AlertTriangle } from 'lucide-react';

const articles = [
  {
    icon: AlertTriangle,
    color: '#ff3366',
    tag: 'PHISHING',
    title: 'Top 5 Signs a URL is a Phishing Attempt',
    time: '4 min read',
    excerpt: 'Cybercriminals are getting smarter. Here are the most common red flags that reveal a phishing URL before you click it.',
    points: [
      'The domain uses numbers instead of letters (amaz0n, paypa1)',
      'The URL contains excessive subdomains',
      'It uses HTTP instead of HTTPS',
      'The domain name is slightly misspelled',
      'It asks you to "verify" or "confirm" your account urgently',
    ]
  },
  {
    icon: Lock,
    color: '#00f5ff',
    tag: 'PASSWORDS',
    title: 'How to Create an Unbreakable Password',
    time: '5 min read',
    excerpt: 'Most people use passwords that can be cracked in seconds. Learn how to create passwords that would take centuries to break.',
    points: [
      'Use at least 12 characters — longer is always better',
      'Mix uppercase, lowercase, numbers and symbols',
      'Never use personal info like birthdays or names',
      'Use a passphrase: "Coffee!Sunrise#Mountain9"',
      'Use a different password for every account',
    ]
  },
  {
    icon: Shield,
    color: '#00ff88',
    tag: 'ACCOUNT SAFETY',
    title: 'What Happens When Your Account Gets Hacked?',
    time: '6 min read',
    excerpt: 'Understanding what hackers do after they get in can help you respond faster and limit the damage.',
    points: [
      'Hackers immediately change your password and email',
      'Your account is used to send spam to your contacts',
      'Personal data is sold on the dark web',
      'Financial accounts are targeted next',
      'Enable 2FA immediately to prevent this',
    ]
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0533]/30 via-transparent/50 to-[#0a0a0f]/50 pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-[#7c3aed]/20 to-[#00f5ff]/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-20 w-96 h-96 bg-gradient-to-l from-[#00ff88]/15 to-[#00f5ff]/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-gradient-to-b from-[#ff3366]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-[#7c3aed]/20 border border-[#7c3aed]/30 mb-8 shadow-2xl shadow-purple-500/20"
          >
            <BookOpen className="w-10 h-10 text-[#7c3aed] drop-shadow-lg" />
          </motion.div>
          <p className="text-[#7c3aed] text-xs tracking-widest font-cyber uppercase mb-4 letter-spacing-2">KNOWLEDGE HUB</p>
          <h1 className="text-5xl md:text-7xl font-cyber font-black bg-gradient-to-r from-white via-[#e2e2f0] to-[#7c3aed] bg-clip-text text-transparent tracking-tight mb-6 drop-shadow-2xl">
            SECURITY AWARENESS
          </h1>
          <p className="text-[#4a4a6a] text-lg max-w-2xl mx-auto leading-relaxed font-mono tracking-wide">
            Stay ahead of cyber threats with curated guides, expert insights, and practical tips to protect yourself online.
          </p>
        </motion.div>

        {/* Floating Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -20, scale: 1.02, transition: { duration: 0.3 } }}
              className="cyber-card group relative overflow-hidden hover:shadow-[0_25px_50px_rgba(120,119,198,0.25)] hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity bg-[${article.color}]/5" />
              
              {/* Icon */}
              <div className="relative z-10 flex items-start gap-4 mb-6 pt-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all shadow-2xl"
                  style={{
                    background: `radial-gradient(circle, ${article.color}20 0%, transparent 70%)`,
                    border: `1px solid ${article.color}40`,
                    boxShadow: `0 0 30px ${article.color}30`
                  }}
                >
                  <article.icon className="w-8 h-8 drop-shadow-lg" style={{ color: article.color }} />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-4 py-1.5 rounded-full font-cyber font-bold text-xs tracking-widest uppercase shadow-lg"
                      style={{
                        color: article.color,
                        backgroundColor: `${article.color}15`,
                        boxShadow: `0 0 20px ${article.color}40`
                      }}
                    >
                      {article.tag}
                    </motion.span>
                    <span className="flex items-center gap-1 text-xs text-[#4a4a6a] font-mono tracking-wide">
                      <Clock className="w-3 h-3" />
                      {article.time}
                    </span>
                  </div>
                  <h2 className="text-2xl font-cyber font-bold bg-gradient-to-r from-white to-[#e2e2f0] bg-clip-text text-transparent group-hover:from-[${article.color}] tracking-tight mb-1">
                    {article.title}
                  </h2>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-[#4a4a6a] text-base leading-relaxed mb-8 relative z-10 font-mono tracking-wide">
                {article.excerpt}
              </p>

              {/* Points */}
              <div className="space-y-3 relative z-10">
                {article.points.map((point, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[${article.color}]/30 transition-all group-hover:pl-2"
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2.5"
                      style={{ backgroundColor: article.color }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-white/90 text-sm leading-relaxed font-mono">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
