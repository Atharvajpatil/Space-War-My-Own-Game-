var bg,backgroundimg;
var asteroid,obstacleGroup;
var boom;
var bullet,bulletGroup;
var fuel;
var mars;
var start_btn;
var spaceship,spaceship_img;
var fire;
var score = 0;
var life = 3;
var edge1,edge2;
var spaceship_obstacle
var laser,laserGroup;
function preload(){
 backgroundimg = loadAnimation("./gif/frame_05_delay-0.04s.gif","./gif/frame_04_delay-0.04s.gif","./gif/frame_03_delay-0.04s.gif","./gif/frame_02_delay-0.04s.gif","./gif/frame_01_delay-0.04s.gif","./gif/frame_00_delay-0.04s.gif");
 asteroid = loadImage("./assets/asteroid.png");
boom = loadImage("./assets/boom.png");
bullet = loadImage("./assets/bullet1.png");
fuel = loadImage('./assets/fuel.png');
mars = loadImage("./assets/mars.png");
start_btn = loadImage("./assets/play_btn.png");
spaceship_img = loadImage("./assets/spaceship.png");
spaceship_obstacle = loadImage("./assets/spaceShip_obstacle.png")
laser = loadImage("./assets/laser.png")
}

function setup() {
  createCanvas(1200,600);

obstacleGroup = new Group()
bulletGroup = new Group()
obstacleGroup1 = new Group()
laserGroup = new Group()

edge1 = createSprite(10,10,1200,10)
edge1.visible = false

edge2 = createSprite(10,600,1200,10)
edge2.visible = false

spaceship = createSprite(100,200,30,30)
spaceship.addImage("player",spaceship_img)
spaceship.scale = 0.5

bg = createSprite(600,300,600,300)
bg.addAnimation("bacground",backgroundimg)
bg.scale  = 2.5

}

function draw() {
  background(180)

  createEdgeSprites();
  
 spaceship.collide(edge1)
 spaceship.collide(edge2)

  if(keyDown(RIGHT_ARROW)){
    spawnBullets();
  fire.velocityX = 4
  fire.addImage("bullet",bullet)
  }
 spaceship.depth = bg.depth
 spaceship.depth+=10

 if(keyDown(UP_ARROW)){
  spaceship.y-=5
 }

 if(keyDown(DOWN_ARROW)){
  spaceship.y+=5
 }

 spawnObstacles();
 spawnObstacles1();

 if(keyDown("r")){
   window.location.reload()
 }

 if(obstacleGroup.collide(spaceship)){
  life-=1
  for(var i=0;i<obstacleGroup.length;i++){
    if(obstacleGroup[i].isTouching){
      obstacleGroup[i].destroy()
    }
   }
  }
   if(laserGroup.collide(spaceship)){
    life-=1
    for(var i=0;i<laserGroup.length;i++){
      if(laserGroup[i].isTouching){
        laserGroup[i].destroy()
      }
     }
   }
   if(obstacleGroup1.collide(spaceship)){
    life-=1
    for(var i=0;i<laserGroup.length;i++){
      if(obstacleGroup1[i].isTouching){
        obstacleGroup1[i].destroy()
      }
     }
   }

  if(life==0){
    obstacleGroup.setVelocityXEach(0)
    bulletGroup.setVelocityXEach(0)

  swal({
    title: `Game Over`,
    text: "Oops you lost the Game....!!!,Press R To Restart The Game",
    imageUrl:
      "https://www.pxpng.com/public/uploads/preview/-11608563778knh24uya2r.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
 
 }
  
 if(obstacleGroup.collide(bulletGroup)){
  for(var i=0;i<obstacleGroup.length;i++){
    if(obstacleGroup[i].isTouching){
      obstacleGroup[i].destroy()
      score +=1
    }
  }
  
}
  drawSprites();
  textSize(30)
  text("Score:"+score,1080,25)
  text("Life:"+life,980,25)
}



function spawnObstacles(){
 if(frameCount %150 === 0){
  var  obstacle = createSprite(1000,300,30,30)
   obstacle.addImage(asteroid);
   obstacle.scale = 0.1
   obstacle.y = Math.round(random(100,500));
obstacle.velocityX = -3
obstacleGroup.add(obstacle)
obstacle.setCollider("rectangle",0,0,100,100) 
obstacle.debug = false

}
}

function spawnBullets(){
  fire  = createSprite(100,200,28,28)
 fire.setCollider("rectangle",0,0,fire.width,fire.height)
fire.debug = false
  
  fire.scale = 0.2
  fire.y = spaceship.y
  
  bulletGroup.add(fire)
}

function spawnObstacles1(){
  if(frameCount %300 === 0){
    var  obstacle1 = createSprite(900,350,30,30)
     obstacle1.addImage(spaceship_obstacle);
     obstacle1.scale = 0.6
     obstacle1.y = Math.round(random(100,500));
  obstacle1.velocityX = -2
  obstacleGroup1.add(obstacle1)
  obstacle1.setCollider("rectangle",0,0,100,100) 
  obstacle1.debug = false
  
   var fire1  = createSprite(900,350,28,28)
  fire1.setCollider("rectangle",0,0,230,30)
  fire1.debug = true
   fire1.addImage(laser)
   fire1.velocityX = -4
   fire1.scale = 0.6
   fire1.y = obstacle1.y
   laserGroup.add(fire1)
  }
}
