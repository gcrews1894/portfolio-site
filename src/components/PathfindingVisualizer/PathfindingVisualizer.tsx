import React, { useState, useEffect, useCallback } from "react"
import { Box, Button, Typography } from "@mui/material"
import "./PathfindingVisualizers.scss"
import { dijkstras } from "../../algos/dijkstras"
import { astar } from "../../algos/astar"
import { bfs } from "../../algos/bfs"
import { dfs } from "../../algos/dfs"
import { bidirectional } from "../../algos/bidirectional"

interface NodeProps {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  isVisited: boolean
  isWall: boolean
  isPath: boolean
  onMouseDown: (row: number, col: number) => void
  onMouseEnter: (row: number, col: number) => void
  onMouseUp: () => void
}

const Node: React.FC<NodeProps> = React.memo(
  ({ row, col, isStart, isEnd, isVisited, isWall, isPath, onMouseDown, onMouseEnter, onMouseUp }) => {
    return (
      <Box
        className={`node ${isStart ? "start" : isEnd ? "end" : ""} ${isVisited ? "visited" : ""} ${isPath ? "path" : ""} ${isWall ? "wall" : ""}`}
        sx={{
          width: 25,
          height: 25,
          border: ".5px solid #FFFFFF",
          backgroundColor: isWall ? "white" : isPath ? "yellow" : isVisited ? "limegreen" : isStart ? "green" : isEnd ? "red" : "transparent",
        }}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={onMouseUp}
      />
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isStart === nextProps.isStart &&
      prevProps.isEnd === nextProps.isEnd &&
      prevProps.isVisited === nextProps.isVisited &&
      prevProps.isWall === nextProps.isWall &&
      prevProps.isPath === nextProps.isPath
    )
  }
)

interface NodeData {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  isVisited: boolean
  distance: number
  direction: string
}

