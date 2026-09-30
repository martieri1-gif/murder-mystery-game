// Game State
let gameState = {
    playerId: null,
    playerName: null,
    gameCode: null,
    isHost: false,
    players: [],
    currentCase: null,
    suspects: [],
    clues: [],
    messages: [],
    votes: {},
    gameStatus: 'lobby' // lobby, playing, voting, gameOver
};

// Game Data - Different cases to randomly select from
const cases = [
    {
        id: 1,
        title: "The Diamond Heist",
        description: "A priceless diamond has been stolen from the museum's vault! The alarm was disabled, and only three people had access. The crime happened between 8 PM and midnight. Detective, you must find who stole the Diamond of Destiny!",
        suspects: [
            { id: 1, name: "Dr. Sterling", role: "Museum Curator", motive: "Financial troubles" },
            { id: 2, name: "Maya Chen", role: "Security Guard", motive: "Recently fired" },
            { id: 3, name: "Victor Rothschild", role: "Insurance Agent", motive: "Insurance fraud scheme" }
        ],
        clues: [
            { text: "Muddy footprints found near the vault", important: false },
            { text: "A stolen keycard with Dr. Sterling's photo", important: true },
            { text: "Text message about 'the job' sent from Maya's phone at 11:45 PM", important: true },
            { text: "Victor was seen near the museum that night", important: false },
            { text: "Diamond-shaped stain on Dr. Sterling's office floor", important: false }
        ],
        culprit: 2
    },
    {
        id: 2,
        title: "The Poisoned Dinner",
        description: "At an exclusive restaurant, the wealthy businessman Thomas Blackwood collapsed during dinner and died before arriving at the hospital. The poison was in his wine glass. Three dinner guests had the opportunity to poison him.",
        suspects: [
            { id: 1, name: "Sophia Blackwood", role: "Wife", motive: "Inheritance" },
            { id: 2, name: "Richard Blackwood", role: "Son", motive: "Cut off from trust fund" },
            { id: 3, name: "Elena Rossi", role: "Business Partner", motive: "Betrayal in business deal" }
        ],
        clues: [
            { text: "Sophia was seen carrying a small vial earlier that day", important: true },
            { text: "Richard made large gambling debts recently", important: false },
            { text: "Empty poison container found in Elena's purse", important: true },
            { text: "Thomas had recently dissolved his partnership with Elena", important: true },
            { text: "Wine bottle from expensive vineyard purchased that morning", important: false }
        ],
        culprit: 3
    },
    {
        id: 3,
        title: "The Disappeared Witness",
        description: "A crucial witness in a major trial has vanished! The witness was last seen at their apartment. Three suspects had motive and opportunity to make them disappear.",
        suspects: [
            { id: 1, name: "Detective Marcus", role: "Police Officer", motive: "Protecting criminal contacts" },
            { id: 2, name: "Lisa Knight", role: "Defense Attorney", motive: "To sabotage the trial" },
            { id: 3, name: "Dimitri Volkov", role: "Crime Boss", motive: "Silencing testimony" }
        ],
        clues: [
            { text: "Traces of Detective Marcus's cologne in the apartment", important: false },
            { text: "Burner phone found with calls to Dimitri's men", important: true },
            { text: "Lisa's business card in the apartment trash", important: false },
            { text: "Kidnapping note with references only Dimitri would understand", important: true },
            { text: "Security footage shows van from Dimitri's warehouse", important: true }
        ],
        culprit: 3
    }
];

// Initialize game
function init() {
    generatePlayerId();
    setupEventListeners();
}

function generatePlayerId() {
    if (!localStorage.getItem('playerId')) {
        gameState.playerId = 'player_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('playerId', gameState.playerId);
    } else {
        gameState.playerId = localStorage.getItem('playerId');
    }
}

function setupEventListeners() {
    document.getElementById('playerName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createGame();
    });
    document.getElementById('gameCode').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') joinGame();
    });
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function createGame() {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }

    gameState.playerName = playerName;
    gameState.gameCode = generateGameCode();
    gameState.isHost = true;
    gameState.players = [{ id: gameState.playerId, name: playerName, avatar: playerName[0].toUpperCase() }];
    
    // Select a random case
    gameState.currentCase = JSON.parse(JSON.stringify(cases[Math.floor(Math.random() * cases.length)]));
    gameState.suspects = gameState.currentCase.suspects;
    gameState.clues = gameState.currentCase.clues;
    gameState.gameStatus = 'playing';

    startGame();
}

function joinGame() {
    const playerName = document.getElementById('playerName').value.trim();
    const gameCode = document.getElementById('gameCode').value.trim().toUpperCase();
    
    if (!playerName) {
        alert('Please enter your name');
        return;
    }
    if (!gameCode) {
        alert('Please enter a game code');
        return;
    }

    gameState.playerName = playerName;
    gameState.gameCode = gameCode;
    gameState.isHost = false;

    // Simulate joining a game (in a real app, this would connect to a server)
    // For now, we'll just add the player
    gameState.players = [
        { id: 'host', name: 'Game Host', avatar: 'H' },
        { id: gameState.playerId, name: playerName, avatar: playerName[0].toUpperCase() }
    ];

    // Load a case (in a real app, the host would send this)
    gameState.currentCase = JSON.parse(JSON.stringify(cases[0]));
    gameState.suspects = gameState.currentCase.suspects;
    gameState.clues = gameState.currentCase.clues;
    gameState.gameStatus = 'playing';

    addSystemMessage(`${playerName} joined the game!`);
    startGame();
}

function startGame() {
    switchScreen('gameScreen');
    updatePlayersDisplay();
    updateCaseDisplay();
    updateSuspectsDisplay();
    updateCluesDisplay();
    updateVotingDisplay();
    addSystemMessage(`Game started! Case: ${gameState.currentCase.title}`);
}

function generateGameCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function updatePlayersDisplay() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = gameState.players.map(player => `
        <div class="player-item">
            <div class="player-avatar">${player.avatar}</div>
            <div>${player.name}${player.id === gameState.playerId ? ' (You)' : ''}</div>
        </div>
    `).join('');

    document.getElementById('displayGameCode').textContent = gameState.gameCode;
}

function updateCaseDisplay() {
    const caseSection = document.getElementById('caseDescription');
    caseSection.innerHTML = `
        <h3>${gameState.currentCase.title}</h3>
        <p>${gameState.currentCase.description}</p>
    `;
}

function updateSuspectsDisplay() {
    const suspectsList = document.getElementById('suspectsList');
    suspectsList.innerHTML = gameState.suspects.map(suspect => `
        <div class="suspect-card">
            <div class="suspect-avatar">🕵️</div>
            <h4>${suspect.name}</h4>
            <p><strong>Role:</strong> ${suspect.role}</p>
            <p><strong>Motive:</strong> ${suspect.motive}</p>
        </div>
    `).join('');

    // Update voting dropdown
    const voteSelect = document.getElementById('suspectVote');
    voteSelect.innerHTML = '<option value="">Select a suspect...</option>' + 
        gameState.suspects.map(suspect => `
            <option value="${suspect.id}">${suspect.name}</option>
        `).join('');
}

function updateCluesDisplay() {
    const cluesList = document.getElementById('cluesList');
    cluesList.innerHTML = gameState.clues.map(clue => `
        <div class="clue-item ${clue.important ? 'important' : ''}">
            ${clue.text}
        </div>
    `).join('');
}

function updateVotingDisplay() {
    const voteResults = document.getElementById('voteResults');
    if (Object.keys(gameState.votes).length > 0) {
        const voteCounts = {};
        Object.values(gameState.votes).forEach(suspectId => {
            voteCounts[suspectId] = (voteCounts[suspectId] || 0) + 1;
        });

        const suspectMap = {};
        gameState.suspects.forEach(s => suspectMap[s.id] = s.name);

        voteResults.innerHTML = '<h4>Current Votes:</h4>' + 
            Object.entries(voteCounts).map(([suspectId, count]) => `
                <div class="vote-result-item">
                    <span>${suspectMap[suspectId]}</span>
                    <span>👤 ${count}</span>
                </div>
            `).join('');
    } else {
        voteResults.innerHTML = '<p style="color: #999;">No votes yet...</p>';
    }
}

function submitVote() {
    const suspectId = document.getElementById('suspectVote').value;
    if (!suspectId) {
        alert('Please select a suspect');
        return;
    }

    gameState.votes[gameState.playerId] = parseInt(suspectId);
    updateVotingDisplay();
    addSystemMessage(`${gameState.playerName} voted!`);

    // Check if all players have voted (for demo, check after 2 votes)
    if (Object.keys(gameState.votes).length >= gameState.players.length) {
        setTimeout(revealResult, 2000);
    }
}

function revealResult() {
    const voteCounts = {};
    Object.values(gameState.votes).forEach(suspectId => {
        voteCounts[suspectId] = (voteCounts[suspectId] || 0) + 1;
    });

    const maxVotes = Math.max(...Object.values(voteCounts));
    const accusedIds = Object.entries(voteCounts)
        .filter(([_, count]) => count === maxVotes)
        .map(([id, _]) => parseInt(id));

    const accused = gameState.suspects.find(s => accusedIds.includes(s.id));
    const culprit = gameState.suspects.find(s => s.id === gameState.currentCase.culprit);

    let isCorrect = accused.id === culprit.id;
    let message = `<strong>The accused is: ${accused.name}</strong><br><br>`;

    if (isCorrect) {
        message += `🎉 <strong>CORRECT!</strong><br>`;
        message += `${accused.name} (${accused.role}) was indeed the culprit!<br>`;
        message += `Motive: ${accused.motive}<br><br>`;
        message += `Great detective work! You've solved the case!`;
    } else {
        message += `❌ <strong>INCORRECT!</strong><br>`;
        message += `${accused.name} is innocent...<br><br>`;
        message += `The real culprit was: ${culprit.name} (${culprit.role})<br>`;
        message += `Motive: ${culprit.motive}<br><br>`;
        message += `The case remains unsolved. Better luck next time!`;
    }

    document.getElementById('gameOverTitle').textContent = isCorrect ? '✓ Case Solved!' : '✗ Case Failed';
    document.getElementById('gameOverMessage').innerHTML = message;
    gameState.gameStatus = 'gameOver';
    switchScreen('gameOverScreen');
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;

    addMessage(gameState.playerName, message);
    input.value = '';
}

function addMessage(player, text) {
    const chatBox = document.getElementById('chatBox');
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message';
    messageEl.innerHTML = `<strong>${player}:</strong> ${text}`;
    chatBox.appendChild(messageEl);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addSystemMessage(text) {
    const chatBox = document.getElementById('chatBox');
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message system';
    messageEl.textContent = text;
    chatBox.appendChild(messageEl);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function copyGameCode() {
    const code = document.getElementById('displayGameCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Game code copied to clipboard!');
    });
}

function returnToLobby() {
    gameState = {
        playerId: gameState.playerId,
        playerName: null,
        gameCode: null,
        isHost: false,
        players: [],
        currentCase: null,
        suspects: [],
        clues: [],
        messages: [],
        votes: {},
        gameStatus: 'lobby'
    };
    document.getElementById('playerName').value = '';
    document.getElementById('gameCode').value = '';
    document.getElementById('messageInput').value = '';
    switchScreen('lobby');
}

// Start the game when page loads
window.addEventListener('load', init);
