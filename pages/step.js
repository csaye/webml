import { useEffect, useRef, useState } from 'react';

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

let path = [];

import styles from '../styles/pages/Step.module.css';

export default function Step() {
  const canvasRef = useRef();

  const [index, setIndex] = useState(0);
  const [iteration, setIteration] = useState(0);

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
    return (x - goalX) + (y - goalY);
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

  // steps canvas
  function step() {
    const index = Math.floor(Math.random() * 4);
    if (index == 0) {
      blockX += 1;
    } else if (index == 1) {
      blockX -= 1;
    } else if (index == 2) {
      blockY += 1;
    } else if (index == 3) {
      blockY -= 1;
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
      setIndex(0);
      reset();
    } else setIndex(old => old + 1);
  }

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    reset();
    draw();
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
