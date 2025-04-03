import React, { useState, useRef, useEffect } from 'react';
import { Box, Slider, Typography, Button, Paper } from '@mui/material';
import './DroneVisualizer.scss';

type Coord = [number, number];

// Empty interface is intentional as we may add props in the future
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DroneVisualizerProps {
}

export const DroneVisualizer: React.FC<DroneVisualizerProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drones, setDrones] = useState<Coord[]>([]);
  const [fieldOfView, setFieldOfView] = useState<number>(90);
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);
  const [maxDrones, setMaxDrones] = useState<number>(0);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [isOptimal, setIsOptimal] = useState<boolean>(false);
  const [optimalAngle, setOptimalAngle] = useState<number>(0);
  
  const GRID_SIZE = 400;
  const CELL_SIZE = 20;
  const CENTER = GRID_SIZE / 2;
  // Calculate radius to reach grid corners
  const VIEW_RADIUS = Math.sqrt(2) * GRID_SIZE / 2;
  
  // Function to convert grid coordinates to canvas coordinates
  const gridToCanvas = (x: number, y: number): [number, number] => {
    return [CENTER + x * CELL_SIZE, CENTER - y * CELL_SIZE];
  };
  
  // Function to convert canvas coordinates to grid coordinates
  const canvasToGrid = (x: number, y: number): [number, number] => {
    return [
      Math.round((x - CENTER) / CELL_SIZE),
      Math.round((CENTER - y) / CELL_SIZE)
    ];
  };
  
  // Function to normalize angle to range [0, 360)
  const normalizeAngle = (angle: number): number => {
    angle = angle % 360;
    return angle < 0 ? angle + 360 : angle;
  };
  
  // Function to convert from mathematical angle to clockwise angle from y-axis
  const convertToClockwiseFromY = (mathAngle: number): number => {
    return normalizeAngle(90 + mathAngle);
  };
  
  // Function to check if a point is within the field of view
  const isInFieldOfView = (angle: number, currentAngle: number, fieldOfView: number): boolean => {
    const halfFOV = fieldOfView / 2;
    angle = normalizeAngle(angle);
    currentAngle = normalizeAngle(currentAngle);
    let angleDiff = Math.abs(angle - currentAngle);
    if (angleDiff > 180) {
      angleDiff = 360 - angleDiff;
    }
    return angleDiff <= halfFOV;
  };
  
  // Function to calculate maximum number of drones visible and the optimal angle
  const calculateMaxDrones = (drones: Coord[], k: number): [number, number] => {
    if (drones.length === 0) return [0, 0];
    
    // Convert drone coordinates to angles
    const droneAngles = drones.map((drone) => {
      // Convert to mathematical angle (counterclockwise from positive x-axis)
      const mathAngle = Math.atan2(drone[1], drone[0]) * 180 / Math.PI;
      // Convert to clockwise angle from positive y-axis
      return convertToClockwiseFromY(mathAngle);
    });
    
    // Sort angles
    droneAngles.sort((a, b) => a - b);
    
    let maxCount = 0;
    let optimalStartAngle = 0;
    let optimalEndAngle = 0;
    
    // Check each possible starting angle
    for (let i = 0; i < droneAngles.length; i++) {
      let count = 1;
      let j = (i + 1) % droneAngles.length;
      let endAngle = droneAngles[i];
      
      // Count drones within field of view
      while (j !== i) {
        let angleDiff = droneAngles[j] - droneAngles[i];
        if (angleDiff < 0) angleDiff += 360;
        
        if (angleDiff <= k) {
          count++;
          endAngle = droneAngles[j];
          j = (j + 1) % droneAngles.length;
        } else {
          break;
        }
      }
      
      if (count > maxCount) {
        maxCount = count;
        optimalStartAngle = droneAngles[i];
        optimalEndAngle = endAngle;
      }
    }
    
    // Calculate the center angle between start and end angles
    let angleDiff = optimalEndAngle - optimalStartAngle;
    if (angleDiff < 0) angleDiff += 360;
    const optimalAngle = normalizeAngle(optimalStartAngle + angleDiff / 2);
    
    return [maxCount, optimalAngle];
  };
  
  // Function to draw the grid
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);
    
    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= GRID_SIZE; i += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, GRID_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(GRID_SIZE, i);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(0, CENTER);
    ctx.lineTo(GRID_SIZE, CENTER);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(CENTER, 0);
    ctx.lineTo(CENTER, GRID_SIZE);
    ctx.stroke();
    
    // Draw origin
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(CENTER, CENTER, 5, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Function to draw drones
  const drawDrones = (ctx: CanvasRenderingContext2D) => {
    // Save the current context state
    ctx.save();
    
    // Create clipping path for the grid
    ctx.beginPath();
    ctx.rect(0, 0, GRID_SIZE, GRID_SIZE);
    ctx.clip();
    
    // Draw field of view cone
    const halfFOV = fieldOfView / 2;
    // Convert currentAngle to mathematical angle (counterclockwise from positive x-axis)
    const mathAngle = 90 - currentAngle;
    const startAngle = (mathAngle - halfFOV) * Math.PI / 180;
    const endAngle = (mathAngle + halfFOV) * Math.PI / 180;
    
    ctx.fillStyle = isOptimal ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 0, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.arc(CENTER, CENTER, VIEW_RADIUS, startAngle, endAngle);
    ctx.lineTo(CENTER, CENTER);
    ctx.fill();
    
    // Draw field of view lines
    ctx.strokeStyle = isOptimal ? '#0f0' : '#00f';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.lineTo(
      CENTER + Math.cos(startAngle) * VIEW_RADIUS,
      CENTER + Math.sin(startAngle) * VIEW_RADIUS
    );
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.lineTo(
      CENTER + Math.cos(endAngle) * VIEW_RADIUS,
      CENTER + Math.sin(endAngle) * VIEW_RADIUS
    );
    ctx.stroke();
    
    // Restore the context state
    ctx.restore();
    
    // Draw enemy drones
    drones.forEach((drone) => {
      const [x, y] = gridToCanvas(drone[0], drone[1]);
      ctx.fillStyle = '#f00';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  // Function to handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isVisualizing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const [gridX, gridY] = canvasToGrid(x, y);
    
    // Check if drone already exists at this position
    const droneIndex = drones.findIndex((drone) => drone[0] === gridX && drone[1] === gridY);
    
    if (droneIndex >= 0) {
      // Remove drone
      setDrones(drones.filter((_, index) => index !== droneIndex));
    } else {
      // Add drone
      setDrones([...drones, [gridX, gridY]]);
    }
  };
  
  // Function to start visualization
  const startVisualization = () => {
    setIsVisualizing(true);
    setIsOptimal(false);
    setCurrentAngle(0);
    
    const [maxVisible, optimalAngle] = calculateMaxDrones(drones, fieldOfView);
    setMaxDrones(maxVisible);
    setOptimalAngle(optimalAngle);
    
    // Animate the search
    let angle = 0;
    const animate = () => {
      if (angle >= 360) {
        setIsVisualizing(false);
        setIsOptimal(true);
        setCurrentAngle(optimalAngle);
        return;
      }
      
      setCurrentAngle(angle);
      
      // Check if current angle shows maximum drones
      const visibleDrones = drones.filter((drone) => {
        // Convert to mathematical angle (counterclockwise from positive x-axis)
        const mathAngle = Math.atan2(drone[1], drone[0]) * 180 / Math.PI;
        // Convert to clockwise angle from positive y-axis
        const droneAngle = convertToClockwiseFromY(mathAngle);
        return isInFieldOfView(droneAngle, angle, fieldOfView);
      });
      
      if (visibleDrones.length === maxVisible) {
        setIsOptimal(true);
      } else {
        setIsOptimal(false);
      }
      
      angle += 5;
      setTimeout(animate, 100);
    };
    
    animate();
  };
  
  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawGrid(ctx);
    drawDrones(ctx);
  }, [drones, fieldOfView, currentAngle, isOptimal]);
  
  return (
    <Box className="drone-visualizer">
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Drone Detection Visualizer
        </Typography>
        <Typography variant="body2" paragraph>
          Click on the grid to add/remove enemy drones. Adjust the field of view with the slider.
          Click "Start Visualization" to find the maximum number of drones visible at once.
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ mr: 2, minWidth: '100px' }}>Field of View: {fieldOfView}°</Typography>
          <Slider
            value={fieldOfView}
            onChange={(_, value) => setFieldOfView(value as number)}
            min={10}
            max={180}
            step={10}
            disabled={isVisualizing}
            sx={{ flexGrow: 1 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={startVisualization} 
              disabled={drones.length === 0 || isVisualizing}
            >
              Start Visualization
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => setDrones([])}
              disabled={drones.length === 0 || isVisualizing}
            >
              Clear
            </Button>
          </Box>
          
          <Typography variant="h6">
            Maximum Drones Visible: {maxDrones}
          </Typography>
        </Box>
      </Paper>
      
      <canvas
        ref={canvasRef}
        width={GRID_SIZE}
        height={GRID_SIZE}
        onClick={handleCanvasClick}
        style={{ border: '1px solid #ccc', backgroundColor: '#111' }}
      />
    </Box>
  );
}; 