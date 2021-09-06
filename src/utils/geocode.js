const request = require('request')

const geocode = (address, callback) =>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2FyaWZvdSIsImEiOiJja3NrbGpiY2cyNzkyMm9udXU2ZmhzZ2k5In0.vtpOX5tjXKix2cx-ONA24Q&limit=10'
    request({url: url, json: true}, (err, {body}) =>{
        if (err){

            callback('Unable to connect', undefined)

        } else if(body.features.length ==0){

            callback('Unable to find location', undefined)

        }   else{
            callback(undefined, {

                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    
}
module.exports = geocode