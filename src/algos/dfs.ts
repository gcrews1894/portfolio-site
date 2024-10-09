import { NodeData } from '../types/NodeData'

// Depth-First Search algorithm
export function dfs(nodes: NodeData[][], start: NodeData, target: NodeData, nodesToAnimate: NodeData[], boardArray: number[][]): [boolean, NodeData[]] {
  const stack: NodeData[] = [start] // Initialize stack with start node
  const visited: Set<string> = new Set() // Set to keep track of visited nodes
  const cameFrom: Map<string, NodeData> = new Map() // Map to store the path for reconstruction

  while (stack.length > 0) {
    const current = stack.pop()! // Get the last node from the stack
    nodesToAnimate.push(current) // Add current node to animation sequence

    // Check if we've reached the target
    if (current.row === target.row && current.col === target.col) {
      return [true, reconstructPath(cameFrom, current)]
    }

    const key = `${current.row}-${current.col}`
    if (!visited.has(key)) {
      visited.add(key) // Mark current node as visited
      const neighbors = getNeighbors(current, nodes, boardArray)
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.row}-${neighbor.col}`
        if (!visited.has(neighborKey)) {
          cameFrom.set(neighborKey, current) // Store the path
          stack.push(neighbor) // Add unvisited neighbors to the stack
        }
      }
    }
  }

  // If no path is found, return false and an empty path
  return [false, []]
}

// Function to get valid neighbors of a node
function getNeighbors(node: NodeData, grid: NodeData[][], boardArray: number[][]): NodeData[] {
  const neighbors: NodeData[] = []
  const { row, col } = node

  // Check all four directions (up, right, down, left)
  if (row > 0 && boardArray[row - 1][col] !== 1) neighbors.push(grid[row - 1][col])
  if (col < grid[0].length - 1 && boardArray[row][col + 1] !== 1) neighbors.push(grid[row][col + 1])
  if (row < grid.length - 1 && boardArray[row + 1][col] !== 1) neighbors.push(grid[row + 1][col])
  if (col > 0 && boardArray[row][col - 1] !== 1) neighbors.push(grid[row][col - 1])

  return neighbors
}

// Function to reconstruct the path from start to goal
function reconstructPath(cameFrom: Map<string, NodeData>, current: NodeData): NodeData[] {
  const path = [current]
  while (cameFrom.has(`${current.row}-${current.col}`)) {
    current = cameFrom.get(`${current.row}-${current.col}`)!
    path.unshift(current) // Add to the beginning of the array
  }
  return path
}