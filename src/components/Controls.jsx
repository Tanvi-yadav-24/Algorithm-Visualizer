import React from 'react';
import './Controls.css';

const ALGORITHMS = [
  { key: 'bubble',    label: 'Bubble Sort' },
  { key: 'selection', label: 'Selection Sort' },
  { key: 'insertion', label: 'Insertion Sort' },
  { key: 'merge',     label: 'Merge Sort' },
  { key: 'quick',     label: 'Quick Sort' },
];

export default function Controls({
  algorithm, arraySize, speed, isRunning, isDone,
  onAlgoChange, onSizeChange, onSpeedChange,
  onStart, onPause, onReset,
}) {
  const speedLabel = speed <= 10 ? 'Turbo' : speed <= 50 ? 'Fast' : speed <= 150 ? 'Normal' : 'Slow';

  return (
    <div className="controls">
      {/* Algorithm selector */}
      <div className="control-group">
        <label className="control-label">Algorithm</label>
        <div className="algo-tabs">
          {ALGORITHMS.map(a => (
            <button
              key={a.key}
              className={`algo-tab ${algorithm === a.key ? 'algo-tab--active' : ''}`}
              onClick={() => !isRunning && onAlgoChange(a.key)}
              disabled={isRunning}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-row">
        {/* Array size */}
        <div className="control-group control-group--slim">
          <label className="control-label">
            Array Size <span className="control-value">{arraySize}</span>
          </label>
          <input
            type="range" min="10" max="100" value={arraySize}
            onChange={e => !isRunning && onSizeChange(Number(e.target.value))}
            disabled={isRunning}
            className="slider"
          />
        </div>

        {/* Speed */}
        <div className="control-group control-group--slim">
          <label className="control-label">
            Speed <span className="control-value">{speedLabel}</span>
          </label>
          <input
            type="range" min="5" max="300" value={speed}
            onChange={e => onSpeedChange(Number(e.target.value))}
            className="slider slider--reversed"
          />
        </div>

        {/* Action buttons */}
        <div className="control-group control-group--slim control-group--center">
          <label className="control-label">&nbsp;</label>
          <div className="btn-group">
            <button className="btn btn--ghost" onClick={onReset} disabled={isRunning}>
              ↺ Reset
            </button>
            {isRunning ? (
              <button className="btn btn--pause" onClick={onPause}>
                ⏸ Pause
              </button>
            ) : (
              <button className="btn btn--play" onClick={onStart} disabled={isDone}>
                {isDone ? '✓ Done' : '▶ Start'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
