import { useEffect, useRef, useState } from 'react';

let canvas;
let ctx;

const gridWidth = 33;
const gridHeight = 33;
const grid = 16;
const width = gridWidth * grid;
const height = gridHeight * grid;

let blockX = 16;
let blockY = 16;

const goalX = 32;
const goalY = 16;

const steps = 16;

let path = [];

let index = 0;

import styles from '../styles/pages/Step.module.css';

export default function Step() {
  const canvasRef = useRef();

  const [iteration, setIteration] = useState(undefined);

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

  // returns distance to goal from given position
  function dist(x, y) {
    return Math.abs(x - goalX) + Math.abs(y - goalY);
  }

  // returns highest possible distance
  function high() {
    const distA = dist(0, 0);
    const distB = dist(gridWidth - 1, 0);
    const distC = dist(0, gridHeight - 1);
    const distD = dist(gridWidth - 1, gridHeight - 1);
    return Math.max(distA, distB, distC, distD);
  }

  // returns score for current outcome
  function score() {
    const highest = high();
    const distance = dist(blockX, blockY);
    return (highest - distance) / highest;
  }

  // moves block
  function move() {
    const direction = path[index];
    if (direction == 0) {
      blockX += 1;
    } else if (direction == 1) {
      blockX -= 1;
    } else if (direction == 2) {
      blockY += 1;
    } else if (direction == 3) {
      blockY -= 1;
    }
    if (blockX < 0) blockX = 0;
    if (blockX > gridWidth - 1) blockX = gridWidth - 1;
    if (blockY < 0) blockY = 0;
    if (blockY > gridHeight - 1) blockY = gridHeight - 1;
  }

  // resets block
  function reset() {
    // reset position
    blockX = 16;
    blockY = 16;
    // regenerate path
    path = [];
    for (let i = 0; i < steps; i++) {
      path.push(Math.floor(Math.random() * 4));
    }
  }

  // steps canvas
  function step() {
    move();
    draw();
    if (index === steps - 1) {
      setIteration(old => old + 1);
      index = 0;
      reset();
    } else {
      index += 1;
      setTimeout(step, 100);
    }
  }

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    reset();
    draw();
    setIteration(0);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <p>Index {index}</p>
        <p>Iteration {iteration}</p>
        <p>Score {score()}</p>
        <p>Path {path}</p>
        <button onClick={step}>
          Step
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}
