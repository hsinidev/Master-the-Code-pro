
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlgoGameState, CommandType, DragPayload } from '../types';
import { ALGO_LEVELS, getAlgoLevel } from '../services/levelData';
import { initializeAlgoGame, stepAlgoGame, resetAlgoSimulation } from '../services/gameEngine';
import GridDisplay from '../components/GridDisplay';
import CommandPalette from '../components/CommandPalette';
import FunctionEditor from '../components/FunctionEditor';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, LogOut, Zap } from 'lucide-react';

export const AlgorithmicPath: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [gameState, setGameState] = useState<AlgoGameState | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const level = getAlgoLevel(currentLevelId);
    setGameState(initializeAlgoGame(level));
    return () => stopLoop();
  }, [currentLevelId]);

  const stopLoop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const runStep = useCallback(() => {
    setGameState(prev => {
      if (!prev) return null;
      const next = stepAlgoGame(prev);
      if (next.status === 'WON' || next.status === 'LOST' || next.status === 'IDLE') {
        stopLoop();
      }
      return next;
    });
  }, [stopLoop]);

  const togglePlay = () => {
    if (!gameState) return;
    if (gameState.status === 'RUNNING') {
      setGameState(prev => prev ? { ...prev, status: 'PAUSED' } : null);
      stopLoop();
    } else {
      let startState = gameState;
      if (gameState.status === 'IDLE' || gameState.status === 'WON' || gameState.status === 'LOST') {
          const level = getAlgoLevel(currentLevelId);
          startState = {
              ...resetAlgoSimulation(gameState, level),
              status: 'RUNNING',
              executionStack: [{ commands: gameState.program.MAIN, pc: 0, source: 'MAIN' }]
          };
      } else {
          startState = { ...gameState, status: 'RUNNING' };
      }
      setGameState(startState);
      timerRef.current = window.setInterval(runStep, startState.speed);
    }
  };

  const handleReset = () => {
    stopLoop();
    const level = getAlgoLevel(currentLevelId);
    setGameState(resetAlgoSimulation(gameState!, level));
  };

  const changeLevel = (delta: number) => {
    const newId = Math.max(1, Math.min(ALGO_LEVELS.length, currentLevelId + delta));
    setCurrentLevelId(newId);
  };

  const changeSpeed = (newSpeed: number) => {
    if (!gameState) return;
    setGameState(prev => prev ? { ...prev, speed: newSpeed } : null);
    if (gameState.status === 'RUNNING') {
       stopLoop();
       timerRef.current = window.setInterval(runStep, newSpeed);
    }
  };

  const handleDropCommand = (list: 'MAIN' | 'F1' | 'F2', cmd: CommandType) => {
      if (!gameState || gameState.status === 'RUNNING') return;
      const level = getAlgoLevel(currentLevelId);
      const limit = list === 'MAIN' ? level.maxMainCommands : level.maxFuncCommands;
      const currentList = gameState.program[list];
      
      if (currentList.length < limit) {
          setGameState(prev => {
              if (!prev) return null;
              return {
                  ...prev,
                  program: { ...prev.program, [list]: [...currentList, cmd] }
              };
          });
      }
  };

  const handleRemoveCommand = (list: 'MAIN' | 'F1' | 'F2', index: number) => {
      if (!gameState || gameState.status === 'RUNNING') return;
      setGameState(prev => {
          if (!prev) return null;
          const newList = [...prev.program[list]];
          newList.splice(index, 1);
          return {
              ...prev,
              program: { ...prev.program, [list]: newList }
          };
      });
  };

  if (!gameState) return <div>Loading...</div>;
  const level = getAlgoLevel(currentLevelId);

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 font-sans overflow-hidden">
      {/* Header & Main Sequence */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-8 shadow-sm z-10 shrink-0 h-24">
        <div className="flex flex-col w-48">
             <button onClick={onBack} className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 mb-1">
                 <LogOut size={12}/> MENU
             </button>
             <div className="text-xs text-blue-500 font-bold uppercase tracking-widest">Level {currentLevelId}</div>
             <div className="font-bold text-lg leading-tight text-gray-800">{level.name}</div>
        </div>

        {/* Main Program (Horizontal Strip) */}
        <div className="flex-1 flex items-center gap-4 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 h-full overflow-x-auto">
            <div className="flex flex-col items-center justify-center w-12 border-r border-gray-200 mr-2">
                <Play className="text-blue-500 w-5 h-5" />
                <span className="text-[10px] font-bold text-gray-500 uppercase mt-1">Main</span>
            </div>
            <FunctionEditor 
                id="MAIN"
                commands={gameState.program.MAIN}
                limit={level.maxMainCommands}
                onDropCommand={(cmd) => handleDropCommand('MAIN', cmd)}
                onRemoveCommand={(idx) => handleRemoveCommand('MAIN', idx)}
                layout="horizontal"
            />
        </div>

        <div className="flex gap-2">
            <button onClick={() => changeLevel(-1)} disabled={currentLevelId === 1} className="p-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50">
                <ChevronLeft size={20}/>
            </button>
             <button onClick={() => changeLevel(1)} disabled={currentLevelId === ALGO_LEVELS.length} className="p-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50">
                <ChevronRight size={20}/>
            </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
          
          {/* Left: Game Grid (Dominant) */}
          <div className="flex-1 bg-gray-100 relative flex items-center justify-center p-12 overflow-auto">
              <GridDisplay gameState={gameState} />

              {/* Overlays */}
              {gameState.status === 'WON' && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center animate-bounce">
                          <div className="text-5xl mb-2">⭐</div>
                          <h2 className="text-2xl font-bold mb-4">Level Complete!</h2>
                          <button onClick={() => changeLevel(1)} className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 shadow-lg">Next Level</button>
                      </div>
                  </div>
              )}
               {gameState.error && (
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 animate-pulse z-50">
                      <Zap size={18} fill="white"/> {gameState.error}
                  </div>
              )}
          </div>

          {/* Right: Sidebar (Functions & Palette) */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl z-20">
              
              {/* Function Definitions */}
              <div className="p-6 border-b border-gray-100 flex-1 overflow-y-auto bg-white">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Functions</h3>
                  <div className="space-y-6">
                      {/* F1 */}
                      <div className={`rounded-xl p-3 border-2 transition-colors ${level.availableFunctions.includes('F1') ? 'border-gray-100' : 'border-dashed border-gray-200 opacity-50'}`}>
                          <div className="text-xs font-bold text-gray-500 mb-2 flex justify-between">
                              <span>F1 SEQUENCE</span>
                              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded">CALLABLE</span>
                          </div>
                          {level.availableFunctions.includes('F1') ? (
                              <FunctionEditor 
                                  id="F1"
                                  commands={gameState.program.F1}
                                  limit={level.maxFuncCommands}
                                  onDropCommand={(cmd) => handleDropCommand('F1', cmd)}
                                  onRemoveCommand={(idx) => handleRemoveCommand('F1', idx)}
                              />
                          ) : <div className="text-xs text-gray-300 text-center py-2">LOCKED</div>}
                      </div>

                      {/* F2 */}
                      <div className={`rounded-xl p-3 border-2 transition-colors ${level.availableFunctions.includes('F2') ? 'border-gray-100' : 'border-dashed border-gray-200 opacity-50'}`}>
                          <div className="text-xs font-bold text-gray-500 mb-2 flex justify-between">
                              <span>F2 SEQUENCE</span>
                              <span className="text-[10px] bg-red-100 text-red-700 px-1.5 rounded">CALLABLE</span>
                          </div>
                          {level.availableFunctions.includes('F2') ? (
                              <FunctionEditor 
                                  id="F2"
                                  commands={gameState.program.F2}
                                  limit={level.maxFuncCommands}
                                  onDropCommand={(cmd) => handleDropCommand('F2', cmd)}
                                  onRemoveCommand={(idx) => handleRemoveCommand('F2', idx)}
                              />
                          ) : <div className="text-xs text-gray-300 text-center py-2">LOCKED</div>}
                      </div>
                  </div>
              </div>

              {/* Draggable Palette */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Commands</h3>
                  <CommandPalette availableFunctions={level.availableFunctions} />
                  <div className="text-[10px] text-center text-gray-400 mt-4">Drag blocks to slots above</div>
              </div>

              {/* Controls */}
              <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex justify-center gap-2 mb-4 bg-gray-100 p-1 rounded-lg w-max mx-auto">
                        {[500, 200, 50].map((s, i) => (
                            <button 
                                key={s} 
                                onClick={() => changeSpeed(s)}
                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${gameState.speed === s ? 'bg-white shadow text-black' : 'text-gray-500'}`}
                            >
                                x{i+1}
                            </button>
                        ))}
                  </div>
                  <div className="flex gap-2">
                      <button onClick={handleReset} className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors">
                          <RotateCcw size={20} />
                      </button>
                      <button 
                          onClick={togglePlay}
                          className={`flex-1 flex items-center justify-center gap-2 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 border-b-4
                              ${gameState.status === 'RUNNING' 
                                  ? 'bg-yellow-500 border-yellow-600' 
                                  : 'bg-gray-900 border-gray-700 hover:bg-gray-800'}
                          `}
                      >
                          {gameState.status === 'RUNNING' ? <Pause size={20} fill="white"/> : <Play size={20} fill="white"/>}
                          {gameState.status === 'RUNNING' ? 'PAUSE' : 'EXECUTE'}
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
