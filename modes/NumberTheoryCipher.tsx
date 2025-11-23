import React, { useState } from 'react';
import { getNumLevel } from '../services/algoCompLevels';
import { Calculator } from 'lucide-react';

export const NumberTheoryCipher: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const [input, setInput] = useState("");
  const level = getNumLevel(levelId);

  const checkAnswer = () => {
      if (input.trim() === level.answer) {
          setInput("");
          setLevelId(prev => Math.min(50, prev + 1));
      } else {
          alert("Incorrect!");
      }
  };

  return (
    <div className="h-full bg-indigo-950 text-white flex flex-col items-center justify-center p-6">
        <button onClick={onBack} className="absolute top-6 left-6 text-indigo-300 hover:text-white">&larr; Menu</button>
        
        <div className="bg-indigo-900/50 p-12 rounded-2xl border border-indigo-700 text-center max-w-2xl w-full backdrop-blur-sm">
            <Calculator size={48} className="mx-auto mb-6 text-indigo-400" />
            <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-2">Level {levelId}</h2>
            <h1 className="text-4xl font-bold mb-8 font-mono">{level.question}</h1>
            
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-black/30 border-b-2 border-indigo-500 text-center text-3xl py-4 focus:outline-none focus:border-white transition-colors font-mono mb-8"
                placeholder="?"
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            />

            <div className="flex gap-4 justify-center">
                <button onClick={checkAnswer} className="bg-indigo-500 hover:bg-indigo-400 px-8 py-3 rounded-lg font-bold transition-colors">Submit</button>
            </div>

            <div className="mt-8 text-sm text-indigo-400 bg-black/20 p-4 rounded">
                <span className="font-bold">HINT:</span> {level.hint}
            </div>
        </div>
    </div>
  );
};
