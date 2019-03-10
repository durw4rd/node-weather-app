const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, location, callback) => {
    const url = `https://api.darksky.net/forecast/7c9a473f88240fe05d505fec97e1e864/${longitude},${latitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(chalk.red.bold.inverse('Unable to access the weather service!'), undefined)
        } else if (body.error) {
            callback(chalk.red.inverse(body.error), undefined)
        } else {
            const temp = body.currently.temperature
            const precip = body.currently.precipProbability
            const summary = body.currently.summary
    
            callback(undefined, `${summary}. It is currently ${temp}°C. There is a ${precip * 100}% chance of rain.`)
        }
    })
}

module.exports = forecast