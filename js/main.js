// Javascript written by Nolan Hegge, 1/23/2026
// Original Code Source: GEOG 575 - Activity 3
// Credit to Chapter 2 and 3 for help with initialize() and cities() functions

//initialize function called when the script loads
function initialize(){
	cities();
    //added for activity 4
    loadGeodata();
	debugAjax();
};

//function to create a table with cities and their populations
function cities(){

	//define an array of objects for cities and population
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//create a table element
	var table = document.createElement('table');

	//create a header row element and append it to the table
	var headerRow = document.createElement('tr');
	table.appendChild(headerRow);

	//create the "City" and "Population" column headers
	headerRow.insertAdjacentHTML('beforeend','<th>City</th><th>Population</th>');

	//loop to add a new row for each city
	cityPop.forEach(function(cityObject){

		//assign longer html strings to a variable
		var rowHtml = '<tr><td>' + cityObject.city + '</td><td>' + cityObject.population + '</td></tr>';

		//add the row's html string to the table
		table.insertAdjacentHTML('beforeend', rowHtml);
	});

	//append the table element into the div
	document.querySelector('#mydiv').appendChild(table);

	//then add third column and events after the table exists
	addColumns(cityPop);
	addEvents();
};

//function to add a new column to the table
function addColumns(cityPop){

	//loop to add a new column to each row
	document.querySelectorAll('tr').forEach(function(row, i){

		//for first row in the table, add the column header
		if (i == 0){

			row.insertAdjacentHTML('beforeend', '<th>City Size</th>');

		} else {

			//determine city size based on population (small < 100000, medium < 500000, else large)
			var citySize;

			if (cityPop[i-1].population < 100000){
				citySize = 'Small';

			} else if (cityPop[i-1].population < 500000){
				citySize = 'Medium';

			} else {
				citySize = 'Large';
			};

			//add new table cell with the city size
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
		};
	});
};

//function to add different mouse events to table (click/hover)
function addEvents(){

	//select the table element
	var table = document.querySelector('table');

	//add a random color when there is mouseover (hovered over) on the table
	table.addEventListener('mouseover', function(){

		var color = 'rgb(';

		//generate a random color
		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ',';
			} else {
				color += ')';
			};
		};

		//style the table with the random color
		table.style.color = color;
	});

	//function that sends an alert when table is clicked
	function clickme(){
		alert('Hey, you clicked me!');
	};

	//event listener that watches for a click on the table
	table.addEventListener('click', clickme);
};

/*
\/\/\/\/ CODE ADDED IN ACTIVITY 4 \/\/\/\/
*/

//loads in the MegaCities GeoJSON file and logs it into the console
function loadGeodata(){
    //variable to hold the data being loaded
    var myData;
    
    //fetch the data
    fetch('data/MegaCities.geojson')
        .then(function(response){
            return response.json();
        }) 
        .then(function(response){
            //store in myData variable
            myData = response;

            //log the data
            console.log(myData);
        }) 
};

//function called after we fetch and convert the GEOJSON file which we then display on our webpage
function debugCallback(myData){
    //display the GEOJson data
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data: <br>' + JSON.stringify(myData));
};

// function that fetches GeoJSON data and then passes it into the debugCallback function
function debugAjax(){	
	fetch("data/MegaCities.geojson")
		.then(function(response){
			return response.json();
		})
        //call debugCallback using the result
        .then(debugCallback);
};

/*
^^^^^ CODE ADDED IN ACTIVITY 4 ^^^^
*/

//once DOM has loaded then call initialize() function to run the code
document.addEventListener('DOMContentLoaded', initialize);