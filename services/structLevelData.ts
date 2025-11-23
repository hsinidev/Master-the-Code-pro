import { StructLevelConfig } from '../types';

export const STRUCT_LEVELS: StructLevelConfig[] = [];

const scenarios = [
  { t: "Fast Lookup", s: "We need to find users by ID instantly.", o: ["Array", "LinkedList", "HashMap"], c: "HashMap", why: "O(1) lookup time." },
  { t: "Ordered Data", s: "Keep items sorted, frequently print all in order.", o: ["HashMap", "BST", "Stack"], c: "BST", why: "In-order traversal is efficient." },
  { t: "LIFO", s: "Undo feature in text editor.", o: ["Queue", "Stack", "Array"], c: "Stack", why: "Last-In, First-Out." },
  { t: "FIFO", s: "Printer job queue.", o: ["Stack", "Queue", "Tree"], c: "Queue", why: "First-In, First-Out." },
  { t: "Graph Connect", s: "Find shortest path in a map.", o: ["DFS", "BFS", "Sort"], c: "BFS", why: "BFS finds shortest path in unweighted graphs." }
];

for (let i = 1; i <= 50; i++) {
  const tmpl = scenarios[(i - 1) % scenarios.length];
  STRUCT_LEVELS.push({
    id: i,
    title: `${tmpl.t} ${Math.ceil(i/5)}`,
    scenario: tmpl.s,
    options: tmpl.o,
    correctOption: tmpl.c,
    constraints: { "Time": "Optimal" },
    explanation: tmpl.why
  });
}

export const getStructLevel = (id: number) => STRUCT_LEVELS.find(l => l.id === id) || STRUCT_LEVELS[0];
