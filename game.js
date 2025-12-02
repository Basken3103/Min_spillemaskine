let highScores = [

]

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;



if (localStorage.getItem("highScore")) {
    highScores = JSON.parse(localStorage.getItem("highScore"))
}

//highScores.forEach(function (element, index) {
//    document.body.innerHTML += element
//})

//DOM elementer
let slot1 = document.getElementById("slot1")
let slot2 = document.getElementById("slot2")
let slot3 = document.getElementById("slot3")
let icons1 = document.getElementById("icons1")
let icons2 = document.getElementById("icons2")
let icons3 = document.getElementById("icons3")
let audio = document.getElementById("audio")


//Highscore elementer
let form = document.getElementById("score")
let view = document.getElementById("highscore")


// Spillerens startpoint og score
let credits = 100;

//Intialisere score ved load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("score").textContent = score;
    document.getElementById("highScore").textContent = highScore;
});




//Symboler og sandsynligheder
var weightedSymbols = [
    "🍋", "🍋", "🍋", "🍋",     // 40% - Citroner (4 ud af 10)
    "🍒", "🍒", "🍒",          // 30% - Kirsebær (3 ud af 10)
    "🔔", "🔔",               // 15% - Bar (2 ud af 10)
    "⭐", "⭐",                // 10% - Stjerne (2 ud af 10)
    "7️⃣"                     // 5%  - Syv (1 ud af 20)
];


addEventListener
form.addEventListener("submit", function (event) {
    event.preventDefault()
    highScores.push("<p>" + form.elements.playerName.value + ": " + form.elements.highScore.value + "</p>")
    localStorage.setItem("highScore", JSON.stringify(highScores))
    updateView()
})

//Update function
function updateView() {
    if (localStorage.getItem("Number") && localStorage.getItem("Name")) {
        view.innerHTML = "<p>"
        view.innerHTML += "Din score er "
        view.innerHTML += localStorage.getItem("Number")
        view.innerHTML += " Din highscore er "
        view.innerHTML += localStorage.getItem("Number")
        view.innerHTML += "</p>"
    }
}

//Sandsynligheden for tre ens
const probabilities = calculateProbabilities(weightedSymbols);
console.log("Sandsynligheder pr. hjul:", probabilities);

function calculateJackpotProbability(symbols) {
    const probabilities = calculateProbabilities(symbols);
    const jackpotProbabilities = {};

    for (const symbol in probabilities) {
        // Sandsynlighed for 3 ens (gange samme sandsynlighed 3 gange)
        jackpotProbabilities[symbol] = Math.pow(probabilities[symbol] / 100, 3) * 100;
    }

    return jackpotProbabilities;
}

//Udvidet sandsynlighed med 2 ens symboler
const jackpotChances = calculateJackpotProbability(weightedSymbols);
console.log("Sandsynlighed for 3 ens (Jackpot):", jackpotChances);

function calculateTwoOfAKindProbability(symbols) {

    const probabilities = calculateProbabilities(symbols);

    const twoOfAKindProbabilities = {};

    for (const symbol in probabilities) {
        // Sandsynlighed for to ens og ét forskelligt
        const Psymbol = probabilities[symbol] / 100;
        const PnotSymbol = (100 - probabilities[symbol]) / 100;

        // 3 mulige kombinationer (XXY, XYX, YXX)
        twoOfAKindProbabilities[symbol] = 3 * Math.pow(Psymbol, 2) * PnotSymbol * 100;
    }

    return twoOfAKindProbabilities;
}

const twoOfAKindChances = calculateTwoOfAKindProbability(weightedSymbols);
console.log("Sandsynlighed for 2 ens symboler:", twoOfAKindChances);


//Sandsynligheds funktion
function calculateProbabilities(symbols) {
    console.log(symbols)
    const totalSymbols = symbols.length;
    const counts = {};

    // Tæl hvor mange gange hvert symbol optræder
    symbols.forEach(symbol => {
        counts[symbol] = (counts[symbol] || 0) + 1;
    });

    // Beregn sandsynligheden for hvert symbol
    const probabilities = {};
    for (const symbol in counts) {
        probabilities[symbol] = (counts[symbol] / totalSymbols) * 100;
    }

    return probabilities;
}

//Dreje funktion
function spin() {
    let results = [
        generateRandom(),
        generateRandom(),
        generateRandom()
    ]

    function mellemRegning(val) {
        let caculation = (val * 10) - 10;
        return caculation;

    }

    icons1.style.transform = "translateY(-" + mellemRegning(results[0]) + "%)"
    icons2.style.transform = "translateY(-" + mellemRegning(results[1]) + "%)"
    icons3.style.transform = "translateY(-" + mellemRegning(results[2]) + "%)"
    console.log(results[0])




    // Opdater credits i UI
    function updateCredits(amount) {
        credits += amount;
        creditsDisplay.innerText = credits;

        // Deaktiver knappen, hvis credits = 0
        if (credits <= 0) {
            spinButton.disabled = true;
            message.innerText = "❌ Du har ikke flere credits!";
        }
    }

    // Tjek om spilleren har credits
    if (credits <= 0) {
        message.innerText = "❌ Ingen credits tilbage!";
        return;
    }


    // Brug 1 credit for at spinne
    updateCredits(-1);
    message.innerText = "";


    // Tjek gevinst efter animation
    setTimeout(() => {
        const [s1, s2, s3] = results;

        if (s1 === s2 && s2 === s3) {
            const winnings = payoutTable[s1] || 0;
            const pointWin = symbolPoints[s1] || 0;

            message.innerText = `🎉 You won ${winnings} credits and ${pointWin} points with ${s1}!`;
            audio.play()
            updateCredits(winnings);
            updateScore(pointWin);

        } else if (s1 === s2 || s2 === s3 || s1 === s3) {
            // 2 symboler matcher
            const pointWin = 5;
            message.innerText = `🔸 You matched 2 symboler and got ${pointWin} points!`;
            updateScore(pointWin);
        } else {
            message.innerText = "❌ You lost, try again.";
        }
    }, 1600);

}


// Gevinsttabel (for 3 ens symboler)
const payoutTable = {
    "🍋": 5,   // 3 citroner giver 5 credits
    "🍒": 10,  // 3 kirsebær giver 10 credits
    "🔔": 20,  // 3 bar giver 20 credits
    "⭐": 50,  // 3 stjerner giver 50 credits
    "7️⃣": 100 // 3 syv-taller giver 100 credits (jackpot)
};

// Gør funktionen globalt tilgængelig

console.log("Spinning...");



//Tilfældigt tal mellem 1-10 
function generateRandom() {
    let randomNumber = Math.random()
    let roundedNumber = Math.floor((randomNumber * 10) + 1)
    return roundedNumber
}

//Score funktion
function updateScore(amount) {
    score += amount;
    document.getElementById("score").textContent = score;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.getElementById("highScore").textContent = highScore;
    }

}








