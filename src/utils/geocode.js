const request = require('request')
const chalk = require('chalk')

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZHVyd2FyZCIsImEiOiJjanN0NWsxem0xNTh1NDVwaHh6bW10dWxhIn0.fOTUhsdHvwow9onb2kfu8Q&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('Provided value does not match any known location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode