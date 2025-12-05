import { state, setRobotPosition } from './state.js';

let currentLevel = null;

export function renderGrid(level) {
    currentLevel = level;
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    gridContainer.style.setProperty('--grid-size', level.gridSize);
    
    for (let y = 0; y < level.gridSize; y++) {
        for (let x = 0; x < level.gridSize; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;
            
            // Check if this cell is the robot
            if (x === level.robot.x && y === level.robot.y) {
                cell.classList.add('robot');
                const robotSpan = document.createElement('span');
                robotSpan.className = 'robot-emoji';
                robotSpan.textContent = '🤖';
                cell.appendChild(robotSpan);
                setRobotPosition(x, y);
            }
            
            // Check if this cell is the goal
            if (x === level.goal.x && y === level.goal.y) {
                cell.classList.add('goal');
                cell.textContent = '🎯';
            }
            
            // Check if this cell is a wall
            if (level.walls.some(wall => wall.x === x && wall.y === y)) {
                cell.classList.add('wall');
                cell.textContent = '🧱';
            }
            
            // Check if this cell is a trap
            if (level.traps.some(trap => trap.x === x && trap.y === y)) {
                cell.classList.add('trap');
                cell.textContent = '💥';
            }
            
            gridContainer.appendChild(cell);
        }
    }
}

export function updateRobotPosition(x, y, animate = true) {
    const cells = document.querySelectorAll('.cell');
    
    // Remove all robot emojis and robot class from all cells
    cells.forEach(cell => {
        cell.classList.remove('robot');
        const robotSpan = cell.querySelector('.robot-emoji');
        if (robotSpan) robotSpan.remove();
        
        // Mark non-special cells as visited
        if (!cell.classList.contains('goal') && !cell.classList.contains('wall') && !cell.classList.contains('trap')) {
            if (cell.dataset.x !== undefined && cell.dataset.y !== undefined) {
                const cellX = parseInt(cell.dataset.x);
                const cellY = parseInt(cell.dataset.y);
                if (cellX === state.robotPosition.x && cellY === state.robotPosition.y) {
                    cell.classList.add('visited');
                }
            }
        }
    });
    
    // Add robot to new position
    const newCell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if (newCell && !newCell.classList.contains('wall')) {
        newCell.classList.add('robot');
        const robotSpan = document.createElement('span');
        robotSpan.className = 'robot-emoji';
        robotSpan.textContent = '🤖';
        newCell.appendChild(robotSpan);
    }
    
    setRobotPosition(x, y);
}

export function renderInstructionSlots(maxMoves) {
    const slotsContainer = document.getElementById('instruction-slots');
    slotsContainer.innerHTML = '';
    
    for (let i = 0; i < maxMoves; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.dataset.index = i;
        slotsContainer.appendChild(slot);
    }
}

export function updateInstructionSlots() {
    const slots = document.querySelectorAll('.slot');
    
    slots.forEach((slot, index) => {
        const instruction = state.instructions[index];
        
        if (instruction) {
            slot.classList.add('filled');
            const arrow = getArrowEmoji(instruction);
            slot.innerHTML = `
                ${arrow}
                <button class="remove-btn" data-index="${index}">×</button>
            `;
        } else {
            slot.classList.remove('filled');
            slot.innerHTML = '';
        }
    });
}

export function updateLevelDisplay(levelNumber) {
    document.getElementById('current-level').textContent = levelNumber;
}

export function updateMovesDisplay(maxMoves) {
    document.getElementById('moves-used').textContent = state.instructions.length;
    document.getElementById('moves-limit').textContent = maxMoves;
}

export function showMessage(text, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    
    if (type !== 'info') {
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 3000);
    }
}

export function clearMessage() {
    const messageEl = document.getElementById('message');
    messageEl.textContent = '';
    messageEl.className = 'message';
}

export function showLevelCompleteModal(levelNumber, isLastLevel) {
    if (isLastLevel) {
        const modal = document.getElementById('game-complete-modal');
        modal.classList.add('show');
    } else {
        const modal = document.getElementById('level-complete-modal');
        const message = document.getElementById('modal-message');
        message.textContent = `Great job! You completed level ${levelNumber}!`;
        modal.classList.add('show');
    }
}

export function hideLevelCompleteModal() {
    document.getElementById('level-complete-modal').classList.remove('show');
}

export function hideGameCompleteModal() {
    document.getElementById('game-complete-modal').classList.remove('show');
}

export function clearVisitedCells() {
    document.querySelectorAll('.visited').forEach(cell => {
        cell.classList.remove('visited');
    });
}

function getArrowEmoji(direction) {
    const arrows = {
        up: '⬆️',
        down: '⬇️',
        left: '⬅️',
        right: '➡️'
    };
    return arrows[direction] || '';
}

export function setButtonsEnabled(enabled) {
    document.getElementById('run-btn').disabled = !enabled;
    document.getElementById('reset-btn').disabled = !enabled;
    document.getElementById('clear-btn').disabled = !enabled;
}
