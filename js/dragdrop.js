import { state, addInstruction, removeInstruction } from './state.js';
import { updateInstructionSlots, updateMovesDisplay } from './ui.js';

let draggedElement = null;
let touchStartX = 0;
let touchStartY = 0;

export function initDragAndDrop(currentLevel) {
    // Make arrows draggable
    const arrows = document.querySelectorAll('.arrow');
    console.log('Initializing drag and drop for', arrows.length, 'arrows');
    arrows.forEach(arrow => {
        // Mouse events
        arrow.addEventListener('dragstart', handleDragStart);
        arrow.addEventListener('dragend', handleDragEnd);
        
        // Touch events for mobile
        arrow.addEventListener('touchstart', handleTouchStart, { passive: false });
        arrow.addEventListener('touchmove', handleTouchMove, { passive: false });
        arrow.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
    
    // Make slots drop targets
    updateSlotListeners();
}

function handleDragStart(e) {
    console.log('Drag start (mouse)');
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('direction', e.target.dataset.direction);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedElement = null;
}

function handleTouchStart(e) {
    console.log('Touch start event fired!');
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    draggedElement = e.target.cloneNode(true);
    draggedElement.style.cssText = `
        position: fixed;
        left: ${touch.clientX - 30}px;
        top: ${touch.clientY - 30}px;
        width: 60px;
        height: 60px;
        z-index: 10000;
        pointer-events: none;
        opacity: 0.9;
        border: 2px solid #6366f1;
        border-radius: 8px;
        padding: 16px;
        font-size: 2.5rem;
        text-align: center;
        background: #334155;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(draggedElement);
    
    e.target.style.opacity = '0.3';
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!draggedElement) return;
    
    const touch = e.touches[0];
    draggedElement.style.left = touch.clientX - 30 + 'px';
    draggedElement.style.top = touch.clientY - 30 + 'px';
    
    // Temporarily hide the dragged element to detect what's underneath
    draggedElement.style.display = 'none';
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    draggedElement.style.display = 'flex';
    
    console.log('Element below:', elementBelow, 'Has slot class:', elementBelow?.classList.contains('slot'));
    
    // Highlight slot under touch
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => slot.classList.remove('drag-over'));
    
    if (elementBelow && elementBelow.classList.contains('slot')) {
        console.log('drag-over slot - SHOULD BE GREEN NOW');
        elementBelow.classList.add('drag-over');
        // Style the dragged arrow to show it can be dropped - GREEN BORDER
        draggedElement.style.border = '4px solid #10b981';
        draggedElement.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
        draggedElement.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
    } else {
        // Reset style when not over a slot - PURPLE BORDER
        draggedElement.style.border = '2px solid #6366f1';
        draggedElement.style.backgroundColor = '#334155';
        draggedElement.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.4)';
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    
    const originalArrow = e.target;
    originalArrow.style.opacity = '1';
    
    if (!draggedElement) return;
    
    const touch = e.changedTouches[0];
    // Hide dragged element to detect what's underneath
    draggedElement.style.display = 'none';
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (elementBelow && elementBelow.classList.contains('slot')) {
        const index = parseInt(elementBelow.dataset.index);
        const direction = originalArrow.dataset.direction;
        
        // Add instruction if slot is empty or within bounds
        if (index < state.instructions.length + 1) {
            if (state.instructions[index]) {
                // Replace existing instruction
                state.instructions[index] = direction;
            } else {
                // Add new instruction
                addInstruction(direction);
            }
            updateInstructionSlots();
            updateMovesDisplay(getCurrentMaxMoves());
        }
    }
    
    document.body.removeChild(draggedElement);
    draggedElement = null;
    
    // Remove all drag-over highlights
    document.querySelectorAll('.slot').forEach(slot => slot.classList.remove('drag-over'));
}

export function updateSlotListeners() {
    const slots = document.querySelectorAll('.slot');
    
    slots.forEach(slot => {
        // Remove old listeners by cloning
        const newSlot = slot.cloneNode(true);
        slot.parentNode.replaceChild(newSlot, slot);
        
        // Mouse drag events
        newSlot.addEventListener('dragover', handleDragOver);
        newSlot.addEventListener('dragleave', handleDragLeave);
        newSlot.addEventListener('drop', handleDrop);
        
        // Click to remove
        newSlot.addEventListener('click', handleSlotClick);
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.target.classList.add('drag-over');
    console.log('Mouse drag over slot - adding green highlight');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const direction = e.dataTransfer.getData('direction');
    const index = parseInt(e.target.dataset.index);
    
    // Add instruction if slot is empty or within bounds
    if (index < state.instructions.length + 1) {
        if (state.instructions[index]) {
            // Replace existing instruction
            state.instructions[index] = direction;
        } else {
            // Add new instruction
            addInstruction(direction);
        }
        updateInstructionSlots();
        updateMovesDisplay(getCurrentMaxMoves());
    }
}

function handleSlotClick(e) {
    const removeBtn = e.target.closest('.remove-btn');
    if (removeBtn) {
        const index = parseInt(removeBtn.dataset.index);
        removeInstruction(index);
        updateInstructionSlots();
        updateMovesDisplay(getCurrentMaxMoves());
    }
}

let currentMaxMoves = 3;

export function setCurrentMaxMoves(maxMoves) {
    currentMaxMoves = maxMoves;
}

function getCurrentMaxMoves() {
    return currentMaxMoves;
}
