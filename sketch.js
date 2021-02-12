var forest, forestImg;
var hunter, hunterImg, hunterJumpImg;
var edges;
var rock, rockImg, rockGroup;

function preload(){

  forestImg = loadImage("images/forest1.jpg");
  hunterImg = loadAnimation("img_edit/1.png", "img_edit/2.png", "img_edit/3.png", "img_edit/4.png", "img_edit/5.png", "img_edit/6.png");
  hunterJumpImg = loadAnimation("images/jump1.png", "images/jump1.png");
  rockImg = loadImage("images/rock1.png");


}

function setup() {

  createCanvas(displayWidth, displayHeight-100);

  forest = createSprite(displayWidth/2, displayHeight/2-50, displayWidth, displayHeight);
  forest.addImage("forest", forestImg);
  forest.scale = 1.7;
  forest.velocityX = -2;

  hunter = createSprite(displayWidth/8, displayHeight-250);
  hunter.addAnimation("hunter", hunterImg);
  hunter.scale = 0.5;
  hunter.setCollider("rectangle", 0, 0);
  hunter.debug = true;

  rockGroup = new Group();

  
}

function draw() {

  background("black");  

  if(forest.x < 200){

    forest.x = forest.width/2;

  }

  edges = createEdgeSprites();
  hunter.collide(edges[3]);
  
  if(keyWentDown("space")) {

    hunter.velocityY = -10;
    hunter.addAnimation("hunter", hunterJumpImg);
  }
  
  hunter.velocityY = hunter.velocityY + 0.8;

  if(keyWentUp("space")){

    hunter.addAnimation("hunter", hunterImg);

  }

  if(keyDown("space") && keyDown("right")){

    hunter.velocityY = -10;
    hunter.x = hunter.x + 5;
    hunter.addAnimation("hunter", hunterJumpImg);


    //if the hunter is moving out of the screen through right edge => reset
    if(hunter.x > displayWidth){

      hunter.x = displayWidth/8;

    }

  }

  Rocks();

  if(hunter.isTouching(rockGroup)){

    hunter.destroy();

  }

  drawSprites();

}

function Rocks(){

  if(frameCount %  200 === 0){

    rock = createSprite(displayWidth/2, displayHeight-100);
    rock.addImage("rock", rockImg);
    rock.scale = 0.3;
    rock.velocityX = -3;
    rock.y = Math.round(random(displayHeight-600, displayHeight-100));
    rock.lifetime = displayWidth/3;
    rockGroup.add(rock);
    rock.setCollider("circle", 0, 0);
    rock.debug = true;
  }


}