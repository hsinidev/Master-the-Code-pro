import React, { useState } from 'react';
import { getZebraLevel } from '../services/logicLevels';

export const ZebraDeductionGrid: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getZebraLevel(levelId);
  // 0: Empty, 1: Yes, -1: No
  const [gridState, setGridState] = useState<Record<string, number>>({});

  const toggleCell = (key: string) => {
      setGridState(prev => {
          const curr = prev[key] || 0;
          const next = curr === 0 ? 1 : (curr === 1 ? -1 : 0);
          return { ...prev, [key]: next };
      });
  };

  return (
    <div className="h-full bg-stone-100 text-stone-800 p-8 font-serif overflow-auto">
        <button onClick={onBack} className="mb-4 underline text-stone-500">&larr; Back to Menu</button>
        <h1 className="text-3xl font-bold mb-6">Deduction Grid #{levelId}</h1>
        
        <div className="flex gap-8">
            <div className="bg-white p-6 rounded shadow-xl">
                <h2 className="font-bold border-b mb-2">Clues</h2>
                <ul className="list-disc pl-4 space-y-2">
                    {level.clues.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
            </div>

            <div className="bg-white p-6 rounded shadow-xl">
                {/* Simplified Grid Render */}
                <div className="grid grid-cols-3 gap-1">
                    <div className="p-2"></div>
                    {level.items[1].map(item => <div key={item} className="font-bold text-center p-2 bg-stone-200">{item}</div>)}
                    
                    {level.items[0].map(rowItem => (
                        <React.Fragment key={rowItem}>
                            <div className="font-bold p-2 bg-stone-200 flex items-center justify-end px-4">{rowItem}</div>
                            {level.items[1].map(colItem => {
                                const key = `${rowItem}-${colItem}`;
                                const val = gridState[key] || 0;
                                return (
                                    <button 
                                        key={key}
                                        onClick={() => toggleCell(key)}
                                        className={`
                                            w-12 h-12 border border-stone-300 flex items-center justify-center text-xl font-bold
                                            ${val === 1 ? 'text-green-600 bg-green-50' : ''}
                                            ${val === -1 ? 'text-red-600 bg-red-50' : ''}
                                        `}
                                    >
                                        {val === 1 ? 'O' : (val === -1 ? 'X' : '')}
                                    </button>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
        <button onClick={() => setLevelId(l => l+1)} className="mt-8 bg-stone-800 text-white px-6 py-2 rounded">Solve & Next</button>
    </div>
  );
};
