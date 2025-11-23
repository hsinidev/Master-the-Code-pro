
// Centralized Assets for 42 Aesthetic

export const GameColors = {
  // Defined strictly from prompt
  bgLight: '#f3f4f6', // Light Grey/White for canvas
  blue: '#3b82f6',    // Color 1: Target/Conditional/Left
  green: '#22c55e',   // Color 2: Start/Path/F1
  orange: '#f97316',  // Color 3: Obstacle/Wall/Right
  red: '#ef4444',     // F2 (Adding Red for F2 distinction)
  agentBlack: '#1a1a1a',
  starWhite: '#ffffff',
  moveGray: '#e5e7eb',
  moveText: '#374151'
};

export const Icons = {
  // Simple SVG paths for inline rendering
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  turnLeft: "M9 10L4 15L9 20M4 15H14C17.3137 15 20 12.3137 20 9V4", // Corner Up Left style
  turnRight: "M15 10L20 15L15 20M20 15H10C6.68629 15 4 12.3137 4 9V4", // Corner Up Right style
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  agent: "M5 3L19 12L5 21V3Z" // Triangle
};
