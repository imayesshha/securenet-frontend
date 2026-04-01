import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
 Shield, Lock, Globe, ChevronRight, Zap, Eye,
  AlertTriangle, Mail,
  CheckCircle, ArrowRight, Users, Database, Award
} from 'lucide-react';
import StarBackground from '../components/StarBackground';

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] cursor-none">
      <StarBackground />

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
            left: mousePos.x - 300,
            top: mousePos.y - 300,
            transition: 'left 0.3s ease, top 0.3s ease',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#00f5ff]/4 blur-[150px] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#00f5ff]/20 blur-[40px] rounded-full" />
              <img
                src="https://cdn-icons-png.flaticon.com/512/15097/15097046.png"
                alt="SecureNet Shield"
                className="w-24 h-24 relative z-10"
                style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(150deg)' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-[#00f5ff]/20 bg-[#00f5ff]/5 text-[#00f5ff] text-xs tracking-widest px-4 py-2 rounded-full mb-8"
          >
            <Zap className="w-3 h-3" />
            NEXT-GEN CYBERSECURITY PLATFORM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-none tracking-tight"
          >
            STAY SAFE IN
            <br />
            <span className="text-[#00f5ff]" style={{ textShadow: '0 0 60px rgba(0,245,255,0.4)' }}>
              THE DIGITAL
            </span>
            <br />
            WORLD
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#4a4a6a] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Detect phishing URLs, analyze password strength, and master cybersecurity — powered by real algorithms, built for everyone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link to="/register" className="cyber-btn-primary flex items-center gap-2 text-sm tracking-wider px-8 py-4">
              GET STARTED FREE <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/url-checker" className="cyber-btn-outline text-sm tracking-wider px-8 py-4">
              TRY URL CHECKER
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { value: '99%', label: 'Accuracy' },
              { value: '10K+', label: 'Scans Done' },
              { value: 'FREE', label: 'Forever' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[#00f5ff]">{stat.value}</div>
                <div className="text-xs text-[#4a4a6a] tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#4a4a6a] text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#00f5ff]/50 to-transparent" />
        </motion.div>
      </motion.section>

      <section className="relative py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-[#00f5ff] text-xs tracking-widest mb-4">WHAT WE OFFER</p>
          <h2 className="text-5xl font-bold text-white tracking-tight">POWERFUL TOOLS</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Lock,
              title: 'Password Analyzer',
              desc: 'Entropy-based scoring system that checks length, complexity, and common password databases.',
              link: '/password-checker',
              color: '#00f5ff',
              image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80',
            },
            {
              icon: Globe,
              title: 'Phishing Detector',
              desc: 'Paste any URL to instantly detect lookalike domains, suspicious keywords and missing HTTPS.',
              link: '/url-checker',
              color: '#00ff88',
              image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80',
            },
            {
              icon: Eye,
              title: 'Awareness Hub',
              desc: 'Curated security guides and expert tips to keep you one step ahead of cybercriminals.',
              link: '/blog',
              color: '#7c3aed',
              image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="cyber-card group overflow-hidden relative"
            >
              <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#13131f]" />
                <div
                  className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-[#4a4a6a] text-sm leading-relaxed mb-6">{feature.desc}</p>
              <Link
                to={feature.link}
                className="flex items-center gap-2 text-xs tracking-widest"
                style={{ color: feature.color }}
              >
                EXPLORE <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-[#00f5ff] text-xs tracking-widest mb-4">HOW IT WORKS</p>
            <h2 className="text-5xl font-bold text-white tracking-tight">3 SIMPLE STEPS</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free in seconds. No credit card required.', icon: Users, color: '#00f5ff' },
              { step: '02', title: 'Scan and Analyze', desc: 'Use our tools to check passwords and detect phishing URLs.', icon: Database, color: '#00ff88' },
              { step: '03', title: 'Stay Protected', desc: 'Get results, suggestions and track your security history.', icon: Award, color: '#7c3aed' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className="text-7xl font-bold mb-6 leading-none"
                  style={{ color: `${item.color}15`, WebkitTextStroke: `1px ${item.color}30` }}
                >
                  {item.step}
                </div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{item.title}</h3>
                <p className="text-[#4a4a6a] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-[#1e1e2e]"
          >
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
              alt="Cybersecurity"
              className="w-full h-80 object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-12">
              <div>
                <p className="text-[#00f5ff] text-xs tracking-widest mb-3">DID YOU KNOW?</p>
                <h3 className="text-4xl font-bold text-white mb-4 max-w-lg leading-tight">
                  3.4 BILLION PHISHING EMAILS SENT EVERY DAY
                </h3>
                <p className="text-[#4a4a6a] max-w-md mb-6">
                  Do not become a statistic. SecureNet helps you identify threats before they reach you.
                </p>
                <Link to="/register" className="cyber-btn-primary text-sm tracking-wider">
                  PROTECT YOURSELF NOW
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="border border-[#1e1e2e] rounded-3xl p-16 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 mx-auto mb-8"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/15097/15097046.png"
                alt="shield"
                className="w-full h-full"
                style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(150deg)' }}
              />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight relative z-10">
              START PROTECTING YOURSELF TODAY
            </h2>
            <p className="text-[#4a4a6a] mb-8 leading-relaxed relative z-10">
              Join thousands of users who trust SecureNet to keep them safe online.
            </p>
            <Link to="/register" className="cyber-btn-primary text-sm tracking-wider px-10 py-4 relative z-10">
              CREATE FREE ACCOUNT
            </Link>
          </div>
        </motion.div>
      </section>
      <footer className="border-t border-[#1e1e2e] bg-[#0a0a0f] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/15097/15097046.png"
                  alt="logo"
                  className="w-6 h-6"
                  style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(150deg)' }}
                />
                <span className="text-lg font-bold tracking-widest text-white">
                  SECURE<span className="text-[#00f5ff]">NET</span>
                </span>
              </div>
              <p className="text-[#4a4a6a] text-sm leading-relaxed mb-6">
                A cybersecurity platform built to protect students and general users from digital threats.
              </p>
             <div className="flex items-center gap-3">
  <a href="https://github.com/imayesshha" target="_blank" rel="noreferrer"
    className="w-9 h-9 rounded-lg border border-[#1e1e2e] flex items-center justify-center text-[#4a4a6a] hover:text-white hover:border-[#00f5ff]/40 transition-all duration-300">
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  </a>
  <a href="https://www.linkedin.com/in/ayeshaimran00001/" target="_blank" rel="noreferrer"
    className="w-9 h-9 rounded-lg border border-[#1e1e2e] flex items-center justify-center text-[#4a4a6a] hover:text-[#00f5ff] hover:border-[#00f5ff]/40 transition-all duration-300">
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </a>
  <a href="mailto:ayesha25six@gmail.com"
    className="w-9 h-9 rounded-lg border border-[#1e1e2e] flex items-center justify-center text-[#4a4a6a] hover:text-[#00ff88] hover:border-[#00ff88]/40 transition-all duration-300">
    <Mail className="w-4 h-4" />
  </a>
    </div>
            </div>

            <div>
              <p className="text-white text-sm font-semibold tracking-widest mb-6">TOOLS</p>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'Password Checker', path: '/password-checker' },
                  { name: 'URL Scanner', path: '/url-checker' },
                  { name: 'Awareness Blog', path: '/blog' },
                  { name: 'Dashboard', path: '/dashboard' },
                ].map(link => (
                  <Link key={link.path} to={link.path}
                    className="text-[#4a4a6a] text-sm hover:text-[#00f5ff] transition-colors duration-300">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white text-sm font-semibold tracking-widest mb-6">ACCOUNT</p>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'Register', path: '/register' },
                  { name: 'Login', path: '/login' },
                ].map(link => (
                  <Link key={link.path} to={link.path}
                    className="text-[#4a4a6a] text-sm hover:text-[#00f5ff] transition-colors duration-300">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white text-sm font-semibold tracking-widest mb-6">GET IN TOUCH</p>
              <p className="text-[#4a4a6a] text-sm leading-relaxed mb-4">
                Have a question or found a bug? Reach out directly.
              </p>
              <a href="mailto:ayesha25six@gmail.com"
                className="inline-flex items-center gap-2 text-[#00f5ff] text-sm hover:underline">
                <Mail className="w-4 h-4" />
                ayesha25six@gmail.com
              </a>
              <div className="mt-6 p-4 bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl">
                <p className="text-xs text-[#4a4a6a] tracking-wider mb-3">BUILT WITH</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'MongoDB', 'Express'].map(tech => (
                    <span key={tech}
                      className="text-xs px-2 py-1 bg-[#00f5ff]/10 text-[#00f5ff] rounded border border-[#00f5ff]/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1e1e2e] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#4a4a6a] tracking-wider">
              2026 SECURENET — BUILT FOR DIGITAL SAFETY
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-[#00ff88]" />
              <span className="text-xs text-[#4a4a6a] tracking-wider">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <p className="text-xs text-[#4a4a6a] tracking-wider">
              DESIGNED BY <span className="text-[#00f5ff]">AYESHA IMRAN</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;