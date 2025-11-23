import React, { useState } from 'react';
import { GameMode } from './types';
import { AlgorithmicPath } from './modes/AlgorithmicPath';
import { NetConfig42 } from './modes/NetConfig42';
import { DataStructDuel } from './modes/DataStructDuel';
import { ShellScriptScramble } from './modes/ShellScriptScramble';
import { GraphTheoryQuest } from './modes/GraphTheoryQuest';
import { DynamicGridPlanner } from './modes/DynamicGridPlanner';
import { NumberTheoryCipher } from './modes/NumberTheoryCipher';
import { SortingWars } from './modes/SortingWars';
import { DeadlockManager } from './modes/DeadlockManager';
import { PipelineFlow } from './modes/PipelineFlow';
import { ZebraDeductionGrid } from './modes/ZebraDeductionGrid';
import { BooleanCircuitBuilder } from './modes/BooleanCircuitBuilder';
import { TangramGeometry } from './modes/TangramGeometry';
import { NPuzzle } from './modes/NPuzzle';

import { 
    Code, Network, Database, Terminal, 
    Share2, Grid, Calculator, BarChart3, 
    Lock, ArrowRightLeft, HelpCircle, Zap, Shapes, LayoutGrid,
    Info, Mail, Shield, FileText, Gavel, ChevronDown, ChevronUp, X, Star
} from 'lucide-react';

