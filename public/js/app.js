const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const msgThree = document.querySelector('#msg-3')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchTerm.value
    

    msgOne.textContent = 'Waiting for the data...'
    msgTwo.textContent = ''
    msgThree.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            searchTerm.value = ''
            
            if(data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast[0]
                msgThree.textContent = data.forecast[1]
            }
        })
    })
})