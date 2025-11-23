
import React from 'react';
import { AlgoGameState, CellType, Direction } from '../types';
import { GameColors, Icons } from '../assets/gameAssets';

interface GridDisplayProps {
  gameState: AlgoGameState;
}

const GridDisplay: React.FC<GridDisplayProps> = ({ gameState }) => {
  const { grid, agentPos, agentDir } = gameState;
  const rows = grid.length;
  const cols = grid[0].length;

  const getRotation = (dir: Direction) => {
    switch (dir) {
      case Direction.UP: return 'rotate(-90deg)';
      case Direction.RIGHT: return 'rotate(0deg)';
      case Direction.DOWN: return 'rotate(90deg)';
      case Direction.LEFT: return 'rotate(180deg)';
      default: return 'rotate(0deg)';
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-200 inline-block">
      <div 
        className="grid gap-2"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 48px)`,
          gridTemplateRows: `repeat(${rows}, 48px)`
        }}
      >
        {grid.map((row, y) => (
          row.map((cell, x) => {
            const isAgent = agentPos.x === x && agentPos.y === y;
            let bg = GameColors.bgLight;
            let shadow = 'none';

            // Aesthetic Mapping based on cell type
            if (cell.type === CellType.WALL) {
                bg = GameColors.orange; // Obstacle
                shadow = 'inset 0 0 10px rgba(0,0,0,0.1)';
            } else if (cell.hasStar) {
                bg = GameColors.blue; // Target area style
            } else if (cell.type === CellType.PAINTED) {
                bg = '#bfdbfe'; // Light blue trace
            } else {
                // Alternating grid pattern for empty cells
                bg = (x + y) % 2 === 0 ? '#f9fafb' : '#f3f4f6'; 
            }

            return (
              <div 
                key={`${x}-${y}`} 
                className="w-12 h-12 rounded-lg relative flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: bg, boxShadow: shadow }}
              >
                 {/* Star */}
                 {cell.hasStar && (
                    <svg viewBox="0 0 24 24" fill={GameColors.starWhite} className="w-6 h-6 animate-pulse">
                        <path d={Icons.star} />
                    </svg>
                 )}

                 {/* Agent */}
                 {isAgent && (
                   <div 
                     className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-300"
                     style={{ transform: getRotation(agentDir) }}
                   >
                     <svg viewBox="0 0 24 24" className="w-8 h-8" fill={GameColors.agentBlack}>
                        <path d={Icons.agent} stroke="white" strokeWidth="1" />
                     </svg>
                   </div>
                 )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};

export default GridDisplay;
