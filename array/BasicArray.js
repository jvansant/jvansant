
var peopleArray = []; //Blank to start
//var strangArray= [];

function setup() {

createCanvas(windowWidth, windowHeight);
var nam = random(0,3);
var peopleToString = "";
}

function draw() {
background(200);
  
  for(var i=0; i<peopleArray.length; i++){
    peopleArray[i].display(i);
    peopleArray[i].move();
    //peopleToString += peopleArray[i].getName() + " ";
  }
  
text(peopleArray.length,5,50);//prints length
}


function mousePressed(){//adds to list
 peopleArray.push(new Person("zeke"));
}

function keyPressed(){//removes from list
  peopleArray.splice(0,1);
}




function Person(name){//Person Object Contructor!
  this.name = name; //name variable randomly from sampleNames
  this.x = random(0, width); //random x 
  this.y = random(0, height); //random y
  
  this.display = function(place){//displays name 
    fill(0);
    textSize(50);
    text(this.name,this.x, this.y);
  }
  
  this.move = function() {//moves name right then resets at 0
     if(this.x<width){
      this.x++;
    }
    else{
    this.x=0;
  }
  
}
}
  