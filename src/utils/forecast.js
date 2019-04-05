const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/12216b6803712884b12176aec6a3164f/' + 
        encodeURIComponent(latitude) + encodeURIComponent(',') + encodeURIComponent(longitude) +
        '?units=si';
    //console.log(url);
    
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        }
        else if (body.error) {
            callback('Unable to find location. Try again.', undefined);
        } else {
            callback(undefined, body.currently);
        }
    });
};

module.exports = forecast;