import React, { useState } from 'react';
import { getTangramLevel } from '../services/logicLevels';
import { Shapes } from 'lucide-react';

export const TangramGeometry: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getTangramLevel(levelId);

  return (
    <div className="h-full bg-orange-50 text-orange-900 p-8">
        <button onClick={onBack} className="mb-8 hover:font-bold">&larr; Gallery</button>
        <div className="text-center mb-8">
            <Shapes className="inline-block w-12 h-12 mb-2 text-orange-500" />
            <h1 className="text-4xl font-light">Geometry Puzzle {levelId}</h1>
        </div>

        <div className="flex justify-center gap-12 items-start">
            <div className="p-8 bg-white shadow-lg rounded-xl border-2 border-dashed border-orange-200 min-w-[300px] min-h-[300px] flex items-center justify-center">
                <span className="text-orange-200 font-bold text-2xl">TARGET AREA</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {level.pieces.map((p, i) => (
                    <div key={i} className="w-24 h-24 bg-orange-400 hover:bg-orange-500 cursor-grab shadow-md rounded flex items-center justify-center text-white font-bold">
                        Piece {i+1}
                    </div>
                ))}
            </div>
        </div>
        <div className="text-center mt-12">
            <button onClick={() => setLevelId(l => l+1)} className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700">Next Puzzle</button>
        </div>
    </div>
  );
};
