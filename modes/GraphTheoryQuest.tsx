import React, { useState } from 'react';
import { getGraphLevel } from '../services/algoCompLevels';
import { Network, ArrowRight } from 'lucide-react';

export const GraphTheoryQuest: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getGraphLevel(levelId);
  const [visited, setVisited] = useState<string[]>([level.startNode]);

  const handleNodeClick = (nodeId: string) => {
      if (visited.includes(nodeId)) return;
      // Check if connected to last visited
      const last = visited[visited.length - 1];
      const isConnected = level.edges.some(e => 
          (e.from === last && e.to === nodeId) || (e.from === nodeId && e.to === last)
      );
      
      if (isConnected) {
          setVisited([...visited, nodeId]);
      }
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col p-6">
      <div className="flex justify-between mb-6 border-b border-gray-700 pb-4">
         <button onClick={onBack} className="text-blue-400 hover:text-blue-300">&larr; Menu</button>
         <h1 className="text-2xl font-bold">Graph Quest: Level {levelId}</h1>
         <div className="text-gray-400">Algorithm: <span className="text-yellow-400">{level.algorithm}</span></div>
      </div>

      <div className="flex-1 relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {level.edges.map((e, i) => {
                  const n1 = level.nodes.find(n => n.id === e.from)!;
                  const n2 = level.nodes.find(n => n.id === e.to)!;
                  return (
                      <line key={i} x1={`${n1.x}%`} y1={`${n1.y}%`} x2={`${n2.x}%`} y2={`${n2.y}%`} stroke="#4B5563" strokeWidth="2" />
                  );
              })}
          </svg>
          
          {level.nodes.map(node => {
              const isVisited = visited.includes(node.id);
              const isStart = node.id === level.startNode;
              const isEnd = node.id === level.endNode;
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  className={`
                    absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center font-bold text-lg transition-all border-4
                    ${isStart ? 'bg-green-600 border-green-400' : ''}
                    ${isEnd ? 'bg-red-600 border-red-400' : ''}
                    ${isVisited && !isStart && !isEnd ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600'}
                    hover:scale-110
                  `}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                   {node.id}
                </button>
              );
          })}
      </div>

      <div className="mt-6 flex justify-between items-center bg-gray-800 p-4 rounded-lg">
          <div>Path: {visited.join(' → ')}</div>
          <div className="flex gap-4">
            <button onClick={() => setVisited([level.startNode])} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Reset</button>
            {visited.includes(level.endNode) && (
                <button onClick={() => {setLevelId(l => Math.min(50, l+1)); setVisited(['A']);}} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Next Level</button>
            )}
          </div>
      </div>
    </div>
  );
};
