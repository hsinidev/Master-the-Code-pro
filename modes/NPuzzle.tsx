import React, { useState, useEffect } from 'react';
import { getNPuzzleLevel } from '../services/logicLevels';

export const NPuzzle: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getNPuzzleLevel(levelId);
  // Simplified render for N-Puzzle
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
      // Initialize solved state
      const size = level.size;
      const arr = Array.from({length: size*size}, (_, i) => i + 1);
      arr[size*size-1] = 0; // Empty
      // Naive shuffle for visual demo (might be unsolvable, strictly prototype)
      for(let i=0; i<level.scrambleMoves; i++) {
          const idx1 = Math.floor(Math.random() * arr.length);
          const idx2 = Math.floor(Math.random() * arr.length);
          [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      }
      setTiles(arr);
  }, [levelId]);

  const moveTile = (idx: number) => {
     // Logic to swap with empty (0) would go here
     const newTiles = [...tiles];
     const emptyIdx = newTiles.indexOf(0);
     // Just a visual swap for prototype feel
     [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
     setTiles(newTiles);
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col items-center justify-center">
        <button onClick={onBack} className="absolute top-8 left-8 text-gray-400">&larr; Quit</button>
        <h1 className="text-3xl mb-8 font-bold">Sliding Block: Level {levelId}</h1>
        
        <div 
            className="bg-gray-700 p-4 rounded shadow-2xl grid gap-2"
            style={{ 
                gridTemplateColumns: `repeat(${level.size}, 80px)`,
                gridTemplateRows: `repeat(${level.size}, 80px)`
            }}
        >
            {tiles.map((t, i) => (
                <div 
                    key={i}
                    onClick={() => moveTile(i)}
                    className={`
                        w-full h-full flex items-center justify-center text-2xl font-bold rounded cursor-pointer transition-all
                        ${t === 0 ? 'bg-transparent' : 'bg-blue-500 hover:bg-blue-400 shadow-lg'}
                    `}
                >
                    {t !== 0 && t}
                </div>
            ))}
        </div>
        <button onClick={() => setLevelId(l => l+1)} className="mt-8 text-gray-500 hover:text-white">Skip Level</button>
    </div>
  );
};
