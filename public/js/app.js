console.log('Script is loaded!')

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchTerm.value
    
    msgOne.textContent = 'Waiting for the data...'
    //debugger
    msgTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})