var canvas;

var backgroundImg;

var backgroundImg,playerImg,car1Img,car2Img,car3Img,car4Img;

var obstaclesGroup,obstacles;

var gameState = 1;

var life = 5

function preload(){
    backgroundImg = loadImage("image/track.jpg");
    playerImg = loadImage("image/Player Car.png");
    car1 = loadImage("image/Car1.png");
    car2 = loadImage("image/Car2.png");
    car3 = loadImage("image/Car3.png");
    car4 = loadImage("image/Car4.png");
    restartImg = loadImage("image/Restart.png");
}

function setup(){
    canvas = createCanvas(displayWidth,displayHeight);

    player = createSprite(displayWidth/2 ,displayHeight - 50);
    player.addImage("image1",playerImg);
    player.scale = 0.4;
    //player.debug = true;
    player.setCollider("rectangle",0,0,200,580);

    invisibleWall = createSprite(displayWidth/2 - 450,displayHeight/2,30,-displayHeight*5);
    invisibleWall.visible = false;

    invisibleWall2 = createSprite(displayWidth/2 + 450,displayHeight/2,30,-displayHeight*5);
    invisibleWall2.visible = false;

    restart = createSprite(displayWidth/2 - 5,player.y - 150);
    restart.addImage("img",restartImg);
    restart.scale = 0.15;
    restart.visible = false;

    obstaclesGroup = new Group();

    score = 0;
}

function draw(){
    background(198,135,103);

    restart.y = player.y - 150;

    //console.log(player.y);

    image(backgroundImg,0,-displayHeight*4,displayWidth,displayHeight*5);

    camera.position.x = displayWidth/2;
    camera.position.y = player.y;      
    
    fill("#ffdb58");
    strokeWeight(7);
    stroke(255,0,0);
    textSize(50);
    textStyle(BOLD);
    textFont("Comic Sans MS");
    text("lives : " + life, displayWidth/2 - 130,player.y - 300)

    if(gameState === 1){

        fill("#ffdb58");
        strokeWeight(7);
        stroke(255,0,0);
        textSize(50);
        textStyle(BOLD);
        textFont("Comic Sans MS");

        if(keyDown(RIGHT_ARROW)){
            player.velocityX = 8;
        }else if(keyDown(LEFT_ARROW)){
            player.velocityX = -8;
        }else if(keyDown(UP_ARROW)){
            player.velocityY = -8;
        }else if(keyDown(DOWN_ARROW)){
            player.velocityX = 0
            player.velocityY = 0;
        }


        player.collide(invisibleWall);
        player.collide(invisibleWall2);

        spawnObstacles();        
        
        if(obstaclesGroup.isTouching(player)){
            gameState = 2;
            life = life-1;
        }
    }else if(gameState === 2){

        restart.visible = true;

        fill("#ffdb58");
        strokeWeight(7);
        stroke(255,0,0);
        textSize(50);
        textStyle(BOLD);
        textFont("Comic Sans MS");
        text("Game Over",displayWidth/2 - 130,player.y - 200);

        player.velocityX = 0;
        player.velocityY = 0;

        obstacle.velocityY = 0;

        if (mousePressedOver(restart)) {
            reset();
        }
    }

    if(player.y < -3000||life === 0){
        player.velocityY = 0;
        player.velocityX = 0;

        restart.visible = true;

        gameState = 2;


        if (mousePressedOver(restart)) {
            reset();
            life =5;
            player.x = displayWidth/2;
            player.y = displayHeight - 50;
        }
    }

    drawSprites();

}

function spawnObstacles(){
    if(frameCount%55 === 0){
        obstacle = createSprite(random(displayWidth/2 - 430,displayWidth/2 + 430),random(player.y - 800,player.y - 500));
        obstacle.velocityY = (6 + 1.5 * score / 100);

        obstacle.depth = player.depth;
        player.depth = player.depth + 1;
        restart.depth = player.depth;

        //obstacle.debug = true;

        var rand = Math.round(random(1, 4));
        switch (rand) {
        case 1:
            obstacle.addImage(car1);
            obstacle.scale = 0.5;
            obstacle.setCollider("rectangle",0,-20,150,370);
            break;
        case 2:
            obstacle.addImage(car2);
            obstacle.setCollider("rectangle",0,0,70,170);
            break;
        case 3:
            obstacle.addImage(car3);
            obstacle.scale = 0.5;
            obstacle.setCollider("rectangle",0,0,150,355);
            break;
        case 4:
            obstacle.addImage(car4);
            obstacle.setCollider("rectangle",0,-10,65,200);
            break;
        default:
            break;
        }

        obstaclesGroup.add(obstacle);
    }
}

function reset() {
    gameState = 1;
    restart.visible = false;
    obstaclesGroup.destroyEach();
}