const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const App = express()

const publicDir = path.join(__dirname, '../public')
const viewPath =  path.join(__dirname, '../templates/views')
const patialPath = path.join(__dirname, '../templates/partial')

App.set('views', viewPath)
hbs.registerPartials(patialPath)
App.set('view engine', 'hbs');

App.use(express.static(publicDir))
//index page
App.get('', (req, res)=>{
    res.render('index', {
        title:  'Météo', 
        body: 'This is a weather application ',
        owner: 'Sarifoudev'
    })
})
//about page
App.get('/about', (req, res)=>{
    res.render('about',{
        title:  'Météo', 
        body:'Qui suis-je ?',
        owner:'Sarifoudev'
    })
})

//help page
App.get('/help', (req, res)=>{
    res.render('help',{
        title:  'Météo', 
        body:'Comment utiliser cette application',
        owner:'Sarifoudev'
    })
})

//weather
App.get('/weather',(req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})
//error page handler
App.get('*', (req, res)=>{
    res.render('404',{
        body: 'Page not found',
        owner: 'Sarifou'
    })
})

App.listen(3000, ()=>{
    console.log('The web sever is running ...')
})






