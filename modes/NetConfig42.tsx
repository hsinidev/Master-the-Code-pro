import React, { useState } from 'react';
import { NET_LEVELS, getNetLevel } from '../services/netLevelData';
import { Monitor, Router as RouterIcon, Server, Network } from 'lucide-react';

export const NetConfig42: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getNetLevel(levelId);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [logs, setLogs] = useState<string[]>([]);

  const runTest = () => {
    setLogs(prev => [...prev, "> Running connectivity test..."]);
    // Very basic simulation logic for demo purposes
    // In a real app, we'd parse IPs and Masks bitwise.
    // Here we simulate "Success" if the inputs match a hidden "correct" pattern or are just filled.
    
    // For Level 1: PC1 needs 192.168.1.x and Mask 255.255.255.0
    let success = false;
    const ip = inputs['PC1-IP'];
    const mask = inputs['PC1-MASK'];
    
    if (ip && mask) {
        if (ip.startsWith('192.168.1.') && mask === '255.255.255.0') {
            success = true;
        }
    }

    setTimeout(() => {
        if (success) {
            setLogs(prev => [...prev, `> SUCCESS: PC1 can reach PC2.`, `> Level ${levelId} Complete.`]);
        } else {
            setLogs(prev => [...prev, `> FAIL: Destination Unreachable.`]);
        }
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-green-400 font-mono p-4">
        <div className="flex justify-between items-center mb-4 border-b border-green-800 pb-2">
            <button onClick={onBack}>&lt; MENU</button>
            <h2 className="text-xl font-bold">NET_CONFIG_42 // LEVEL {levelId}</h2>
            <div className="flex gap-2">
                <button onClick={() => setLevelId(Math.max(1, levelId - 1))}>PREV</button>
                <button onClick={() => setLevelId(Math.min(50, levelId + 1))}>NEXT</button>
            </div>
        </div>

        <div className="flex-1 flex gap-4">
            {/* Diagram */}
            <div className="flex-1 bg-black border border-green-800 p-4 relative">
                <h3 className="text-white mb-4 border-b border-gray-800">TOPOLOGY</h3>
                <div className="flex justify-around items-center h-64">
                    {level.nodes.map((node, i) => (
                        <div key={node.id} className="flex flex-col items-center gap-2">
                            <div className="p-4 border-2 border-green-600 rounded bg-green-900/20">
                                {node.type === 'PC' && <Monitor size={32} />}
                                {node.type === 'ROUTER' && <RouterIcon size={32} />}
                                {node.type === 'SWITCH' && <Network size={32} />}
                            </div>
                            <span className="text-sm font-bold bg-black px-2">{node.label}</span>
                            <span className="text-xs text-gray-500">{node.id}</span>
                            {node.lockedConfig && <div className="text-xs text-gray-400">{node.lockedConfig.ip}</div>}
                        </div>
                    ))}
                    {/* CSS lines connecting them would go here */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-900 -z-10" />
                </div>
                <div className="mt-4 text-gray-400 text-sm">
                    GOAL: {level.goal} <br/>
                    HINT: {level.description}
                </div>
            </div>

            {/* Console */}
            <div className="w-96 bg-gray-800 p-4 flex flex-col">
                <h3 className="text-white mb-4">CONFIGURATION</h3>
                <div className="space-y-4 flex-1 overflow-y-auto">
                    {level.nodes.filter(n => !n.lockedConfig).map(node => (
                        <div key={node.id} className="bg-black p-3 rounded border border-gray-700">
                            <div className="text-white font-bold mb-2">{node.id} Config</div>
                            <div className="space-y-2">
                                <label className="block text-xs">IP Address</label>
                                <input 
                                    className="w-full bg-gray-900 border border-green-700 p-1 text-white" 
                                    placeholder="x.x.x.x"
                                    value={inputs[`${node.id}-IP`] || ''}
                                    onChange={(e) => setInputs({...inputs, [`${node.id}-IP`]: e.target.value})}
                                />
                                <label className="block text-xs">Subnet Mask</label>
                                <input 
                                    className="w-full bg-gray-900 border border-green-700 p-1 text-white" 
                                    placeholder="255.255.255.0"
                                    value={inputs[`${node.id}-MASK`] || ''}
                                    onChange={(e) => setInputs({...inputs, [`${node.id}-MASK`]: e.target.value})}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 h-32 bg-black border border-gray-700 p-2 overflow-y-auto text-xs font-mono">
                    {logs.map((l, i) => <div key={i}>{l}</div>)}
                </div>
                <button onClick={runTest} className="mt-2 w-full bg-green-700 text-white py-2 font-bold hover:bg-green-600">
                    APPLY & TEST
                </button>
            </div>
        </div>
    </div>
  );
};
