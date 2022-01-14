import { useEffect, useRef } from 'react';

let canvas;
let ctx;

export default function Step() {
  const canvasRef = useRef();

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="256"
        height="256"
      />
    </div>
  );
}
