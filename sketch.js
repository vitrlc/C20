
//cria as variaveis
var t_rex,t_rexRunning,t_rexJumping,t_rexCollided,t_rexStop;
var canvas;
var ground,ground_img,ground_invis;
var cloud,cloud_img,cloud_group;
var obstacle,obstacle_img1,obstacle_img2,obstacle_img3,obstacle_img4,obstacle_img5,obstacle_img6,obstacle_group;
var pontos = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOve_img;
var Restart;Restart_img;
var die_sound,checkpoint_sound,jump_sound;


function preload(){
                t_rexRunning = loadAnimation("trex3.png","trex4.png");
                t_rexJumping = loadAnimation("trex1.png");
                t_rexCollided = loadAnimation("trex_collided.png");
    

                ground_img = loadImage("ground2.png");
                cloud_img = loadImage("cloud.png");
                obstacle_img1 = loadImage("obstacle1.png");
                obstacle_img2 = loadImage("obstacle2.png");
                obstacle_img3 = loadImage("obstacle3.png");
                obstacle_img4 = loadImage("obstacle4.png");
                obstacle_img5 = loadImage("obstacle5.png");
                obstacle_img6 = loadImage("obstacle6.png");

                gameOve_img = loadImage("gameOver.png");
                Restart_img = loadImage("restart.png");

                die_sound = loadSound("die.mp3");
                checkpoint_sound = loadSound("checkPoint.mp3");
                jump_sound = loadSound("jump.mp3");
      
                
}

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);

    t_rex = createSprite(50,height-50,20,20);
    t_rex.addAnimation("running",t_rexRunning);
    t_rex.addAnimation("jumping",t_rexJumping);
    t_rex.addAnimation("collided",t_rexCollided);
    t_rex.scale = 0.5;
    t_rex.debug = false;
    t_rex.setCollider("circle",0,0,30);

    ground = createSprite(width/2,height-50,600,20);
    ground_invis = createSprite(width/2,height-10,width,20);
    ground_invis.visible=false;

    ground.addImage("movendo",ground_img);

    cloud_group = new Group();
    obstacle_group = new Group();

    gameOver = createSprite(width/2,height/2,30,30);
    Restart = createSprite(width/2,height-80,30,30);

   gameOver.addImage(gameOve_img);
   Restart.addImage(Restart_img);

   gameOver.scale = 0.5;
   Restart.scale = 0.5;

   gameOver.visible = false;
   Restart.visible = false;

}


function draw(){
    background("white");

     
    if (t_rex.isTouching(obstacle_group)) {
        gameState = END;
        t_rex.changeAnimation("collided",t_rexCollided);
        //die_sound.play();

        

         
                                    }
    

    if (gameState === PLAY) {


        pontos = Math.round(frameCount);

        if (pontos >0 && pontos%100 === 0) {
            checkpoint_sound.play();
        }

        if(touches.lenght > 0 || keyDown("space") && t_rex.y > height-60) {
        t_rex.velocityY = -10;
        jump_sound.play();
        touches = [];
        //t_rex.changeAnimation("jumping",t_rexJumping);
                                     }
    
            gravidade();
    
        if(ground.x < 0){ 
           
        ground.x = ground.width/2;   
        
      
                                    }
      
        ground.velocityX = -(2+(pontos/100));
    
        spawnClouds();
    
        spawnObstacles();

        

        
        
    
        
    }   else if (gameState === END) {


        StopGame();

        
        

       
        if (mousePressedOver(Restart)) {
            ResetGame();
        }

        


        
    }

   
        textSize(20);
        strokeWeight(10);
        text("Pontuação= "+pontos,width-200,height-180);

    
    

        t_rex.collide(ground_invis);


        
    

    //console.log(t_rex.y)

    

    drawSprites();
}

function gravidade () {
            t_rex.velocityY += 0.5;

}

function spawnClouds() {
        if(frameCount%120 === 0){
            cloud = createSprite(width,height-50,30,30);
            cloud.y = Math.round(random(height-180,height-100));
            cloud.addImage("cloud",cloud_img);
            cloud.velocityX = -(2+(pontos/100));
            cloud.scale = random(0.2,1);
            cloud.depth = t_rex.depth -1;
            cloud.lifetime = width/cloud.velocityX;
            cloud_group.add(cloud);
    }
    
} 

function spawnObstacles() {
    if (frameCount%170 === 0) {
        obstacle = createSprite(width,height-50,30,30)
        
        
        var sorteio = Math.round(random(1,6));

            switch (sorteio) {
                case 1: obstacle.addImage("obstacle",obstacle_img1);
                    break;
                case 2: obstacle.addImage("obstacle",obstacle_img2);
                    break;
                case 3: obstacle.addImage("obstacle",obstacle_img3);
                    break;
                case 4: obstacle.addImage("obstacle",obstacle_img4);
                    break;
                case 5: obstacle.addImage("obstacle",obstacle_img5);
                    break;
                case 6: obstacle.addImage("obstacle",obstacle_img6);
                    break;
        }
                obstacle.velocityX = -(2+(pontos/100));
                obstacle.depth = t_rex.depth -1;
                obstacle.lifetime = width/obstacle.velocityX;
                obstacle.scale = 0.5;
                obstacle_group.add(obstacle);
    }
    
}
function StopGame() {
            obstacle_group.setVelocityXEach(0);
            ground.velocityX = 0;
            cloud_group.setVelocityXEach(0);
            cloud_group.setLifetimeEach(-1);
            obstacle_group.setLifetimeEach(-1);
            gameOver.visible = true;
            Restart.visible = true;

}
function ResetGame() {

    gameState = PLAY;
    gameOver.visible = false;
    Restart.visible = false;
    obstacle_group.destroyEach();
    cloud_group.destroyEach();
    t_rex.changeAnimation("running",t_rexRunning);

    pontos = 0;
    frameCount = 0;

}