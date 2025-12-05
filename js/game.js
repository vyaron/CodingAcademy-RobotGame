import { state, setRunning, incrementMoveCount } from './state.js';
import { updateRobotPosition, showMessage, setButtonsEnabled } from './ui.js';
import { soundManager } from './sound.js';

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
    
    // Always start from the original robot position
    let position = { x: currentLevel.robot.x, y: currentLevel.robot.y };
    updateRobotPosition(position.x, position.y, false);
    await sleep(200);
    
    for (let i = 0; i < state.instructions.length; i++) {
        const instruction = state.instructions[i];
        const newPosition = getNewPosition(position, instruction);
        
        // Check if move is valid
        if (!isValidPosition(newPosition)) {
            soundManager.play('wrong');
            showMessage('Hit a wall! Try again.', 'error');
            setRunning(false);
            setButtonsEnabled(true);
            // Reset to starting position
            await sleep(500);
            updateRobotPosition(currentLevel.robot.x, currentLevel.robot.y, false);
            return false;
        }
        
        // Check if hit a trap
        if (isTrappedPosition(newPosition)) {
            await animateMove(position, newPosition);
            soundManager.play('broken');
            showMessage('Hit a trap! Try again.', 'error');
            setRunning(false);
            setButtonsEnabled(true);
            // Reset to starting position
            await sleep(500);
            updateRobotPosition(currentLevel.robot.x, currentLevel.robot.y, false);
            return false;
        }
        
        // Move robot
        await animateMove(position, newPosition);
        position = newPosition;
        incrementMoveCount();
        
        // Check if reached goal
        if (isGoalPosition(position)) {
            soundManager.play('coins');
            showMessage('🎉 Success!', 'success');
            setRunning(false);
            setButtonsEnabled(true);
            return true;
        }
    }
    
    // Completed all moves but didn't reach goal
    soundManager.play('wrong');
    showMessage('Not quite there! Try adding more moves.', 'error');
    setRunning(false);
    setButtonsEnabled(true);
    // Reset to starting position
    await sleep(500);
    updateRobotPosition(currentLevel.robot.x, currentLevel.robot.y, false);
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
