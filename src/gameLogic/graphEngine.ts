
import { GraphLevel, GraphAlgorithmResult, AlgorithmLog, GraphEdge } from '../types';

// Adjacency List Type: Map<NodeID, Array<{target, weight}>>
type AdjacencyList = Map<string, { to: string; weight: number }[]>;

/**
 * Converts the level's Edge array into an efficient Adjacency List Map.
 */
const buildAdjacencyList = (nodes: {id: string}[], edges: GraphEdge[], directed: boolean = false): AdjacencyList => {
    const adj = new Map<string, { to: string; weight: number }[]>();
    
    // Initialize all nodes
    nodes.forEach(n => adj.set(n.id, []));

    // Populate edges
    edges.forEach(edge => {
        const fromNode = adj.get(edge.from);
        if (fromNode) {
            fromNode.push({ to: edge.to, weight: edge.weight });
        }

        // If undirected, add the reverse edge
        if (!directed) {
            const toNode = adj.get(edge.to);
            if (toNode) {
                toNode.push({ to: edge.from, weight: edge.weight });
            }
        }
    });

    return adj;
};

/**
 * Depth First Search (DFS) Implementation
 * Primarily used for reachability and unweighted pathfinding.
 */
export const runDFS = (level: GraphLevel, startId: string, targetId: string): GraphAlgorithmResult => {
    const adj = buildAdjacencyList(level.nodes, level.edges);
    const logs: AlgorithmLog[] = [];
    const stack: string[] = [startId];
    const visited = new Set<string>();
    const parentMap = new Map<string, string>(); // To reconstruct path
    let step = 0;

    logs.push({ step: step++, message: `Initializing DFS from ${startId}.`, visitedNodes: [] });

    while (stack.length > 0) {
        const current = stack.pop()!;

        if (!visited.has(current)) {
            visited.add(current);
            logs.push({ 
                step: step++, 
                message: `Visiting Node ${current}.`, 
                activeNode: current, 
                visitedNodes: Array.from(visited) 
            });

            if (current === targetId) {
                logs.push({ step: step++, message: `Target ${targetId} found!`, activeNode: current, visitedNodes: Array.from(visited) });
                break;
            }

            const neighbors = adj.get(current) || [];
            // Reverse to preserve order when popping from stack (optional, but standardizes visuals)
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor.to)) {
                    stack.push(neighbor.to);
                    // Only map parent if we haven't seen this node yet to ensure a valid path
                    if (!parentMap.has(neighbor.to)) {
                        parentMap.set(neighbor.to, current);
                    }
                    logs.push({ step: step++, message: `Pushing neighbor ${neighbor.to} to stack.` , visitedNodes: Array.from(visited)});
                }
            }
        }
    }

    // Reconstruct Path
    const path: string[] = [];
    if (visited.has(targetId)) {
        let curr: string | undefined = targetId;
        while (curr) {
            path.unshift(curr);
            curr = parentMap.get(curr);
        }
    }

    return {
        path,
        logs,
        success: path.length > 0
    };
};

/**
 * Dijkstra's Algorithm Implementation
 * Used for finding the shortest path in weighted graphs.
 */
export const runDijkstra = (level: GraphLevel, startId: string, targetId: string): GraphAlgorithmResult => {
    const adj = buildAdjacencyList(level.nodes, level.edges);
    const logs: AlgorithmLog[] = [];
    const distances = new Map<string, number>();
    const previous = new Map<string, string>();
    const visited = new Set<string>();
    const pq: { id: string; dist: number }[] = []; // Simple Priority Queue array
    let step = 0;

    // Initialize
    level.nodes.forEach(n => distances.set(n.id, Infinity));
    distances.set(startId, 0);
    pq.push({ id: startId, dist: 0 });

    logs.push({ step: step++, message: `Initializing Dijkstra. Distances set to Infinity. Start ${startId} = 0.`, visitedNodes: [] });

    while (pq.length > 0) {
        // Sort to simulate Priority Queue (Min-Heap)
        pq.sort((a, b) => a.dist - b.dist);
        const { id: current, dist: currentDist } = pq.shift()!;

        if (visited.has(current)) continue;
        visited.add(current);

        logs.push({ 
            step: step++, 
            message: `Visiting ${current} (Distance: ${currentDist}).`, 
            activeNode: current,
            visitedNodes: Array.from(visited)
        });

        if (current === targetId) {
            logs.push({ step: step++, message: `Target ${targetId} reached with distance ${currentDist}.`, activeNode: current, visitedNodes: Array.from(visited) });
            break;
        }

        const neighbors = adj.get(current) || [];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor.to)) continue;

            const newDist = currentDist + neighbor.weight;
            const oldDist = distances.get(neighbor.to)!;

            if (newDist < oldDist) {
                distances.set(neighbor.to, newDist);
                previous.set(neighbor.to, current);
                pq.push({ id: neighbor.to, dist: newDist });
                logs.push({ 
                    step: step++, 
                    message: `Relaxing edge ${current}->${neighbor.to}. New cost: ${newDist}.`, 
                    visitedNodes: Array.from(visited) 
                });
            }
        }
    }

    // Reconstruct Path
    const path: string[] = [];
    let curr: string | undefined = targetId;
    if (distances.get(targetId) !== Infinity) {
        while (curr) {
            path.unshift(curr);
            curr = previous.get(curr);
        }
    }

    return {
        path,
        logs,
        distance: distances.get(targetId),
        success: path.length > 0
    };
};
