// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api', (req, res) => {
    const date = new Date(); // creating the date object

    res.json({
        unix: date.getTime(), // get the unixtimestamp
        utc: date.toUTCString() // the utc format 
    }); 

});

app.get('/api/:date', (req, res) => {

    // input: asldfjasd ==> Invalid Date
    // input: 2015-12-25 (string) ==>  it will create a date object 
    // input: 1451001600000 unixtimestamp (number) ==> Invalid Date will not create a valid date

    // so we have Invalid Date in 2 cases :
    //          1 asldfjasd: if we try to turn that format into UTC format will get Invalid Date 
    //          2 1451001600000: Invalid Date wee need to parse it with +
        //          so if we ahve Invalid Date we need to parse it as integer if it is still Invalid Date then it was asldfjasd from the start


    // we get input as valid Date 2015-12-25
    let date = new Date(req.params.date);
    
    
    // if we hade a unixtimestamp wehave to parsed it with +
        // unixtimestamp will give Invalid if we try to fet the utc format
    if (date.toUTCString() === "Invalid Date") {
        date = new Date(+req.params.date);
    }
    // we get invalid date like asdfasdhlasjdf
   if( date.toUTCString() === "Invalid Date") {

       res.json({error: "Invalid Date"});
   } 
    

    res.json({unix: date.getTime(),
    utc: date.toUTCString()
    });

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
