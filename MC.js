//Calendar
const calendar = document.querySelector('.calendar')

//Mood emoji 
const moods = document.querySelectorAll('.select')

//Action buttons
const randomize = document.querySelector('.randomize')
const clear = document.querySelector('.clear')

//Nav buttons
const navDiv = document.querySelector('.nav-buttons')

//Date
let d = new Date()

//Colors
let colors = ['#2d6b5f', '#72e3a6', '#dff4c7', '#edbf98', '#ea3d36']

//Create the calendar on load
window.addEventListener('load', createCalendar)

//Setmood 
moods.forEach(mood => {
    mood.addEventListener('click', setMood)
})

function createCalendar() {
        //Arrays
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let daysarray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
        //Year and month variable
        let year = d.getFullYear()
        let month = d.getMonth()

        //All months and all years
        let monthInYear = new Date(year, 11).getMonth()
        let daysInMOnth = new Date(year, month, 0).getDate()

        //Getting all months by each name
        for (let i = 0; i <= monthInYear; i++) {
            let d = new Date(year, i) 
            let firstDay = new Date(year, i, 1).getDay()
            let monthName = months[d.getMonth()]

            //Generating divs
            const list = document.createElement('ul')
            const allDaysDiv = document.createElement('div')
            allDaysDiv.classList.add('alldaysdiv')
            const monthDiv = document.createElement('div')
            monthDiv.classList.add('month')
            const p = document.createElement('p')
            p.classList.add('monthname')
            p.innerText = monthName
            monthDiv.appendChild(p)
            monthDiv.appendChild(list)
            calendar.appendChild(monthDiv)

            //Creating weeknames
            for (let i = 0; i < daysarray.length; i++) {
                const dayDiv = document.createElement('li')
                dayDiv.classList.add('day')
                const name = document.createElement('p')
                name.innerText = daysarray[i]
                list.appendChild(dayDiv)
                monthDiv.appendChild(list)
                dayDiv.appendChild(name)
            }

            monthDiv.appendChild(allDaysDiv)

            //Getting all day of days by each name
                for (let j = 1; j <= daysInMOnth; j++) {
                    let d = new Date(year, i, j)
                    let dayName = d.getDate() 
                    let dayNum = d.getDay() 
    
                    //Check for specific day month
                    if(year % 4 == 0) {
                        if(monthName === 'February' && j > 29) break
                    } else if (monthName === 'February' && j > 28 ) break
                    if(monthName === 'April' && j > 30) break
                    if(monthName === 'June' && j > 30) break
                    if(monthName === 'September' && j > 30) break
                    if(monthName === 'November' && j > 30) break
    
                    //Creating divs
                    const days = document.createElement('div')
                    days.classList.add('dayEl')
                    //Bug fix
                    if(firstDay === 0) {
                        days.style.gridColumnStart = 7
                    }
                    days.style.gridColumnStart = dayNum
                    days.innerText = dayName 
                    allDaysDiv.appendChild(days)
            }
        }
    const daydivs = document.querySelectorAll('.dayEl')
    if(localStorage.getItem('calendar')) {  
        const bg = JSON.parse(localStorage.getItem('calendar'))
            for (let j = 0; j < bg.length; j++) {
                daydivs[j].style.background = bg[j]
            }

    } else {
        daydivs.forEach(daydiv => {
            daydiv.style.background = '#bbb'
        })
    }
    
    //Set div bc color 
    daydivs.forEach(daydiv => {
        daydiv.addEventListener('click', setBc)
    })

    //Action event listeners
    randomize.addEventListener('click', randomizeBc)
    clear.addEventListener('click', clearBc)
}   

function setMood(e) {
    const selected = document.querySelector('.selected')
    if(!e.target.classList.contains('selected')) { 
        e.target.classList.add('selected')     
        if(selected) {
            selected.classList.remove('selected') 
        }
    } else {
        selected.classList.remove('selected')
    }
}

function setBc(e) {
    const selected = document.querySelector('.selected')
    let bg = e.target

    //Simple checks 
    if(selected) {
        if(selected.classList.contains('one')) {
            bg.style.background = colors[0]
        } else if (selected.classList.contains('two')) {
            bg.style.background = colors[1]
        } else if (selected.classList.contains('three')) {
            bg.style.background = colors[2]
        } else if (selected.classList.contains('four')) {
            bg.style.background = colors[3]
        } else if (selected.classList.contains('five')) {
            bg.style.background = colors[4]
        }
    } else {
        bg.style.background = '#bbb'
    }
    save()
}

function randomizeBc() {
    const daydivs = document.querySelectorAll('.dayEl')
    for (let i = 0; i < daydivs.length; i++) {
        let randomcolor = Math.floor(Math.random() * colors.length) 
        daydivs[i].style.background = colors[randomcolor]
    }
    save()
}

function clearBc() {
    const daydivs = document.querySelectorAll('.dayEl')
    for(let i = 0; i < daydivs.length; i++) {
        daydivs[i].style.background = '#bbb'
    }
    localStorage.removeItem('calendar')
}

function save() {
    const dayElements = document.querySelectorAll('.dayEl')
    let a
    if(localStorage.getItem('calendar') === null) {
        a = []
    } else {
        a = JSON.parse(localStorage.getItem('calendar'))
    }
    for (let i = 0; i < dayElements.length; i++) {
        a.push(dayElements[i].style.background)
        if(a.length > 365) {
            a.shift()
        }
    }
    localStorage.setItem('calendar', JSON.stringify(a)) 
}