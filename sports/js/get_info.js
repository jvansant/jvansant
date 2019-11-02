/* jshint esversion: 7 */
/* jshint node: true */
'use strict';
let api_key_token="25457f5d-fb05-4d7a-81c4-9e4acd:MYSPORTSFEEDS";
let encodedString="MjU0NTdmNWQtZmIwNS00ZDdhLTgxYzQtOWU0YWNkOk1ZU1BPUlRTRkVFRFM=";
let encodedString2=btoa(api_key_token);
let closestTeam;


async function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

async function get_ip(){
    let ip_url = "https://api.ipify.org/?format=json";//API #1 TO GET IP ADDRESS
    let ip = await getData(ip_url);
    return ip["ip"];
}

async function get_user_location(){
    let ip = await get_ip();
    let loc_url = "https://ipapi.co/" + ip + "/json/";//API #2 TO GET LOCATION FROM IP ADDRESS
    let loc = await getData(loc_url);
    let latitude=loc["latitude"];
    let longitude=loc["longitude"];

    let userLocationDiv = document.querySelector("#userLocation");
    userLocationDiv.innerHTML =`You are currently located in: ${loc["city"]}`;
    userLocationDiv.className = "alert alert-primary";

    let coords=[latitude, longitude];
    return coords;
}

async function get_cities(){
    let cities=[];
    let data= await getData("https://www.balldontlie.io/api/v1/teams");//API #3 TO GET NBA DATA
    let cityDict = {};
    for(let team of data["data"]){
        let city = team["city"];
        let id = team["id"];
        if (city == "Golden State"){
            city = "Oakland";
        }
        if (city == "New York"){
            city = "Manhattan";
        }
        if (city == "Utah"){
            city = "Salt Lake City";
        }
        if (city == "LA"){
            city = "Los Angeles";
        }
        if (city == "Minnesota"){
            city = "Minneapolis";
        }
        if (city == "Indiana"){
            city = "Indianapolis";
        }
        
        cityDict[city] = id;
        cities.push(city);
    }    
    return [cities, cityDict];
}

function compare_coords(lat1, lon1, lat2, lon2){
    if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
	    dist = dist * 0.8684//miles
		return dist;
	}
}

async function get_distances() {
    let closest=["north pole", Number.MAX_SAFE_INTEGER];
    let coords= await get_user_location();
    let userLat=coords[0];
    let userLong=coords[1];

    let cityRV = await get_cities();
    let cities = cityRV[0];
    let cityDict = cityRV[1];
    
    let urlBase = "https://api.opencagedata.com/geocode/v1/json?q=";//API #4 TO GET LAT & LONG FROM CITY 
    let apiKey = "&key=33c951adb8424a92bb0ae366ce8f655e&language=en&pretty=1"
    let responseList = [];
    for (let city of cities) {
        let cityUrl = `${urlBase}${city}${apiKey}`;
        let promise = getData(cityUrl);
        responseList.push(promise);
    }

    let promiseList = await Promise.all(responseList);
    
    for (let item of promiseList) {
        let coordinates = item["results"][0]["geometry"];
        let latitude = coordinates["lat"];
        let longitude = coordinates["lng"];
        let city = item["results"][0]["components"]["city"];
        let distance=parseInt(compare_coords(parseFloat(userLat), parseFloat(userLong), parseFloat(latitude), parseFloat(longitude)));
        if(distance<closest[1]){closest=[city, distance]}
    }
    closestTeam = cityDict[closest[0]];
    let teamDiv = document.querySelector("#teamLocation");
    teamDiv.className = "alert alert-primary";
    teamDiv.innerHTML = `The closest city with an NBA team is ${closest[0]}, which is ${closest[1]} miles away.`;

    get_team_data();
}

