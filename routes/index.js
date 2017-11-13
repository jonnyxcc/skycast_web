var axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');
var geocoder = require('geocoder');
var https = require('https');
var router = express.Router();

var axiosForecast = axios.create({
	baseURL: 'https://api.darksky.net/forecast/[YOUR_API_KEY]'
});

var gResponse;
var x  = 0;

//bodyParser Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Get Homepage
router.get('/', function(req, res){
	res.render('index');
});

//Weather Report
router.post('/', function(req, res){
	// Get city and dates for lookup
	var city = req.body.city;
	var date = req.body.start;
	// Validation
	req.checkBody('city', 'A city is required').notEmpty();

	//console.log('City: ' + city);
	//console.log('Date1: ' + date1);
	//console.log('Date2: ' + date2);
	//geocoder uses the google API for you to return the geocode
	var errors = req.validationErrors();

	if(errors){
		res.render('index',{
			errors:errors
		});
	} else if(date != ''){
		getCoords(city, function(coords){
			axiosForecast.get('/'+coords[0]+','+coords[1]+','+Date.parse(date)/1000)
				.then((response) => {
					//console.log('Lat and lng: ' + coords);
					gResponse = response.data;
					res.redirect('/weatherd');
				})
				.catch(err => console.log(err));
	});
	} else {
		getCoords(city, function(coords){
			axiosForecast.get('/'+coords[0]+','+coords[1])
				.then((response) => {
					//console.log('Lat and lng: ' + coords);
					gResponse = response.data;
					res.redirect('/weather');
				})
				.catch(err => console.log(err));
	});
}


	
});

// Get Homepage
router.get('/weather', function(req, res){
	var day1 = gResponse.daily.data[0];
	var day2 = gResponse.daily.data[1];
	var day3 = gResponse.daily.data[2];
	var day4 = gResponse.daily.data[3];
	var day5 = gResponse.daily.data[4];
	var day6 = gResponse.daily.data[5];
	var day7 = gResponse.daily.data[6];
	//console.log(day1);
	res.render('weather',{
		gResponse:gResponse,
		day1:day1,
		day2:day2,
		day3:day3,
		day4:day4,
		day5:day5,
		day6:day6,
		day7:day7
	});
});

// Time Machine Home Page
router.get('/weatherd', function(req, res){
	var day1 = gResponse.daily.data[0];
	var day2 = gResponse.daily.data[1];
	var day3 = gResponse.daily.data[2];
	var day4 = gResponse.daily.data[3];
	var day5 = gResponse.daily.data[4];
	var day6 = gResponse.daily.data[5];
	var day7 = gResponse.daily.data[6];
	//console.log(day1);
	res.render('weatherd',{
		gResponse:gResponse,
		day1:day1,
		day2:day2,
		day3:day3,
		day4:day4,
		day5:day5,
		day6:day6,
		day7:day7
	});
});

function getCoords(city, callback){
	geocoder.geocode(city, function(err,data){
		var coords = [];
		coords[0] = data.results[0].geometry.location.lat;
		coords[1] = data.results[0].geometry.location.lng;
		
		callback(coords);
	});
}

module.exports = router;
