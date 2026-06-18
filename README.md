# Algorithm Visualizer

A React app with **two tabs** — Sorting and Pathfinding — that animates algorithms step-by-step.

---

## How to Run

### Prerequisites
- **Node.js** (v16 or higher) — https://nodejs.org

### Steps

```bash
# 1. Go into the project folder
cd algorithm-visualizer

# 2. Install dependencies (only needed once)
npm install

# 3. Start the app
npm start
```

Opens at **http://localhost:3000** automatically.

---

## Features

### 📊 Sorting Tab
| Algorithm      | Best       | Average    | Worst    | Stable |
|----------------|------------|------------|----------|--------|
| Bubble Sort    | O(n)       | O(n²)      | O(n²)    | ✓      |
| Selection Sort | O(n²)      | O(n²)      | O(n²)    | ✗      |
| Insertion Sort | O(n)       | O(n²)      | O(n²)    | ✓      |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n)| ✓    |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)    | ✗      |

- Color-coded bars: comparing (orange), swapping (red), sorted (green), pivot (yellow)
- Adjustable array size (10–100) and speed
- Live comparisons and swaps counter

### 🗺️ Pathfinding Tab
| Algorithm   | Shortest Path? | Weighted? |
|-------------|----------------|-----------|
| BFS         | ✓ Yes          | ✗ No      |
| DFS         | ✗ No           | ✗ No      |
| Dijkstra's  | ✓ Yes          | ✓ Yes     |
| A*          | ✓ Yes          | ✓ Yes     |

- 20×45 interactive grid
- Click & drag to draw/erase walls
- Animated visited nodes (purple) and shortest path (yellow)
- Live visited count and path length

---

## Project Structure

```
src/
├── algorithms/          # Sorting logic (each returns animation frames)
│   ├── bubbleSort.js
│   ├── selectionSort.js
│   ├── insertionSort.js
│   ├── mergeSort.js
│   └── quickSort.js
├── pathfinding/         # Pathfinding logic
│   ├── bfs.js
│   ├── dfs.js
│   ├── dijkstra.js
│   ├── astar.js
│   └── gridHelpers.js   # Shared: getNeighbors, reconstructPath, createGrid
├── hooks/
│   ├── useVisualizer.js   # Sorting animation state
│   └── usePathfinder.js   # Pathfinding grid state & animation
├── components/
│   ├── ArrayBars.jsx/.css
│   ├── Controls.jsx/.css
│   ├── InfoPanel.jsx/.css
│   ├── PathGrid.jsx/.css
│   ├── PathControls.jsx/.css
│   └── PathInfoPanel.jsx/.css
├── App.jsx              # Tab switcher + layout
└── index.css            # CSS variables & global styles
```

---

## Deploy (free)

```bash
# Vercel
npm install -g vercel && vercel

# OR build manually
npm run build
# Then drag the build/ folder to netlify.com/drop
```

---

## What to say in interviews

> "The sorting visualizer pre-generates all animation frames as plain JS objects, then replays them with configurable setTimeout delays — keeping algorithm logic completely separate from React rendering.
>
> The pathfinding grid uses a 2D array of node objects. Each pathfinding algorithm returns a visitedOrder array and a path array, which the hook animates sequentially. Adding a new algorithm is just writing one function — zero changes to the UI layer."

