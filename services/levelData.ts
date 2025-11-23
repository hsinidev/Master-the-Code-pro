import { AlgoLevelConfig, Direction } from '../types';

const parseLevel = (
  id: number,
  name: string,
  gridAscii: string[],
  startPos: { x: number; y: number },
  startDir: Direction,
  funcs: ('F1' | 'F2')[],
  description: string,
  maxMain: number = 12,
  maxFunc: number = 8
): AlgoLevelConfig => ({
  id,
  name,
  gridStr: gridAscii,
  startPos,
  startDir,
  availableFunctions: funcs,
  maxMainCommands: maxMain,
  maxFuncCommands: maxFunc,
  description,
});

export const ALGO_LEVELS: AlgoLevelConfig[] = [];

// Basics - Updated Level 1 to include F1/F2 for testing purposes
ALGO_LEVELS.push(parseLevel(1, "Hello World", [".......", "...*...", "......."], { x: 3, y: 2 }, Direction.UP, ['F1', 'F2'], "Move forward and collect."));
ALGO_LEVELS.push(parseLevel(2, "Turn Left", [".......", ".*.....", "......."], { x: 4, y: 1 }, Direction.LEFT, ['F1', 'F2'], "Turn and move."));
ALGO_LEVELS.push(parseLevel(3, "Zig Zag", ["..*....", ".......", "....*.."], { x: 2, y: 2 }, Direction.UP, ['F1', 'F2'], "Collect all stars."));
ALGO_LEVELS.push(parseLevel(4, "The Box", ["#####", "#.*.#", "#. .#", "#####"], { x: 2, y: 2 }, Direction.RIGHT, ['F1', 'F2'], "Avoid walls."));
ALGO_LEVELS.push(parseLevel(5, "Obstacle", ["..*..", ".###.", ".#.#."], { x: 2, y: 2 }, Direction.DOWN, ['F1', 'F2'], "Go around."));

// Functions
ALGO_LEVELS.push(parseLevel(6, "Func Intro", [".*.*.*."], { x: 0, y: 0 }, Direction.RIGHT, ['F1'], "Use F1 to repeat.", 4));
ALGO_LEVELS.push(parseLevel(7, "Stairs", ["....*", "...*.", "..*.."], { x: 0, y: 2 }, Direction.RIGHT, ['F1'], "Climb up."));
ALGO_LEVELS.push(parseLevel(8, "Long Haul", ["*.........*"], { x: 5, y: 0 }, Direction.LEFT, ['F1'], "Back and forth."));
ALGO_LEVELS.push(parseLevel(9, "Square", ["*****.", "*...*.", "*****."], { x: 0, y: 2 }, Direction.UP, ['F1'], "Loop the loop."));
ALGO_LEVELS.push(parseLevel(10, "Spiral", ["*****", "*...*", "*.S.*", "*****"], { x: 0, y: 3 }, Direction.UP, ['F1'], "Spiral in."));

// Nested
ALGO_LEVELS.push(parseLevel(11, "Recursion", ["*.*.*.*"], { x: 0, y: 0 }, Direction.RIGHT, ['F1'], "Call F1 in F1.", 1));
ALGO_LEVELS.push(parseLevel(12, "Shift", ["*...*...*", ".........", "*...*...*"], { x: 0, y: 1 }, Direction.RIGHT, ['F1', 'F2'], "Rows."));
ALGO_LEVELS.push(parseLevel(13, "Grid Clear", ["*.*.*", ".....", "*.*.*"], { x: 0, y: 0 }, Direction.RIGHT, ['F1', 'F2'], "Clean up."));
ALGO_LEVELS.push(parseLevel(14, "Snake", ["*****", ".....", "*****"], { x: 0, y: 0 }, Direction.RIGHT, ['F1', 'F2'], "Slither."));
ALGO_LEVELS.push(parseLevel(15, "Corners", ["*...*", ".....", "*...*"], { x: 2, y: 1 }, Direction.UP, ['F1', 'F2'], "All 4 corners."));

// Procedural filler for 16-40
for (let i = 16; i <= 40; i++) {
    const size = 5 + (i % 5);
    let row = "*".repeat(size);
    ALGO_LEVELS.push(parseLevel(i, `Training ${i}`, [row, row, row], {x:0, y:0}, Direction.RIGHT, ['F1', 'F2'], "Optimize code size."));
}

// Advanced
ALGO_LEVELS.push(parseLevel(41, "Num 4", ["*..*", "*..*", "****", "...*", "...*"], {x:4, y:4}, Direction.UP, ['F1','F2'], "Draw 4"));
ALGO_LEVELS.push(parseLevel(42, "Num 2", ["****", "...*", "****", "*...", "****"], {x:0, y:4}, Direction.RIGHT, ['F1','F2'], "Draw 2"));
ALGO_LEVELS.push(parseLevel(43, "Maze 1", ["*.*.*", ".*.*.", "*.*.*"], {x:0,y:0}, Direction.RIGHT, ['F1','F2'], "Complex path."));
ALGO_LEVELS.push(parseLevel(44, "Tree", ["..*..", ".*.*.", "*...*"], {x:2, y:0}, Direction.DOWN, ['F1','F2'], "Binary traversal."));
ALGO_LEVELS.push(parseLevel(45, "Spiral 2", ["*****","*...*","*.S.*"], {x:0,y:0}, Direction.RIGHT, ['F1','F2'], "Tight spiral."));

for (let i = 46; i <= 50; i++) {
  ALGO_LEVELS.push(parseLevel(i, `Mastery ${i}`, ["*******", "*.....*", "*******"], {x:0, y:0}, Direction.RIGHT, ['F1', 'F2'], "Final exams."));
}

export const getAlgoLevel = (id: number) => ALGO_LEVELS.find(l => l.id === id) || ALGO_LEVELS[0];