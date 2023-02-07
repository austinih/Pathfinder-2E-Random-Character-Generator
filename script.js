

const alchemistBtn = document.querySelector('#alchemist')
const barbarianBtn = document.querySelector('#barbarian')
const tester = document.querySelector('#tester')
const stats = document.querySelectorAll('.stat')
const abilScoreNames = ['STR','DEX','CON','INT','WIS','CHA']
const ancestryBox = document.querySelector('#ancestryBox')




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
            stats[i].textContent = `${abilScoreNames[i]}: ${rollStat()}`
        }
    }

// ancestry selection function
    const chooseAncestry = () => {
        let ancestry = Math.floor(Math.random() * 36) + 1
        return ancestry
    }
chooseAncestry()

async function getData(event) {
    event.preventDefault()

    const url = 'https://api.pathfinder2.fr/v1/pf2/ancestry'
    console.log(url)

    fetch(url,
        {method:'GET',
        headers:{'Authorization':'5cfe0fea-a504-4ee4-8f88-baf84aeabef2'}
    })
        .then(res => {
            return res.json()})
        .then(res => {
            let ancestryNum = chooseAncestry()
            console.log(ancestryNum)
            ancestryBox.textContent = `Ancestry: ${res.results[ancestryNum].name}`
        })
        .catch(err => {
            console.log("error!", err)})
}


const test = function() {
    alert("did it work?")
}

alchemistBtn.addEventListener('click',populateStats)
alchemistBtn.addEventListener('click',getData)
alchemistBtn.addEventListener('click',)