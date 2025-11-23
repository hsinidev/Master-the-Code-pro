import React, { useState, useEffect, useRef } from 'react';
import { BASH_LEVELS, getBashLevel } from '../services/bashLevelData';
import { VirtualDir, VirtualFile } from '../types';

export const ShellScriptScramble: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [levelId, setLevelId] = useState(1);
  const level = getBashLevel(levelId);
  
  const [history, setHistory] = useState<string[]>(["Welcome to 42 Shell. Type 'help' for commands."]);
  const [input, setInput] = useState("");
  const [cwdPath, setCwdPath] = useState<string[]>(['home', 'user']);
  // In a real app, we would deep copy level.fileSystem here to maintain state
  const [fs] = useState(level.fileSystem); 
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const newHistory = [...history, `user@42box: /${cwdPath.join('/')} $ ${cmd}`];

    // Minimal parser
    const parts = cmd.split(' ');
    const bin = parts[0];
    const args = parts.slice(1);

    let output = "";

    if (bin === 'help') output = "Available: ls, cd, cat, pwd, clear";
    else if (bin === 'clear') { setHistory([]); setInput(""); return; }
    else if (bin === 'pwd') output = "/" + cwdPath.join('/');
    else if (bin === 'ls') {
        // Traverse to cwd
        let curr: any = fs;
        for(const p of cwdPath) { curr = curr.children[p]; }
        output = Object.keys(curr.children).join('  ');
    }
    else if (bin === 'cd') {
        if (!args[0]) output = "";
        else if (args[0] === '..') {
            if (cwdPath.length > 0) setCwdPath(prev => prev.slice(0, -1));
        } else {
            // Very naive cd
             let curr: any = fs;
             for(const p of cwdPath) { curr = curr.children[p]; }
             if (curr.children[args[0]] && curr.children[args[0]].type === 'DIR') {
                 setCwdPath(prev => [...prev, args[0]]);
             } else {
                 output = `cd: ${args[0]}: No such file or directory`;
             }
        }
    }
    else if (bin === 'cat') {
        let curr: any = fs;
        for(const p of cwdPath) { curr = curr.children[p]; }
        const file = curr.children[args[0]];
        if (file && file.type === 'FILE') output = file.content;
        else output = `cat: ${args[0]}: No such file`;
    }
    else {
        output = `bash: ${bin}: command not found`;
    }

    if (output) newHistory.push(output);
    setHistory(newHistory);
    setInput("");

    // Check win
    if (level.targetCondition(fs, newHistory)) {
        setTimeout(() => {
            setHistory(prev => [...prev, `>>> SUCCESS! Level ${levelId} Complete. <<<`]);
            setTimeout(() => setLevelId(prev => Math.min(50, prev + 1)), 1500);
        }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-green-500 font-mono p-4">
        <div className="flex justify-between border-b border-green-900 pb-2 mb-2">
             <button onClick={onBack} className="hover:text-white">&lt; EXIT</button>
             <div>LEVEL {levelId}: {level.name}</div>
             <div className="text-xs text-gray-500">{level.task}</div>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-1 p-2" onClick={() => document.getElementById('term-input')?.focus()}>
            {history.map((line, i) => (
                <div key={i} className="break-all whitespace-pre-wrap">{line}</div>
            ))}
            <div ref={endRef} />
        </div>

        <form onSubmit={handleCommand} className="flex gap-2 mt-2 bg-gray-900 p-2 rounded">
            <span className="text-green-300 font-bold">$</span>
            <input 
                id="term-input"
                className="flex-1 bg-transparent outline-none text-white" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                autoFocus
                autoComplete="off"
            />
        </form>
    </div>
  );
};
