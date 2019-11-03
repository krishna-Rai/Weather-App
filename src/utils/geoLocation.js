const request = require('request')

const geoLocation = (address,callback)=>{
    const endpoint = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoia3Jpc2huYS1yYWkiLCJhIjoiY2syOG5wYnloMWVlYjNudGNtNjlpbm91MiJ9.y4yWlL4aJg_fxeKaFkt5cA&limit=1"
    request.get({url:endpoint,json:true},(error,response)=>{

        if(error)
        {
            callback("Unable to reach mapbox",undefined)
        }
        else if(response.body.message === 'Not Found'){
            callback("No result for the search key",undefined)
        }
        else if(response.body.features.length===0){
            callback("No results found",undefined)
        }
        else{
            const latitude = response.body.features[0].geometry.coordinates[1]
            const longitude = response.body.features[0].geometry.coordinates[0]
            const placeName = response.body.features[0].place_name
            callback(undefined,{
                latitude:latitude,
                longitude:longitude,
                placeName:placeName
            })
        }
        

    })
}

module.exports = geoLocation