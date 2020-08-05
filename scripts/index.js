let containerSearch = document.querySelector('#containerSearch')
let inputSearch = document.querySelector('#inputSearch')
let buttonSearch = document.querySelector('#buttonSearch')
let resultsUsers = document.querySelector('#resultsUsers')
let dataDiv = document.querySelector('#dataDiv')

let dataUsers = []
let wordSearch = null

window.addEventListener('load', () => {
    doFetchApi()
    inputSearch.focus()
    searchUsers()
})           

function searchUsers(event){
    function searchFunction(event){
        if ((event.key === 'Enter' || event.which === 1) && inputSearch.value.trim() !== ''){
            wordSearch = inputSearch.value
            return filterUsers(wordSearch)
        }
    }

    buttonSearch.addEventListener('mousedown', searchFunction)
    inputSearch.addEventListener('keyup', searchFunction)
}

async function doFetchApi(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    const json = await res.json()
    dataUsers = json.results.map(user =>{
        const {name, picture, dob, gender} = user

        return{
            firstName: name.first,
            lastName: name.last,
            picture,
            age: dob.age,
            gender,
        }
    })
    return dataUsers
}

function foundUsers(dataUsersFiltered){
    
    let totalUsers = []
    let count = 0
    for(let i = 0; i < dataUsersFiltered.length; i++){
        
        ++count
    let titleResults = `
            <span id="totalUsers">
                <img src="${dataUsersFiltered[i].picture.thumbnail}" alt="">
                <p id="currentName">${dataUsersFiltered[i].firstName} ${dataUsersFiltered[i].lastName}, ${dataUsersFiltered[i].age} anos</p>
            </span>`
        totalUsers += titleResults
    }
    tittleUsers = `<h3>${count} usuário(s) encontrado(s)</h3>
    `
    resultsUsers.innerHTML = tittleUsers + totalUsers
}

function statisticsUsers(dataUsersFiltered){

    let someAges = 0
    let averageAges = 0
    let femaleGender = 0
    let maleGender = 0

    for(let i = 0; i <  dataUsersFiltered.length; i++){
        if( dataUsersFiltered[i].gender == 'male'){
            maleGender += 1
        }
        else{
            femaleGender += 1
        }

        someAges +=  dataUsersFiltered[i].age
    }

    averageAges = (someAges / dataUsersFiltered.length).toFixed(2)
    console.log(averageAges)
    if(averageAges === 'NaN'){
        console.log('eu sou zero')
        averageAges = 0
    }

    let statisticsResults = `
        <span id="statisticsUsers">
            <h3>Estatísticas</h3>
            <p>Homens: ${maleGender} </p>
            <p>Mulheres: ${femaleGender} </p>
            <p>Soma das idades: ${someAges} </p>
            <p>média das idades: ${averageAges} </p>
        </span>
    ` 
    dataDiv.innerHTML = statisticsResults
}

function filterUsers(wordSearch){
    console.log(wordSearch)
    
    let dataUsersFiltered = []


    dataUsersFiltered = dataUsers.filter(names => {
        const {firstName, lastName} = names
        if (firstName.toLowerCase().includes(wordSearch.toLowerCase()) || lastName.toLowerCase().includes(wordSearch.toLowerCase())){
            return true
        }
        else{
            return false
        }
    })

    statisticsUsers(dataUsersFiltered)
    foundUsers(dataUsersFiltered)
}