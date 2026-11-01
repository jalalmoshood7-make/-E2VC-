import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  Wallet, 
  ChevronRight, 
  Activity, 
  Globe, 
  Cpu, 
  Sparkles, 
  ArrowUpRight, 
  RefreshCw, 
  BarChart2, 
  PieChart, 
  Layers, 
  Lock, 
  Flame, 
  Radio, 
  Twitter, 
  Send,
  MessageSquare, 
  Share2, 
  Menu, 
  X, 
  Sliders,
  DollarSign,
  Award,
  CircleDot
} from 'lucide-react';

// Main Application Component
export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Wallet State
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [solBalance, setSolBalance] = useState(18.50);
  const [e2vcBalance, setE2vcBalance] = useState(45000);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [connectingWallet, setConnectingWallet] = useState(false);

  // UI / Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Minting State
  const [mintQuantity, setMintQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintTxHash, setMintTxHash] = useState(null);
  const [mintSuccessModal, setMintSuccessModal] = useState(false);
  const [mintedCount, setMintedCount] = useState(425800);

  // Swap State
  const [swapPayAmount, setSwapPayAmount] = useState('1.0');
  const [slippage, setSlippage] = useState('0.5');

  // Chart Simulation State
  const [chartTimeframe, setChartTimeframe] = useState('24h');
  const [chartType, setChartType] = useState('area');
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);

  // Constants & Market Specs from Live Jupiter Terminal Screenshot
  const E2VC_MINT_ADDRESS = "6Nx8tsV7nYgE1TF65hitazA2oG7y8Th8iuQwLt6vaA5i";
  const TOTAL_SUPPLY = "1,000,000,000 $E2VC";
  const PRICE_USD = 0.00183;
  const PRICE_SOL = (0.00183 / 95.31).toFixed(6); // Calculated using SOL price $95.31
  const PRICE_CHANGE_24H = "-4.64%";
  const MARKET_CAP = "$763";
  const LIQUIDITY = "$255";
  const HOLDER_COUNT = 35;
  const VOLUME_24H = "$72.10";
  const BUYS_24H = "11 ($35.80)";
  const SELLS_24H = "8 ($36.30)";
  const NET_VOL_24H = "-$0.544";
  const TOP_10_HOLDERS_PCT = "61.61%";
  const SOL_PRICE = "$95.31 (-0.1%)";
  const JUP_PRICE = "$0.26016 (+1.7%)";
  const TELEGRAM_LINK = "https://t.me/+DKnu87rPN3A5M2Rk";
  const TWITTER_LINK = "https://x.com/Energy2Value";

  // Display Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Copy to Clipboard utility
  const copyToClipboard = (text, label = "Address") => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  // Simulated Wallet Connection Handler
  const connectWalletHandler = (walletName) => {
    setConnectingWallet(true);
    setTimeout(() => {
      setConnectingWallet(false);
      setIsWalletConnected(true);
      setSelectedWallet(walletName);
      const mockAddr = "7xG5" + Math.random().toString(36).substring(2, 6).toUpperCase() + "...9E2V";
      setWalletAddress(mockAddr);
      setIsWalletModalOpen(false);
      showToast(`Connected with ${walletName}`);
    }, 1000);
  };

  // Disconnect Wallet Handler
  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    showToast("Wallet disconnected");
  };

  // Simulated Token Minting execution
  const executeMint = () => {
    if (!isWalletConnected) {
      setIsWalletModalOpen(true);
      return;
    }
    const solCost = mintQuantity * 0.15;
    if (solCost > solBalance) {
      showToast("Insufficient SOL balance for minting");
      return;
    }

    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      const tokensReceived = mintQuantity * 1000;
      setSolBalance((prev) => parseFloat((prev - solCost).toFixed(4)));
      setE2vcBalance((prev) => prev + tokensReceived);
      setMintedCount((prev) => prev + tokensReceived);
      
      const fakeTx = "5E2V" + Math.random().toString(36).substring(2, 10).toUpperCase() + "xCYAN" + Math.random().toString(36).substring(2, 6).toUpperCase();
      setMintTxHash(fakeTx);
      setMintSuccessModal(true);
    }, 2200);
  };

  // Interactive Floating Neon Blue Particles Canvas Effect
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Array Initialization
    const particleCount = 70;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        color: Math.random() > 0.4 ? '#00f0ff' : '#0066ff',
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.6 - 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Price Chart Canvas Renderer (Electric Neon Blue Cyber Aesthetics)
  useEffect(() => {
    if (activeTab !== 'chart' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    let pointsCount = 35;
    if (chartTimeframe === '1h') pointsCount = 15;
    if (chartTimeframe === '7d') pointsCount = 50;

    const dataPoints = [];
    let basePrice = 0.0019;
    for (let i = 0; i < pointsCount; i++) {
      const volatility = 0.00015;
      const change = (Math.random() - 0.48) * volatility;
      basePrice = Math.max(0.0012, basePrice + change);
      dataPoints.push(basePrice);
    }
    dataPoints[dataPoints.length - 1] = PRICE_USD;

    const minP = Math.min(...dataPoints) * 0.95;
    const maxP = Math.max(...dataPoints) * 1.05;
    const stepX = width / (dataPoints.length - 1);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Gradient fill under chart line
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

    ctx.beginPath();
    ctx.moveTo(0, height);

    dataPoints.forEach((val, idx) => {
      const x = idx * stepX;
      const y = height - ((val - minP) / (maxP - minP)) * (height - 30) - 15;
      if (idx === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    dataPoints.forEach((val, idx) => {
      const x = idx * stepX;
      const y = height - ((val - minP) / (maxP - minP)) * (height - 30) - 15;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [activeTab, chartTimeframe]);

  return (
    <div className="min-h-screen bg-[#030914] text-cyan-50 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#08172c] border border-cyan-400/50 text-cyan-200 px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center gap-3 backdrop-blur-md animate-bounce">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-mono font-bold">{toastMessage}</span>
        </div>
      )}

      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#030914]/80 backdrop-blur-xl border-b border-cyan-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-500 to-cyan-300 p-[1.5px] shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#030914] rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-wider text-cyan-100">E2VC</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  SOLANA
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-widest text-cyan-300/60 uppercase block">
                Energy2Value Protocol
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#09172c]/60 p-1.5 rounded-2xl border border-cyan-900/50">
            {[
              { id: 'home', label: 'Overview' },
              { id: 'mint', label: 'E2VC Mint' },
              { id: 'chart', label: 'Analytics' },
              { id: 'trade', label: 'Trade / Swap' },
              { id: 'tokenomics', label: 'Tokenomics' },
              { id: 'community', label: 'Community' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'text-cyan-200/70 hover:text-cyan-200 hover:bg-cyan-950/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Header Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#09172c] hover:bg-cyan-950 border border-cyan-900/60 text-cyan-400 transition-colors"
              title="Official Telegram"
            >
              <Send className="w-4 h-4" />
            </a>

            {isWalletConnected ? (
              <div className="flex items-center gap-2 bg-[#09172c] border border-cyan-500/40 px-3.5 py-2 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                <span className="font-mono text-xs text-cyan-200 font-bold">{walletAddress}</span>
                <button
                  onClick={disconnectWallet}
                  className="ml-2 text-[10px] text-cyan-400/60 hover:text-cyan-300 underline"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="px-5 py-2.5 rounded-xl font-extrabold text-xs tracking-wider uppercase text-cyan-950 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <Wallet className="w-4 h-4 fill-cyan-950" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#09172c] border border-cyan-900/60 text-cyan-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#050e1d] border-b border-cyan-900/60 px-4 py-4 space-y-2">
            {[
              { id: 'home', label: 'Overview' },
              { id: 'mint', label: 'E2VC Mint' },
              { id: 'chart', label: 'Analytics' },
              { id: 'trade', label: 'Trade / Swap' },
              { id: 'tokenomics', label: 'Tokenomics' },
              { id: 'community', label: 'Community' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-cyan-200/70 hover:bg-cyan-950/40'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="pt-2">
              {!isWalletConnected ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWalletModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl font-extrabold text-xs uppercase text-cyan-950 bg-gradient-to-r from-cyan-300 to-cyan-500"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={disconnectWallet}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-red-950/40 text-red-300 border border-red-900/50"
                >
                  Disconnect ({walletAddress})
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* SUB-HEADER TICKER / CA BAR */}
      <div className="bg-[#051122]/90 border-b border-cyan-900/40 py-2.5 px-4 text-xs font-mono relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 text-cyan-200/80">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-bold text-cyan-100">Solana Mint Contract Address:</span>
            <code className="font-mono bg-[#030914] px-2.5 py-0.5 rounded border border-cyan-900/60 text-cyan-400">
              {E2VC_MINT_ADDRESS}
            </code>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-[11px] font-mono border-r border-cyan-900/60 pr-3">
              <span className="text-cyan-300/70">SOL: <span className="text-cyan-200 font-bold">{SOL_PRICE}</span></span>
              <span className="text-cyan-300/70">JUP: <span className="text-cyan-200 font-bold">{JUP_PRICE}</span></span>
            </div>

            <button
              onClick={() => copyToClipboard(E2VC_MINT_ADDRESS, "Solana Mint Contract Address")}
              className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-100 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1 rounded-lg border border-cyan-500/30 transition-all text-[11px] font-bold"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy CA</span>
            </button>
            <a
              href={`https://solscan.io/token/${E2VC_MINT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-cyan-400/60 hover:text-cyan-300 text-[11px]"
            >
              <span>Solscan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        {/* ==================== PAGE 1: OVERVIEW / HOME ==================== */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* Futuristic Hero Section */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#091830]/80 to-[#050b14]/90 border border-cyan-900/50 p-8 sm:p-12 lg:p-16 overflow-hidden backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.8)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

              <div className="max-w-3xl space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Next-Gen Renewable Energy Storage Protocol</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
                  BRIDGING CLEAN ENERGY INTO <span className="bg-gradient-to-r from-cyan-200 via-blue-400 to-cyan-400 bg-clip-text text-transparent">NEON DIGITAL VALUE</span>
                </h1>

                <p className="text-base sm:text-lg text-cyan-100/70 leading-relaxed font-light">
                  $E2VC (Energy2Value) connects sustainable energy infrastructure to Solana high-speed Web3 finance. Mint, swap, and earn from real-world clean energy production tokenized into yield-generating digital assets.
                </p>

                {/* Hero CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab('mint')}
                    className="px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-cyan-950 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    <Zap className="w-5 h-5 fill-cyan-950" />
                    <span>Launch Solana Mint</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('trade')}
                    className="px-7 py-4 rounded-2xl font-bold text-sm bg-[#09172c] hover:bg-cyan-950 text-cyan-200 border border-cyan-900/60 flex items-center gap-2 transition-all hover:border-cyan-500/60"
                  >
                    <ExternalLink className="w-5 h-5 text-cyan-400" />
                    <span>Trade DEX Aggregators</span>
                  </button>

                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-[#09172c] hover:bg-cyan-950 text-cyan-400 border border-cyan-900/60 transition-colors"
                    title="Official Telegram"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Live Metrics Grid (Extracted from Screenshot) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Token Price', value: `$${PRICE_USD}`, change: `${PRICE_CHANGE_24H} (24h)`, icon: TrendingUp },
                { label: 'Market Cap', value: MARKET_CAP, change: `Liquidity: ${LIQUIDITY}`, icon: DollarSign },
                { label: '24h Volume', value: VOLUME_24H, change: `Net: ${NET_VOL_24H}`, icon: Activity },
                { label: 'Holders Count', value: HOLDER_COUNT, change: `Top 10: ${TOP_10_HOLDERS_PCT}`, icon: Award }
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#081528]/70 border border-cyan-900/40 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-cyan-300/60 font-medium uppercase tracking-wider">{stat.label}</span>
                    <stat.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-cyan-100">{stat.value}</div>
                  <div className="text-[11px] text-cyan-400 mt-1 font-semibold">{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Verified On-Chain Security Badges (From Screenshot) */}
            <div className="bg-[#081528]/80 border border-cyan-900/60 rounded-3xl p-6 backdrop-blur-xl flex flex-wrap items-center justify-around gap-4 text-center">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs text-cyan-300/60 uppercase font-semibold">Freeze Authority</div>
                  <div className="text-sm font-bold text-emerald-400">Disabled (No Freeze)</div>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-cyan-900/60 hidden sm:block"></div>

              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs text-cyan-300/60 uppercase font-semibold">Mint Authority</div>
                  <div className="text-sm font-bold text-emerald-400">Disabled (No Mint Auth)</div>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-cyan-900/60 hidden sm:block"></div>

              <div className="flex items-center gap-3">
                <Layers className="w-6 h-6 text-cyan-400" />
                <div className="text-left">
                  <div className="text-xs text-cyan-300/60 uppercase font-semibold">Top 10 Concentration</div>
                  <div className="text-sm font-bold text-cyan-200">{TOP_10_HOLDERS_PCT}</div>
                </div>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  THE $E2VC <span className="text-cyan-400">ECOSYSTEM</span>
                </h2>
                <p className="text-cyan-200/60 text-sm mt-2">
                  Transforming solar, wind, and green energy metrics into decentralized neon liquidity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Real-World Asset Backing',
                    desc: 'Every $E2VC token is backed by real kilowatt-hour generation outputs from verified green energy nodes.',
                    icon: Zap
                  },
                  {
                    title: 'Solana High Speed',
                    desc: 'Lightning-fast sub-second settlements with near-zero network fees powered by Solana high throughput.',
                    icon: Cpu
                  },
                  {
                    title: 'Auto Revenue Buyback & Burn',
                    desc: 'Clean energy generation profits automatically execute market buybacks and permanent token burns.',
                    icon: Flame
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#081528]/60 border border-cyan-900/40 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-cyan-100">{item.title}</h3>
                    <p className="text-sm text-cyan-200/60 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Telegram Community Callout Card */}
            <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#08172c] to-cyan-950/40 border border-cyan-500/40 p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.15)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                  <Send className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-cyan-100">Join the Official E2VC Telegram</h3>
                  <p className="text-cyan-200/60 text-sm mt-1">Get real-time updates, announcements, and connect with the global community.</p>
                </div>
              </div>

              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-cyan-950 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 whitespace-nowrap hover:scale-105"
              >
                <span>Join Telegram Now</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        )}

        {/* ==================== PAGE 2: INTERACTIVE MINT ==================== */}
        {activeTab === 'mint' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Section Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase">
                <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                <span>Solana Mainnet Node Minting Active</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                MINT <span className="text-cyan-400">$E2VC TOKENS & NODES</span>
              </h1>
              <p className="text-cyan-200/60 text-sm max-w-lg mx-auto">
                Mint official E2VC clean energy tokens directly on Solana. Each node grants proportional energy yield staking rewards.
              </p>
            </div>

            {/* Minting Card */}
            <div className="bg-[#081528]/80 border border-cyan-900/60 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              
              {/* Progress Counter */}
              <div className="mb-8 space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span className="text-cyan-200/60">Total Mint Progress</span>
                  <span className="text-cyan-300">{mintedCount.toLocaleString()} / 1,000,000 $E2VC</span>
                </div>
                <div className="w-full h-3 bg-[#030914] rounded-full overflow-hidden border border-cyan-900/40">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.8)] transition-all duration-500"
                    style={{ width: `${(mintedCount / 1000000) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="bg-[#040c1a] p-6 rounded-2xl border border-cyan-900/50 mb-6 space-y-4">
                <div className="flex justify-between items-center text-xs text-cyan-200/60">
                  <span>Select Mint Packs</span>
                  <span>Price: 0.15 SOL per Pack (1,000 $E2VC)</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setMintQuantity(Math.max(1, mintQuantity - 1))}
                    className="w-12 h-12 rounded-xl bg-[#09172c] border border-cyan-900/60 text-cyan-300 font-extrabold text-xl hover:bg-cyan-900/30 transition-colors"
                  >
                    -
                  </button>

                  <div className="text-center">
                    <span className="text-3xl font-black font-mono text-cyan-100">{mintQuantity}</span>
                    <span className="text-xs text-cyan-300/60 block font-semibold">
                      = {(mintQuantity * 1000).toLocaleString()} $E2VC Tokens
                    </span>
                  </div>

                  <button
                    onClick={() => setMintQuantity(mintQuantity + 1)}
                    className="w-12 h-12 rounded-xl bg-[#09172c] border border-cyan-900/60 text-cyan-300 font-extrabold text-xl hover:bg-cyan-900/30 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Mint Breakdown */}
              <div className="space-y-3 border-t border-cyan-900/40 pt-6 text-xs text-cyan-200/70 font-mono">
                <div className="flex justify-between">
                  <span>Total Cost (SOL):</span>
                  <span className="text-cyan-100 font-bold">{(mintQuantity * 0.15).toFixed(2)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Network Fee:</span>
                  <span className="text-cyan-100">~0.000005 SOL</span>
                </div>
                <div className="flex justify-between">
                  <span>Mint Address:</span>
                  <span className="text-cyan-400 font-bold truncate max-w-[180px]">{E2VC_MINT_ADDRESS}</span>
                </div>
              </div>

              {/* Mint Button */}
              <div className="mt-8">
                {isWalletConnected ? (
                  <button
                    onClick={executeMint}
                    disabled={isMinting}
                    className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-cyan-950 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                  >
                    {isMinting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Confirming Solana Tx...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 fill-cyan-950" />
                        <span>Mint Now ({(mintQuantity * 0.15).toFixed(2)} SOL)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsWalletModalOpen(true)}
                    className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-cyan-950 bg-gradient-to-r from-cyan-300 to-cyan-500 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] transition-all flex justify-center items-center gap-2"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Connect Solana Wallet to Mint</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================== PAGE 3: PRICE CHART & ANALYTICS ==================== */}
        {activeTab === 'chart' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  LIVE ANALYTICS & <span className="text-cyan-400">CHART</span>
                </h1>
                <p className="text-cyan-200/60 text-sm mt-1">Real-time simulated DEX orderbook and price tracking terminal for $E2VC.</p>
              </div>

              {/* Chart Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://birdeye.so"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-[#09172c] hover:bg-cyan-950 text-cyan-300 border border-cyan-900/60 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Birdeye Chart</span>
                </a>
                <a
                  href="https://dexscreener.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-[#09172c] hover:bg-cyan-950 text-cyan-300 border border-cyan-900/60 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>DexScreener</span>
                </a>
              </div>
            </div>

            {/* Price Metric Bar */}
            <div className="bg-[#081528]/80 border border-cyan-900/50 rounded-2xl p-6 backdrop-blur-xl flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
                  <span className="font-black text-cyan-400 text-lg">E2V</span>
                </div>
                <div>
                  <div className="text-xs text-cyan-300/60 font-mono">E2VC / USD (Jupiter Terminal)</div>
                  <div className="text-3xl font-black font-mono text-cyan-100">${PRICE_USD}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                <div>
                  <span className="text-cyan-300/60 block">24h Change</span>
                  <span className="text-rose-400 font-bold">{PRICE_CHANGE_24H}</span>
                </div>
                <div>
                  <span className="text-cyan-300/60 block">Market Cap</span>
                  <span className="text-cyan-100 font-bold">{MARKET_CAP}</span>
                </div>
                <div>
                  <span className="text-cyan-300/60 block">Liquidity Pool</span>
                  <span className="text-cyan-300 font-bold">{LIQUIDITY}</span>
                </div>
                <div>
                  <span className="text-cyan-300/60 block">24h Volume</span>
                  <span className="text-cyan-100 font-bold">{VOLUME_24H}</span>
                </div>
                <div>
                  <span className="text-cyan-300/60 block">Buys / Sells</span>
                  <span className="text-cyan-200 font-bold">{BUYS_24H} / {SELLS_24H}</span>
                </div>
              </div>
            </div>

            {/* Canvas Chart Render */}
            <div className="bg-[#081528]/80 border border-cyan-900/60 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {['1h', '24h', '7d', '1m', 'all'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setChartTimeframe(tf)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                        chartTimeframe === tf
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-cyan-200/60 hover:bg-cyan-950'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setChartType(chartType === 'area' ? 'line' : 'area')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#09172c] text-cyan-300 border border-cyan-900/50"
                >
                  Type: {chartType.toUpperCase()}
                </button>
              </div>

              <div className="w-full h-80 bg-[#030914] rounded-2xl border border-cyan-900/40 overflow-hidden p-2">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={300}
                  className="w-full h-full block"
                />
              </div>
            </div>

          </div>
        )}

        {/* ==================== PAGE 4: BUY / SWAP & DEX AGGREGATOR ==================== */}
        {activeTab === 'trade' && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h1 className="text-3xl font-black tracking-tight">
                TRADE & SWAP <span className="text-cyan-400">$E2VC</span>
              </h1>
              <p className="text-cyan-200/60 text-sm">
                Access instant liquidity via major Solana decentralized exchanges and built-in swap router.
              </p>
            </div>

            {/* DEX Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Jupiter Aggregator', desc: 'Best route execution & lowest slippage', link: `https://jup.ag/swap/SOL-${E2VC_MINT_ADDRESS}`, color: 'from-cyan-500/20 to-blue-500/20' },
                { name: 'Raydium Protocol', desc: 'Official $E2VC / SOL liquidity pool', link: 'https://raydium.io/swap/', color: 'from-blue-600/20 to-cyan-600/20' },
                { name: 'Orca DEX', desc: 'Concentrated liquidity pools on Solana', link: 'https://www.orca.so/', color: 'from-cyan-700/20 to-blue-500/20' }
              ].map((dex, index) => (
                <div key={index} className="bg-[#081528]/70 border border-cyan-900/50 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/60 transition-all">
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${dex.color} border border-cyan-500/40 flex items-center justify-center`}>
                      <ExternalLink className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-extrabold text-cyan-100">{dex.name}</h3>
                    <p className="text-xs text-cyan-200/60">{dex.desc}</p>
                  </div>
                  <a
                    href={dex.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 w-full py-3 rounded-xl bg-[#09172c] hover:bg-cyan-950 text-cyan-300 border border-cyan-900/60 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Swap on {dex.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            {/* Built-in Quick Swap Box */}
            <div className="max-w-md mx-auto bg-[#081528]/80 border border-cyan-900/60 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
              <h3 className="text-base font-bold mb-4 text-cyan-100 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <span>Instant Swap Route Widget</span>
              </h3>

              <div className="space-y-3">
                <div className="bg-[#040c1a] p-4 rounded-2xl border border-cyan-900/40">
                  <div className="text-xs text-cyan-300/60 mb-1">Pay</div>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={swapPayAmount}
                      onChange={(e) => setSwapPayAmount(e.target.value)}
                      className="bg-transparent text-xl font-bold font-mono text-cyan-100 focus:outline-none w-full"
                    />
                    <span className="text-xs font-bold px-3 py-1 rounded-xl bg-cyan-950 border border-cyan-900 text-cyan-300">SOL</span>
                  </div>
                </div>

                <div className="bg-[#040c1a] p-4 rounded-2xl border border-cyan-900/40">
                  <div className="text-xs text-cyan-300/60 mb-1">Receive (Estimated)</div>
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      readOnly
                      value={!isNaN(parseFloat(swapPayAmount)) ? Math.floor(parseFloat(swapPayAmount) / PRICE_SOL).toLocaleString() : '0'}
                      className="bg-transparent text-xl font-bold font-mono text-cyan-400 focus:outline-none w-full"
                    />
                    <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">$E2VC</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!isWalletConnected) {
                    setIsWalletModalOpen(true);
                  } else {
                    showToast("Simulated swap routed via Raydium Pool");
                  }
                }}
                className="w-full mt-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-cyan-950 bg-gradient-to-r from-cyan-300 to-cyan-500 shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                {isWalletConnected ? 'Execute DEX Swap' : 'Connect Wallet to Swap'}
              </button>
            </div>

          </div>
        )}

        {/* ==================== PAGE 5: TOKENOMICS ==================== */}
        {activeTab === 'tokenomics' && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h1 className="text-3xl font-black tracking-tight">
                TOKENOMICS & <span className="text-cyan-400">SPECS</span>
              </h1>
              <p className="text-cyan-200/60 text-sm">
                Strict fixed supply architecture engineered for sustainability and asset backing.
              </p>
            </div>

            <div className="bg-[#081528]/80 border border-cyan-900/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="bg-[#030914] p-4 rounded-2xl border border-cyan-900/40 flex justify-between">
                  <span className="text-cyan-300/60">Token Symbol:</span>
                  <span className="text-cyan-300 font-bold">$E2VC</span>
                </div>
                <div className="bg-[#030914] p-4 rounded-2xl border border-cyan-900/40 flex justify-between">
                  <span className="text-cyan-300/60">Total Supply:</span>
                  <span className="text-cyan-100 font-bold">{TOTAL_SUPPLY}</span>
                </div>
                <div className="bg-[#030914] p-4 rounded-2xl border border-cyan-900/40 flex justify-between">
                  <span className="text-cyan-300/60">Blockchain:</span>
                  <span className="text-cyan-400 font-bold">Solana SPL Token</span>
                </div>
                <div className="bg-[#030914] p-4 rounded-2xl border border-cyan-900/40 flex justify-between">
                  <span className="text-cyan-300/60">Decimals:</span>
                  <span className="text-cyan-100 font-bold">9</span>
                </div>
              </div>

              <div className="mt-4 bg-[#030914] p-4 rounded-2xl border border-cyan-900/40 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="truncate w-full">
                  <span className="text-[11px] text-cyan-300/60 block">Solana Mint Contract Address</span>
                  <code className="text-xs font-mono text-cyan-300 font-bold">{E2VC_MINT_ADDRESS}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(E2VC_MINT_ADDRESS, "Contract Address")}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold"
                >
                  Copy CA
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ==================== PAGE 6: COMMUNITY & SOCIALS ==================== */}
        {activeTab === 'community' && (
          <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto">
            
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black tracking-tight">
                JOIN THE <span className="text-cyan-400">E2VC COMMUNITY</span>
              </h1>
              <p className="text-cyan-200/60 text-sm">
                Connect with our official channels for real-time announcements, news, and developer updates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Telegram Card */}
              <div className="bg-[#081528]/80 border border-cyan-900/60 rounded-3xl p-8 backdrop-blur-xl space-y-4 hover:border-cyan-500/60 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                  <Send className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-cyan-100">Official Telegram Channel</h3>
                <p className="text-xs text-cyan-200/60 leading-relaxed">
                  Join the official Energy2Value community portal to chat with fellow holders and receive instant news.
                </p>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-300 to-cyan-500 text-cyan-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
                >
                  <span>Open Telegram Link</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* X (Twitter) Card */}
              <div className="bg-[#081528]/80 border border-cyan-900/60 rounded-3xl p-8 backdrop-blur-xl space-y-4 hover:border-cyan-500/60 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                  <Twitter className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-cyan-100">Energy2Value X (Twitter)</h3>
                <p className="text-xs text-cyan-200/60 leading-relaxed">
                  Follow official Energy2Value X account for verified announcements, partnership reveals, and updates.
                </p>
                <a
                  href={TWITTER_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#09172c] border border-cyan-900/60 text-cyan-300 font-bold text-xs uppercase tracking-wider hover:bg-cyan-950 transition-colors"
                >
                  <span>Follow @Energy2Value</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-cyan-900/40 bg-[#02050c] mt-20 relative z-20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-extrabold text-xs text-cyan-300">
              E2V
            </div>
            <span className="font-extrabold text-xs tracking-wider text-cyan-200">ENERGY2VALUE ($E2VC) PROTOCOL</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-cyan-300/60">
            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="hover:text-cyan-300">Telegram</a>
            <a href={TWITTER_LINK} target="_blank" rel="noreferrer" className="hover:text-cyan-300">X (Twitter)</a>
            <a href={`https://solscan.io/token/${E2VC_MINT_ADDRESS}`} target="_blank" rel="noreferrer" className="hover:text-cyan-300">Solscan</a>
          </div>
        </div>
      </footer>

      {/* MODAL: CONNECT WALLET */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#081528] border border-cyan-900/80 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsWalletModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-cyan-400/60 hover:text-cyan-200 bg-cyan-950/40"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1 text-cyan-100">Connect Solana Wallet</h3>
            <p className="text-xs text-cyan-200/60 mb-6">Select your wallet provider to interact with $E2VC dApp.</p>

            <div className="space-y-3">
              {[
                { name: 'Phantom Wallet', desc: 'Solana Web3 Extension' },
                { name: 'Solflare Wallet', desc: 'Solana Mobile & Web' },
                { name: 'Backpack Wallet', desc: 'xNFT Compatible Provider' }
              ].map((w, idx) => (
                <button
                  key={idx}
                  disabled={connectingWallet}
                  onClick={() => connectWalletHandler(w.name)}
                  className="w-full p-4 rounded-2xl border border-cyan-900/50 bg-[#040c1a] text-left flex items-center justify-between hover:border-cyan-500/50 transition-all"
                >
                  <div>
                    <div className="font-bold text-sm text-cyan-200">{w.name}</div>
                    <div className="text-[11px] text-cyan-400/60">{w.desc}</div>
                  </div>
                  <Wallet className="w-5 h-5 text-cyan-400" />
                </button>
              ))}
            </div>

            {connectingWallet && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-cyan-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Connecting to Solana network...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: MINT SUCCESS */}
      {mintSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#081528] border border-cyan-500/60 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.3)] text-center relative">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-cyan-400" />
            </div>

            <h3 className="text-xl font-black text-cyan-100 mb-2">Mint Successful!</h3>
            <p className="text-xs text-cyan-200/60 mb-6">Your $E2VC tokens have been minted and deposited into your Solana wallet balance.</p>

            <div className="bg-[#040c1a] p-4 rounded-2xl border border-cyan-900/50 text-left mb-6 font-mono text-xs">
              <div className="text-cyan-300/60 text-[10px]">Transaction Hash</div>
              <code className="text-cyan-300 font-bold truncate block mt-1">{mintTxHash}</code>
            </div>

            <button
              onClick={() => setMintSuccessModal(false)}
              className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-cyan-950 bg-gradient-to-r from-cyan-300 to-cyan-500"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
