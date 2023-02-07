

const alchemistBtn = document.querySelector('#alchemist')
const tester = document.querySelector('#tester')
const stats = document.querySelectorAll('.stat')


//formula roles a die with any amount of sides specified and returns a random integer.
    const dieRoll = (sides) => {
        return Math.floor(Math.random() * sides) + 1
    }
// formula calclulates the value for a stat. To calculate it will roll 6 sided dice 4 times and will take the sum of the 3 highest rolled values
    const rollStat = () => {
        let statRolls =[]
        for (let i=0;i<4;i++) {
            statRolls.push(dieRoll(6))
        }
        statRolls.sort().reverse().pop()
        let statTotal = statRolls.reduce((accumulator,val) => accumulator + val,0)
        return statTotal
    }
// formula is a loop that runs the rollStat function for all six of the character ability scores
    const populateStats = () => {
        for (let i=0; i<stats.length; i++) {
            stats[i].textContent = stats[i].textContent + rollStat()
        }
    }


// console.log(`D6 ${dieRoll(6)}`)
// console.log(`D12 ${dieRoll(12)}`)
// rollStat()

async function getData(event) {
    event.preventDefault()
    //let textInput

    const url = `https://api.pathfinder2.fr/v1/pf2/class/`
    console.log(url)

    fetch(url,
        {method:'GET',
        headers:{'Authorization':'5cfe0fea-a504-4ee4-8f88-baf84aeabef2'}
    })
        .then(res => {
            return res.json()})
        .then(res => {
            console.log('the key worked!')
        })
        .catch(err => {
            console.log("error!", err)})
}


const test = function() {
    alert("did it work?")
}

alchemistBtn.addEventListener('click',populateStats)
tester.addEventListener('click',getData)