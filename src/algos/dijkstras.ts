interface NodeData {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  isVisited: boolean
  distance: number
  direction: string
  previousNode?: NodeData
}

export function dijkstras(nodes: NodeData[][], start: NodeData, target: NodeData, nodesToAnimate: NodeData[], boardArray: number[][]): [boolean, NodeData[]] {
  console.log("Starting Dijkstra's algorithm")
  console.log("Start node:", start)
  console.log("Target node:", target)

  const grid = nodes.map(row => row.map(node => ({ ...node, distance: Infinity, isVisited: false })))
  grid[start.row][start.col].distance = 0

  const unvisitedNodes = getAllNodes(grid)

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()

    if (!closestNode || closestNode.distance === Infinity) {
      console.log("No path found: all reachable nodes visited")
      return [false, []]
    }

    closestNode.isVisited = true
    nodesToAnimate.push(closestNode)

    console.log("Visiting node:", closestNode)

    if (closestNode.row === target.row && closestNode.col === target.col) {
      console.log("Path found!")
      return [true, getNodesInShortestPathOrder(closestNode)]
    }

    updateUnvisitedNeighbors(closestNode, grid, boardArray)
  }

  console.log("No path found: all nodes visited")
  return [false, []]
}

function sortNodesByDistance(unvisitedNodes: NodeData[]) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbors(node: NodeData, grid: NodeData[][], boardArray: number[][]) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, boardArray)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
    neighbor.direction = getDirection(node, neighbor)
  }
}

function getUnvisitedNeighbors(node: NodeData, grid: NodeData[][], boardArray: number[][]): NodeData[] {
  const neighbors: NodeData[] = []
  const { row, col } = node

  console.log(`Getting neighbors for node (${row}, ${col})`)

  if (row > 0) {
    console.log(`Checking top neighbor (${row-1}, ${col})`)
    neighbors.push(grid[row - 1][col])
  }
  if (row < grid.length - 1) {
    console.log(`Checking bottom neighbor (${row+1}, ${col})`)
    neighbors.push(grid[row + 1][col])
  }
  if (col > 0) {
    console.log(`Checking left neighbor (${row}, ${col-1})`)
    neighbors.push(grid[row][col - 1])
  }
  if (col < grid[0].length - 1) {
    console.log(`Checking right neighbor (${row}, ${col+1})`)
    neighbors.push(grid[row][col + 1])
  }

  console.log("Neighbors before filtering:", neighbors)

  const filteredNeighbors = neighbors.filter(neighbor => {
    const isVisited = neighbor.isVisited
    const isCellBlocked = boardArray[neighbor.row][neighbor.col] === 1
    console.log(`Neighbor (${neighbor.row}, ${neighbor.col}): isVisited=${isVisited}, isCellBlocked=${isCellBlocked}`)
    return !isVisited && !isCellBlocked
  })

  console.log("Filtered neighbors:", filteredNeighbors)

  return filteredNeighbors
}

function getAllNodes(grid: NodeData[][]): NodeData[] {
  return grid.reduce((acc, row) => acc.concat(row), [])
}

function getDirection(fromNode: NodeData, toNode: NodeData): string {
  if (fromNode.row < toNode.row) return 'down'
  if (fromNode.row > toNode.row) return 'up'
  if (fromNode.col < toNode.col) return 'right'
  if (fromNode.col > toNode.col) return 'left'
  return ''
}

function getNodesInShortestPathOrder(finishNode: NodeData): NodeData[] {
  const nodesInShortestPathOrder = []
  let currentNode: NodeData | null = finishNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode = currentNode.previousNode || null
  }
  return nodesInShortestPathOrder
}

