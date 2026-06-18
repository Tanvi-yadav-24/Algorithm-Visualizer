import React from 'react';
import './PathControls.css';

const ALGORITHMS = [
  { key: 'bfs',      label: 'BFS' },
  { key: 'dfs',      label: 'DFS' },
  { key: 'dijkstra', label: "Dijkstra's" },
  { key: 'astar',    label: 'A*' },
];

export default function PathControls({
  algorithm, speed, isRunning, isDone,
  onAlgoChange, onSpeedChange,
  onStart, onPause, onReset, onClearPath,
}) {
  const speedLabel = speed <= 5 ? 'Turbo' : speed <= 20 ? 'Fast' : speed <= 60 ? 'Normal' : 'Slow';

  return (
    <div className="path-controls">
      <div className="pctrl-group">
        <label className="pctrl-label">Algorithm</label>
        <div className="palgo-tabs">
          {ALGORITHMS.map(a => (
            <button
              key={a.key}
              className={`palgo-tab ${algorithm === a.key ? 'palgo-tab--active' : ''}`}
              onClick={() => !isRunning && onAlgoChange(a.key)}
              disabled={isRunning}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pctrl-row">
        <div className="pctrl-group pctrl-group--slim">
          <label className="pctrl-label">
            Speed <span className="pctrl-value">{speedLabel}</span>
          </label>
          <input
            type="range" min="2" max="100" value={speed}
            onChange={e => onSpeedChange(Number(e.target.value))}
            className="pslider"
          />
        </div>

        <div className="pctrl-group pctrl-group--slim pctrl-hint">
          <label className="pctrl-label">Draw Walls</label>
          <span className="hint-text">Click & drag on the grid to place walls</span>
        </div>

        <div className="pctrl-group pctrl-group--slim">
          <label className="pctrl-label">&nbsp;</label>
          <div className="pbtn-group">
            <button className="pbtn pbtn--ghost" onClick={onClearPath} disabled={isRunning}>
              ✕ Clear Path
            </button>
            <button className="pbtn pbtn--ghost" onClick={onReset} disabled={isRunning}>
              ↺ Reset
            </button>
            {isRunning ? (
              <button className="pbtn pbtn--pause" onClick={onPause}>⏸ Pause</button>
            ) : (
              <button className="pbtn pbtn--play" onClick={onStart} disabled={isDone}>
                {isDone ? '✓ Done' : '▶ Visualize'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
