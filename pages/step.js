import Header from '../components/Header';

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

const delay = 1;

let path = [];
let weights = [];
for (let i = 0; i < steps; i++) {
  weights.push([[], [], [], []]);
}

let index = 0;
let go = false;

import styles from '../styles/pages/Step.module.css';

export default function Step() {
  const canvasRef = useRef();

  const [iteration, setIteration] = useState(undefined);
  const [cont, setCont] = useState(false);

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
    // handle
    move();
    draw();
    // rollover
    if (index === steps - 1) {
      // update weighting
      const currScore = score();
      for (let i = 0; i < steps; i++) {
        weights[i][path[i]].push(currScore);
      }
      reset();
      setIteration(old => old + 1);
      index = 0;
      if (go) setTimeout(step, delay);
    // increment
    } else {
      index += 1;
      setTimeout(step, delay);
    }
  }

  // runs best possible path
  function runBest() {
    if (!validWeights()) return;
    path = bestPath();
    go = false;
    step();
  }

  // returns whether current weights are valid
  function validWeights() {
    for (const arr of averageWeights()) {
      for (const elem of arr) {
        if (elem === null) return false;
      }
    }
    return true;
  }

  // determines best weighted path
  function bestPath() {
    if (!validWeights()) return 'N/A';
    const best = [];
    for (const arr of averageWeights()) {
      let idx = -1;
      let max = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i] > max) {
          max = arr[i];
          idx = i;
        }
      }
      best.push(idx);
    }
    return best;
  }

  // returns averaged weights array
  function averageWeights(round) {
    const averaged = [];
    for (let i = 0; i < steps; i++) {
      const arr = weights[i];
      const newArr = [];
      for (const subArr of arr) {
        const len = subArr.length;
        if (len === 0) newArr.push(null);
        else {
          let avg = subArr.reduce((a, b) => a + b) / len;
          if (round) avg = parseFloat(avg.toFixed(2));
          newArr.push(avg);
        }
      }
      averaged.push(newArr);
    }
    return averaged;
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
      <Header />
      <p className={styles.weights}>
        Weights<br />{JSON.stringify(averageWeights(true))}
      </p>
      <div className={styles.toolbar}>
        <p>Index {index} Iteration {iteration} Score {score().toFixed(2)}</p>
        <p>Path {path}</p>
        <p>
          Best path {bestPath()}
          {' '}
          {validWeights() && <button onClick={runBest}>Run</button>}
        </p>
        <button onClick={() => {
          if (go) return;
          go = true;
          step();
        }}>
          Step
        </button>
        <button onClick={() => {
          go = false;
        }}>
          Stop
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
