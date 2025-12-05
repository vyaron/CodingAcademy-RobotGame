// Level definitions
export const levels = [
    {
        id: 1,
        name: "First Steps",
        description: "Move 3 steps right to reach the goal",
        gridSize: 5,
        maxMoves: 3,
        robot: { x: 0, y: 2 },
        goal: { x: 3, y: 2 },
        walls: [],
        traps: []
    },
    {
        id: 2,
        name: "Wall Blocker",
        description: "Avoid the wall!",
        gridSize: 5,
        maxMoves: 6,
        robot: { x: 0, y: 2 },
        goal: { x: 4, y: 2 },
        walls: [
            { x: 2, y: 2 }
        ],
        traps: []
    },
    {
        id: 3,
        name: "Maze Runner",
        description: "Navigate through the walls",
        gridSize: 5,
        maxMoves: 12,
        robot: { x: 0, y: 0 },
        goal: { x: 4, y: 4 },
        walls: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 3, y: 3 },
            { x: 3, y: 4 }
        ],
        traps: []
    },
    {
        id: 4,
        name: "Danger Zone",
        description: "Avoid the traps!",
        gridSize: 5,
        maxMoves: 8,
        robot: { x: 0, y: 2 },
        goal: { x: 4, y: 2 },
        walls: [],
        traps: [
            { x: 2, y: 2 },
            { x: 2, y: 1 },
            { x: 2, y: 3 }
        ]
    },
    {
        id: 5,
        name: "Complex Path",
        description: "The ultimate challenge!",
        gridSize: 5,
        maxMoves: 8,
        robot: { x: 0, y: 0 },
        goal: { x: 4, y: 4 },
        walls: [
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 2, y: 3 },
            { x: 2, y: 4 },
        ],
        traps: [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 4, y: 2 },
        ]
    }
];

export function getLevel(index) {
    return levels[index] || null;
}

export function getTotalLevels() {
    return levels.length;
}
