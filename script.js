// Global variables
let selectedPlayers = 0;
let playerNames = [];

// Function to handle number selection (Welcome Page)
function selectPlayers(num) {
    selectedPlayers = num;
    localStorage.setItem("numPlayers", num);

    // Hide all input fields initially
    document.querySelectorAll(".input-container input").forEach(input => {
        input.style.display = "none";
    });

    // Show only the required number of inputs
    for (let i = 1; i <= num; i++) {
        document.getElementById(`name${i}`).style.display = "block";
    }
}

// Function to collect names and start game (Welcome Page)
function collectNames() {
    playerNames = [];
    let numPlayers = localStorage.getItem("numPlayers");

    for (let i = 1; i <= numPlayers; i++) {
        let name = document.getElementById(`name${i}`).value.trim();
        if (name !== "") {
            playerNames.push(name);
        }
    }

    if (playerNames.length !== parseInt(numPlayers)) {
        alert(`Please enter names for all ${numPlayers} players.`);
        return;
    }

    // Store player names in localStorage
    localStorage.setItem("playerNames", JSON.stringify(playerNames));

    // Redirect to the game page
    window.location.href = "index.html";
}

// Add event listeners for player selection buttons
document.querySelectorAll(".xyzz").forEach(button => {
    button.addEventListener("click", function () {
        selectPlayers(parseInt(this.id));
    });
});

// Check if we are on the game page
if (window.location.pathname.includes("index.html")) {
    let players = JSON.parse(localStorage.getItem("playerNames")) || [];
    let numPlayers = players.length;

    if (numPlayers < 2 || numPlayers > 4) {
        alert("Invalid player selection. Redirecting to home...");
        window.location.href = "indexopen.html";
    }

    // Initialize player health (3 for each player)
    let playerHealth = {};
    players.forEach(player => playerHealth[player] = 3);

    // List of 100 dares
    const dares = [
        "Sing a song loudly.", "Do 10 pushups.", "Dance for 30 seconds.",
        "Speak in a funny accent for 1 minute.", "Spin around 10 times and walk straight.",
        "Try to lick your elbow.", "Call a friend and tell them a joke.",
        "Talk like a robot for the next 2 minutes.", "Act like a monkey for 30 seconds.",
        "Do your best impression of a celebrity.", "Run around the room twice.",
        "Try to balance a spoon on your nose.", "Do an impression of someone in the group.",
        "Say the alphabet backward.", "Imitate a TV character for 1 minute.",
        "Try to touch your nose with your tongue.", "Speak in rhymes for 2 minutes.",
        "Make up a short rap about another player.", "Try to juggle 3 objects.",
        "Tell an embarrassing story about yourself.", "Pretend you are a superhero for 1 minute.",
        "Do 20 jumping jacks.", "Pretend you are in slow motion for 1 minute.",
        "Say a tongue twister 5 times fast.", "Do a silly dance for 30 seconds.",
        "Act like a cat for 1 minute.", "Give a speech on why pizza is the best food.",
        "Say 'I love coding' 10 times fast.", "Sing a song in a funny voice.",
        "Make an animal sound and act like that animal.", "Do a moonwalk.",
        "Try to make everyone laugh.", "Pretend to be a waiter taking an order.",
        "Say your full name backward.", "Speak like a pirate for 1 minute.",
        "Tell a joke and laugh at it.", "Walk like a crab across the room.",
        "Pretend you are a news anchor reporting something silly.",
        "Make a fish face and hold it for 10 seconds.", "Pretend you are a famous singer and perform.",
        "Try to break dance.", "Do 5 cartwheels (or attempt to).",
        "Talk in a whisper for the next 3 rounds.", "Say the next sentence while holding your tongue.",
        "Do an impression of a famous cartoon character.", "Pretend to be a ninja for 1 minute.",
        "Do a funny face competition.", "Try to make a balloon animal (even without a balloon).",
        "Imitate your favorite superhero.", "Say a compliment to every player.",
        "Try to eat something without using your hands.", "Act like an old man or woman for 1 minute.",
        "Try to balance a book on your head while walking.", "Try to spin a pen on your finger.",
        "Do a funny prank call (fake).", "Imitate your favorite teacher.",
        "Pretend you are in a horror movie for 30 seconds.", "Try to juggle socks.",
        "Give a motivational speech about potatoes.", "Act like a robot for 1 minute.",
        "Pretend you're a DJ and beatbox.", "Say a pickup line with a straight face.",
        "Speak only in song lyrics for the next round.", "Do your best evil laugh.",
        "Talk like a baby for 2 minutes.", "Act like you’re stuck in slow motion.",
        "Pretend to be a TV commercial for toothpaste.", "Do 15 sit-ups.",
        "Tell a funny story but laugh while telling it.", "Pretend you are in a cooking show."
    ];

    // Shuffle dares randomly
    function getRandomDare() {
        return dares[Math.floor(Math.random() * dares.length)];
    }

    // Track current player index
    let currentPlayerIndex = 0;

    // Function to update health display
    function updateHealthDisplay() {
        let healthContainer = document.querySelector(".health");
        healthContainer.innerHTML = ""; // Clear previous content

        players.forEach(player => {
            let playerDiv = document.createElement("div");
            playerDiv.className = "player";
            playerDiv.innerText = `${player}: ${playerHealth[player]}`;
            healthContainer.appendChild(playerDiv);
        });

        document.querySelector(".whoseturn").innerText = `${players[currentPlayerIndex]}'s Turn`;
        document.querySelector(".task").innerText = getRandomDare();
    }

    // Function to handle turn logic
    function handleTurn(action) {
        let currentPlayer = players[currentPlayerIndex];

        if (action === "pass") {
            playerHealth[currentPlayer]--; // Reduce health if player passes
        }

        // Check if the player is eliminated
        if (playerHealth[currentPlayer] === 0) {
            alert(`${currentPlayer} is out!`);
            players.splice(currentPlayerIndex, 1); // Remove from game
            delete playerHealth[currentPlayer]; // Remove health record

            // If only one player remains, declare them the winner
            if (players.length === 1) {
                alert(`${players[0]} is the winner!`);
                localStorage.clear(); // Reset data
                location.reload(); // Restart game
                return;
            }
        } else {
            // Move to next player
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        }

        updateHealthDisplay();
    }

    // Event listeners for game buttons
    document.getElementById("did").addEventListener("click", () => handleTurn("did"));
    document.getElementById("pass").addEventListener("click", () => handleTurn("pass"));

    // Initialize the game
    window.onload = function () {
        updateHealthDisplay();
    };
}
