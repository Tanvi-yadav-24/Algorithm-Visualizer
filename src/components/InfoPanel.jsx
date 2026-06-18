import React from 'react';
import './InfoPanel.css';

export default function InfoPanel({ algoInfo, stats, colorMap, arraySize }) {
  const sortedCount = Object.values(colorMap).filter(v => v === 'sorted').length;
  const progress = arraySize > 0 ? Math.round((sortedCount / arraySize) * 100) : 0;

  return (
    <div className="info-panel">
      {/* Algorithm name */}
      <div className="info-section">
        <h2 className="algo-name">{algoInfo.name}</h2>
        <p className="algo-desc">{algoInfo.description}</p>
      </div>

      {/* Complexity */}
      <div className="info-section">
        <h3 className="section-title">Complexity</h3>
        <div className="complexity-grid">
          <div className="complexity-item">
            <span className="complexity-label">Best</span>
            <code className="complexity-value complexity-value--green">{algoInfo.timeComplexity.best}</code>
          </div>
          <div className="complexity-item">
            <span className="complexity-label">Average</span>
            <code className="complexity-value complexity-value--yellow">{algoInfo.timeComplexity.average}</code>
          </div>
          <div className="complexity-item">
            <span className="complexity-label">Worst</span>
            <code className="complexity-value complexity-value--red">{algoInfo.timeComplexity.worst}</code>
          </div>
          <div className="complexity-item">
            <span className="complexity-label">Space</span>
            <code className="complexity-value complexity-value--cyan">{algoInfo.spaceComplexity}</code>
          </div>
        </div>

        <div className="stability-badge">
          <span className={`badge ${algoInfo.stable ? 'badge--green' : 'badge--red'}`}>
            {algoInfo.stable ? '✓ Stable' : '✗ Unstable'}
          </span>
        </div>
      </div>

      {/* Live stats */}
      <div className="info-section">
        <h3 className="section-title">Live Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value stat-value--orange">{stats.comparisons}</span>
            <span className="stat-label">Comparisons</span>
          </div>
          <div className="stat-item">
            <span className="stat-value stat-value--red">{stats.swaps}</span>
            <span className="stat-label">Swaps</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-wrap">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">{progress}% sorted</span>
        </div>
      </div>

      {/* Legend */}
      <div className="info-section">
        <h3 className="section-title">Legend</h3>
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'var(--bar-default)'}} />Default</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'var(--bar-compare)'}} />Comparing</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'var(--bar-swap)'}} />Swapping</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'var(--bar-sorted)'}} />Sorted</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'var(--bar-pivot)'}} />Pivot</div>
        </div>
      </div>

      {/* Steps */}
      <div className="info-section">
        <h3 className="section-title">How it works</h3>
        <ol className="steps-list">
          {algoInfo.steps.map((step, i) => (
            <li key={i} className="step-item">
              <span className="step-num">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
