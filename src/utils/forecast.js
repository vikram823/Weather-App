const request = require("request")

const forecast = (long, lat, callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=5c30f5e71d46f5eae8a3f4a9149eef55&query=" + lat + "," + long + "&units=f"

    request({url: url, json: true},(error, {body})=>{
    if(error){
        // console.log("something went wrong")
        callback("check net", undefined)
    }
    else if(body.error){
        // console.log("error")
        callback("wrong", undefined)
    }
    else{
        const temp = body.current.temperature
        const feels = body.current.temperature
        const dec = body.current.weather_descriptions[0] 
        const forecast = {
            temp,
            feels,
            dec
        }
  
        // console.log(dec)
        // console.log("current temp is "+temp+" , it feels like "+ feels)
        callback(undefined, forecast)
    }
   
})





}

module.exports = forecast