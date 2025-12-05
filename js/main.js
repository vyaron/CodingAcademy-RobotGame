import { state, resetState, clearInstructions, nextLevel, restartGame } from './state.js';
import { getLevel, getTotalLevels } from './levels.js';
import { 
    renderGrid, 
    renderInstructionSlots, 
    updateInstructionSlots,
    updateLevelDisplay,
    updateMovesDisplay,
    showMessage,
    showLevelCompleteModal,
    hideLevelCompleteModal,
    hideGameCompleteModal,
    clearVisitedCells,
    clearMessage,
    setButtonsEnabled
} from './ui.js';
import { initDragAndDrop, updateSlotListeners, setCurrentMaxMoves } from './dragdrop.js';
import { executeProgram, setCurrentLevel } from './game.js';

let currentLevelData = null;

function initGame() {
    loadLevel(state.currentLevel);
    setupEventListeners();
}

function loadLevel(levelIndex) {
    const level = getLevel(levelIndex);
    
    if (!level) {
        console.error('Level not found');
        return;
    }
    
    currentLevelData = level;
    setCurrentLevel(level);
    resetState();
    state.currentLevel = levelIndex;
    
    // Update UI
    renderGrid(level);
    renderInstructionSlots(level.maxMoves);
    updateInstructionSlots();
    updateLevelDisplay(level.id);
    updateMovesDisplay(level.maxMoves);
    clearVisitedCells();
    clearMessage();
    setCurrentMaxMoves(level.maxMoves);
    
    // Update level selector buttons
    updateLevelSelector(levelIndex);
    
    // Initialize drag and drop
    initDragAndDrop(level);
    
    showMessage(`Level ${level.id}: ${level.description}`, 'info');
}

function setupEventListeners() {
    // Run button
    document.getElementById('run-btn').addEventListener('click', async () => {
        const success = await executeProgram();
        
        if (success) {
            setTimeout(() => {
                handleLevelComplete();
            }, 1000);
        }
    });
    
    // Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
        loadLevel(state.currentLevel);
    });
    
    // Clear button
    document.getElementById('clear-btn').addEventListener('click', () => {
        clearInstructions();
        updateInstructionSlots();
        updateMovesDisplay(currentLevelData.maxMoves);
        clearMessage();
    });
    
    // Next level button
    document.getElementById('next-level-btn').addEventListener('click', () => {
        hideLevelCompleteModal();
        nextLevel();
        loadLevel(state.currentLevel);
    });
    
    // Restart button (game complete)
    document.getElementById('restart-btn').addEventListener('click', () => {
        hideGameCompleteModal();
        restartGame();
        loadLevel(0);
    });
    
    // Level selector buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const levelIndex = parseInt(btn.dataset.level);
            loadLevel(levelIndex);
        });
    });
}

function updateLevelSelector(currentLevelIndex) {
    document.querySelectorAll('.level-btn').forEach((btn, index) => {
        if (parseInt(btn.dataset.level) === currentLevelIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function handleLevelComplete() {
    const isLastLevel = state.currentLevel >= getTotalLevels() - 1;
    showLevelCompleteModal(currentLevelData.id, isLastLevel);
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
