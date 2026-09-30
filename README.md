# 🔍 Murder Mystery Game

A multiplayer murder mystery game where players work together to solve crimes and catch the culprit!

## Features

🎮 **Multiplayer Gameplay**
- Create a new game or join an existing one using a game code
- Play with friends online
- Real-time player list and game chat

🕵️ **Investigation Mechanics**
- Receive a detailed case description
- Interview suspects with motives and backgrounds
- Discover and analyze clues
- Collaborate with other players through discussion chat

🗳️ **Voting System**
- All players vote on who they think is guilty
- Majority vote reveals the culprit
- Instant feedback on whether you solved the case correctly

📚 **Multiple Cases**
- The Diamond Heist
- The Poisoned Dinner
- The Disappeared Witness
- More cases coming soon!

## How to Play

### 1. Start or Join a Game
- **Create**: Enter your name and click "Create New Game" to start a new mystery
- **Join**: Enter your name and the game code provided by the host to join an existing game

### 2. Investigate
- Read the case description to understand what happened
- Study the suspects - their roles and motives
- Examine all available clues carefully
- Discuss with other players in the chat

### 3. Vote
- Use the voting section to cast your vote for who you think is guilty
- All players must vote to proceed
- The suspect with the most votes will be accused

### 4. Solve
- Find out if you caught the real culprit
- Learn about the true perpetrator if you were wrong
- Start a new game to try another case

## Game Codes

When you create a game, a unique 6-character code is generated. Share this code with friends so they can join your game!

**Example Code:** `AB3XY7`

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Game State**: Local browser storage + in-memory game state
- **No Backend Required**: This version runs entirely in the browser (suitable for local play or with a real backend for online multiplayer)

## Installation

1. Clone this repository
2. Open `index.html` in your web browser
3. Start playing!

### For Online Multiplayer

To enable real online multiplayer, you'll need to integrate with a backend service like:
- WebSocket server for real-time communication
- Database to store game state and player data
- Player authentication system

## Game Mechanics

### Cases
Each case has:
- A unique title and description
- 3 suspects with different motives
- 5 clues to help identify the culprit
- 1 true culprit

### Voting
- The game waits for all players to vote
- The suspect with the most votes is accused
- If correct, players win and see the case solved
- If incorrect, players see the actual culprit revealed

## Future Enhancements

- [ ] Backend server for true online multiplayer
- [ ] More murder mystery cases
- [ ] Clue difficulty levels
- [ ] Multiplayer chat enhancements
- [ ] Player achievements and stats
- [ ] Custom case creator
- [ ] Turn-based interrogation system
- [ ] Time limits for enhanced difficulty

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this for personal and educational purposes.

---

**Ready to solve a crime?** Start the game and put your detective skills to the test! 🔍
