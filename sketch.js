var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy1, goldCoinImg, copImg;
var magnetImg, obstacleImg, trophyImg;
var germImg, goldBarImg;
var bg, bgImg;
var ground;
var obstaclesGroup;
var restingJake;

function preload(){
boy1 = loadAnimation("animation 2 boy.png","animation 3 boy.png","animation 1 boy.png","animation 4 boy.png");
copImg = loadImage("cop.jpg");
magnetImg = loadImage("magnet edited.jpg");
obstacleImg = loadImage("obstacle 1.png");
trophyImg = loadImage("trophy.png");
germImg = loadImage("warning germ.png");
goldBarImg = loadImage("goldbar.png");
bgImg = loadImage("Bg img edited.jpg");
obstacleImg = loadImage("obstacle 1.png");
restingJake = loadAnimation("animation 2 boy.jpg","animation 1 boy.jpg");
}

function setup(){
createCanvas(1000,650);
bg = createSprite(400,300,1200,600);
bg.addImage("bgImg",bgImg);
bg.scale = 0.8;
bg.velocityX = -4;
ground=createSprite(400,600,2400,20)
ground.shapeColor = "brown";
ground.velocityX = -8;
jake = createSprite(70,580,20,250);
jake.addAnimation("jakeImg",boy1);
jake.scale = 0.5;
jake.setCollider("rectangle",0,0,70,jake.height);
jake.debug = true;
obstaclesGroup = new Group();
//console.log(bg.x);
}

var score = 0;

function draw()
{
        background('cyan');
        if(gameState === PLAY){

        if(ground.x === 200){
            ground.x = ground.width/2;
        }

        if(bg.x===200){
            bg.x=600
        }

        if(keyDown("space")&& jake.y>=455) {
            jake.velocityY= -12;
        }
        jake.velocityY+=0.5;
        if(obstaclesGroup.isTouching(jake)){
           gameState = END;
        }
    }
    else if(gameState === END){
        ground.velocityX = 0;
        bg.velocityX = 0;
        jake.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        obstaclesGroup.lifetime=0;
  
        if (gameState===PLAY){
            text("Score: "+ score, 900,50);
          score = score + Math.round(getFrameRate()/60);
          ground.velocityX = -(6 + 3*score/100);
        }

        jake.changeAnimation("restingJake",restingJake);
    }
        jake.collide(ground);

        console.log(bg.x);
        spawnObstacles();
        drawSprites();


}

function spawnObstacles(){
    if(frameCount%250 === 0){
        obstacle = createSprite(950,550,10,60);
        obstacle.addImage("obstacle 1.png",obstacleImg);
        obstacle.velocityX = -5;
        obstacle.scale = 1.5;
        obstaclesGroup.add(obstacle);
        obstacle.lifetime = 200;
    }
}