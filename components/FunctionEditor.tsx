
import React from 'react';
import { CommandType, DragPayload } from '../types';
import { GameColors, Icons } from '../assets/gameAssets';

interface FunctionEditorProps {
  id: 'MAIN' | 'F1' | 'F2';
  commands: CommandType[];
  limit: number;
  onDropCommand: (cmd: CommandType, index?: number) => void;
  onRemoveCommand: (index: number) => void;
  readOnly?: boolean;
  layout?: 'horizontal' | 'vertical';
}

const CommandBlock: React.FC<{ type: CommandType, onRemove?: () => void }> = ({ type, onRemove }) => {
    let bg = GameColors.moveGray;
    let icon = Icons.arrowUp;
    let isLight = true;

    switch(type) {
        case CommandType.LEFT: bg = GameColors.blue; icon = Icons.turnLeft; isLight = false; break;
        case CommandType.RIGHT: bg = GameColors.orange; icon = Icons.turnRight; isLight = false; break;
        case CommandType.ACTION: bg = '#facc15'; icon = Icons.star; isLight = false; break;
        case CommandType.F1: bg = GameColors.green; icon = "M4 4h16v16H4z"; isLight = false; break;
        case CommandType.F2: bg = GameColors.red; icon = "M4 4h16v16H4z"; isLight = false; break;
    }

    return (
        <div 
            className="w-10 h-10 rounded shadow-sm flex items-center justify-center relative group cursor-pointer hover:scale-105 transition-transform"
            style={{ backgroundColor: bg }}
            onClick={onRemove}
        >
             {type === CommandType.F1 || type === CommandType.F2 ? (
                 <span className="text-white font-bold text-xs">{type}</span>
             ) : (
                 <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={isLight ? GameColors.moveText : 'white'} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <path d={icon} />
                </svg>
             )}
             
             {/* Remove Overlay */}
             {onRemove && (
                <div className="absolute inset-0 bg-red-500/80 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" stroke="white" strokeWidth="3" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </div>
             )}
        </div>
    );
};

const FunctionEditor: React.FC<FunctionEditorProps> = ({ id, commands, limit, onDropCommand, onRemoveCommand, readOnly, layout = 'vertical' }) => {
  
  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      if (readOnly) return;
      
      try {
          const data = e.dataTransfer.getData('application/json');
          if (!data) return;
          const payload: DragPayload = JSON.parse(data);
          onDropCommand(payload.type);
      } catch (err) {
          console.error("Drop failed", err);
      }
  };

  const slots = Array.from({ length: limit });

  return (
    <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
            flex ${layout === 'horizontal' ? 'flex-row' : 'flex-wrap'} gap-2 items-center min-h-[3rem]
            ${layout === 'horizontal' ? 'w-full overflow-x-auto p-1' : ''}
        `}
    >
        {/* Title Tag for F1/F2 */}
        {(id === 'F1' || id === 'F2') && (
            <div 
                className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm mr-2 border"
                style={{ 
                    borderColor: id === 'F1' ? GameColors.green : GameColors.red,
                    color: id === 'F1' ? GameColors.green : GameColors.red,
                    backgroundColor: 'white'
                }}
            >
                {id}
            </div>
        )}

        {slots.map((_, idx) => {
            const cmd = commands[idx];
            if (cmd) {
                return <CommandBlock key={idx} type={cmd} onRemove={!readOnly ? () => onRemoveCommand(idx) : undefined} />;
            }
            return (
                <div 
                    key={idx} 
                    className="w-10 h-10 rounded border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-300 text-xs"
                >
                    {idx + 1}
                </div>
            );
        })}
    </div>
  );
};

export default FunctionEditor;
