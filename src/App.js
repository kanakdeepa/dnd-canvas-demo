import React, { useRef, useEffect, useState } from 'react';
import './App.scss';

import Scissor from './images/scissor.svg';
import Eraser from './images/eraser.svg';
import Glue from './images/glue.svg';

const elementState = {
  visible: 'visible',
  hidden: 'hidden',
  broken: 'broken',
};

const tools = [
  { name: 'Scissors', image: Scissor, state: elementState.broken },
  { name: 'Eraser', image: Eraser, state: elementState.hidden },
  { name: 'Glue', image: Glue, state: elementState.visible },
];

const App = () => {
  const canvas = useRef(null);
  const [selectedTool, setSelectedTool] = useState(null);

  // Pass the state of rectangle, circle and triange in order
  const draw = (state = elementState.visible) => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    // Elements are visible
    if (state === elementState.visible) {
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
    }

    // Rectangle is broken
    if (state === elementState.broken) {
      ctx.fillStyle = '#e6672c';
      let rectangle = new Path2D();
      rectangle.rect(20, 20, 25, 30);
      ctx.fill(rectangle);

      rectangle = new Path2D();
      rectangle.rect(50, 20, 25, 30);
      ctx.fill(rectangle);

      ctx.fillStyle = '#f5b337';
      const circle = new Path2D();
      circle.arc(50, 100, 25, 0, 2 * Math.PI);
      ctx.fill(circle);
      ctx.clearRect(46, 60, 7, 70);

      ctx.fillStyle = '#60a024';
      let triangle = new Path2D();
      triangle.moveTo(150, 35);
      triangle.lineTo(150, 90);
      triangle.lineTo(120, 90);
      ctx.fill(triangle);

      triangle = new Path2D();
      triangle.moveTo(160, 35);
      triangle.lineTo(160, 90);
      triangle.lineTo(190, 90);
      ctx.fill(triangle);
    }
  };

  const handleDrop = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    draw(selectedTool);
  };

  const handleStartDrag = (evt, state) => {
    setSelectedTool(state);
  };

  const allowDrop = (evt) => {
    evt.preventDefault();
  };

  useEffect(() => {
    draw(elementState.visible);
  }, []);

  return (
    <div className="app-container">
      <div className="canvas-container">
        <canvas
          ref={canvas}
          height={180}
          onDrop={handleDrop}
          onDragOver={allowDrop}
        ></canvas>
      </div>
      <div className="controls">
        {tools.map((tool) => (
          <img
            src={tool.image}
            alt={tool.name}
            draggable={true}
            onDragStart={(evt) => handleStartDrag(evt, tool.state)}
            key={tool.name}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
