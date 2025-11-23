
import React, { useState, useEffect, useRef } from 'react';
import { getGraphLevel } from '../gameLogic/graphLevelData';
import { runDFS, runDijkstra } from '../gameLogic/graphEngine';
import { GraphAlgorithmResult, AlgorithmLog } from '../types';
import { Play, RotateCcw, MapPin, ChevronRight, ChevronLeft, Target, BookOpen } from 'lucide-react';

export const GraphTheoryQuest: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const [level, setLevel] = useState(getGraphLevel(1));
  
  // Game State
  const [startNode, setStartNode] = useState<string>('A');
  const [endNode, setEndNode] = useState<string>('B');
  const [selectedAlgo, setSelectedAlgo] = useState<'DFS' | 'DIJKSTRA'>('DFS');
  
  // Execution State
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<GraphAlgorithmResult | null>(null);
  const [displayLog, setDisplayLog] = useState<AlgorithmLog[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [finalPath, setFinalPath] = useState<string[]>([]);
  
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lvl = getGraphLevel(levelId);
    setLevel(lvl);
    setStartNode(lvl.nodes[0].id);
    setEndNode(lvl.nodes[lvl.nodes.length - 1].id);
    setSelectedAlgo(lvl.recommendedAlgo);
    resetState();
  }, [levelId]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayLog]);

  const resetState = () => {
    setIsRunning(false);
    setResult(null);
    setDisplayLog([]);
    setActiveNode(null);
    setVisitedNodes([]);
    setFinalPath([]);
  };

  const handleRun = async () => {
    resetState();
    setIsRunning(true);

    let res: GraphAlgorithmResult;
    if (selectedAlgo === 'DFS') {
        res = runDFS(level, startNode, endNode);
    } else {
        res = runDijkstra(level, startNode, endNode);
    }
    setResult(res);

    // Visualizer Loop
    for (const log of res.logs) {
        await new Promise(r => setTimeout(r, 600)); // Delay for visual effect
        setDisplayLog(prev => [...prev, log]);
        if (log.activeNode) setActiveNode(log.activeNode);
        if (log.visitedNodes) setVisitedNodes(log.visitedNodes);
    }

    if (res.success) {
        setFinalPath(res.path);
    }
    setIsRunning(false);
  };

  const getNodeColor = (nodeId: string) => {
      if (activeNode === nodeId) return 'bg-yellow-400 border-yellow-600 scale-125 shadow-[0_0_15px_yellow]';
      if (finalPath.includes(nodeId)) return 'bg-green-500 border-green-700 shadow-[0_0_10px_lime]';
      if (nodeId === startNode) return 'bg-blue-500 border-blue-700';
      if (nodeId === endNode) return 'bg-red-500 border-red-700';
      if (visitedNodes.includes(nodeId)) return 'bg-gray-500 border-gray-600 opacity-80';
      return 'bg-gray-800 border-gray-600';
  };

  const changeLevel = (delta: number) => {
      const next = Math.max(1, Math.min(50, levelId + delta));
      setLevelId(next);
  };

  return (
    <div className="flex h-full bg-gray-900 text-gray-100 font-mono overflow-hidden">
        
        {/* SIDEBAR CONTROLS */}
        <div className="w-80 flex flex-col border-r border-gray-800 bg-gray-950 z-10 shadow-xl">
            <div className="p-6 border-b border-gray-800">
                <button onClick={onBack} className="text-xs text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-1">
                    <ChevronLeft size={12}/> MENU
                </button>
                <h1 className="text-xl font-bold text-white mb-1">Graph Quest</h1>
                <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>Level {level.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${level.isWeighted ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>
                        {level.isWeighted ? 'WEIGHTED' : 'UNWEIGHTED'}
                    </span>
                </div>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                {/* Nodes Selection */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase">Configuration</label>
                    <div className="flex gap-2 items-center bg-gray-900 p-3 rounded border border-gray-800">
                        <MapPin size={16} className="text-blue-500"/>
                        <div className="flex-1">
                            <div className="text-[10px] text-gray-500">START</div>
                            <div className="font-bold text-blue-400">{startNode}</div>
                        </div>
                        <div className="text-gray-600">→</div>
                        <div className="flex-1 text-right">
                            <div className="text-[10px] text-gray-500">TARGET</div>
                            <div className="font-bold text-red-400">{endNode}</div>
                        </div>
                        <Target size={16} className="text-red-500"/>
                    </div>
                    <p className="text-[10px] text-gray-500 italic">Click nodes on the graph to set Start/Target.</p>
                </div>

                {/* Algorithm Selection */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase">Algorithm</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={() => setSelectedAlgo('DFS')}
                            className={`p-2 text-xs font-bold rounded border transition-all ${selectedAlgo === 'DFS' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800'}`}
                        >
                            DFS
                        </button>
                        <button 
                            onClick={() => setSelectedAlgo('DIJKSTRA')}
                            className={`p-2 text-xs font-bold rounded border transition-all ${selectedAlgo === 'DIJKSTRA' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800'}`}
                        >
                            Dijkstra
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 border-l-2 border-gray-700 pl-2">
                        {selectedAlgo === 'DFS' 
                            ? "Depth-First Search: Explores as far as possible along each branch before backtracking. Good for reachability." 
                            : "Dijkstra's Algo: Finds the shortest path in weighted graphs using a priority queue."}
                    </p>
                </div>

                {/* Console */}
                <div className="flex-1 flex flex-col min-h-[200px] bg-black rounded border border-gray-800 font-mono text-xs">
                    <div className="bg-gray-800 px-3 py-1 text-gray-400 font-bold flex items-center gap-2">
                        <BookOpen size={12}/> EXECUTION LOG
                    </div>
                    <div className="flex-1 p-2 overflow-y-auto space-y-1 custom-scrollbar">
                        {displayLog.length === 0 && <span className="text-gray-600 italic">Ready to run...</span>}
                        {displayLog.map((log, i) => (
                            <div key={i} className="border-b border-gray-900 pb-1 mb-1">
                                <span className="text-green-500 mr-2">[{log.step}]</span>
                                <span className="text-gray-300">{log.message}</span>
                            </div>
                        ))}
                        <div ref={logEndRef} />
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-900 flex gap-3">
                <button onClick={resetState} className="p-3 bg-gray-800 rounded hover:bg-gray-700 text-white">
                    <RotateCcw size={20} />
                </button>
                <button 
                    onClick={handleRun} 
                    disabled={isRunning}
                    className={`flex-1 flex items-center justify-center gap-2 font-bold rounded shadow-lg transition-all
                        ${isRunning ? 'bg-gray-700 cursor-wait' : 'bg-green-600 hover:bg-green-500 text-white'}
                    `}
                >
                    <Play size={20} fill={isRunning ? "gray" : "white"} />
                    {isRunning ? 'RUNNING...' : 'RUN ALGO'}
                </button>
            </div>
        </div>

        {/* MAIN VISUALIZATION AREA */}
        <div className="flex-1 flex flex-col relative bg-gray-900">
            {/* Header Navigation */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button onClick={() => changeLevel(-1)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 border border-gray-700"><ChevronLeft size={20}/></button>
                <button onClick={() => changeLevel(1)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 border border-gray-700"><ChevronRight size={20}/></button>
            </div>

            <div className="absolute top-4 left-8 z-20">
                 <h2 className="text-2xl font-bold text-white opacity-20 select-none">MODE 5</h2>
            </div>

            {/* Graph SVG Canvas */}
            <div className="flex-1 relative overflow-hidden bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px]">
                <svg className="w-full h-full">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
                        </marker>
                    </defs>
                    
                    {/* Edges */}
                    {level.edges.map((edge, i) => {
                        const n1 = level.nodes.find(n => n.id === edge.from)!;
                        const n2 = level.nodes.find(n => n.id === edge.to)!;
                        
                        const isPathEdge = finalPath.length > 1 && finalPath.includes(edge.from) && finalPath.includes(edge.to) && 
                                           Math.abs(finalPath.indexOf(edge.from) - finalPath.indexOf(edge.to)) === 1;

                        return (
                            <g key={i}>
                                <line 
                                    x1={`${n1.x}%`} y1={`${n1.y}%`} 
                                    x2={`${n2.x}%`} y2={`${n2.y}%`} 
                                    stroke={isPathEdge ? "#22c55e" : "#4B5563"} 
                                    strokeWidth={isPathEdge ? "4" : "2"}
                                    className="transition-all duration-500"
                                />
                                {/* Weight Label */}
                                {level.isWeighted && (
                                    <rect 
                                        x={`${(n1.x + n2.x) / 2 - 1.5}%`} 
                                        y={`${(n1.y + n2.y) / 2 - 1.5}%`} 
                                        width="3%" height="3%" 
                                        fill="#111827" 
                                        rx="4"
                                    />
                                )}
                                {level.isWeighted && (
                                    <text 
                                        x={`${(n1.x + n2.x) / 2}%`} 
                                        y={`${(n1.y + n2.y) / 2}%`} 
                                        fill={isPathEdge ? "#4ade80" : "#9CA3AF"}
                                        fontSize="12" 
                                        fontWeight="bold"
                                        textAnchor="middle" 
                                        alignmentBaseline="middle"
                                    >
                                        {edge.weight}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Nodes (HTML Overlay for interaction) */}
                {level.nodes.map(node => (
                    <button
                        key={node.id}
                        onClick={() => {
                            if (!isRunning) {
                                // Toggle logic: First click Start, Second click End, or explicit override
                                if (startNode !== node.id && endNode !== node.id) setEndNode(node.id);
                                else if (endNode === node.id) setEndNode(node.id); // No op
                                else setStartNode(node.id);
                            }
                        }}
                        className={`
                            absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center font-bold text-white text-lg border-4 shadow-lg transition-all duration-300 z-10
                            ${getNodeColor(node.id)}
                        `}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        {node.id}
                        {/* Distance Label (Dijkstra) */}
                        {result?.distance !== undefined && finalPath.includes(node.id) && node.id === endNode && (
                             <div className="absolute -bottom-8 bg-black px-2 py-0.5 rounded text-[10px] text-green-400 border border-green-800 whitespace-nowrap">
                                 Dist: {result.distance}
                             </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};
