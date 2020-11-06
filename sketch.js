var database ,dog,dog1,dog2
var position;

var dog,happydDog,database,foodStock,foodS;

var feed,add
var foodobject
var Feedtime
var Lastfeed


function preload()

{
  
  //load images here
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
  
  textSize(20);
  fill("black");
  text("Food Remaining:" + foodS ,180,150);

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
feed = createButton("FEED DRAGO")
feed.position(500,15)
feed.mousePressed(FeedDog)
add = createButton("ADD FOOD")
add.position(400,15)
add.mousePressed(AddFood)

} 



function draw(){
  background(46,139,87);
 foodobject.display()
 
Feedtime = database.ref('FeedTime');
Feedtime.on('value',function(data){
    Lastfeed = data.val();
});

  fill(255,255,254);
 textSize(15);

  
 drawSprites();
  
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
  
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}