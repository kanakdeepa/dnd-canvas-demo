import React, { useRef, useEffect } from 'react';
import './App.scss';

import Scissor from './images/scissor.svg';
import Eraser from './images/eraser.svg';
import Glue from './images/glue.svg';

const drawElements = (ctx) => {
  ctx.fillStyle = '#e6672c';
  const rectangle = new Path2D();
  rectangle.rect(20, 20, 60, 30);
  ctx.fill(rectangle);

  ctx.fillStyle = '#f5b337';
  const circle = new Path2D();
  circle.arc(50, 100, 25, 0, 2 * Math.PI);
  ctx.fill(circle);

  ctx.fillStyle = '#60a024';
  const triangle = new Path2D();
  triangle.moveTo(150, 35);
  triangle.lineTo(180, 90);
  triangle.lineTo(120, 90);
  ctx.fill(triangle);
};

const App = () => {
  const canvas = useRef(null);

  const handleDrag = (evt) => {
    evt.stopPropagation();
    console.log('handleDrag', evt);
  };

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');

    drawElements(ctx);
  }, []);

  return (
    <div className="app-container">
      <div className="canvas-container">
        <canvas ref={canvas} height={180}></canvas>
      </div>
      <div className="controls">
        <img src={Scissor} alt="scissor" draggable={true} onDrop={handleDrag} />
        <img src={Eraser} alt="eraser" draggable={true} />
        <img src={Glue} alt="glue" draggable={true} />
      </div>
    </div>
  );
};

export default App;
