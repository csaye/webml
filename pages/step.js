import { useEffect, useRef } from 'react';

let canvas;
let ctx;

const gridWidth = 33;
const gridHeight = 33;
const grid = 16;
const width = gridWidth * grid;
const height = gridHeight * grid;

const blockX = 16;
const blockY = 16;

const goalX = 32;
const goalY = 16;

const steps = 16;

import styles from '../styles/pages/Step.module.css';

export default function Step() {
  const canvasRef = useRef();

  // draws canvas
  function draw() {
    // clear canvas
    ctx.clearRect(0, 0, width, height);
    // draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(blockX * grid, blockY * grid, grid, grid);
    // draw goal
    ctx.fillStyle = 'gold';
    ctx.fillRect(goalX * grid, goalY * grid, grid, grid);
  }

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    draw();
  }, []);

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}
