import { AlgoGameState, CommandType, Direction, AlgoLevelConfig, Position, CellType } from '../types';

// Helpers
const getNextPosition = (pos: Position, dir: Direction): Position => {
  switch (dir) {
    case Direction.UP: return { x: pos.x, y: pos.y - 1 };
    case Direction.RIGHT: return { x: pos.x + 1, y: pos.y };
    case Direction.DOWN: return { x: pos.x, y: pos.y + 1 };
    case Direction.LEFT: return { x: pos.x - 1, y: pos.y };
  }
};

const isPositionValid = (pos: Position, grid: any[][]) => {
  return pos.y >= 0 && pos.y < grid.length && pos.x >= 0 && pos.x < grid[0].length;
};

export const initializeAlgoGame = (level: AlgoLevelConfig): AlgoGameState => {
  // Parse grid string to object grid
  const grid = level.gridStr.map(row => 
    row.split('').map(char => ({
      type: char === '#' ? CellType.WALL : CellType.EMPTY,
      hasStar: char === '*' || char === 'S',
    }))
  );

  let totalStars = 0;
  grid.forEach(row => row.forEach(cell => { if (cell.hasStar) totalStars++; }));

  return {
    levelId: level.id,
    grid,
    agentPos: { ...level.startPos },
    agentDir: level.startDir,
    starsCollected: 0,
    totalStars,
    status: 'IDLE',
    executionStack: [],
    program: {
      MAIN: [],
      F1: [],
      F2: [],
    },
    speed: 500,
    stepCount: 0,
    error: null,
  };
};

export const resetAlgoSimulation = (currentState: AlgoGameState, level: AlgoLevelConfig): AlgoGameState => {
   const initialState = initializeAlgoGame(level);
   initialState.program = currentState.program;
   initialState.speed = currentState.speed;
   return initialState;
};

export const stepAlgoGame = (state: AlgoGameState): AlgoGameState => {
  if (state.status !== 'RUNNING') return state;

  if (state.starsCollected === state.totalStars) {
    return { ...state, status: 'WON' };
  }

  let newStack = [...state.executionStack];
  
  if (newStack.length === 0) {
      return { ...state, status: 'IDLE' };
  }

  const frame = newStack[newStack.length - 1];
  
  if (frame.pc >= frame.commands.length) {
    newStack.pop();
    if (newStack.length === 0) {
       return { 
         ...state, 
         executionStack: [], 
         status: state.starsCollected === state.totalStars ? 'WON' : 'LOST',
         error: state.starsCollected !== state.totalStars ? "Program ended, stars remain." : null
       };
    }
    return { ...state, executionStack: newStack };
  }

  const command = frame.commands[frame.pc];
  const nextFrame = { ...frame, pc: frame.pc + 1 };
  newStack[newStack.length - 1] = nextFrame;

  let newPos = { ...state.agentPos };
  let newDir = state.agentDir;
  let newGrid = state.grid.map(row => row.map(cell => ({...cell})));
  let newStars = state.starsCollected;
  let error = null;

  switch (command) {
    case CommandType.MOVE:
      const nextPos = getNextPosition(newPos, newDir);
      if (!isPositionValid(nextPos, newGrid)) {
        return { ...state, status: 'LOST', error: "Agent fell off grid!" };
      }
      if (newGrid[nextPos.y][nextPos.x].type === CellType.WALL) {
        return { ...state, status: 'LOST', error: "Hit a wall!" };
      }
      newPos = nextPos;
      break;
      
    case CommandType.LEFT:
      newDir = (newDir - 1 + 4) % 4;
      break;
      
    case CommandType.RIGHT:
      newDir = (newDir + 1) % 4;
      break;
      
    case CommandType.ACTION:
      if (newGrid[newPos.y][newPos.x].hasStar) {
        newGrid[newPos.y][newPos.x].hasStar = false;
        newGrid[newPos.y][newPos.x].type = CellType.PAINTED;
        newStars++;
      }
      break;
      
    case CommandType.F1:
      if (state.program.F1.length === 0) break;
      if (newStack.length > 50) return { ...state, status: 'LOST', error: "Stack Overflow!" };
      newStack.push({ commands: state.program.F1, pc: 0, source: 'F1' });
      break;
      
    case CommandType.F2:
      if (state.program.F2.length === 0) break;
      if (newStack.length > 50) return { ...state, status: 'LOST', error: "Stack Overflow!" };
      newStack.push({ commands: state.program.F2, pc: 0, source: 'F2' });
      break;
  }

  const status = (newStars === state.totalStars && newStack.length === 0) ? 'WON' : state.status;

  return {
    ...state,
    grid: newGrid,
    agentPos: newPos,
    agentDir: newDir,
    starsCollected: newStars,
    executionStack: newStack,
    stepCount: state.stepCount + 1,
    status,
    error
  };
};
