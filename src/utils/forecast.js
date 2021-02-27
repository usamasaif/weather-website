const request=require("request");
const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=387b317f4805a93f86b24b0a460718e9&query=${latitude},${longitude}&units=f`;

request({url,json:true},(error,{body})=>{
       if(error){
               callback("Unable to connect to weather services.",undefined);
       }else if(body.error){
               callback("Unable to find the location.",undefined);
       }else{
        callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out.It feels like ${body.current.feelslike}% degrees out.`);
       }
       
})
}
module.exports=forecast;