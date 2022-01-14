import { useEffect, useRef } from 'react';

let canvas;
let ctx;

const gridWidth = 33;
const gridHeight = 33;
const gridSize = 16;
const width = gridWidth * gridSize;
const height = gridHeight * gridSize;

import styles from '../styles/pages/Step.module.css';

export default function Step() {
  const canvasRef = useRef();

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
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
