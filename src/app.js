const path = require('path')
const express = require("express")
const { read } = require('fs')
const hbs = require("hbs")
const request = require("request")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Welcome to the app!!",
        name: "Vikram Deshmukh"
    })
})

app.get("/about",(req, res)=>{
    res.render("about", {
        title: "About me",
        name: "vikzam"
    })
})

app.get("/help", (req, res)=>{
    res.render("help", {
        title: "help",
        para: "djdskjsdgiosjgiosffhgjgnjfnvdcmvcmv"
    }) 
})

app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "Enter place"
        })
    }

    res.send({
        products: []
    })
})

app.get("/weather", (req, res)=>{
    if(!req.query.add){
        return res.send({
            error: "provide add"
        })
    }
    
    geocode(req.query.add, (error, {longitude, latitude, name}={})=>{
        if(error){
            return error
        }
        forecast(longitude, latitude, (error, fdata) => {
            if(error){
                return error 
            }

            res.send({
                location: name,
                data: fdata
            })
            
          })
    
    }) 
     
    // res.send({
    //     location: req.query.add
    // })
})

app.get("*", (req, res)=>{
    res.render("404",{})
})

app.listen(port, ()=>{
    console.log('server is up on the port '+ port)
})