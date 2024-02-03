const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();

//Defining paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Static templates directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Madhav'
    });
})

app.get('/weather', (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.send({
            error: 'You must provide a location to search'
        })
    }

    forecast(location, (error, { text, temp } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        res.send({
            forecast: `It is ${text} outside. Temperature is ${temp}°C`
        })
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Madhav'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is a help message',
        name: 'Madhav'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found!',
        name: 'Madhav'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found!',
        name: 'Madhav'
    });
})

// Using index.html so no use of this
// app.get('', (req, res) => {
//     res.send('<h1>Aur bhai!</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send({
//         author: 'Mahdav Varshney',
//         text: 'No help for noobs!'
//     });
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// })

app.listen('3000', () => {
    console.log('Server is up on port 3000');
})