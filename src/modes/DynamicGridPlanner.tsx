
import React, { useState, useEffect, useRef } from 'react';
import { getDPLevel } from '../gameLogic/dpLevelData';
import { solveDPGrid, isValidDPMove } from '../gameLogic/dpEngine';
import { DPResult, DPCoordinate } from '../types';
import { ArrowRight, RotateCcw, Play, ChevronRight, ChevronLeft, Trophy, Info } from 'lucide-react';

export const DynamicGridPlanner: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const [level, setLevel] = useState(getDPLevel(1));
  
  // Game State
  const [userPath, setUserPath] = useState<DPCoordinate[]>([{r: 0, c: 0}]);
  const [gameState, setGameState] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [showSolution, setShowSolution] = useState(false);
  
  // Computed properties
  const [dpResult, setDpResult] = useState<DPResult | null>(null);
  const currentScore = userPath.reduce((acc, p) => acc + level.grid[p.r][p.c], 0);

  // Initialize Level
  useEffect(() => {
    const newLevel = getDPLevel(levelId);
    setLevel(newLevel);
    
    // Solve the level immediately to know the target
    const result = solveDPGrid(newLevel);
    setDpResult(result);
    
    // Reset user state
    setUserPath([{r: 0, c: 0}]);
    setGameState('PLAYING');
    setShowSolution(false);
  }, [levelId]);

  const handleCellClick = (r: number, c: number) => {
    if (gameState !== 'PLAYING') return;
    
    const lastPos = userPath[userPath.length - 1];
    
    // Check if clicked cell is the next valid step
    if (isValidDPMove(lastPos, {r, c})) {
        const newPath = [...userPath, {r, c}];
        setUserPath(newPath);

        // Check if reached destination
        if (r === level.end.r && c === level.end.c) {
            // Auto-evaluate logic handled by "Submit" usually, 
            // but we can update UI state here to say "Path Complete"
        }
    }
  };

  const handleSubmit = () => {
      if (!dpResult) return;
      
      const lastPos = userPath[userPath.length - 1];
      // Must reach the end
      if (lastPos.r !== level.end.r || lastPos.c !== level.end.c) {
          alert("You must reach the bottom-right cell!");
          return;
      }

      if (currentScore === dpResult.maxScore) {
          setGameState('WON');
      } else {
          setGameState('LOST');
      }
  };

  const handleLevelChange = (delta: number) => {
      setLevelId(prev => Math.max(1, Math.min(50, prev + delta)));
  };

  const isUserPath = (r: number, c: number) => userPath.some(p => p.r === r && p.c === c);
  const isOptimalPath = (r: number, c: number) => showSolution && dpResult?.optimalPath.some(p => p.r === r && p.c === c);

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-4">
              <button onClick={onBack} className="text-slate-400 hover:text-white font-bold flex items-center gap-2 text-sm">
                 <ChevronLeft size={16}/> MENU
              </button>
              <div className="h-8 w-px bg-slate-600"></div>
              <div>
                  <h1 className="text-lg font-bold text-pink-400 uppercase tracking-wider">Dynamic Grid</h1>
                  <div className="text-xs text-slate-400">Level {levelId} : <span className="text-white">{level.name}</span></div>
              </div>
          </div>
          
          {/* Score Board */}
          <div className="flex gap-8 bg-slate-900 p-2 rounded-lg border border-slate-700">
              <div className="text-center px-4">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Current Score</div>
                  <div className={`text-2xl font-mono font-bold ${currentScore < 0 ? 'text-red-400' : 'text-blue-400'}`}>
                      {currentScore}
                  </div>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center px-4">
                   <div className="text-[10px] text-slate-500 uppercase font-bold">Algorithm Optimal</div>
                   <div className="text-2xl font-mono font-bold text-emerald-400">
                       {gameState !== 'PLAYING' || showSolution ? dpResult?.maxScore : '?'}
                   </div>
              </div>
          </div>

          <div className="flex gap-2">
              <button onClick={() => handleLevelChange(-1)} disabled={levelId===1} className="p-2 bg-slate-700 rounded hover:bg-slate-600 disabled:opacity-50"><ChevronLeft/></button>
              <button onClick={() => handleLevelChange(1)} disabled={levelId===50} className="p-2 bg-slate-700 rounded hover:bg-slate-600 disabled:opacity-50"><ChevronRight/></button>
          </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
          
          {/* Left Sidebar: Info & Controls */}
          <div className="w-72 bg-slate-950 p-6 flex flex-col border-r border-slate-800">
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 mb-6">
                  <h3 className="text-pink-400 font-bold text-sm mb-2 flex items-center gap-2"><Info size={16}/> MISSION</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                      {level.description}
                  </p>
                  <div className="mt-4 text-xs text-slate-500">
                      Constraint: Move <span className="text-white font-bold">RIGHT</span> or <span className="text-white font-bold">DOWN</span> only.
                  </div>
              </div>

              <div className="flex-1"></div>

              {gameState === 'PLAYING' ? (
                  <div className="space-y-3">
                       <button 
                          onClick={() => setUserPath([{r:0, c:0}])}
                          className="w-full py-3 bg-slate-800 text-slate-300 font-bold rounded hover:bg-slate-700 flex items-center justify-center gap-2"
                        >
                          <RotateCcw size={18}/> RESET PATH
                      </button>
                      <button 
                          onClick={handleSubmit}
                          className="w-full py-4 bg-pink-600 text-white font-bold rounded hover:bg-pink-500 shadow-lg shadow-pink-900/20 flex items-center justify-center gap-2"
                      >
                          <Play size={18} fill="white"/> SUBMIT PATH
                      </button>
                  </div>
              ) : (
                  <div className={`p-6 rounded-xl text-center border-2 mb-4 ${gameState === 'WON' ? 'bg-emerald-900/20 border-emerald-500' : 'bg-red-900/20 border-red-500'}`}>
                      <div className="text-4xl mb-2">{gameState === 'WON' ? '🎉' : '❌'}</div>
                      <h2 className={`text-xl font-bold mb-1 ${gameState === 'WON' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {gameState === 'WON' ? 'OPTIMAL!' : 'SUB-OPTIMAL'}
                      </h2>
                      <p className="text-xs text-slate-400 mb-4">
                          {gameState === 'WON' ? "You matched the DP algorithm." : `You missed the max score of ${dpResult?.maxScore}.`}
                      </p>
                      
                      {gameState === 'LOST' && !showSolution && (
                          <button onClick={() => setShowSolution(true)} className="text-xs underline text-slate-400 hover:text-white">
                              Reveal Optimal Path
                          </button>
                      )}

                      {gameState === 'WON' && (
                           <button onClick={() => handleLevelChange(1)} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-bold text-sm">
                               NEXT LEVEL
                           </button>
                      )}
                  </div>
              )}
          </div>

          {/* Grid Area */}
          <div className="flex-1 bg-slate-900 relative overflow-auto flex items-center justify-center p-8">
              <div 
                className="grid gap-2 transition-all duration-500"
                style={{ 
                    gridTemplateColumns: `repeat(${level.grid[0].length}, minmax(3rem, 4rem))`,
                    gridTemplateRows: `repeat(${level.grid.length}, minmax(3rem, 4rem))`
                }}
              >
                  {level.grid.map((row, r) => (
                      row.map((val, c) => {
                          const selected = isUserPath(r, c);
                          const optimal = isOptimalPath(r, c);
                          
                          // Determine if this cell is a valid next move
                          const last = userPath[userPath.length - 1];
                          const isValidNext = gameState === 'PLAYING' && isValidDPMove(last, {r, c});
                          
                          return (
                              <div 
                                key={`${r}-${c}`}
                                onClick={() => handleCellClick(r, c)}
                                className={`
                                    relative aspect-square rounded-lg flex items-center justify-center text-lg font-mono font-bold cursor-pointer transition-all duration-200 select-none shadow-sm
                                    ${selected 
                                        ? 'bg-blue-600 text-white scale-105 shadow-blue-500/50 z-10' 
                                        : 'bg-slate-800 hover:bg-slate-750'}
                                    ${isValidNext ? 'ring-2 ring-blue-500/30 hover:ring-blue-400' : ''}
                                    ${optimal && !selected ? 'ring-4 ring-yellow-400/50 z-0' : ''}
                                `}
                              >
                                  {/* Value */}
                                  <span className={selected ? 'text-white' : (val < 0 ? 'text-red-400' : 'text-emerald-400')}>
                                      {val}
                                  </span>

                                  {/* Coordinates (Debug/Nerdy detail) */}
                                  <span className="absolute bottom-1 right-1 text-[8px] text-slate-600 opacity-0 hover:opacity-100">
                                      {r},{c}
                                  </span>

                                  {/* Start/End Markers */}
                                  {r===0 && c===0 && <div className="absolute -top-2 -left-2 bg-white text-black text-[10px] font-bold px-1 rounded">START</div>}
                                  {r===level.end.r && c===level.end.c && <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white text-[10px] font-bold px-1 rounded">END</div>}
                              </div>
                          );
                      })
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};
