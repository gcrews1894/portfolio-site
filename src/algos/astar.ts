import { NodeData } from '../types/NodeData'

// Calculate the Manhattan distance between two nodes
function manhattan(a: NodeData, b: NodeData): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

// A* pathfinding algorithm
export function astar(nodes: NodeData[][], start: NodeData, target: NodeData, nodesToAnimate: NodeData[], boardArray: number[][]): [boolean, NodeData[]] {
  const openSet: NodeData[] = [start] // Nodes to be evaluated
  const closedSet: Set<string> = new Set() // Nodes already evaluated
  const gScore: Map<string, number> = new Map() // Cost from start to node
  const fScore: Map<string, number> = new Map() // Estimated total cost from start to goal through node
  const cameFrom: Map<string, NodeData> = new Map() // Parent nodes for path reconstruction

  // Initialize scores for the start node
  gScore.set(`${start.row}-${start.col}`, 0)
  fScore.set(`${start.row}-${start.col}`, manhattan(start, target))

  while (openSet.length > 0) {
    // Sort openSet by fScore to get the node with the lowest fScore
    openSet.sort((a, b) => (fScore.get(`${a.row}-${a.col}`) || Infinity) - (fScore.get(`${b.row}-${b.col}`) || Infinity))
    const current = openSet.shift()! // Get the node with the lowest fScore

    // If we've reached the target, reconstruct and return the path
    if (current.row === target.row && current.col === target.col) {
      return [true, reconstructPath(cameFrom, current)]
    }

    closedSet.add(`${current.row}-${current.col}`) // Mark current node as evaluated
    nodesToAnimate.push(current) // Add current node to animation sequence

    // Check all neighbors of the current node
    const neighbors = getNeighbors(current, nodes, boardArray)
    for (const neighbor of neighbors) {
      // Skip if neighbor is already evaluated
      if (closedSet.has(`${neighbor.row}-${neighbor.col}`)) continue

      // Calculate tentative gScore for this neighbor
      const tentativeGScore = (gScore.get(`${current.row}-${current.col}`) || Infinity) + 1

      // If this neighbor is not in openSet, add it
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor)
      } 
      // If this path to neighbor is worse than previous one, skip it
      else if (
        tentativeGScore >= (gScore.get(`${neighbor.row}-${neighbor.col}`) || Infinity)
      ) {
        continue
      }

      cameFrom.set(`${neighbor.row}-${neighbor.col}`, current)
      gScore.set(`${neighbor.row}-${neighbor.col}`, tentativeGScore)
      fScore.set(`${neighbor.row}-${neighbor.col}`, tentativeGScore + manhattan(neighbor, target))
    }
  }

  return [false, []]
}

function getNeighbors(node: NodeData, grid: NodeData[][], boardArray: number[][]): NodeData[] {
  const neighbors: NodeData[] = []
  const { row, col } = node

  if (row > 0 && boardArray[row - 1][col] !== 1) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1 && boardArray[row + 1][col] !== 1) neighbors.push(grid[row + 1][col])
  if (col > 0 && boardArray[row][col - 1] !== 1) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1 && boardArray[row][col + 1] !== 1) neighbors.push(grid[row][col + 1])

  return neighbors
}

function reconstructPath(cameFrom: Map<string, NodeData>, current: NodeData): NodeData[] {
  const path = [current]
  while (cameFrom.has(`${current.row}-${current.col}`)) {
    current = cameFrom.get(`${current.row}-${current.col}`)!
    path.unshift(current)
  }
  return path
}