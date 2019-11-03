const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoLocation = require('./utils/geoLocation')

const app = express()
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewPath)
app.use(express.static(publicDirPath))

hbs.registerPartials(partialPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Krishna Rai"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Krishna Rai"
    })
})
app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:"You must provide a search term"
        })
    }
    geoLocation(req.query.address,(error,response)=>{
        if(error){
            res.send({
                error:error
                
            })
        }
        else{
            forecast(response.latitude,response.longitude,(error,forecastData)=>{
                if(error){
                    res.send({
                        error:error
                    })
                }
                else{
                    res.send({
                        forecast:forecastData,
                        location:response.placeName,
                        address:req.query.address
                    })
                }
            })
        }
    })
    

})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        msg:"Help about the weather app",
        name:"Krishna Rai"
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Krishna Rai",
        ErrorMsg:"Help Page not Found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"krishna Rai",
        ErrorMsg:"404 Not Found"
    })
})
app.listen(4000,()=>{
    console.log("Server is up on 4000");
})