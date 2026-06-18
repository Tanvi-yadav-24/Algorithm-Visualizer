import React from 'react';
import './ArrayBars.css';

export default function ArrayBars({ array, colorMap }) {
  const maxVal = Math.max(...array);

  return (
    <div className="bars-container">
      {array.map((val, idx) => {
        const state = colorMap[idx] || 'default';
        const heightPct = (val / maxVal) * 100;

        return (
          <div
            key={idx}
            className={`bar bar--${state}`}
            style={{ height: `${heightPct}%` }}
            title={val}
          >
            {array.length <= 20 && (
              <span className="bar-label">{val}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
