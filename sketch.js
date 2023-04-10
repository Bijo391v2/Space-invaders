
var bg,bgImg
var player,playerImg
var bullet,bulletImg
var enemy1,enemy1Img,enemy2,enemy2Img,enemy3,enemy3Img,enemy4,enemy4Img,enemy5,enemy5Img;
var base1,base2,base3,base4,baseImg;
var baseGroup;
var bulletGroup;
var leftEnemyGroup,rightEnemyGroup;
var counter=0;
var enemyBullet
var enemyBulletGroup
var gameState="play";
var kills=0;
function preload(){
    bgImg=loadImage("Spacebackgroun.jpeg");
    playerImg=loadImage("Player.png")
    enemy1Img=loadImage("enemy1.png")
    enemy2Img=loadImage("enemy2.png")
    enemy3Img=loadImage("enemy3.png")
    enemy4Img=loadImage("Enemy4.png")

    baseImg=loadImage("Base.png")
}

function setup(){
    createCanvas(1000,800);
   
    
    player= createSprite(500,740);
    player.addImage(playerImg)
    player.scale=0.15

   base1= createSprite(200,620)
   base1.addImage(baseImg)
   base1.scale=0.7;
   base2= createSprite(400,620)
   base2.addImage(baseImg)
   base2.scale=0.7;
   base3= createSprite(600,620)
   base3.addImage(baseImg)
   base3.scale=0.7;
   base4= createSprite(800,620)
   base4.addImage(baseImg)
   base4.scale=0.7;

   baseGroup=createGroup()
   baseGroup.add(base1)
   baseGroup.add(base2)
   baseGroup.add(base3)
   baseGroup.add(base4)
   bulletGroup=createGroup()
    
   enemyBulletGroup=createGroup()

    leftEnemyGroup=createGroup()
    rightEnemyGroup=createGroup()
    spawnEnemy()


}

function draw(){
    
    background("black"); 
    textSize(50)
    fill("Orange")
    text("SPACE INVADERS",300,50)
    if(gameState=="play"){
        enemyShoot()
        if(keyDown(RIGHT_ARROW)){
            player.x=player.x+7
        }
        if(keyDown(LEFT_ARROW)){
            player.x=player.x-7
        }
        if(keyWentDown("space")){
            shoot()
        }
        for(var j=0;j<baseGroup.length;j++){
            for(var i=0; i<bulletGroup.length;i++){
                if(bulletGroup[i].isTouching(baseGroup[j])){
                    bulletGroup[i].destroy()
                }
            }
        }
        for(var j=0;j<baseGroup.length;j++){
            for(var i=0; i<enemyBulletGroup.length;i++){
                if(enemyBulletGroup[i].isTouching(baseGroup[j])){
                    enemyBulletGroup[i].destroy()
                }
            }
        }
        
        for(var j=0;j<leftEnemyGroup.length;j++){
            for(var i=0;i<bulletGroup.length;i++){
                if(bulletGroup[i].isTouching(leftEnemyGroup[j])){
                    bulletGroup[i].destroy();
                    leftEnemyGroup[j].destroy();  
                    kills++
                }
            }
        }
            
        for(var j=0;j<rightEnemyGroup.length;j++){
            for(var i=0;i<bulletGroup.length;i++){
                if(bulletGroup[i].isTouching(rightEnemyGroup[j])){
                    bulletGroup[i].destroy();
                    rightEnemyGroup[j].destroy();  
                    kills++
                }
            }
        }
        if(frameCount%80==0){
            counter++;
        }

        if(counter%2==0){
            rightEnemyGroup.setVelocityXEach(2)
            leftEnemyGroup.setVelocityXEach(-2)
            leftEnemyGroup.setVelocityYEach(0.2)
            rightEnemyGroup.setVelocityYEach(0.2)
        }
        else{
            rightEnemyGroup.setVelocityXEach(-2)
            leftEnemyGroup.setVelocityXEach(2)
        }

        if(kills>=65){
            gameState ="win";
        }


        if(leftEnemyGroup.isTouching(baseGroup) || rightEnemyGroup.isTouching(baseGroup)||enemyBulletGroup.isTouching(player) ){
            gameState="end";
            
        }
    
    }

    drawSprites();
    if(gameState=="end"){
        enemyBulletGroup.setVelocityYEach(0);
        rightEnemyGroup.setVelocityEach(0,0)
        leftEnemyGroup.setVelocityEach(0,0)
            
        textSize(200);
        fill (rgb(random(0,255),random(0,255),random(0,255)));
        text ("YOU DIED !!!", 20,400)
    }

    if(gameState=="win"){
        bulletGroup.setVelocityEach(0)
        player.setVelocity(0,0)
        textSize(200);
        fill (rgb(random(0,255),random(0,255),random(0,255)));
        text ("YOU WIN !!!", 20,400)
    } 

    textSize(30);
    fill("yellow")
    text("Kills : "+kills,880,780);
  
}   

function shoot(){
    bullet=createSprite(player.x,740,5,13)
    bullet.shapeColor="white"
    bullet.velocityY=-35;
    bulletGroup.add(bullet)
}

function spawnEnemy(){
    for (var i=0; i<1000;i+=80){
        enemy1= createSprite(i,50)
        enemy1.addImage(enemy2Img)
        enemy1.scale=0.13;
       
        enemy2= createSprite(i+50,120)
        enemy2.addImage(enemy1Img)
        enemy2.scale=0.25;
        
        enemy3= createSprite(i,190)
        enemy3.addImage(enemy3Img)
        enemy3.scale=0.13;
      
        enemy4= createSprite(i+50,260)
        enemy4.addImage(enemy4Img)
        enemy4.scale=0.13;
        
        enemy5= createSprite(i,330)
        enemy5.addImage(enemy2Img)
        enemy5.scale=0.1

        rightEnemyGroup.add(enemy1);
        leftEnemyGroup.add(enemy2);
        rightEnemyGroup.add(enemy3);
        leftEnemyGroup.add(enemy4);
      
        rightEnemyGroup.add(enemy5);
        
    }
}
function enemyShoot(){

    if(frameCount%30==0){
        enemyBullet=createSprite(player.x,10,10,30)
        enemyBullet.shapeColor="red"
        enemyBullet.velocityY=25;
        enemyBulletGroup.add(enemyBullet)
    }
}
