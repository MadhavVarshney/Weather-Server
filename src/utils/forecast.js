const request = require('postman-request');

const forecast = (location, callback) => {
    const url = `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(location)}&key=0e569734c18e4bc2bb5150021242901`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to servers!', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location.', undefined);
        }
        else {
            const weather = response?.body?.current;
            callback('', {
                text: weather?.condition?.text.trim(),
                temp: weather?.temp_c
            })
        }
    })
}

module.exports = forecast;