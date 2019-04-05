const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Setup handlebars engine, views & partials location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// setup static folder to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Express Home',
        name: 'Home Page'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some help text',
        title: 'Help',
        name: 'Naresh Kumar S'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Express About',
        name: 'Naresh Kumar S'
    });
});

app.get('/weather', (req, res) => {
    let address  = req.query.location;
    if (!address) address = 'Bengaluru'; 
    
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error)
            return res.send({error});
        else {
            forecast(latitude, longitude, (error, _data) => {
                if (error)
                    return res.send({error});
                else {
                    const forecast = _data.summary + '. Current temprature is ' +
                    _data.temperature + ' ˚C. There is a ' + (_data.precipProbability*100) +
                    '% chance of rain.';
                    res.send({
                        location,
                        forecast
                    });
                }
            });
        }
            
    });
    //res.send('Weather Channel');
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naresh Kumar S',
        errorMsg:'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naresh Kumar S',
        errorMsg: 'File not found'
    });
});

app.listen(3000, () => {
    console.log('Web server strated!');
});