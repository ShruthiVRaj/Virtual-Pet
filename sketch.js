var dog, happyDog, database, foodS, foodStock, dogRegular;

function preload()
{
  dogRegular = loadImage("../dogImg1.png");
  happyDog = loadImage("../dogImg.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();


  foodStock = database.ref('Food');
  foodStock.on("value", function(data){
    foodS = data.val();
  });
  
  dog = createSprite(200, 300);
  dog.addImage(dogRegular)
  dog.scale = 0.2;
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog); 
    dog.scale = 0.2
  }

  textSize(22);
  fill("red");
  text(foodS, 50, 50);



  text("Note: Press the Up Arrow to Feed Your Pet", 50, 200);

  drawSprites();
  //add styles here

  

}

function writeStock(x){

  if(x<=0){
    x=0
  } else {
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



