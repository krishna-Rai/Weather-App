const request = require('request')
const forecast = (latitude,longitude,callback)=>{

    const url = "https://api.darksky.net/forecast/a0e9e93f0e911379f373aee66ea88fd5/"+latitude+","+longitude+"?units=si"
    request.get({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to weather API",undefined)
        }
        else if(response.body.code===400){
            callback(response.body.error,undefined)
        }
        else{
            const currentData = response.body.currently
         callback(undefined,"Current temperature is:"+currentData.temperature+" The chance of precipitation is:"+currentData.precipProbability)
           
        }
    
})
}

module.exports = forecast