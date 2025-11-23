import React, { useState } from 'react';
import { getPipelineLevel } from '../services/concurrencyLevels';
import { ArrowRight } from 'lucide-react';

export const PipelineFlow: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getPipelineLevel(levelId);

  return (
    <div className="h-full bg-slate-950 text-white p-8 flex flex-col">
       <button onClick={onBack} className="mb-6 text-slate-400 hover:text-white">&larr; Menu</button>
       <h1 className="text-3xl font-bold text-cyan-400 mb-2">Pipeline Flow: Level {levelId}</h1>
       
       <div className="flex-1 flex items-center justify-center gap-4 overflow-x-auto">
           <div className="bg-cyan-900/20 p-6 rounded border border-cyan-800">
               Input: {level.incomingData}
           </div>
           <ArrowRight className="text-gray-600" />
           {level.stages.map((stage, i) => (
               <div key={i} className="flex items-center gap-4">
                   <div className="w-32 h-32 bg-slate-800 border-2 border-cyan-600 rounded flex flex-col items-center justify-center shadow-[0_0_20px_rgba(8,145,178,0.2)]">
                       <span className="font-bold text-cyan-400">{stage}</span>
                       <div className="text-xs text-gray-500 mt-2">Buffer: {level.bufferSize}</div>
                   </div>
                   {i < level.stages.length - 1 && <ArrowRight className="text-gray-600" />}
               </div>
           ))}
       </div>
       
       <div className="mt-auto text-center">
           <button onClick={() => setLevelId(l => l+1)} className="px-8 py-3 bg-cyan-700 rounded font-bold hover:bg-cyan-600">Start Pipeline</button>
       </div>
    </div>
  );
};
