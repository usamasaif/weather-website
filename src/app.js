const path = require('path');
const express = require('express');
const forecast=require("./utils/forecast");
const geocode=require("./utils/geocode");
const hbs=require("hbs");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set("view engine","hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:"Usama Saif"
    });
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Usama Saif"
    });
})

app.get("/help",(req,res)=>{
    res.render("help",{
        helpText:"This is some helpful text.",
        title:"Help",
        name:"Usama Saif"
    });
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title: '404',
        name: "Usama Saif",
        errorMessage: 'Help article not found.'
    })
})


app.get("/weather",(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:"You must provide a address!"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
               return res.send({error});
        }
       
        forecast(latitude,longitude,(error,forecastdata)=>{
              if(error){
                      return res.send({error});
              }
             res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
    })
        })

    })
    

})

app.get('*', (req, res) => {
    res.render('404', {
    title: '404',
    name: "Usama Saif",
    errorMessage: 'Page not found.'
    })
    })


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})