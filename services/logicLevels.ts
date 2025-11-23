import { ZebraLevel, BooleanLevel, TangramLevel, NPuzzleLevel } from '../types';

// --- ZEBRA LEVELS ---
export const ZEBRA_LEVELS: ZebraLevel[] = [];
for (let i = 1; i <= 50; i++) {
    ZEBRA_LEVELS.push({
        id: i,
        categories: ['Color', 'Pet'],
        items: [['Red', 'Blue'], ['Dog', 'Cat']],
        clues: ['The Red house has a Dog.'],
        solution: {'Red': 'Dog', 'Blue': 'Cat'}
    });
}
export const getZebraLevel = (id: number) => ZEBRA_LEVELS[id-1] || ZEBRA_LEVELS[0];

// --- BOOLEAN LEVELS ---
export const BOOLEAN_LEVELS: BooleanLevel[] = [];
for (let i = 1; i <= 50; i++) {
    BOOLEAN_LEVELS.push({
        id: i,
        inputs: [0, 1, 1, 0],
        expectedOutput: i % 2,
        availableGates: ['AND', 'OR', 'NOT', 'XOR']
    });
}
export const getBooleanLevel = (id: number) => BOOLEAN_LEVELS[id-1] || BOOLEAN_LEVELS[0];

// --- TANGRAM LEVELS ---
export const TANGRAM_LEVELS: TangramLevel[] = [];
for (let i = 1; i <= 50; i++) {
    TANGRAM_LEVELS.push({
        id: i,
        gridShape: [[1,1],[1,1]], // Square target
        pieces: [[[1,1]], [[1,1]]] // Two 2x1 pieces
    });
}
export const getTangramLevel = (id: number) => TANGRAM_LEVELS[id-1] || TANGRAM_LEVELS[0];

// --- N-PUZZLE LEVELS ---
export const NPUZZLE_LEVELS: NPuzzleLevel[] = [];
for (let i = 1; i <= 50; i++) {
    NPUZZLE_LEVELS.push({
        id: i,
        size: 3 + Math.floor(i/20), // 3x3 then 4x4
        scrambleMoves: 5 + i * 2
    });
}
export const getNPuzzleLevel = (id: number) => NPUZZLE_LEVELS[id-1] || NPUZZLE_LEVELS[0];
