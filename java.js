let currentPage = 1;
let p1Name = "Player 1";
let p2Name = "Computer";
let p1Score = 0;
let p2Score = 0;
let isAgainstComputer = true;

let p1CurrentChoice = '';
let currentTurn = 1; // 1 for Player 1, 2 for Player 2

// Page Navigation Function
function goToPage(pageNo) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page-${pageNo}`).classList.add('active');
    currentPage = pageNo;
}

// Image Preview Function
function previewImage(event, previewId) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById(previewId).src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Setup Game Names & Mode
function setupGame() {
    const p1Input = document.getElementById('p1-name').value;
    const p2Input = document.getElementById('p2-name').value;

    if (p1Input.trim() !== "") {
        p1Name = p1Input;
    }

    if (p2Input.trim() !== "") {
        p2Name = p2Input;
        isAgainstComputer = false;
    } else {
        p2Name = "Computer";
        isAgainstComputer = true;
    }

    document.getElementById('display-p1').textContent = `${p1Name}: 0`;
    document.getElementById('display-p2').textContent = `${p2Name}: 0`;
    document.getElementById('turn-indicator').textContent = `Turn: ${p1Name}`;

    goToPage(3);
}

// Music Toggle Function
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    if (music.paused) {
        music.play();
        btn.textContent = "Pause Music";
    } else {
        music.pause();
        btn.textContent = "Play Music";
    }
}

// Handle Player Choice & Animations
function handlePlayerChoice(choice) {
    const resultDiv = document.getElementById('game-result');
    const turnIndicator = document.getElementById('turn-indicator');
    const p1Hand = document.getElementById('p1-hand');
    const p2Hand = document.getElementById('p2-hand');

    if (isAgainstComputer) {
        // --- Versus Computer Mode ---
        p1Hand.textContent = '✊';
        p2Hand.textContent = '✊';

        // Start shaking animation
        p1Hand.classList.add('shake-l');
        p2Hand.classList.add('shake-r');
        resultDiv.textContent = "Battling...";

        setTimeout(() => {
            p1Hand.classList.remove('shake-l');
            p2Hand.classList.remove('shake-r');

            const choices = ['rock', 'paper', 'scissors'];
            const compChoice = choices[Math.floor(Math.random() * choices.length)];

            p1Hand.textContent = getEmoji(choice);
            p2Hand.textContent = getEmoji(compChoice);

            let resultText = checkWinner(choice, compChoice, p1Name, p2Name);
            resultDiv.textContent = resultText;

            document.getElementById('display-p1').textContent = `${p1Name}: ${p1Score}`;
            document.getElementById('display-p2').textContent = `${p2Name}: ${p2Score}`;
        }, 800);

    } else {
        // --- Versus Player 2 Mode ---
        if (currentTurn === 1) {
            p1CurrentChoice = choice;
            currentTurn = 2;
            turnIndicator.textContent = `Turn: ${p2Name}`;
            resultDiv.textContent = `${p1Name} has chosen! Now it's ${p2Name}'s turn.`;
            p1Hand.textContent = '✊';
            p2Hand.textContent = '✊';
        } else {
            const p2CurrentChoice = choice;
            turnIndicator.textContent = `Turn: ${p1Name}`;

            p1Hand.textContent = '✊';
            p2Hand.textContent = '✊';
            p1Hand.classList.add('shake-l');
            p2Hand.classList.add('shake-r');
            resultDiv.textContent = "Battling...";

            setTimeout(() => {
                p1Hand.classList.remove('shake-l');
                p2Hand.classList.remove('shake-r');

                p1Hand.textContent = getEmoji(p1CurrentChoice);
                p2Hand.textContent = getEmoji(p2CurrentChoice);

                let resultText = checkWinner(p1CurrentChoice, p2CurrentChoice, p1Name, p2Name);
                resultDiv.textContent = resultText;

                document.getElementById('display-p1').textContent = `${p1Name}: ${p1Score}`;
                document.getElementById('display-p2').textContent = `${p2Name}: ${p2Score}`;

                currentTurn = 1;
                turnIndicator.textContent = `Turn: ${p1Name}`;
            }, 800);
        }
    }
}

// Convert choice to emoji
function getEmoji(choice) {
    if (choice === 'rock') return '✊';
    if (choice === 'paper') return '✋';
    if (choice === 'scissors') return '✌️';
    return '✊';
}

// Determine Winner Logic
function checkWinner(c1, c2, name1, name2) {
    if (c1 === c2) {
        return `It's a Tie! Both chose ${c1}.`;
    }

    if (
        (c1 === 'rock' && c2 === 'scissors') ||
        (c1 === 'paper' && c2 === 'rock') ||
        (c1 === 'scissors' && c2 === 'paper')
    ) {
        p1Score++;
        return `${name1} Wins! (${c1} beats ${c2})`;
    } else {
        p2Score++;
        return `${name2} Wins! (${c2} beats ${c1})`;
    }
}