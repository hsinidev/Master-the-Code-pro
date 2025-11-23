
import { DPLevelConfig, DPResult, DPCoordinate } from '../types';

/**
 * Solves the Max Path Sum problem on a grid allowing only RIGHT and DOWN moves.
 * Uses Bottom-Up Dynamic Programming (Tabulation).
 * Time Complexity: O(N * M)
 * Space Complexity: O(N * M)
 */
export const solveDPGrid = (level: DPLevelConfig): DPResult => {
    const rows = level.grid.length;
    const cols = level.grid[0].length;
    
    // Initialize DP Table and Parent Pointer Table (for path reconstruction)
    const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity));
    const parent: (('TOP' | 'LEFT' | null)[][]) = Array.from({ length: rows }, () => Array(cols).fill(null));

    // Base Case: Start position
    dp[0][0] = level.grid[0][0];

    // Fill DP Table
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r === 0 && c === 0) continue;

            const currentVal = level.grid[r][c];
            
            // Option 1: Coming from Top
            let fromTop = -Infinity;
            if (r > 0) {
                fromTop = dp[r - 1][c];
            }

            // Option 2: Coming from Left
            let fromLeft = -Infinity;
            if (c > 0) {
                fromLeft = dp[r][c - 1];
            }

            // Transition Logic: Pick the max
            if (fromTop > fromLeft) {
                dp[r][c] = currentVal + fromTop;
                parent[r][c] = 'TOP';
            } else {
                dp[r][c] = currentVal + fromLeft;
                parent[r][c] = 'LEFT';
            }
        }
    }

    // Reconstruct Optimal Path (Backtracking)
    const optimalPath: DPCoordinate[] = [];
    let currR = rows - 1;
    let currC = cols - 1;

    while (currR >= 0 && currC >= 0) {
        optimalPath.unshift({ r: currR, c: currC });
        
        if (currR === 0 && currC === 0) break;

        const direction = parent[currR][currC];
        if (direction === 'TOP') {
            currR--;
        } else if (direction === 'LEFT') {
            currC--;
        } else {
            // Should not happen in a connected grid starting at 0,0
            break;
        }
    }

    return {
        maxScore: dp[rows - 1][cols - 1],
        optimalPath,
        dpTable: dp
    };
};

/**
 * Helper to verify if a user's move is valid (Adjacent Right or Down)
 */
export const isValidDPMove = (last: DPCoordinate, next: DPCoordinate): boolean => {
    // Check Right
    if (next.r === last.r && next.c === last.c + 1) return true;
    // Check Down
    if (next.r === last.r + 1 && next.c === last.c) return true;
    
    return false;
};
