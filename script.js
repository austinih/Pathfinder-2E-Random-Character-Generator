

const alchemistBtn = document.querySelector('#alchemist')
const barbarianBtn = document.querySelector('#barbarian')
const bardBtn = document.querySelector('#bard')
const championBtn = document.querySelector('#champion')
const classBtns = document.querySelectorAll('.img_description')
const randBtn = document.querySelector('#random')
let randArr=[0,1,2,3,4,5,6,11,14,15,16,21]

const stats = document.querySelectorAll('.stat')
const abilScoreNames = ['STR','DEX','CON','INT','WIS','CHA']
const ancestryBox = document.querySelector('#ancestryBox')
let classNum = ""
const className = document.querySelector('#className')
const classDescription = document.querySelector('#classDescription')
const classImg = document.querySelector('#classImg')

//['Alchemist','Barbarian','Bard','Champion','Cleric','Druid','Fighter','Gunslinger','Inventor','Investigator','Magus','Monk','Oracle','Psychic','Ranger','Rogue','Sorcerer','Summoner','Swashbuckler','Thaumaturge','Witch','Wizard',']




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

// class selection function
    // const chooseClass = () => {
    //     //classBox.textContent = event.target.textContent
    //     classBox.textContent = `Class: ${event.target.textContent}`
    //     return event.target.value
        
    // }

async function getData(event) {
    event.preventDefault()

    let url1 = 'https://api.pathfinder2.fr/v1/pf2/ancestry'

    //Get Ancestry Data
    fetch(url1,
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
    
    // Get Class Data
    let url2 = 'https://api.pathfinder2.fr/v1/pf2/class'       
    fetch(url2,
        {method:'GET',
        headers:{'Authorization':'5cfe0fea-a504-4ee4-8f88-baf84aeabef2'}
        })
        .then (res => {
            return res.json()})
        .then(res => {
            
            randBtn.value= randArr[dieRoll(12) -1]
            console.log(randBtn.value)

            classNum = event.target.value
            let classNameVar = `Class: ${res.results[classNum].name}`
            className.textContent = classNameVar

            classImg.src = `images/classImages/${res.results[classNum].name}.png`

            let classDesc = res.results[classNum].system.description.value
            classDesc = classDesc.split("</em")
            classDescription.textContent = classDesc[0].replace('<p><em>','')
                ///the following site taught me how to split text so that only the first paragraph would be extracted: https://stackoverflow.com/questions/61791863/how-to-extract-the-content-of-the-first-paragraph-in-html-string-react-native
            
        })
        
        .catch(err => {
            console.log("error!", err)})          

}



// alchemistBtn.addEventListener('click',populateStats)
// alchemistBtn.addEventListener('click',getData)
// championBtn.addEventListener('click',populateStats)
// championBtn.addEventListener('click',getData)

classBtns.forEach(button => {
    button.addEventListener('click', getData)})
classBtns.forEach(button => {
        button.addEventListener('click', populateStats)})