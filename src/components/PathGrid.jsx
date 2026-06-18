import React from 'react';
import './PathGrid.css';

export default function PathGrid({ grid, onMouseDown, onMouseEnter, onMouseUp }) {
  return (
    <div
      className="path-grid"
      onMouseLeave={onMouseUp}
    >
      {grid.map((row, rIdx) => (
        <div key={rIdx} className="grid-row">
          {row.map((cell, cIdx) => {
            let cls = 'grid-cell';
            if (cell.isStart)   cls += ' cell--start';
            else if (cell.isEnd) cls += ' cell--end';
            else if (cell.isPath)    cls += ' cell--path';
            else if (cell.isVisited) cls += ' cell--visited';
            else if (cell.isWall)    cls += ' cell--wall';

            return (
              <div
                key={cIdx}
                className={cls}
                onMouseDown={() => onMouseDown(rIdx, cIdx)}
                onMouseEnter={() => onMouseEnter(rIdx, cIdx)}
                onMouseUp={onMouseUp}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
