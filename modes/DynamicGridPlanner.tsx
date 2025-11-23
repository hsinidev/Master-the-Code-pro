import React, { useState } from 'react';
import { getDPLevel } from '../services/algoCompLevels';
import { Grid } from 'lucide-react';

export const DynamicGridPlanner: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getDPLevel(levelId);
  const [path, setPath] = useState<{r:number, c:number}[]>([{r:0, c:0}]);

  const currentScore = path.reduce((acc, p) => acc + level.values[p.r][p.c], 0);

  const handleCellClick = (r: number, c: number) => {
      const last = path[path.length - 1];
      // Allow moving right or down
      if ((r === last.r && c === last.c + 1) || (r === last.r + 1 && c === last.c)) {
          setPath([...path, {r, c}]);
      }
  };

  return (
    <div className="h-full bg-slate-900 text-white p-6 flex flex-col items-center">
       <div className="w-full flex justify-between mb-8 max-w-3xl">
          <button onClick={onBack}>&larr; Exit</button>
          <h1 className="text-2xl font-bold">DP Grid: Level {levelId}</h1>
          <div className="text-right">Target: {level.targetScore} <br/> Current: {currentScore}</div>
       </div>

       <div className="bg-slate-800 p-8 rounded-xl shadow-2xl">
          <div 
            className="grid gap-2" 
            style={{ gridTemplateColumns: `repeat(${level.gridSize}, 60px)` }}
          >
            {level.values.map((row, r) => (
                row.map((val, c) => {
                    const isInPath = path.some(p => p.r === r && p.c === c);
                    return (
                        <div 
                            key={`${r}-${c}`}
                            onClick={() => handleCellClick(r, c)}
                            className={`
                                w-[60px] h-[60px] flex items-center justify-center font-mono text-lg rounded cursor-pointer transition-colors
                                ${isInPath ? 'bg-blue-500 text-white shadow-[0_0_10px_#3b82f6]' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}
                            `}
                        >
                            {val}
                        </div>
                    );
                })
            ))}
          </div>
       </div>

       <div className="mt-8 flex gap-4">
           <button onClick={() => setPath([{r:0, c:0}])} className="px-6 py-2 bg-gray-600 rounded">Reset</button>
           {currentScore >= level.targetScore && (
               <button onClick={() => {setLevelId(l => l+1); setPath([{r:0,c:0}]);}} className="px-6 py-2 bg-green-500 rounded animate-bounce">Next Level</button>
           )}
       </div>
    </div>
  );
};
