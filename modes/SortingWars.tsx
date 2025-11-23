import React, { useState, useEffect } from 'react';
import { getSortLevel } from '../services/algoCompLevels';
import { BarChart3 } from 'lucide-react';

export const SortingWars: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getSortLevel(levelId);
  const [arr, setArr] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [swaps, setSwaps] = useState(0);

  useEffect(() => {
      setArr([...level.initialArr]);
      setSwaps(0);
      setSelected([]);
  }, [levelId]);

  const handleBarClick = (idx: number) => {
      if (selected.includes(idx)) {
          setSelected(selected.filter(i => i !== idx));
      } else {
          if (selected.length < 2) setSelected([...selected, idx]);
      }
  };

  const handleSwap = () => {
      if (selected.length !== 2) return;
      const [i, j] = selected;
      const newArr = [...arr];
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      setArr(newArr);
      setSwaps(s => s + 1);
      setSelected([]);
      
      // Check sorted
      const isSorted = newArr.every((v, k) => k === 0 || v >= newArr[k-1]);
      if (isSorted) {
          setTimeout(() => setLevelId(l => l+1), 500);
      }
  };

  return (
    <div className="h-full bg-zinc-900 text-white p-6 flex flex-col">
       <div className="flex justify-between items-center mb-8">
           <button onClick={onBack}>&larr; Menu</button>
           <h2 className="text-xl font-bold">Sorting Wars: Level {levelId}</h2>
           <div>Algorithm: {level.algorithm} | Swaps: {swaps}/{level.maxSwaps}</div>
       </div>

       <div className="flex-1 flex items-end justify-center gap-2 pb-12">
           {arr.map((val, idx) => (
               <div 
                 key={idx}
                 onClick={() => handleBarClick(idx)}
                 className={`w-12 rounded-t transition-all cursor-pointer flex items-end justify-center pb-2 font-bold text-sm
                    ${selected.includes(idx) ? 'bg-yellow-500 -translate-y-2' : 'bg-blue-600 hover:bg-blue-500'}
                 `}
                 style={{ height: `${(val / 50) * 60}%` }}
               >
                   {val}
               </div>
           ))}
       </div>

       <div className="flex justify-center gap-4 pb-8">
           <button 
             onClick={handleSwap} 
             disabled={selected.length !== 2}
             className="px-8 py-4 bg-blue-600 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
           >
               SWAP
           </button>
       </div>
    </div>
  );
};
