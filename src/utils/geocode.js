
const request = require("request")


const geocode = (add, callback)=>{
    const urlSearch = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(add) +".json?access_token=pk.eyJ1IjoidmlrcmFtODMyIiwiYSI6ImNraWg3Z3J2bDA0dGIycm54dHhsdnVmZnQifQ.Onz6dq-h46Di4oBW136HgA&limit=1"

    request({url: urlSearch, json: true}, (error, {body})=>{
        if(error){
            // console.log("check net")
            callback("Something went wrong", undefined)
        }
        else if(body.message == "Not Found"){
            // console.log("error")
            callback("Provide location", undefined)
        }
        else{
            const ll = body.features[0].center
            const name = body.features[0].place_name
            const latlong = {
                longitude: ll[0],
                latitude: ll[1],
                name
                
            }
            // console.log("latitude: " + ll[1] + " longitude: " + ll[0])
            callback(undefined, latlong)
        }
    })
}

module.exports = geocode