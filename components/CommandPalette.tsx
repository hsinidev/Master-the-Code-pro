
import React from 'react';
import { CommandType, DragPayload } from '../types';
import { GameColors, Icons } from '../assets/gameAssets';

interface CommandPaletteProps {
  availableFunctions: ('F1' | 'F2')[];
}

const PaletteItem: React.FC<{ type: CommandType, label: string, color: string, icon: string }> = ({ type, label, color, icon }) => {
  const handleDragStart = (e: React.DragEvent) => {
    const payload: DragPayload = { type, source: 'PALETTE' };
    e.dataTransfer.setData('application/json', JSON.stringify(payload));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const isLight = color === GameColors.moveGray;

  return (
    <div 
      draggable 
      onDragStart={handleDragStart}
      className="h-12 rounded-lg flex items-center justify-between px-3 shadow-sm cursor-grab hover:shadow-md transition-transform hover:-translate-y-0.5 active:cursor-grabbing"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center gap-2">
        <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={isLight ? GameColors.moveText : 'white'} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="w-5 h-5"
        >
            <path d={icon} />
        </svg>
        <span className={`text-xs font-bold uppercase ${isLight ? 'text-gray-700' : 'text-white'}`}>
            {label}
        </span>
      </div>
      {/* Drag handle indicator */}
      <div className={`flex flex-col gap-0.5 opacity-50 ${isLight ? 'bg-gray-400' : 'bg-white/50'}`}>
         <div className="w-1 h-1 rounded-full bg-current"></div>
         <div className="w-1 h-1 rounded-full bg-current"></div>
         <div className="w-1 h-1 rounded-full bg-current"></div>
      </div>
    </div>
  );
};

const CommandPalette: React.FC<CommandPaletteProps> = ({ availableFunctions }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <PaletteItem type={CommandType.MOVE} label="Move" color={GameColors.moveGray} icon={Icons.arrowUp} />
      <PaletteItem type={CommandType.LEFT} label="Left" color={GameColors.blue} icon={Icons.turnLeft} />
      <PaletteItem type={CommandType.RIGHT} label="Right" color={GameColors.orange} icon={Icons.turnRight} />
      <PaletteItem type={CommandType.ACTION} label="Star" color="#facc15" icon={Icons.star} />
      
      {availableFunctions.includes('F1') && (
          <PaletteItem type={CommandType.F1} label="Func 1" color={GameColors.green} icon="M4 4h16v16H4z" /> // Simple box for F1
      )}
      {availableFunctions.includes('F2') && (
          <PaletteItem type={CommandType.F2} label="Func 2" color={GameColors.red} icon="M4 4h16v16H4z" />
      )}
    </div>
  );
};

export default CommandPalette;
