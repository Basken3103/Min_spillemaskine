//DOM elementer
let slot1 = document.getElementById("slot1")
let slot2 = document.getElementById("slot2")
let slot3 = document.getElementById("slot3")
let icons1 = document.getElementById("icons1")
let icons2 = document.getElementById("icons2")
let icons3 = document.getElementById("icons3")

//Highscore elementer
let form = document.getElementById("score")
let view = document.getElementById("highscore")

//addEventListener
// form.addEventListener("submit", function (event) {
//     event.preventDefault()
//     localStorage.setItem("petType", form.elements.pet.value)
//     localStorage.setItem("petName", form.elements.petName.value)
//     updateView()
// })

//Update function
function updateView() {
    if (localStorage.getItem("petType") && localStorage.getItem("petName")) {
        view.innerHTML = "<p>"
        view.innerHTML += "Dit kæledyr er en "
        view.innerHTML += localStorage.getItem("petType")
        view.innerHTML += " som hedder "
        view.innerHTML += localStorage.getItem("petName")
        view.innerHTML += "</p>"
    }
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


    //Sandsynligheds funktion
    function calculateProbabilities(symbols) {
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
        if (results[0] === results[1] && results[1] === results[2]) {
            // Spilleren har vundet
            const winnings = payoutTable[results[100]] || 0;
            message.innerText = `🎉 Du vandt ${winnings} credits med ${results[100]}!`;
            updateCredits(winnings);
        } else {
            // Ingen gevinst
            message.innerText = "❌ Du tabte. Prøv igen";
        }
    }, 1600);
}




//Symboler og sandsynligheder
const weightedSymbols = [
    "🍋", "🍋", "🍋", "🍋",     // 40% - Citroner (4 ud af 10)
    "🍒", "🍒", "🍒",          // 30% - Kirsebær (3 ud af 10)
    "🔔", "🔔",               // 15% - Bar (2 ud af 10)
    "⭐", "⭐",                // 10% - Stjerne (2 ud af 10)
    "7️⃣"                     // 5%  - Syv (1 ud af 20)
];


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

// Spillerens startkredit
let credits = 100;

//Tilfældigt tal mellem 1-10 
function generateRandom() {
    let randomNumber = Math.random()
    let roundedNumber = Math.floor((randomNumber * 10) + 1)
    return roundedNumber
}









