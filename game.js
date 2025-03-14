//DOM elementer
let slot1 = document.getElementById("slot1")
let slot2 = document.getElementById("slot2")
let slot3 = document.getElementById("slot3")
let icons1 = document.getElementById("icons1")


const weightedSymbols = [
    "🍋", "🍋", "🍋", "🍋",     // 40% - Citroner (4 ud af 10)
    "🍒", "🍒", "🍒",          // 30% - Kirsebær (3 ud af 10)
    "🔔", "🔔",               // 15% - Bar (2 ud af 10)
    "⭐", "⭐",                // 10% - Stjerne (2 ud af 10)
    "7️⃣"                     // 5%  - Syv (1 ud af 20)
];


//Tilfældigt tal mellem 1-10 
function generateRandom() {
    let randomNumber = Math.random()
    let roundedNumber = Math.floor((randomNumber * 10) + 1)
    return roundedNumber
}

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

    // Potentiel funktion

    //if (results[0] == results[1] && results[0] == results[2]) {
    //    document.body.innerHTML += "Du har vundet"
    //}

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

    //Sandsynligheds beregner
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

    const jackpotChances = calculateJackpotProbability(weightedSymbols);
    console.log("Sandsynlighed for 3 ens (Jackpot):", jackpotChances);






}