export const PathfindingVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[][]>([])
  const [isVisualizing, setIsVisualizing] = useState(false)
  const [path, setPath] = useState<NodeData[]>([])
  const [walls, setWalls] = useState<Set<string>>(new Set())
  const [isMousePressed, setIsMousePressed] = useState(false)
  const [isAddingWalls, setIsAddingWalls] = useState(true)

  const initializeGrid = useCallback(() => {
    const newNodes: NodeData[][] = []
    for (let row = 0; row < 25; row++) {
      const currentRow: NodeData[] = []
      for (let col = 0; col < 50; col++) {
        currentRow.push({
          row: row,
          col: col,
          isStart: row === 12 && col === 4,
          isEnd: row === 12 && col === 45,
          isVisited: false,
          distance: Infinity,
          direction: '',
        })
      }
      newNodes.push(currentRow)
    }
    return newNodes
  }, [])

  useEffect(() => {
    setNodes(initializeGrid())
  }, [initializeGrid])

  const handleMouseDown = useCallback((row: number, col: number) => {
    if (isVisualizing) return
    setIsMousePressed(true)
    const key = `${row}-${col}`
    const isWall = walls.has(key)
    setIsAddingWalls(!isWall)
    toggleWall(row, col, !isWall)
  }, [isVisualizing, walls])

  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (!isMousePressed || isVisualizing) return
    toggleWall(row, col, isAddingWalls)
  }, [isMousePressed, isVisualizing, isAddingWalls])

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false)
  }, [])

  const toggleWall = useCallback((row: number, col: number, add: boolean) => {
    const key = `${row}-${col}`
    setWalls(prevWalls => {
      const newWalls = new Set(prevWalls)
      if (add) {
        newWalls.add(key)
      } else {
        newWalls.delete(key)
      }
      return newWalls
    })
  }, [])

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsMousePressed(false)
    }
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [])

  const visualizeDijkstra = useCallback(() => {
    if (isVisualizing) return
    setIsVisualizing(true)

    // Reset the path
    setPath([])

    // Reset the grid colors and visited status
    setNodes(prevNodes => prevNodes.map(row => row.map(node => ({
      ...node,
      isVisited: false
    }))))

    const startNode = nodes[12][4]
    const endNode = nodes[12][45]
    const nodesToAnimate: NodeData[] = []
    const boardArray = nodes.map(row => row.map(node =>
      walls.has(`${node.row}-${node.col}`) ? 1 : 0
    ))

    const [pathFound, shortestPath] = dijkstras(nodes, startNode, endNode, nodesToAnimate, boardArray)
    console.log("Dijkstra's algorithm finished. Path found:", pathFound)
    console.log("Nodes to animate:", nodesToAnimate.length)

    animateAlgorithm(nodesToAnimate, shortestPath)
  }, [nodes, isVisualizing, walls])

  const visualizeAStar = useCallback(() => {
    if (isVisualizing) return
    setIsVisualizing(true)

    // Reset the path
    setPath([])

    // Reset the grid colors and visited status
    setNodes(prevNodes => prevNodes.map(row => row.map(node => ({
      ...node,
      isVisited: false
    }))))

    const startNode = nodes[12][4]
    const endNode = nodes[12][45]
    const nodesToAnimate: NodeData[] = []
    const boardArray = nodes.map(row => row.map(node =>
      walls.has(`${node.row}-${node.col}`) ? 1 : 0
    ))

    const [pathFound, shortestPath] = astar(nodes, startNode, endNode, nodesToAnimate, boardArray)
    console.log("A* algorithm finished. Path found:", pathFound)
    console.log("Nodes to animate:", nodesToAnimate.length)

    animateAlgorithm(nodesToAnimate, shortestPath)
  }, [nodes, isVisualizing, walls])

  const visualizeBFS = useCallback(() => {
    if (isVisualizing) return
    setIsVisualizing(true)
    setPath([])
    setNodes(prevNodes => prevNodes.map(row => row.map(node => ({ ...node, isVisited: false }))))
    const startNode = nodes[12][4]
    const endNode = nodes[12][45]
    const nodesToAnimate: NodeData[] = []
    const boardArray = nodes.map(row => row.map(node => walls.has(`${node.row}-${node.col}`) ? 1 : 0))
    const [pathFound, shortestPath] = bfs(nodes, startNode, endNode, nodesToAnimate, boardArray)
    console.log("BFS algorithm finished. Path found:", pathFound)
    console.log("Nodes to animate:", nodesToAnimate.length)
    animateAlgorithm(nodesToAnimate, shortestPath)
  }, [nodes, isVisualizing, walls])

  const visualizeDFS = useCallback(() => {
    if (isVisualizing) return
    setIsVisualizing(true)
    setPath([])
    setNodes(prevNodes => prevNodes.map(row => row.map(node => ({ ...node, isVisited: false }))))
    const startNode = nodes[12][4]
    const endNode = nodes[12][45]
    const nodesToAnimate: NodeData[] = []
    const boardArray = nodes.map(row => row.map(node => walls.has(`${node.row}-${node.col}`) ? 1 : 0))
    const [pathFound, shortestPath] = dfs(nodes, startNode, endNode, nodesToAnimate, boardArray)
    console.log("DFS algorithm finished. Path found:", pathFound)
    console.log("Nodes to animate:", nodesToAnimate.length)
    animateAlgorithm(nodesToAnimate, shortestPath)
  }, [nodes, isVisualizing, walls])

  const visualizeBidirectional = useCallback(() => {
    if (isVisualizing) return
    setIsVisualizing(true)
    setPath([])
    setNodes(prevNodes => prevNodes.map(row => row.map(node => ({ ...node, isVisited: false }))))
    const startNode = nodes[12][4]
    const endNode = nodes[12][45]
    const nodesToAnimate: NodeData[] = []
    const boardArray = nodes.map(row => row.map(node => walls.has(`${node.row}-${node.col}`) ? 1 : 0))
    const [pathFound, shortestPath] = bidirectional(nodes, startNode, endNode, nodesToAnimate, boardArray)
    console.log("Bidirectional algorithm finished. Path found:", pathFound)
    console.log("Nodes to animate:", nodesToAnimate.length)
    animateAlgorithm(nodesToAnimate, shortestPath)
  }, [nodes, isVisualizing, walls])

  const animateAlgorithm = useCallback((nodesToAnimate: NodeData[], shortestPath: NodeData[]) => {
    nodesToAnimate.forEach((node, index) => {
      setTimeout(() => {
        setNodes(prevNodes => {
          const newNodes = prevNodes.map(row => row.map(n => ({ ...n })))
          newNodes[node.row][node.col].isVisited = true
          return newNodes
        })

        if (index === nodesToAnimate.length - 1) {
          animatePath(shortestPath)
        }
      }, 10 * index)
    })
  }, [])

  const animatePath = useCallback((shortestPath: NodeData[]) => {
    shortestPath.forEach((node, index) => {
      setTimeout(() => {
        setPath(prevPath => [...prevPath, node])
      }, 50 * index)
    })
    setTimeout(() => setIsVisualizing(false), 50 * shortestPath.length)
  }, [])

  const resetGrid = useCallback(() => {
    setNodes(initializeGrid())
    setPath([])
    setWalls(new Set())
    setIsVisualizing(false)
  }, [initializeGrid])

  const generateMaze = useCallback(() => {
    if (isVisualizing) return

    const newWalls = new Set<string>()
    const startKey = '12-4'  // Assuming start node is at (12, 4)
    const endKey = '12-45'   // Assuming end node is at (12, 45)

    // Helper function to check if a node is valid (within grid and not start/end)
    const isValidNode = (row: number, col: number) => {
      const key = `${row}-${col}`
      return row >= 0 && row < 26 && col >= 0 && col < 50 && key !== startKey && key !== endKey
    }

    // Add walls with 30% probability
    for (let row = 0; row < 26; row++) {
      for (let col = 0; col < 50; col++) {
        if (Math.random() < 0.3 && isValidNode(row, col)) {
          newWalls.add(`${row}-${col}`)
        }
      }
    }

    // Ensure path exists between start and end
    const visited = new Set<string>()
    const queue = [{ row: 12, col: 4 }]  // Start node
    visited.add(startKey)

    while (queue.length > 0) {
      const { row, col } = queue.shift()!
      const key = `${row}-${col}`

      if (key === endKey) {
        // Path found, we can stop
        break
      }

      // Check neighbors
      const neighbors = [
        { row: row - 1, col },
        { row: row + 1, col },
        { row, col: col - 1 },
        { row, col: col + 1 }
      ]

      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.row}-${neighbor.col}`
        if (isValidNode(neighbor.row, neighbor.col) && !visited.has(neighborKey)) {
          visited.add(neighborKey)
          if (!newWalls.has(neighborKey)) {
            queue.push(neighbor)
          } else if (Math.random() < 0.3) {
            // 30% chance to remove wall to create path
            newWalls.delete(neighborKey)
            queue.push(neighbor)
          }
        }
      }
    }

    setWalls(newWalls)

    // Reset the grid without clearing the walls
    setNodes(prevNodes => prevNodes.map(row => row.map(node => ({
      ...node,
      isVisited: false
    }))))
    setPath([])
    setIsVisualizing(false)
  }, [])  // Empty dependency array, as we don't use any external variables

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button onClick={visualizeDijkstra} disabled={isVisualizing}>
          Dijkstra's
        </Button>
        <Button onClick={visualizeAStar} disabled={isVisualizing}>
          A*
        </Button>
        <Button onClick={visualizeBFS} disabled={isVisualizing}>
          Breadth-first Search (BFS)
        </Button>
        <Button onClick={visualizeDFS} disabled={isVisualizing}>
          Depth-first Search (DFS)
        </Button>
        <Button onClick={visualizeBidirectional} disabled={isVisualizing}>
          Bidirectional
        </Button>
        <Button variant="contained" color="primary" onClick={generateMaze} disabled={isVisualizing}>
          Generate Maze
        </Button>
        <Button variant="outlined" color="warning" onClick={resetGrid} disabled={isVisualizing}>
          Reset Grid
        </Button>
      </Box>
      {nodes.map((row, rowIndex) => (
        <Box key={rowIndex} sx={{ display: "flex" }}>
          {row.map((node) => (
            <Node
              key={`${node.row}-${node.col}`}
              row={node.row}
              col={node.col}
              isStart={node.isStart}
              isEnd={node.isEnd}
              isVisited={node.isVisited}
              isWall={walls.has(`${node.row}-${node.col}`)}
              isPath={path.some(p => p.row === node.row && p.col === node.col)}
              onMouseDown={() => handleMouseDown(node.row, node.col)}
              onMouseEnter={() => handleMouseEnter(node.row, node.col)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "green", marginRight: 1 }} />
          <Typography>Start Node</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "red", marginRight: 1 }} />
          <Typography>End Node</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "white", marginRight: 1, border: "1px solid black" }} />
          <Typography>Wall</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "limegreen", marginRight: 1 }} />
          <Typography>Visited Node</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "yellow", marginRight: 1 }} />
          <Typography>Path Node</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "transparent", border: "0.5px solid #FFFFFF", marginRight: 1 }} />
          <Typography>Unvisited Node</Typography>
        </Box>
      </Box>
    </Box>
  )
}