const request = require('request');

const geocode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmtzamVwcHUiLCJhIjoiY2p1MjM0am5yMDgxNzN5bXlzY3FhMGJ1YSJ9.zVZJFVYhi-lvCgkboYQeBQ';
    
    request({url: geoUrl, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        }
        else if (!body.features.length) {
            callback('Unable to find location. Try again.', undefined);
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name  
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;