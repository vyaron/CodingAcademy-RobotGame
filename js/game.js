import { state, setRunning, incrementMoveCount } from './state.js';
import { updateRobotPosition, showMessage, setButtonsEnabled } from './ui.js';

let currentLevel = null;

export function setCurrentLevel(level) {
    currentLevel = level;
}

export async function executeProgram() {
    if (state.instructions.length === 0) {
        showMessage('Add some commands first!', 'error');
        return false;
    }
    
    setRunning(true);
    setButtonsEnabled(false);
    showMessage('Running program...', 'info');
    
    let position = { ...state.robotPosition };
    
    for (let i = 0; i < state.instructions.length; i++) {
        const instruction = state.instructions[i];
        const newPosition = getNewPosition(position, instruction);
        
        // Check if move is valid
        if (!isValidPosition(newPosition)) {
            showMessage('Hit a wall! Try again.', 'error');
            setRunning(false);
            setButtonsEnabled(true);
            return false;
        }
        
        // Check if hit a trap
        if (isTrappedPosition(newPosition)) {
            await animateMove(position, newPosition);
            showMessage('Hit a trap! Try again.', 'error');
            setRunning(false);
            setButtonsEnabled(true);
            return false;
        }
        
        // Move robot
        await animateMove(position, newPosition);
        position = newPosition;
        incrementMoveCount();
        
        // Check if reached goal
        if (isGoalPosition(position)) {
            showMessage('🎉 Success!', 'success');
            setRunning(false);
            setButtonsEnabled(true);
            return true;
        }
    }
    
    // Completed all moves but didn't reach goal
    showMessage('Not quite there! Try adding more moves.', 'error');
    setRunning(false);
    setButtonsEnabled(true);
    return false;
}

function getNewPosition(position, direction) {
    const newPos = { ...position };
    
    switch (direction) {
        case 'up':
            newPos.y -= 1;
            break;
        case 'down':
            newPos.y += 1;
            break;
        case 'left':
            newPos.x -= 1;
            break;
        case 'right':
            newPos.x += 1;
            break;
    }
    
    return newPos;
}

function isValidPosition(position) {
    // Check bounds
    if (position.x < 0 || position.x >= currentLevel.gridSize ||
        position.y < 0 || position.y >= currentLevel.gridSize) {
        return false;
    }
    
    // Check walls
    const isWall = currentLevel.walls.some(
        wall => wall.x === position.x && wall.y === position.y
    );
    
    return !isWall;
}

function isTrappedPosition(position) {
    return currentLevel.traps.some(
        trap => trap.x === position.x && trap.y === position.y
    );
}

function isGoalPosition(position) {
    return position.x === currentLevel.goal.x && position.y === currentLevel.goal.y;
}

async function animateMove(from, to) {
    updateRobotPosition(to.x, to.y, true);
    await sleep(400);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
