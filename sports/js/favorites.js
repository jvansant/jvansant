async function populate_nba_teams(){
    let input = document.querySelector("#nbaTeamSelect");
    // let input1 = document.querySelector("#nflTeamSelect");
    // let input2 = document.querySelector("#mlbTeamSelect");
    // let input3 = document.querySelector("#nhlTeamSelect");
    let data= await getData("https://www.balldontlie.io/api/v1/teams");
    for(let team of data["data"]){
        let team_name=document.createElement("option");
        // let team_name2=document.createElement("option");
        // let team_name3=document.createElement("option");
        // let team_name1=document.createElement("option");
        team_name.innerHTML=team["full_name"];
        team_name.value=team["id"];
        // team_name2.innerHTML=team["full_name"];
        // team_name3.innerHTML=team["full_name"];
        // team_name1.innerHTML=team["full_name"];
        input.appendChild(team_name);
        // input2.appendChild(team_name1);
        // input3.appendChild(team_name2);
        // input1.appendChild(team_name3);
    }
}


function save_favorite_team(){
    let fav_dict = {};
    let id=document.querySelector("#nbaTeamSelect").value;
    let name=document.querySelector("#nbaTeamSelect").value;
    let nba_dict={};
    nba_dict["id"]=id;
    localStorage.setItem("nba", JSON.stringify(nba_dict));
    console.log(nba_dict);
    get_distances();
}

function get_favorites() {
    let item=localStorage.getItem("nba");
    console.log(item);
    let returnv=JSON.parse(item)
    let id = returnv["id"];
    return id;

    
}

function load_favorites(){
    let current= get_favorites();
    if(current){
        let sel=document.querySelector("#nbaTeamSelect");
        let opts=sel.options;
        for (var opt, j = 0; opt = opts[j]; j++) {
            if (opt.value == current) {
            sel.selectedIndex = j;
            break;
            }
        }
    }
}
