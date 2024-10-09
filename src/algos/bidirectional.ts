import { NodeData } from '../types/NodeData'

// Bidirectional search algorithm
export function bidirectional(nodes: NodeData[][], start: NodeData, target: NodeData, nodesToAnimate: NodeData[], boardArray: number[][]): [boolean, NodeData[]] {
  // Initialize queues for forward and backward searches
  const forwardQueue: NodeData[] = [start]
  const backwardQueue: NodeData[] = [target]
  
  // Sets to keep track of visited nodes in both directions
  const forwardVisited: Set<string> = new Set()
  const backwardVisited: Set<string> = new Set()
  
  // Maps to store the path for reconstruction
  const forwardCameFrom: Map<string, NodeData> = new Map()
  const backwardCameFrom: Map<string, NodeData> = new Map()

  // Mark start and target nodes as visited
  forwardVisited.add(`${start.row}-${start.col}`)
  backwardVisited.add(`${target.row}-${target.col}`)

  // Continue searching while both queues have nodes to explore
  while (forwardQueue.length > 0 && backwardQueue.length > 0) {
    // Expand the forward frontier
    const meetingPoint = expandFrontier(forwardQueue, forwardVisited, forwardCameFrom, backwardVisited, nodes, boardArray, nodesToAnimate)
    if (meetingPoint) {
      // If a meeting point is found, reconstruct and return the path
      return [true, reconstructPath(forwardCameFrom, backwardCameFrom, meetingPoint)]
    }

    // Expand the backward frontier
    const meetingPointBackward = expandFrontier(backwardQueue, backwardVisited, backwardCameFrom, forwardVisited, nodes, boardArray, nodesToAnimate)
    if (meetingPointBackward) {
      // If a meeting point is found, reconstruct and return the path
      return [true, reconstructPath(forwardCameFrom, backwardCameFrom, meetingPointBackward)]
    }
  }

  // If no path is found, return false and an empty path
  return [false, []]
}

// Function to expand the frontier in one direction
function expandFrontier(queue: NodeData[], visited: Set<string>, cameFrom: Map<string, NodeData>, otherVisited: Set<string>, grid: NodeData[][], boardArray: number[][], nodesToAnimate: NodeData[]): NodeData | null {
  const current = queue.shift()!
  nodesToAnimate.push(current)

  const neighbors = getNeighbors(current, grid, boardArray)
  for (const neighbor of neighbors) {
    const key = `${neighbor.row}-${neighbor.col}`
    if (!visited.has(key)) {
      visited.add(key)
      cameFrom.set(key, current)
      queue.push(neighbor)

      // Check if this node has been visited by the other direction's search
      if (otherVisited.has(key)) {
        return neighbor // Meeting point found
      }
    }
  }

  return null // No meeting point found in this expansion
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
function reconstructPath(forwardCameFrom: Map<string, NodeData>, backwardCameFrom: Map<string, NodeData>, meetingPoint: NodeData): NodeData[] {
  const forwardPath = []
  let current = meetingPoint
  // Reconstruct path from start to meeting point
  while (forwardCameFrom.has(`${current.row}-${current.col}`)) {
    current = forwardCameFrom.get(`${current.row}-${current.col}`)!
    forwardPath.unshift(current)
  }

  const backwardPath = [meetingPoint]
  current = meetingPoint
  // Reconstruct path from meeting point to goal
  while (backwardCameFrom.has(`${current.row}-${current.col}`)) {
    current = backwardCameFrom.get(`${current.row}-${current.col}`)!
    backwardPath.push(current)
  }

  // Combine both paths
  return [...forwardPath, ...backwardPath]
}