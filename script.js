

const alchemistBtn = document.querySelector('#alchemist')
const barbarianBtn = document.querySelector('#barbarian')
const bardBtn = document.querySelector('#bard')
const championBtn = document.querySelector('#champion')
const classBtns = document.querySelectorAll('.img_description')
const randBtn = document.querySelector('#random')
let randArr=[0,1,2,3,4,5,6,11,14,15,16,21]

const stats = document.querySelectorAll('.stat')
const strBox = document.querySelector('#strength')
const dexBox = document.querySelector('#dexterity')
const conBox = document.querySelector('#constitution')
const intBox = document.querySelector('#intelligence')
const wisBox = document.querySelector('#wisdom')
const chaBox = document.querySelector('#charisma')

const abilScoreNames = ['STR','DEX','CON','INT','WIS','CHA']
const ancestryBox = document.querySelector('#ancestryBox')
const sizeBox = document.querySelector('#sizeBox')
let classNum = ""
const className = document.querySelector('#className')
const classDescription = document.querySelector('#classDescription')
const classImg = document.querySelector('#classImg')
const deityBox= document.querySelector('#deityBox')
const alignmentBox= document.querySelector('#alignmentBox')
const skillProf = ['Acrobatics','Arcana','Athletics','Crafting','Deception','Diplomacy','Intimidation','Medicine','Nature','Occultism','Performance','Religion','Society','Stealth','Survival','Thievery']
const skillProfBox = document.querySelector('#skillProficiencies')

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
        let ancestry = Math.floor(Math.random() * 36)
        return ancestry
    }

// Deity selection function
    const chooseDeity = () => {
        let deity = Math.floor(Math.random()*260)
        return deity
    }

//formula to gain proficiencies
const recProfs = () => {
    skillProfBox.innerHTML=""
    let recProfArr = []
    for (let i=0;i<4;i++) {
        recProfArr.push(skillProf[dieRoll(16)-1])
        skillProfBox.innerHTML += `<li class="profSkill">${recProfArr[i]}</li>`
    }
}


async function getData(event) {
    event.preventDefault()
    
    populateStats()

    //Get Ancestry Data
    let url1 = 'https://api.pathfinder2.fr/v1/pf2/ancestry'
    fetch(url1,
        {method:'GET',
        headers:{'Authorization':'5cfe0fea-a504-4ee4-8f88-baf84aeabef2'}
        })
        .then(res => {
            return res.json()})
        .then(res => {
            //Select Ancestry
            let ancestryNum = chooseAncestry()
            console.log(ancestryNum)
            ancestryBox.textContent = `Ancestry: ${res.results[ancestryNum].name}`

            //Record size for the selected Ancestry
            sizeCategory = `Size: ${res.results[ancestryNum].system.size}`
            sizeBox.textContent = sizeCategory.replace('sm','Small').replace('med',"Medium")
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
            
            //determing class
            randBtn.value= randArr[dieRoll(12) -1]
            console.log(randBtn.value)

            classNum = event.target.value
            let classNameVar = `Class: ${res.results[classNum].name}`
            className.textContent = classNameVar
            console.log(classNameVar)

            //pull in class image
            classImg.src = `images/classImages/${res.results[classNum].name}.png`

            //pull class description
            let classDesc = res.results[classNum].system.description.value
            classDesc = classDesc.split("</em")
            classDescription.textContent = classDesc[0].replace('<p><em>','')
                ///the following site taught me how to split text so that only the first paragraph would be extracted: https://stackoverflow.com/questions/61791863/how-to-extract-the-content-of-the-first-paragraph-in-html-string-react-native
            
            //Reassign best ability score
            if(classNameVar == "Class: Alchemist" || classNameVar == "Class: Wizard") {intBox.textContent= 'INT: 18'} 
            else if (classNameVar == "Class: Bard" || classNameVar == "Class: Sorcerer" ) {chaBox.textContent= 'CHA: 18'} 
            else if (classNameVar == "Class: Cleric" || classNameVar == "Class: Druid" || classNameVar == "Class: Ranger") {wisBox.textContent= 'WIS: 18'} 
            else if (classNameVar == "Class: Rogue" || classNameVar == "Class: Monk") {dexBox.textContent= 'DEX: 18'} 
            else if (classNameVar == "Class: Barbarian") {strBox.textContent= 'STR: 18'} 
            else if (classNameVar == "Class: Fighter" || classNameVar == "Class: Champion" ) {conBox.textContent= 'CON: 18'}
            
        
        })
        .catch(err => {
            console.log("error!", err)})          
    
            

    // Get Deity Data
    let url3 = 'https://api.pathfinder2.fr/v1/pf2/deity'
    fetch(url3,
        {method:'GET',
        headers:{'Authorization':'5cfe0fea-a504-4ee4-8f88-baf84aeabef2'}
        })
        .then(res => {
            return res.json()})
        .then(res => {
            // select deity and show name
            let deityNum = chooseDeity()
            deityName = res.results[deityNum]
            deityBox.textContent = `Deity: ${deityName.name}`

            // assign alignment depending on deity
            let alignNumArr = []
            let alignLen = deityName.system.alignment.follower.length
            for (i=0;i<alignLen;i++) {
               alignNumArr.push(deityName.system.alignment.follower[i])
            }
            let alignmentCode = alignNumArr[dieRoll(alignLen)-1]

            alignmentCode = alignmentCode.replace('L','Lawful ').replace('G','Good ').replace('N','Neutral ').replace('E','Evil ').replace('C','Chaotic ')

            alignmentBox.textContent =`Alignment: ${alignmentCode}`
        })
        .catch(err => {
            console.log("error!", err)})
        
}




classBtns.forEach(button => {
    button.addEventListener('click', getData)})

classBtns.forEach(button => {
    button.addEventListener('click', recProfs)})