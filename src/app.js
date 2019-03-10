const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const log = console.log
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Amazing weather app!',
        name: 'Durward'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        age: 27,
        name: 'Durward'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'SOS SOS SOS SOS',
        name: 'Durward'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to enter an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, location, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } else {
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            }
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Title',
        name: 'name',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    log(`Server is up on port: ${port}`)
})