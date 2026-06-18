import React, { useState } from 'react';
import './App.css';

// Sorting tab
import ArrayBars from './components/ArrayBars';
import Controls from './components/Controls';
import InfoPanel from './components/InfoPanel';
import { useVisualizer } from './hooks/useVisualizer';

// Pathfinding tab
import PathGrid from './components/PathGrid';
import PathControls from './components/PathControls';
import PathInfoPanel from './components/PathInfoPanel';
import { usePathfinder } from './hooks/usePathfinder';

export default function App() {
  const [activeTab, setActiveTab] = useState('sorting');

  const sorting = useVisualizer();
  const pathfinding = usePathfinder();

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span className="header-logo">{'<'}<span className="logo-accent">AV</span>{'/>'}</span>
          <span className="header-title">Algorithm Visualizer</span>
        </div>

        {/* Tab switcher */}
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === 'sorting' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('sorting')}
          >
            📊 Sorting
          </button>
          <button
            className={`tab-btn ${activeTab === 'pathfinding' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('pathfinding')}
          >
            🗺️ Pathfinding
          </button>
        </div>

        <div className="header-right">
          <span className="header-tag">React</span>
          <span className="header-tag">JavaScript</span>
          <span className="header-tag">CSS Animations</span>
        </div>
      </header>

      {/* Main layout */}
      <div className="main">

        {/* ===== SORTING TAB ===== */}
        {activeTab === 'sorting' && (
          <>
            <div className="visualizer-area">
              <div className="canvas">
                <ArrayBars array={sorting.array} colorMap={sorting.colorMap} />
              </div>
              <Controls
                algorithm={sorting.algorithm}
                arraySize={sorting.arraySize}
                speed={sorting.speed}
                isRunning={sorting.isRunning}
                isDone={sorting.isDone}
                onAlgoChange={sorting.handleAlgoChange}
                onSizeChange={sorting.handleSizeChange}
                onSpeedChange={sorting.setSpeed}
                onStart={sorting.start}
                onPause={sorting.pause}
                onReset={sorting.reset}
              />
            </div>
            <InfoPanel
              algoInfo={sorting.algoInfo}
              stats={sorting.stats}
              colorMap={sorting.colorMap}
              arraySize={sorting.arraySize}
            />
          </>
        )}

        {/* ===== PATHFINDING TAB ===== */}
        {activeTab === 'pathfinding' && (
          <>
            <div className="visualizer-area">
              <div className="path-canvas">
                <PathGrid
                  grid={pathfinding.grid}
                  onMouseDown={pathfinding.handleMouseDown}
                  onMouseEnter={pathfinding.handleMouseEnter}
                  onMouseUp={pathfinding.handleMouseUp}
                />
              </div>
              <PathControls
                algorithm={pathfinding.algorithm}
                speed={pathfinding.speed}
                isRunning={pathfinding.isRunning}
                isDone={pathfinding.isDone}
                onAlgoChange={pathfinding.handleAlgoChange}
                onSpeedChange={pathfinding.setSpeed}
                onStart={pathfinding.start}
                onPause={pathfinding.pause}
                onReset={pathfinding.reset}
                onClearPath={pathfinding.clearPath}
              />
            </div>
            <PathInfoPanel
              algoInfo={pathfinding.algoInfo}
              stats={pathfinding.stats}
            />
          </>
        )}
      </div>
    </div>
  );
}