// --- Improved Modal Component ---
const Modal: React.FC<{ title: string; isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-brand-gold rounded-full"></span>
            {title}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={24}/>
          </button>
        </div>
        <div className="p-8 overflow-y-auto text-slate-300 leading-relaxed font-light text-sm md:text-base space-y-4 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Comprehensive SEO Article Component ---
const SEOArticle: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="w-full max-w-5xl mx-auto mt-16 mb-12 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
      
      {/* JSON-LD Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "42 Mastery Suite",
          "url": "https://doodax.com",
          "description": "The ultimate gamified computer science training platform for the 42 Network curriculum.",
          "applicationCategory": "EducationalGame",
          "genre": "Education",
          "operatingSystem": "Web",
          "author": {
            "@type": "Person",
            "name": "Hsini Mohamed",
            "url": "https://github.com/hsinidev"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": "Algorithms, Networking, Data Structures, Logic Puzzles"
        })}
      </script>

      <div className={`p-8 md:p-12 transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[5000px]' : 'max-h-[160px] overflow-hidden'}`}>
        
        {/* H1 for SEO */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">
          Master Computer Science with the 42 Mastery Suite: The Ultimate Coding Training Platform
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
           
           <p className="text-xl font-medium text-blue-200 mb-8">
             Welcome to <strong>Doodax.com</strong>, the home of the <strong>42 Mastery Suite</strong>. This platform is a revolutionary educational tool designed to bridge the gap between abstract computer science theory and practical application. Tailored specifically for the rigorous standards of the <strong>42 Network</strong> schools (42 Paris, 42 Silicon Valley, etc.), this suite offers a sandbox environment where aspiring software engineers can master complex topics through gamified learning.
           </p>

           <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8 not-prose">
             <h2 className="text-xl font-bold text-brand-gold mb-4 uppercase tracking-widest">Table of Contents</h2>
             <nav>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-300">
                 <li className="hover:text-white cursor-pointer transition-colors">• Introduction to Gamified CS Education</li>
                 <li className="hover:text-white cursor-pointer transition-colors">• Deep Dive: Algorithmic Logic</li>
                 <li className="hover:text-white cursor-pointer transition-colors">• Mastering Network Topology</li>
                 <li className="hover:text-white cursor-pointer transition-colors">• Data Structures & Complexity</li>
                 <li className="hover:text-white cursor-pointer transition-colors">• The Art of Concurrency</li>
                 <li className="hover:text-white cursor-pointer transition-colors">• Mathematical Foundations</li>
                 <li className="hover:text-white cursor-pointer transition-colors">• Frequently Asked Questions (FAQ)</li>
               </ul>
             </nav>
           </div>

           <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Gamification is the Future of Coding Education</h2>
           <p>
             Traditional learning methods often fail to capture the dynamic nature of software engineering. Reading about a <strong>Linked List</strong> or a <strong>Dijkstra Pathfinding</strong> algorithm in a textbook is one thing; visualizing it in real-time and interacting with its mechanics is another. The 42 Mastery Suite utilizes <strong>Active Recall</strong> and <strong>Visual Feedback Loops</strong> to drastically improve retention rates. By turning complex problems into interactive puzzles, we reduce the cognitive load required to understand abstract concepts like recursion, memory management, and asynchronous processing.
           </p>

           <h2 className="text-2xl font-bold text-white mt-12 mb-4">Explore the 14 Modules of Mastery</h2>

           <h3 className="text-xl font-bold text-blue-400 mt-6">1. Algorithmic Path (Visual Programming)</h3>
           <p>
             At the core of the suite lies the <strong>Algorithmic Path</strong>. This module mimics the logic required for the "Piscine" at 42. Users guide an agent through a grid using a limited set of instructions (`Move`, `Turn`, `Collect`). The catch? You must use <strong>Functions (`F1`, `F2`)</strong> to create recursive loops and optimize your code length. This teaches the fundamental concepts of the <strong>Call Stack</strong>, <strong>DRY (Don't Repeat Yourself)</strong> principles, and modular code design.
           </p>

           <h3 className="text-xl font-bold text-blue-400 mt-6">2. NetConfig 42 (Network Engineering)</h3>
           <p>
             Networking is often cited as one of the hardest topics for new developers. <strong>NetConfig 42</strong> strips away the complexity of physical hardware and focuses on the logic. In this mode, you will configure <strong>IP Addresses</strong>, calculate <strong>Subnet Masks (CIDR)</strong>, and set up <strong>Default Gateways</strong>. It provides a safe, virtualized environment to fail and learn without breaking a real network.
           </p>

           <h3 className="text-xl font-bold text-blue-400 mt-6">3. DataStruct Duel (Time Complexity)</h3>
           <p>
             Ace your technical interviews with <strong>DataStruct Duel</strong>. This game presents real-world engineering scenarios (e.g., "Design a system for a high-frequency trading platform"). You must select the appropriate data structure—<strong>Hash Map</strong>, <strong>Binary Search Tree</strong>, <strong>Array</strong>, or <strong>Linked List</strong>—based on required Time Complexity ($O(1)$, $O(n)$, $O(\log n)$). It trains your brain to think about efficiency constraints instantly.
           </p>

           <h2 className="text-2xl font-bold text-white mt-12 mb-4">Advanced Topics for Competitive Programmers</h2>
           <p>
             For those looking to compete in hackathons or ICPC, the suite offers advanced modules:
           </p>
           <ul className="list-disc pl-6 space-y-2 text-slate-300">
             <li><strong>Graph Theory Quest:</strong> interactive visualizations of BFS, DFS, and Dijkstra's algorithm on weighted and unweighted graphs.</li>
             <li><strong>Dynamic Grid Planner:</strong> solves the "Knapsack Problem" on a 2D grid, teaching the tabulation method of Dynamic Programming.</li>
             <li><strong>Sorting Wars:</strong> a visualizer that challenges you to sort arrays manually using the logic of Bubble Sort, Merge Sort, and Quick Sort to understand pivot selection and swap costs.</li>
           </ul>

           <h2 className="text-2xl font-bold text-white mt-12 mb-4">Frequently Asked Questions (FAQ)</h2>
           <dl className="space-y-6">
             <div className="bg-slate-800/30 p-4 rounded-lg">
               <dt className="font-bold text-brand-gold text-lg">Is Doodax.com free to use?</dt>
               <dd className="mt-2 text-slate-300">Yes, the 42 Mastery Suite is 100% free and open-source. Our mission is to democratize high-quality computer science education.</dd>
             </div>
             <div className="bg-slate-800/30 p-4 rounded-lg">
               <dt className="font-bold text-brand-gold text-lg">Do I need prior coding experience?</dt>
               <dd className="mt-2 text-slate-300">The suite is designed with progressive difficulty. The early levels of each module are accessible to complete beginners, while the later levels challenge even senior engineers.</dd>
             </div>
             <div className="bg-slate-800/30 p-4 rounded-lg">
               <dt className="font-bold text-brand-gold text-lg">Can I save my progress?</dt>
               <dd className="mt-2 text-slate-300">Currently, progress is saved in your browser's local storage session. We are working on a cloud-save feature for registered users in the next update.</dd>
             </div>
           </dl>

           <p className="mt-12 text-sm text-slate-500 text-center italic">
             Keywords: 42 school, coding games, algorithm visualization, network simulation, learn bash, data structures, dynamic programming, react game, web development, CS education, competitive programming, software engineering training.
           </p>
        </div>

        {/* Gradient Fade for Collapsed State */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent pointer-events-none" />
        )}
      </div>

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-slate-800/50 hover:bg-slate-700/80 text-brand-gold font-bold py-4 flex items-center justify-center gap-2 transition-all border-t border-white/5 uppercase tracking-widest text-sm"
      >
        {isExpanded ? (
          <>Read Less <ChevronUp size={16}/></>
        ) : (
          <>Read Full Article <ChevronDown size={16}/></>
        )}
      </button>
    </article>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<GameMode | null>(null);
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const openModal = (type: string) => setModalOpen(type);
  const closeModal = () => setModalOpen(null);

  // Render Game Mode
  if (mode) {
    const renderGame = () => {
        switch(mode) {
            case GameMode.ALGO: return <AlgorithmicPath onBack={() => setMode(null)} />;
            case GameMode.NET: return <NetConfig42 onBack={() => setMode(null)} />;
            case GameMode.STRUCT: return <DataStructDuel onBack={() => setMode(null)} />;
            case GameMode.BASH: return <ShellScriptScramble onBack={() => setMode(null)} />;
            case GameMode.GRAPH: return <GraphTheoryQuest onBack={() => setMode(null)} />;
            case GameMode.DP_GRID: return <DynamicGridPlanner onBack={() => setMode(null)} />;
            case GameMode.NUM_THEORY: return <NumberTheoryCipher onBack={() => setMode(null)} />;
            case GameMode.SORTING: return <SortingWars onBack={() => setMode(null)} />;
            case GameMode.DEADLOCK: return <DeadlockManager onBack={() => setMode(null)} />;
            case GameMode.PIPELINE: return <PipelineFlow onBack={() => setMode(null)} />;
            case GameMode.ZEBRA: return <ZebraDeductionGrid onBack={() => setMode(null)} />;
            case GameMode.BOOLEAN: return <BooleanCircuitBuilder onBack={() => setMode(null)} />;
            case GameMode.TANGRAM: return <TangramGeometry onBack={() => setMode(null)} />;
            case GameMode.N_PUZZLE: return <NPuzzle onBack={() => setMode(null)} />;
            default: return null;
        }
    };
    return (
      <div className="h-screen w-screen overflow-hidden bg-brand-dark animate-fade-in relative z-50">
         {renderGame()}
      </div>
    );
  }

  // --- Main Dashboard ---
  return (
    <div className="min-h-screen font-sans text-white flex flex-col relative overflow-x-hidden selection:bg-brand-gold selection:text-black">
      
      {/* Navbar */}
      <nav className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-20">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center font-extrabold text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
             <span className="text-white">42</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-tight text-white leading-none">MASTERY SUITE</h1>
            <span className="text-xs text-brand-gold tracking-[0.2em] font-bold">PRO EDITION</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-300">
          <button onClick={() => openModal('Guide')} className="hover:text-brand-gold transition-colors flex items-center gap-1"><Info size={16}/> Guide</button>
          <button onClick={() => openModal('About')} className="hover:text-brand-gold transition-colors flex items-center gap-1"><Star size={16}/> About</button>
          <button onClick={() => openModal('Contact')} className="hover:text-brand-gold transition-colors flex items-center gap-1"><Mail size={16}/> Contact</button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center p-6 z-10 w-full max-w-7xl mx-auto">
        
        <div className="text-center mb-16 mt-8 animate-float">
          <h2 className="text-5xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tight">
            Master the Code.
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            The ultimate gamified training ground for the <strong className="text-white">42 Network</strong>. 
            Bridge the gap between theory and practice with 14 interactive computer science modules.
          </p>
        </div>
        
        {/* Game Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mb-12">
          <SectionLabel label="CORE CURRICULUM" />
          <MenuCard title="Algorithmic Path" desc="Visual Logic & Recursion" icon={<Code/>} color="from-blue-500 to-cyan-400" onClick={() => setMode(GameMode.ALGO)}/>
          <MenuCard title="NetConfig 42" desc="IPs & Routing Protocols" icon={<Network/>} color="from-violet-500 to-purple-400" onClick={() => setMode(GameMode.NET)}/>
          <MenuCard title="DataStruct Duel" desc="Time Complexity (Big O)" icon={<Database/>} color="from-orange-500 to-amber-400" onClick={() => setMode(GameMode.STRUCT)}/>
          <MenuCard title="ShellScript Scramble" desc="Bash & Piping" icon={<Terminal/>} color="from-emerald-500 to-green-400" onClick={() => setMode(GameMode.BASH)}/>

          <SectionLabel label="ALGORITHMS & MATH" />
          <MenuCard title="Graph Theory Quest" desc="BFS, DFS, Dijkstra" icon={<Share2/>} color="from-indigo-500 to-blue-400" onClick={() => setMode(GameMode.GRAPH)}/>
          <MenuCard title="Dynamic Grid" desc="Dynamic Programming" icon={<Grid/>} color="from-pink-500 to-rose-400" onClick={() => setMode(GameMode.DP_GRID)}/>
          <MenuCard title="Number Theory" desc="Primes & Modular Math" icon={<Calculator/>} color="from-yellow-500 to-orange-400" onClick={() => setMode(GameMode.NUM_THEORY)}/>
          <MenuCard title="Sorting Wars" desc="Algorithm Visualization" icon={<BarChart3/>} color="from-red-500 to-orange-400" onClick={() => setMode(GameMode.SORTING)}/>

          <SectionLabel label="CONCURRENCY" />
          <MenuCard title="Deadlock Manager" desc="Mutex & Race Conditions" icon={<Lock/>} color="from-slate-500 to-gray-400" onClick={() => setMode(GameMode.DEADLOCK)}/>
          <MenuCard title="Pipeline Flow" desc="Async Data Streams" icon={<ArrowRightLeft/>} color="from-cyan-500 to-blue-400" onClick={() => setMode(GameMode.PIPELINE)}/>

          <SectionLabel label="PURE LOGIC" />
          <MenuCard title="Zebra Deduction" desc="Constraint Satisfaction" icon={<HelpCircle/>} color="from-stone-500 to-gray-400" onClick={() => setMode(GameMode.ZEBRA)}/>
          <MenuCard title="Boolean Builder" desc="Logic Gates & Circuits" icon={<Zap/>} color="from-lime-500 to-green-400" onClick={() => setMode(GameMode.BOOLEAN)}/>
          <MenuCard title="Tangram Geo" desc="Spatial Reasoning" icon={<Shapes/>} color="from-amber-500 to-yellow-400" onClick={() => setMode(GameMode.TANGRAM)}/>
          <MenuCard title="n-Puzzle" desc="Heuristic Search" icon={<LayoutGrid/>} color="from-teal-500 to-emerald-400" onClick={() => setMode(GameMode.N_PUZZLE)}/>
        </div>

        {/* SEO Article Section */}
        <SEOArticle />

      </main>

      {/* Professional Footer */}
      <footer className="w-full bg-slate-950/90 backdrop-blur-md border-t border-slate-800 z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
             <div className="col-span-2 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center text-black font-bold">42</div>
                 <h4 className="font-extrabold text-white text-lg">MASTERY SUITE</h4>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed">
                 The world's most accessible training platform for computer science fundamentals. Built for students, by students.
               </p>
             </div>
             <div>
               <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs text-slate-500">Platform</h4>
               <ul className="space-y-3 text-sm text-slate-400">
                 <li><button onClick={() => openModal('About')} className="hover:text-brand-gold transition-colors">About Us</button></li>
                 <li><button onClick={() => openModal('Guide')} className="hover:text-brand-gold transition-colors">User Guide</button></li>
                 <li><button onClick={() => openModal('Contact')} className="hover:text-brand-gold transition-colors">Support</button></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs text-slate-500">Legal</h4>
               <ul className="space-y-3 text-sm text-slate-400">
                 <li><button onClick={() => openModal('Privacy')} className="hover:text-brand-gold transition-colors">Privacy Policy</button></li>
                 <li><button onClick={() => openModal('Terms')} className="hover:text-brand-gold transition-colors">Terms of Service</button></li>
                 <li><button onClick={() => openModal('DMCA')} className="hover:text-brand-gold transition-colors">DMCA</button></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs text-slate-500">Developer</h4>
               <ul className="space-y-3 text-sm text-slate-400">
                 <li><a href="https://github.com/hsinidev" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">GitHub Profile</a></li>
                 <li><a href="mailto:hsini.web@gmail.com" className="hover:text-brand-gold transition-colors">Hire Me</a></li>
               </ul>
             </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 Doodax.com. All rights reserved.</p>
            <p className="text-sm font-semibold text-slate-300">
              Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noreferrer" className="text-[#FFD700] hover:text-white transition-colors hover:underline decoration-brand-gold underline-offset-4">HSINI MOHAMED</a>
            </p>
          </div>
        </div>
      </footer>

      {/* --- CONTENT MODALS --- */}

      {/* ABOUT MODAL */}
      <Modal title="About Doodax" isOpen={modalOpen === 'About'} onClose={closeModal}>
        <div className="space-y-4">
            <p>Welcome to <strong>Doodax.com</strong>, the premier destination for gamified computer science education.</p>
            <p>Our platform was conceived with a singular vision: to make the rigorous, peer-to-peer learning methodology of the <strong>42 Network</strong> accessible to everyone, everywhere.</p>
            <p>Whether you are tackling the "Piscine", preparing for technical interviews, or simply curious about algorithms, our suite provides a safe, interactive sandbox to test your skills.</p>
            <div className="bg-slate-800 p-4 rounded-lg mt-4">
                <h3 className="font-bold text-brand-gold mb-2">Platform Stats</h3>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                    <li>• 14 Game Modules</li>
                    <li>• 700+ Levels</li>
                    <li>• 100% Free & Open Source</li>
                </ul>
            </div>
        </div>
      </Modal>

      {/* CONTACT MODAL */}
      <Modal title="Contact Information" isOpen={modalOpen === 'Contact'} onClose={closeModal}>
        <div className="grid gap-6">
           <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-start gap-4">
             <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Network size={24}/></div>
             <div>
               <h3 className="text-lg font-bold text-white mb-1">Official Website</h3>
               <p className="text-slate-400 text-sm mb-2">Visit our main portal for updates and news.</p>
               <a href="https://doodax.com" target="_blank" rel="noreferrer" className="text-brand-gold hover:underline font-mono">https://doodax.com</a>
             </div>
           </div>
           
           <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-start gap-4">
             <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg"><Mail size={24}/></div>
             <div>
               <h3 className="text-lg font-bold text-white mb-1">Support Email</h3>
               <p className="text-slate-400 text-sm mb-2">For inquiries, bug reports, or partnership opportunities.</p>
               <a href="mailto:hsini.web@gmail.com" className="text-brand-gold hover:underline font-mono">hsini.web@gmail.com</a>
             </div>
           </div>
        </div>
      </Modal>

      {/* GUIDE MODAL */}
      <Modal title="User Guide" isOpen={modalOpen === 'Guide'} onClose={closeModal}>
        <div className="space-y-6">
            <section>
                <h3 className="text-lg font-bold text-blue-400 mb-2">1. Getting Started</h3>
                <p>Select a module from the dashboard. Each module targets a specific Computer Science domain (e.g., Algorithms, Networking).</p>
            </section>
            <section>
                <h3 className="text-lg font-bold text-blue-400 mb-2">2. Progression System</h3>
                <p>Each game has 50 levels of increasing difficulty. You must complete the objective of the current level to unlock the next one.</p>
                <ul className="list-disc pl-5 mt-2 text-slate-400">
                    <li><strong>Levels 1-15:</strong> Beginner / Tutorial</li>
                    <li><strong>Levels 16-30:</strong> Intermediate / Challenge</li>
                    <li><strong>Levels 31-50:</strong> Mastery / Expert</li>
                </ul>
            </section>
            <section>
                <h3 className="text-lg font-bold text-blue-400 mb-2">3. Saving Data</h3>
                <p>Your progress is saved automatically to your browser's <strong>Local Storage</strong>. If you clear your cache, you may lose progress.</p>
            </section>
        </div>
      </Modal>

      {/* PRIVACY POLICY */}
      <Modal title="Privacy Policy" isOpen={modalOpen === 'Privacy'} onClose={closeModal}>
        <div className="space-y-4 text-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Effective Date: May 2024</p>
            <p><strong>1. Introduction</strong><br/> Doodax.com ("we", "our", "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website.</p>
            <p><strong>2. Information Collection</strong><br/> We do not collect personally identifiable information (PII) such as names, addresses, or phone numbers. We do not require account registration to use the site.</p>
            <p><strong>3. Local Storage</strong><br/> Game progress is stored locally on your device using HTML5 LocalStorage. This data never leaves your browser.</p>
            <p><strong>4. Analytics</strong><br/> We may use anonymous analytics tools (like Google Analytics) to understand site traffic usage. This data is aggregated and does not identify individual users.</p>
            <p><strong>5. Contact</strong><br/> For privacy concerns, contact us at: <span className="text-brand-gold">hsini.web@gmail.com</span></p>
        </div>
      </Modal>

      {/* TERMS OF SERVICE */}
      <Modal title="Terms of Service" isOpen={modalOpen === 'Terms'} onClose={closeModal}>
        <div className="space-y-4 text-sm">
            <p><strong>1. Acceptance of Terms</strong><br/> By accessing and using Doodax.com, you accept and agree to be bound by the terms and provision of this agreement.</p>
            <p><strong>2. Educational Use</strong><br/> This platform is intended for educational purposes. While we strive for accuracy, we do not guarantee that the educational content is free of errors.</p>
            <p><strong>3. Intellectual Property</strong><br/> All unique game assets, code, and content are the property of Doodax.com unless otherwise stated. You may not reverse engineer, distribute, or sell any part of this software.</p>
            <p><strong>4. Limitation of Liability</strong><br/> In no event shall Doodax.com be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on Doodax.com.</p>
        </div>
      </Modal>

      {/* DMCA POLICY */}
      <Modal title="DMCA Policy" isOpen={modalOpen === 'DMCA'} onClose={closeModal}>
         <div className="space-y-4 text-sm">
            <p>Doodax.com respects the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes on the copyright or other intellectual property rights of any person or entity.</p>
            <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to <span className="text-brand-gold">hsini.web@gmail.com</span>, with the subject line: "Copyright Infringement".</p>
            <p>You must include in your email a detailed description of the alleged Infringement as detailed under the "DMCA Notice and Procedure for Copyright Infringement Claims".</p>
         </div>
      </Modal>

    </div>
  );
};

// --- Sub Components ---
const SectionLabel: React.FC<{label: string}> = ({label}) => (
    <div className="col-span-full pt-12 pb-6 flex items-center gap-4">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent flex-1"></div>
        <h3 className="text-xs font-black text-brand-gold tracking-[0.3em] uppercase glow-text">
            {label}
        </h3>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent flex-1"></div>
    </div>
);

const MenuCard: React.FC<{title: string, desc: string, icon: React.ReactNode, color: string, onClick: () => void}> = ({title, desc, icon, color, onClick}) => (
  <button 
    onClick={onClick}
    className="
      relative overflow-hidden group
      bg-slate-900/60 backdrop-blur-md border border-white/5 
      p-8 rounded-3xl text-left transition-all duration-500
      hover:border-white/20 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
      flex flex-col gap-6 h-full
    "
  >
    <div className={`
        w-14 h-14 rounded-2xl flex items-center justify-center text-white
        bg-gradient-to-br ${color} shadow-lg
        group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
    `}>
        {icon}
    </div>
    <div>
      <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-colors">
        {title}
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 font-medium">
        {desc}
      </p>
    </div>
    
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
  </button>
);

export default App;
