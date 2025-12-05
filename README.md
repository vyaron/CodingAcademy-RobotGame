# 🤖 Robot Quest - Programming Challenge Game

A fun, mobile-first drag-and-drop game that introduces programming concepts through interactive puzzle-solving. Perfect as an entry-level challenge for coding bootcamp candidates!

## 🎮 [Play Now!](https://vyaron.github.io/CodingAcademy-RobotGame/)

## 📱 Features

- **Mobile-First Design** - Fully touch-enabled with drag-and-drop controls
- **No Keyboard Required** - Pure visual programming with arrow commands
- **Progressive Difficulty** - 6 levels from beginner to challenging
- **Visual Feedback** - Animations, color coding, and clear success/failure messages
- **Educational** - Teaches sequencing, planning, and algorithmic thinking

## 🎯 Game Overview

Guide a robot through a grid to reach the goal by dragging arrow commands (⬆️⬇️⬅️➡️) into instruction slots. Plan your sequence, run the program, and watch the robot execute your commands!

### What You'll Learn
- ✅ **Sequencing** - Commands execute in order
- ✅ **Planning** - Think ahead to reach the goal
- ✅ **Debugging** - Iterate when your program doesn't work
- ✅ **Problem Solving** - Navigate obstacles and constraints

### Level Progression

1. **Level 1 - First Steps** - Simple 3-move introduction
2. **Level 2 - Turn Around** - Learn to change direction
3. **Level 3 - Wall Blocker** - Avoid obstacles
4. **Level 4 - Maze Runner** - Navigate complex paths
5. **Level 5 - Danger Zone** - Avoid traps
6. **Level 6 - Complex Path** - The ultimate challenge!

## 🚀 How to Play

1. **Drag arrows** (⬆️⬇️⬅️➡️) into the instruction slots
2. **Plan your sequence** to guide the robot to the goal 🎯
3. **Press "Run Program"** to execute your commands
4. **Watch the robot** move according to your instructions
5. **Iterate** if you don't reach the goal - try again!

### Controls

- **Drag & Drop** - Move arrows to instruction slots
- **Run Program** - Execute your sequence
- **Reset** - Restart the current level
- **Clear** - Remove all instructions
- **× on slots** - Remove individual commands

## 💻 Technology Stack

- **Vanilla JavaScript** (ES6 modules)
- **Modern CSS** (CSS Variables, nesting, animations)
- **Mobile-first** responsive design
- **No frameworks** - Pure web standards

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/proj-robot-move.git
cd proj-robot-move
```

2. Open `index.html` in your browser or use a local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

3. Navigate to `http://localhost:8000`

## 📁 Project Structure

```
proj-robot-move/
├── index.html          # Main HTML file
├── styles.css          # All styles with CSS nesting
├── js/
│   ├── main.js        # Entry point & game initialization
│   ├── state.js       # Game state management
│   ├── levels.js      # Level definitions
│   ├── ui.js          # UI rendering & updates
│   ├── dragdrop.js    # Drag & drop functionality
│   └── game.js        # Game logic & execution
└── README.md
```

## 🎨 Design Features

- **Dark theme** with vibrant gradients
- **Smooth animations** for robot movement
- **Responsive layout** - Works on phones, tablets, and desktops
- **Visual feedback** - Green glow when dragging over valid drop zones
- **Color coding** - Robots (blue), goals (green), walls (gray), traps (red)

## 🎓 Educational Use

This game is designed as a **pre-assessment tool** for coding bootcamps to:
- Gauge logical thinking skills
- Assess problem-solving ability
- Introduce programming concepts without syntax
- Motivate candidates with a fun, achievable challenge

### Difficulty Balance
- **Not too hard** - Early levels with 2-4 moves, clear paths
- **Not too easy** - Progressive challenges requiring strategy
- **Just right** - Builds confidence while testing ability

## 🤝 Contributing

Feel free to submit issues or pull requests to improve the game!

## 📄 License

MIT License - Feel free to use for educational purposes

## 🙏 Acknowledgments

Created as an entry challenge for coding bootcamp candidates to test algorithmic thinking in a fun, gamified way.

---

**Ready to test your programming skills?** [Play Robot Quest Now!](https://yourusername.github.io/proj-robot-move/) 🚀
