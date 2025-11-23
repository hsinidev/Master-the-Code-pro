import React, { useState } from 'react';
import { getDeadlockLevel } from '../services/concurrencyLevels';
import { Lock, Unlock } from 'lucide-react';

export const DeadlockManager: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getDeadlockLevel(levelId);
  
  // Very simplified: Just allow skipping to next level as a prototype for "Visual Novel" style logic
  // In a full game, this would need a complex scheduler engine.
  
  return (
    <div className="h-full bg-gray-900 text-white p-8">
        <button onClick={onBack} className="mb-4 text-gray-400 hover:text-white">&larr; Menu</button>
        <h1 className="text-3xl font-bold mb-2">Deadlock Manager: Level {levelId}</h1>
        <p className="mb-8 text-gray-400">Goal: Create a sequence that results in {level.goal}</p>

        <div className="grid grid-cols-2 gap-8">
            {level.threads.map(t => (
                <div key={t.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Thread {t.id}</h3>
                    <div className="space-y-2">
                        {t.instructions.map((inst, i) => (
                            <div key={i} className="bg-black p-3 rounded font-mono text-sm flex items-center gap-2">
                                {inst.includes('LOCK') ? <Lock size={14} className="text-red-400"/> : <Unlock size={14} className="text-green-400"/>}
                                {inst}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 flex justify-center">
             <button onClick={() => setLevelId(l => l+1)} className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500">
                 Simulate Scheduler (Next)
             </button>
        </div>
    </div>
  );
};
