import React from 'react';
import './PathInfoPanel.css';

export default function PathInfoPanel({ algoInfo, stats }) {
  return (
    <div className="path-info-panel">
      <div className="pip-section">
        <h2 className="pip-algo-name">{algoInfo.name}</h2>
        <p className="pip-fullname">{algoInfo.fullName}</p>
        <p className="pip-desc">{algoInfo.description}</p>
      </div>

      <div className="pip-section">
        <h3 className="pip-section-title">Properties</h3>
        <div className="pip-props">
          <div className="pip-prop">
            <span className="pip-prop-label">Shortest path?</span>
            <span className={`pip-badge ${algoInfo.guaranteed ? 'pip-badge--green' : 'pip-badge--red'}`}>
              {algoInfo.guaranteed ? '✓ Guaranteed' : '✗ Not guaranteed'}
            </span>
          </div>
          <div className="pip-prop">
            <span className="pip-prop-label">Weighted?</span>
            <span className={`pip-badge ${algoInfo.weighted ? 'pip-badge--cyan' : 'pip-badge--muted'}`}>
              {algoInfo.weighted ? '✓ Yes' : '✗ No'}
            </span>
          </div>
          <div className="pip-prop">
            <span className="pip-prop-label">Time</span>
            <code className="pip-code">{algoInfo.timeComplexity}</code>
          </div>
          <div className="pip-prop">
            <span className="pip-prop-label">Space</span>
            <code className="pip-code">{algoInfo.spaceComplexity}</code>
          </div>
        </div>
      </div>

      <div className="pip-section">
        <h3 className="pip-section-title">Live Stats</h3>
        <div className="pip-stats">
          <div className="pip-stat">
            <span className="pip-stat-val pip-stat-val--purple">{stats.visited}</span>
            <span className="pip-stat-label">Nodes visited</span>
          </div>
          <div className="pip-stat">
            <span className="pip-stat-val pip-stat-val--yellow">{stats.pathLength}</span>
            <span className="pip-stat-label">Path length</span>
          </div>
        </div>
      </div>

      <div className="pip-section">
        <h3 className="pip-section-title">Legend</h3>
        <div className="pip-legend">
          <div className="pip-legend-item"><span className="pip-dot pip-dot--green" />Start node</div>
          <div className="pip-legend-item"><span className="pip-dot pip-dot--red" />End node</div>
          <div className="pip-legend-item"><span className="pip-dot pip-dot--wall" />Wall</div>
          <div className="pip-legend-item"><span className="pip-dot pip-dot--visited" />Visited</div>
          <div className="pip-legend-item"><span className="pip-dot pip-dot--path" />Shortest path</div>
        </div>
      </div>

      <div className="pip-section">
        <h3 className="pip-section-title">How to use</h3>
        <ol className="pip-steps">
          <li><span className="pip-step-num">1</span>Click &amp; drag on the grid to draw walls</li>
          <li><span className="pip-step-num">2</span>Select an algorithm</li>
          <li><span className="pip-step-num">3</span>Press Visualize and watch it find the path</li>
          <li><span className="pip-step-num">4</span>Use Reset to start fresh</li>
        </ol>
      </div>
    </div>
  );
}
