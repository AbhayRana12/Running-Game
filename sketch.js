var bg,bgImage,ground,doorImage,zombie,zombieimage1,zombieimage2,Key,KeyImage;
var boy,boyImage
var arrowImage,arrowGroup;
var zombieGroup,doorGroup,keyGroup
var PLAY = 1, END = 0;
var gameState = PLAY
var gameOverImage,gameoverSound;
var keyCount = 0;

function preload(){
  bgImage=loadImage("BG.jpg");
  doorImage=loadImage("Door.jpg");
  boyImage = loadImage("boy.jpg");
  zombieimage1 = loadImage("Zombie.png");
  KeyImage = loadImage("Key.jpg");
  arrowImage = loadImage("arrow0.png");
  gameOverImage = loadImage("gameover.png");
  gameoverSound = loadSound("gameover.mp3");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  ground = createSprite(windowWidth-800,windowHeight-30,windowWidth+800,30);
  ground.visible = false;
  boy = createSprite(windowWidth/2-200,windowHeight-100);
  boy.addImage("boy",boyImage);
  boy.addImage("gameover",gameOverImage);
  arrowGroup = new Group();
  doorGroup = new Group();
  zombieGroup = new Group();
  keyGroup = new Group();

}

function draw() {
  background(bgImage);
  textSize(40)
  stroke("yellow");
  fill("yellow")
  text ("Key Collection= "+keyCount,width-400,50);
  if(gameState===PLAY){
    ground.velocityX = -3
    if(ground.x<0){
    ground.x=windowWidth/2;
    }
    boy.velocityY = boy.velocityY+0.5;
    
    
    var rand = Math.round(random(1,2))
    if(rand === 1){
      spawnDoors();
    }else {
      spawnZombies();
  }
  if(zombieGroup.isTouching(boy)){
    gameState = END;
  }
  else if(arrowGroup.isTouching(zombieGroup)){
    zombieGroup.destroyEach();
    arrowGroup.destroyEach();
  }
  if(boy.isTouching(keyGroup)){
    keyGroup.destroyEach();
    keyCount+=1;
  }
  if(boy.isTouching(doorGroup)){
    doorGroup.destroyEach();
    keyCount-=1;
  }

  }
  else if(gameState===END){
    ground.velocityX=0;
    boy.velocityY=0;
    text("Press R to Restart",width/2-100,height/2+80);
    boy.changeImage("gameover",gameOverImage);
    boy.x=width/2;
    boy.y=height/2;
    boy.scale=2;
    zombieGroup.destroyEach();
    keyGroup.destroyEach();
    doorGroup.destroyEach();
  }
  
  boy.collide(ground);
  drawSprites();
}

function spawnDoors(){
  if(frameCount % 500 === 0){
    door = createSprite(windowWidth,windowHeight-100);
    door.addImage(doorImage);
    door.velocityX=-3;
    door.scale = 0.2
    doorGroup.add(door);
  }
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    boy.velocityY=-15;
  }
  else if(keyCode === 83){
      createArrow();
  }
  else if(keyCode === 82){
      reset();
  }
}
function reset(){
  gameState=PLAY;
  boy.changeImage("boy",boyImage);
  boy.x=width/2-200;
  boy.y=height-100;
  boy.scale=1;
  keyCount=0;
}
function spawnZombies(){
  if(frameCount % 100 === 0){
    Key = createSprite(windowWidth,windowHeight-100);
    Key.addImage(KeyImage);
    Key.velocityX=-3;
    Key.scale = 0.1;

    zombie = createSprite(windowWidth,windowHeight-100);
    zombie.addImage(zombieimage1);
    var randY = Math.round(random(500,windowHeight-30));
    zombie.y=randY;
    Key.y = randY
    zombie.velocityX=-3;
    zombie.scale = 0.2;
    zombieGroup.add(zombie);
    keyGroup.add(Key);
  }
}

function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = windowWidth/2-200;
  arrow.y=boy.y;
  arrow.velocityX = 4;
  arrow.lifetime = 800;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}