
import { DPLevelConfig } from '../types';

export const DP_LEVELS: DPLevelConfig[] = [];

/**
 * Procedurally generates levels based on difficulty tiers.
 */
const generateDPLevel = (id: number): DPLevelConfig => {
    let rows, cols, minVal, maxVal, description, name;

    // TIER 1: Intro (Levels 1-15) - Small, Positive Only
    if (id <= 15) {
        rows = 4 + Math.floor(id / 5); // 4x4 to 7x7
        cols = rows;
        minVal = 1;
        maxVal = 10;
        name = `Route Basics ${id}`;
        description = "Maximize your score. All rewards are positive.";
    } 
    // TIER 2: Intermediate (Levels 16-30) - Medium, Negative Penalties introduced
    else if (id <= 30) {
        rows = 6 + Math.floor((id - 15) / 5); // 6x6 to 9x9
        cols = rows;
        minVal = -5;
        maxVal = 15;
        name = `Risk Management ${id}`;
        description = "Beware of red cells! They reduce your total score.";
    } 
    // TIER 3: Advanced (Levels 31-50) - Large, High Variance
    else {
        rows = 8 + Math.floor((id - 30) / 5); // 8x8 to 12x12
        // Cap size to 12x12 for UI usability on standard screens
        if (rows > 12) rows = 12; 
        cols = rows;
        minVal = -20;
        maxVal = 20;
        name = `Optimizer's Hell ${id}`;
        description = "Complex landscape. Think like an algorithm.";
    }

    const grid: number[][] = [];
    for (let r = 0; r < rows; r++) {
        const row: number[] = [];
        for (let c = 0; c < cols; c++) {
            // Generate random integer inclusive
            let val = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
            // Ensure Start and End aren't too punishing
            if ((r === 0 && c === 0) || (r === rows-1 && c === cols-1)) {
                val = Math.abs(val); 
            }
            row.push(val);
        }
        grid.push(row);
    }

    return {
        id,
        name,
        grid,
        start: { r: 0, c: 0 },
        end: { r: rows - 1, c: cols - 1 },
        description
    };
};

// Generate all 50
for (let i = 1; i <= 50; i++) {
    DP_LEVELS.push(generateDPLevel(i));
}

export const getDPLevel = (id: number) => DP_LEVELS[id - 1] || DP_LEVELS[0];
