

const alchemistBtn = document.querySelector('#alchemist')
const tester = document.querySelector('#tester')



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

alchemistBtn.addEventListener('click',getData)
tester.addEventListener('click',getData)