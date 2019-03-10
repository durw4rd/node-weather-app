const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, location, callback) => {
    const url = `https://api.darksky.net/forecast/7c9a473f88240fe05d505fec97e1e864/${longitude},${latitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to access the weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const temp = body.currently.temperature
            const precip = body.currently.precipProbability
            const windSpeed = body.currently.windSpeed
            const cloudCover = body.currently.cloudCover
            const weeklyOutlook = body.daily.summary.toLowerCase()
            const dailySummary = body.daily.data[0].summary
            //const currentWeather = body.currently.summary
    
            callback(undefined, [
                `${dailySummary} Looking into the crystal ball, we see ${weeklyOutlook}`,
                `It is ${temp}°C. Wind speed is ${windSpeed}m/s and there is a ${precip * 100}% chance of rain. If you look up, you should see the clouds covering roughly ${cloudCover * 100}% of the sky.`
            ])
        }
    })
}

module.exports = forecast