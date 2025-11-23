import { BashLevelConfig, VirtualDir } from '../types';

export const BASH_LEVELS: BashLevelConfig[] = [];

const createFS = (): VirtualDir => ({
  type: 'DIR',
  children: {
    'home': {
      type: 'DIR',
      children: {
        'user': {
          type: 'DIR',
          children: {
            'notes.txt': { type: 'FILE', content: 'Secret is: 42' },
            'trash': { type: 'DIR', children: {} }
          }
        }
      }
    },
    'bin': { type: 'DIR', children: {} }
  }
});

// 1-10: Navigation
BASH_LEVELS.push({
  id: 1,
  name: "Where am I?",
  task: "List the files in the current directory.",
  fileSystem: createFS(),
  targetCondition: (fs, hist) => hist.some(line => line.includes('ls'))
});

BASH_LEVELS.push({
  id: 2,
  name: "Go Home",
  task: "Navigate to /home/user.",
  fileSystem: createFS(),
  targetCondition: (fs, hist) => hist.some(line => line.includes('cd home/user') || line.includes('cd /home/user'))
});

// 11-50: Filler
for (let i = 3; i <= 50; i++) {
  BASH_LEVELS.push({
    id: i,
    name: `Mission ${i}`,
    task: "Find the file containing '42' and read it.",
    fileSystem: createFS(),
    targetCondition: (fs, hist) => hist.some(line => line.includes('cat') && line.includes('notes.txt'))
  });
}

export const getBashLevel = (id: number) => BASH_LEVELS.find(l => l.id === id) || BASH_LEVELS[0];