async function get_team_data() {
    let gameUrl = `https://www.balldontlie.io/api/v1/games?seasons[]=2018&team_ids[]=${closestTeam}&team_ids[]=${get_favorites()}&per_page=100&page=`;
    let games = await getData(gameUrl);
    let meta = games["meta"];
    let page_number = meta["total_pages"];
    let seriesList = []
    let favoriteTeam = get_favorites();
    
    let warningDiv = document.querySelector("#sameTeam");
    warningDiv.className = "";
    warningDiv.innerHTML = "";
    if (favoriteTeam == closestTeam) {
        warningDiv.className = "alert alert-danger";
        warningDiv.innerHTML = "Your favorite team is also the closest! Go buy some tickets!";
    }
    

    for (let i = 1; i < page_number+1; i++) {
        let pageUrl = gameUrl + i;
        let games = await getData(pageUrl);
        for (let game of games["data"]){
            let homeId = game["home_team"]["id"];
            let visitorId = game["visitor_team"]["id"];

            if (homeId == closestTeam && visitorId == favoriteTeam){
                seriesList.push(game);
            }

            else if (homeId == favoriteTeam && visitorId == closestTeam) {
                seriesList.push(game);
            }
        };
    }

    let aGame = seriesList[0];
    let favTeamName = "";
    if (aGame["home_team"]["id"] == favoriteTeam){
        favTeamName = aGame["home_team"]["full_name"];
    }
    else {
        favTeamName = aGame["visitor_team"]["full_name"];
    }
    let favDiv = document.querySelector("#currentFav");
    favDiv.innerHTML = `You have selected the ${favTeamName} as your favorite team. Use the dropdown menu to change it.`;
    favDiv.className = "alert alert-info";
    let gameNum = 1;

    let tablesPlaceholder = document.querySelector("#placeHolder");
    tablesPlaceholder.innerHTML="";
    for (let game of seriesList) {
        let homeTeam = game["home_team"]["full_name"];
        let visitorTeam = game["visitor_team"]["full_name"];
    
        let homeScore = game["home_team_score"];
        let visitorScore = game["visitor_team_score"];

        let homeTeamConference = game["home_team"]["conference"];
        let visitorTeamConference = game["visitor_team"]["conference"];

        let homeTeamDivision = game["home_team"]["division"];
        let visitorTeamDivision = game["visitor_team"]["division"];

        let postseasonGame = game["postseason"];
        let gameDate = game["date"].slice(0,-14);

        let table = document.createElement("table");
        let tableHead = document.createElement("thead");

        let columnLabels = document.createElement("tr");
        let homeTeamHeader = document.createElement("th");
        homeTeamHeader.innerHTML = homeTeam;
        homeTeamHeader.style = "width: 33%";
        let statHeader = document.createElement("th");
        statHeader.innerHTML = "Stats";
        statHeader.style = "width: 33%";
        let visitorTeamHeader = document.createElement("th");
        visitorTeamHeader.innerHTML = visitorTeam;
        visitorTeamHeader.style = "width: 33%";

        columnLabels.appendChild(homeTeamHeader);
        columnLabels.appendChild(statHeader);
        columnLabels.appendChild(visitorTeamHeader);

        tableHead.appendChild(columnLabels);
        
        let scoreRow = document.createElement("tr");
        let homeScoreCell = document.createElement("td");
        homeScoreCell.innerHTML = homeScore;
        let scoreCell = document.createElement("td");
        scoreCell.innerHTML = "Score";
        let visitorScoreCell = document.createElement("td");
        visitorScoreCell.innerHTML = visitorScore;

        scoreRow.appendChild(homeScoreCell);
        scoreRow.appendChild(scoreCell);
        scoreRow.appendChild(visitorScoreCell);

        let conferenceRow = document.createElement("tr");
        let homeConferenceCell = document.createElement("td");
        homeConferenceCell.innerHTML = homeTeamConference;
        let conferenceCell = document.createElement("td");
        conferenceCell.innerHTML = "Conference";
        let visitorConferenceCell = document.createElement("td");
        visitorConferenceCell.innerHTML = visitorTeamConference;

        conferenceRow.appendChild(homeConferenceCell);
        conferenceRow.appendChild(conferenceCell);
        conferenceRow.appendChild(visitorConferenceCell);

        let divisionRow = document.createElement("tr");
        let homeDivisionCell = document.createElement("td");
        homeDivisionCell.innerHTML = homeTeamDivision;
        let divisionCell = document.createElement("td");
        divisionCell.innerHTML = "Division";        
        let visitorDivisionCell = document.createElement("td");
        visitorDivisionCell.innerHTML = visitorTeamDivision;
        
        divisionRow.appendChild(homeDivisionCell);
        divisionRow.appendChild(divisionCell);
        divisionRow.appendChild(visitorDivisionCell);

        let tableCaption = document.createElement("caption");
        tableCaption.innerHTML = `Game ${gameNum}`;
        gameNum ++;

        table.appendChild(tableHead);
        table.appendChild(scoreRow);
        table.appendChild(conferenceRow);
        table.appendChild(divisionRow);
        table.appendChild(tableCaption);
        table.className = "table table-dark";

        let gameInfo = document.createElement("div");
        if (postseasonGame) {
            gameInfo.innerHTML = `This was a playoff game played on ${gameDate}`;
            gameInfo.className = "alert alert-warning";
        }
        else{
            gameInfo.innerHTML = `This was a regular season game played on ${gameDate}`;
            gameInfo.className = "alert alert-success";
        }

        tablesPlaceholder.appendChild(gameInfo);
        tablesPlaceholder.appendChild(table);
    }
}

$(document).ready(function(){
    populate_nba_teams();
    load_favorites();
    let fav =get_favorites();
    if(fav){
        get_distances();
    }
}); 
