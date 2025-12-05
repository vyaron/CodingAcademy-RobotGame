// Game state management
export const state = {
    currentLevel: 0,
    robotPosition: { x: 0, y: 0 },
    instructions: [],
    isRunning: false,
    moveCount: 0
};

export function resetState() {
    state.instructions = [];
    state.isRunning = false;
    state.moveCount = 0;
}

export function setRobotPosition(x, y) {
    state.robotPosition = { x, y };
}

export function addInstruction(direction) {
    state.instructions.push(direction);
}

export function removeInstruction(index) {
    state.instructions.splice(index, 1);
}

export function clearInstructions() {
    state.instructions = [];
}

export function setRunning(isRunning) {
    state.isRunning = isRunning;
}

export function incrementMoveCount() {
    state.moveCount++;
}

export function nextLevel() {
    state.currentLevel++;
}

export function restartGame() {
    state.currentLevel = 0;
    resetState();
}
