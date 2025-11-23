import React, { useState } from 'react';
import { getBooleanLevel } from '../services/logicLevels';
import { Zap } from 'lucide-react';

export const BooleanCircuitBuilder: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getBooleanLevel(levelId);

  return (
    <div className="h-full bg-green-950 text-green-100 p-6 font-mono">
        <div className="flex justify-between mb-6">
            <button onClick={onBack}>&larr; EXIT</button>
            <h1 className="text-2xl font-bold">CIRCUIT_BUILDER.EXE - Level {levelId}</h1>
        </div>

        <div className="flex gap-4 h-3/4">
            <div className="w-48 bg-green-900/50 border border-green-700 p-4 rounded">
                <h3 className="mb-4 font-bold text-green-400">TOOLBOX</h3>
                {level.availableGates.map(g => (
                    <div key={g} className="bg-black p-3 mb-2 text-center border border-green-800 cursor-grab hover:border-green-400">
                        {g}
                    </div>
                ))}
            </div>
            
            <div className="flex-1 bg-black border border-green-600 rounded relative overflow-hidden grid place-items-center" style={{backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
                <div className="text-green-700 text-sm">DRAG GATES HERE</div>
                {/* Simplified representation of inputs */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-4">
                    {level.inputs.map((inp, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${inp ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-gray-800'}`}></div>
                            <span>IN_{i}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span>OUT</span>
                    <Zap className={level.expectedOutput ? 'text-yellow-400' : 'text-gray-700'} />
                </div>
            </div>
        </div>
        
        <div className="mt-4 text-right">
             <button onClick={() => setLevelId(l => l+1)} className="bg-green-700 px-6 py-2 hover:bg-green-600 text-white font-bold">COMPILE</button>
        </div>
    </div>
  );
};
