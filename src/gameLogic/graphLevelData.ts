
import { GraphLevel, GraphNode, GraphEdge } from '../types';

export const GRAPH_LEVELS: GraphLevel[] = [];

/**
 * Helper to generate consistent pseudo-random levels
 */
const generateLevel = (id: number): GraphLevel => {
    const isWeighted = id > 15;
    const nodeCount = Math.min(12, 5 + Math.floor(id / 5)); // 5 to 12 nodes
    const nodes: GraphNode[] = [];
    
    // Generate Nodes in a loose circular/grid layout to prevent overlap
    const centerX = 50;
    const centerY = 50;
    const radius = 35;
    
    for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * 2 * Math.PI;
        // Add some randomness to positions
        const jitterX = (Math.random() - 0.5) * 10;
        const jitterY = (Math.random() - 0.5) * 10;
        
        nodes.push({
            id: String.fromCharCode(65 + i), // A, B, C...
            x: centerX + Math.cos(angle) * radius + jitterX,
            y: centerY + Math.sin(angle) * radius + jitterY
        });
    }

    // Generate Edges
    const edges: GraphEdge[] = [];
    // Ensure connectivity: Connect i to i+1
    for (let i = 0; i < nodeCount - 1; i++) {
        const weight = isWeighted ? Math.floor(Math.random() * 9) + 1 : 1;
        edges.push({ from: nodes[i].id, to: nodes[i+1].id, weight });
    }
    
    // Add random extra edges for complexity
    const extraEdges = Math.floor(nodeCount * 0.8);
    for (let i = 0; i < extraEdges; i++) {
        const idx1 = Math.floor(Math.random() * nodeCount);
        const idx2 = Math.floor(Math.random() * nodeCount);
        if (idx1 !== idx2) {
            const exists = edges.some(e => 
                (e.from === nodes[idx1].id && e.to === nodes[idx2].id) ||
                (e.from === nodes[idx2].id && e.to === nodes[idx1].id)
            );
            if (!exists) {
                const weight = isWeighted ? Math.floor(Math.random() * 9) + 1 : 1;
                edges.push({ from: nodes[idx1].id, to: nodes[idx2].id, weight });
            }
        }
    }

    let algo: 'DFS' | 'DIJKSTRA' = 'DFS';
    let desc = "Is there a path?";
    
    if (id <= 15) {
        algo = 'DFS';
        desc = "Unweighted Graph. Find any path using Depth First Search.";
    } else if (id <= 30) {
        algo = 'DIJKSTRA';
        desc = "Weighted Graph. Find the Shortest Path.";
    } else {
        algo = 'DIJKSTRA';
        desc = "Complex Network. Optimize cost analysis.";
    }

    return {
        id,
        isWeighted,
        nodes,
        edges,
        recommendedAlgo: algo,
        description: desc
    };
};

// Generate all 50 levels
for (let i = 1; i <= 50; i++) {
    GRAPH_LEVELS.push(generateLevel(i));
}

export const getGraphLevel = (id: number) => GRAPH_LEVELS[id - 1] || GRAPH_LEVELS[0];
