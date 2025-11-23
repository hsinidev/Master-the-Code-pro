
export enum GameMode {
  ALGO = 'ALGO',
  NET = 'NET',
  STRUCT = 'STRUCT',
  BASH = 'BASH',
  GRAPH = 'GRAPH',
  DP_GRID = 'DP_GRID',
  NUM_THEORY = 'NUM_THEORY',
  SORTING = 'SORTING',
  DEADLOCK = 'DEADLOCK',
  PIPELINE = 'PIPELINE',
  ZEBRA = 'ZEBRA',
  BOOLEAN = 'BOOLEAN',
  TANGRAM = 'TANGRAM',
  N_PUZZLE = 'N_PUZZLE',
}

// --- MODE 1: ALGORITHMIC PATH ---
export enum Direction { UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3 }
export enum CellType { EMPTY = 0, WALL = 1, STAR = 2, PAINTED = 3 }
export enum CommandType { MOVE = 'MOVE', LEFT = 'LEFT', RIGHT = 'RIGHT', ACTION = 'ACTION', F1 = 'F1', F2 = 'F2' }

export interface GridCell { type: CellType; hasStar: boolean; }
export interface Position { x: number; y: number; }

export interface AlgoLevelConfig {
  id: number; 
  name: string; 
  gridStr: string[]; 
  startPos: Position; 
  startDir: Direction; 
  availableFunctions: ('F1' | 'F2')[]; 
  maxMainCommands: number; 
  maxFuncCommands: number; 
  description: string;
}

export interface AlgoGameState {
  levelId: number; 
  grid: GridCell[][]; 
  agentPos: Position; 
  agentDir: Direction; 
  starsCollected: number; 
  totalStars: number; 
  status: 'IDLE' | 'RUNNING' | 'PAUSED' | 'WON' | 'LOST'; 
  executionStack: ExecutionFrame[]; 
  program: { MAIN: CommandType[]; F1: CommandType[]; F2: CommandType[]; }; 
  speed: number; 
  stepCount: number; 
  error: string | null;
}

export interface ExecutionFrame { commands: CommandType[]; pc: number; source: 'MAIN' | 'F1' | 'F2'; }

// Drag and Drop Types
export interface DragPayload {
  type: CommandType;
  source?: 'PALETTE' | 'SLOT'; // To distinguish new items vs reordering
  originSlot?: { list: 'MAIN' | 'F1' | 'F2', index: number };
}

// --- MODE 2: NETWORK CONFIG ---
export interface NetLevelConfig { id: number; name: string; topology: 'LAN_SIMPLE' | 'LAN_ROUTED' | 'WAN'; nodes: NetNode[]; goal: string; description: string; }
export interface NetNode { id: string; type: 'PC' | 'ROUTER' | 'SWITCH'; label: string; lockedConfig?: { ip?: string; subnet?: string; gateway?: string }; }

// --- MODE 3: DATA STRUCTURE DUEL ---
export interface StructLevelConfig { id: number; title: string; scenario: string; options: string[]; correctOption: string; constraints: { [key: string]: string }; explanation: string; }

// --- MODE 4: SHELL SCRIPT SCRAMBLE ---
export interface BashLevelConfig { id: number; name: string; task: string; fileSystem: VirtualDir; targetCondition: (fs: VirtualDir, outputHistory: string[]) => boolean; }
export interface VirtualFile { type: 'FILE'; content: string; }
export interface VirtualDir { type: 'DIR'; children: { [name: string]: VirtualFile | VirtualDir }; }

// --- MODE 5: GRAPH THEORY QUEST ---
export interface GraphNode { id: string; x: number; y: number; } // x,y in percentage (0-100)
export interface GraphEdge { from: string; to: string; weight: number; }

export interface GraphLevel { 
    id: number; 
    isWeighted: boolean;
    nodes: GraphNode[]; 
    edges: GraphEdge[]; 
    recommendedAlgo: 'DFS' | 'DIJKSTRA'; 
    description: string;
}

export interface AlgorithmLog {
    step: number;
    message: string;
    activeNode?: string;
    visitedNodes: string[];
}

export interface GraphAlgorithmResult {
    path: string[]; // Array of Node IDs
    logs: AlgorithmLog[];
    distance?: number;
    success: boolean;
}

// --- MODE 6: DYNAMIC GRID PLANNER ---
export interface DPCoordinate { r: number; c: number; }

export interface DPLevelConfig {
    id: number;
    name: string;
    grid: number[][]; // The reward/cost matrix
    start: DPCoordinate;
    end: DPCoordinate;
    description: string;
}

export interface DPResult {
    maxScore: number;
    optimalPath: DPCoordinate[];
    dpTable: number[][]; // The memoization table for visualization
}

// --- OTHER MODES TYPES (Placeholders) ---
export interface NumLevel { id: number; question: string; answer: string; hint: string; }
export interface SortLevel { id: number; initialArr: number[]; algorithm: 'BUBBLE' | 'SELECTION'; maxSwaps: number; }
export interface DeadlockLevel { id: number; resources: string[]; threads: {id: string, instructions: string[]}[]; goal: 'DEADLOCK' | 'SAFE'; }
export interface PipelineLevel { id: number; stages: string[]; incomingData: number; bufferSize: number; targetThroughput: number; }
export interface ZebraLevel { id: number; categories: string[]; items: string[][]; clues: string[]; solution: {[key: string]: string}; }
export interface BooleanLevel { id: number; inputs: number[]; expectedOutput: number; availableGates: ('AND'|'OR'|'NOT'|'XOR')[]; }
export interface TangramLevel { id: number; gridShape: number[][]; pieces: number[][][]; }
export interface NPuzzleLevel { id: number; size: number; scrambleMoves: number; }
