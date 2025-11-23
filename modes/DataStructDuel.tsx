import React, { useState } from 'react';
import { STRUCT_LEVELS, getStructLevel } from '../services/structLevelData';
import { Database, Layers, List, Grid } from 'lucide-react';

export const DataStructDuel: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  
  const level = getStructLevel(levelId);

  const checkAnswer = (option: string) => {
    setSelected(option);
    if (option === level.correctOption) {
        setResult('correct');
    } else {
        setResult('wrong');
    }
  };

  const nextLevel = () => {
      setSelected(null);
      setResult('idle');
      setLevelId(prev => Math.min(50, prev + 1));
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8 font-sans">
        <button onClick={onBack} className="self-start mb-4 text-blue-300 hover:text-white">← EXIT TO MENU</button>
        
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <div className="flex justify-between items-end mb-8 border-b border-blue-500/30 pb-4">
                <div>
                    <h1 className="text-4xl font-bold text-blue-400">DATA STRUCT DUEL</h1>
                    <p className="text-gray-400">Optimize for: <span className="text-yellow-400 font-mono">{JSON.stringify(level.constraints)}</span></p>
                </div>
                <div className="text-6xl font-bold opacity-20">{levelId}</div>
            </div>

            <div className="bg-black/40 p-8 rounded-xl backdrop-blur-sm border border-blue-500/20 mb-8">
                <h2 className="text-2xl font-bold mb-4">{level.title}</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                    "{level.scenario}"
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {level.options.map(opt => (
                    <button 
                        key={opt}
                        onClick={() => result === 'idle' && checkAnswer(opt)}
                        className={`
                            p-6 rounded-lg border-2 flex flex-col items-center gap-4 transition-all
                            ${selected === opt 
                                ? (result === 'correct' ? 'bg-green-900/50 border-green-500' : 'bg-red-900/50 border-red-500')
                                : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700 hover:border-blue-400'}
                            ${result !== 'idle' && selected !== opt ? 'opacity-50' : ''}
                        `}
                    >
                        <div className="p-4 bg-white/10 rounded-full">
                            {opt.includes('Array') && <Grid />}
                            {opt.includes('List') && <List />}
                            {opt.includes('Map') && <Database />}
                            {opt.includes('Stack') && <Layers />}
                        </div>
                        <span className="text-xl font-bold">{opt}</span>
                    </button>
                ))}
            </div>

            {result !== 'idle' && (
                <div className={`mt-8 p-6 rounded-lg animate-fade-in ${result === 'correct' ? 'bg-green-600' : 'bg-red-600'}`}>
                    <h3 className="text-2xl font-bold mb-2">{result === 'correct' ? 'OPTIMAL SOLUTION!' : 'SUB-OPTIMAL!'}</h3>
                    <p>{level.explanation}</p>
                    {result === 'correct' && (
                        <button onClick={nextLevel} className="mt-4 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200">
                            NEXT LEVEL
                        </button>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};
