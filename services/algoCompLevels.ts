import { GraphLevel, DPLevel, NumLevel, SortLevel } from '../types';

// --- GRAPH THEORY LEVELS ---
export const GRAPH_LEVELS: GraphLevel[] = [];
for (let i = 1; i <= 50; i++) {
  const nodeCount = Math.min(15, 4 + Math.floor(i / 5));
  const nodes = [];
  for(let n=0; n<nodeCount; n++) {
      nodes.push({
          id: String.fromCharCode(65+n), 
          x: Math.random() * 80 + 10, 
          y: Math.random() * 80 + 10
      });
  }
  const edges = [];
  for(let n=0; n<nodeCount-1; n++) {
      edges.push({from: nodes[n].id, to: nodes[n+1].id, weight: Math.floor(Math.random()*10)+1});
      if(Math.random() > 0.5 && n+2 < nodeCount) edges.push({from: nodes[n].id, to: nodes[n+2].id, weight: Math.floor(Math.random()*10)+1});
  }

  GRAPH_LEVELS.push({
    id: i,
    nodes,
    edges,
    startNode: 'A',
    endNode: nodes[nodes.length-1].id,
    algorithm: i % 3 === 0 ? 'DIJKSTRA' : (i % 2 === 0 ? 'DFS' : 'BFS'),
    minSteps: Math.floor(nodeCount * 1.5)
  });
}
export const getGraphLevel = (id: number) => GRAPH_LEVELS[id-1] || GRAPH_LEVELS[0];

// --- DP GRID LEVELS ---
export const DP_LEVELS: DPLevel[] = [];
for (let i = 1; i <= 50; i++) {
  const size = Math.min(8, 3 + Math.floor(i/10));
  const grid = [];
  for(let r=0; r<size; r++) {
      const row = [];
      for(let c=0; c<size; c++) row.push(Math.floor(Math.random() * 10) - (i > 25 ? 2 : 0)); // Negative nums later
      grid.push(row);
  }
  DP_LEVELS.push({
    id: i,
    gridSize: size,
    values: grid,
    targetScore: 10 + i * 2,
    moves: size * 2 - 2
  });
}
export const getDPLevel = (id: number) => DP_LEVELS[id-1] || DP_LEVELS[0];

// --- NUMBER THEORY LEVELS ---
export const NUM_LEVELS: NumLevel[] = [];
const primes = [2,3,5,7,11,13,17,19,23,29,31];
for (let i = 1; i <= 50; i++) {
    let q = "", a = "", h = "";
    if (i <= 10) {
        const p = primes[i-1];
        q = `What is the ${i}th prime number?`;
        a = p.toString();
        h = "Only divisible by 1 and itself.";
    } else if (i <= 30) {
        const n1 = Math.floor(Math.random() * 50) + 10;
        const n2 = Math.floor(Math.random() * 50) + 10;
        q = `GCD of ${n1} and ${n2}?`;
        const gcd = (x:number, y:number):number => !y ? x : gcd(y, x % y);
        a = gcd(n1, n2).toString();
        h = "Greatest Common Divisor.";
    } else {
        const base = Math.floor(Math.random() * 10) + 2;
        const exp = Math.floor(Math.random() * 5) + 2;
        const mod = Math.floor(Math.random() * 20) + 5;
        q = `(${base}^${exp}) mod ${mod} = ?`;
        a = (Math.pow(base, exp) % mod).toString();
        h = "Modular arithmetic.";
    }
    NUM_LEVELS.push({ id: i, question: q, answer: a, hint: h });
}
export const getNumLevel = (id: number) => NUM_LEVELS[id-1] || NUM_LEVELS[0];

// --- SORTING LEVELS ---
export const SORT_LEVELS: SortLevel[] = [];
for (let i = 1; i <= 50; i++) {
    const len = Math.min(10, 4 + Math.floor(i/10));
    const arr = Array.from({length: len}, () => Math.floor(Math.random() * 50));
    SORT_LEVELS.push({
        id: i,
        initialArr: arr,
        algorithm: i % 2 === 0 ? 'SELECTION' : 'BUBBLE',
        maxSwaps: len * len
    });
}
export const getSortLevel = (id: number) => SORT_LEVELS[id-1] || SORT_LEVELS[0];
