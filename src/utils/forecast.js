const request = require('request')

const forecast = (lat, lon, callback) =>{
    const url='http://api.weatherstack.com/current?access_key=a045df5ae8df7972297ee6b6f7f91cfa&query='+lat+','+lon+''
    request({url: url, json: true}, (err, {body})=>{
        if (err){
            callback('Unable to connect ', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        }   else{
            callback(undefined, 'Il fait actuellement ' + body.current.temperature + ' degre(s).')
        }
    })   

}

module.exports = forecast