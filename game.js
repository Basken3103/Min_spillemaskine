//DOM elementer
let slot1 = document.getElementById("slot1")
let slot2 = document.getElementById("slot2")
let slot3 = document.getElementById("slot3")
let icons1 = document.getElementById("icons1")

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

    // if (results[0] == results[1] && results[0] == results[2]){
    // document.body.innerHTML += "Du har vundet"
    // }
}