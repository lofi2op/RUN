var road, runner;
var obstacle1, obstacle2, obstacle3;
var roadImg, runnerImg, runnerImg2;
var catcher, catcherImg, catcherImg2;

var obstacleImg, obstacleImg2;
var obstacle2Img, obstacle2Img2;
var obstacle3Img, obstacle3Img3;
var gameOverImg, cycleBell;

var obs1G, obs2G, obs3G;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;

function preload() {
  roadImg = loadImage("images/background.png");
  runnerImg = loadAnimation("images/runner1.png", "images/runner2.png", "images/runner3.png", "images/runner4.png", "images/runner5.png", "images/runner6.png");
  runnerImg2 = loadAnimation("images/runner1.png");

  catcherImg = loadAnimation("images/catcher1.png", "images/catcher2.png");
  catcherImg2 = loadAnimation("images/catcher1.png");

  obstacleImg = loadImage("images/obstacle1.png");
  obstacleImg2 = loadImage("images/obstacle2.png");
  obstacleImg3 = loadImage("images/obstacle3.png");

  gameOverImg = loadImage("images/gameOver.png");
}

function setup() {

  createCanvas(1200, 400);

  road = createSprite(0,200);
  road.addImage(roadImg);
  road.x = width / 2;
  road.scale =0.5;

  runner = createSprite(200, 150);
  runner.addAnimation("runner1", runnerImg);
  runner.setCollider("rectangle", 0, 0, 40, 40);

  catcher = createSprite(50, 150);
  catcher.addAnimation("catcher1", catcherImg);
  catcher.setCollider("rectangle", 0, 0, 40, 40);

  gameOver = createSprite(550, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  obs1G = new Group();
  obs2G = new Group();
  obs3G = new Group();

}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 900, 30);

  if (gameState === PLAY) {

    distance = distance + Math.round(getFrameRate() / 50);
    road.velocityX = -(6 + 2 * distance / 150);

    runner.y = World.mouseY;
    catcher.y = runner.y;

    edges = createEdgeSprites();
    runner.collide(edges);


    if (road.x < 0) {

      road.x = width / 2;
  
    }


    var select_obstacle = Math.round(random(1, 3));

    if (World.frameCount % 150 == 0) {
      if (select_obstacle == 1) {
        obst1();
      } else if (select_obstacle == 2) {
        obst2();
      } else {
        obst3();
      }
    }

    if (obs1G.isTouching(runner)) {
      catcher.x += 2;
    }

    if (obs2G.isTouching(runner)) {
      catcher.x += 2;
    }

    if (obs3G.isTouching(runner)) {
      catcher.x += 2;
    }

    if (obs1G.isTouching(catcher)) {
      obs1G.destroyEach();
    }

    if (obs2G.isTouching(catcher)) {
      obs2G.destroyEach();
    }

    if (obs3G.isTouching(catcher)) {
      obs3G.destroyEach();
    }

    if(catcher.isTouching(runner)){
      gameState = END;
    }

  } else if (gameState === END) {
    gameOver.visible = true;

    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500, 200);

    road.velocityX = 0;
    runner.velocityY = 0;
    runner.addAnimation("runner1", runnerImg2);

    catcher.velocityY = 0;
    catcher.addAnimation("catcher1", catcherImg2);

    obs1G.setVelocityXEach(0);
    obs1G.setLifetimeEach(-1);

    obs2G.setVelocityXEach(0);
    obs2G.setLifetimeEach(-1);

    obs3G.setVelocityXEach(0);
    obs3G.setLifetimeEach(-1);

    if (keyDown("UP_ARROW")) {
      reset();
    }
  }
}

function obst1() {
  player1 = createSprite(1100, Math.round(random(50, 250)));
  player1.scale = 0.06;
  player1.velocityX = -(6 + 2 * distance / 150);
  player1.addImage("obs1", obstacleImg);
  player1.setLifetime = 170;
  obs1G.add(player1);
}

function obst2() {
  player2 = createSprite(1100, Math.round(random(50, 250)));
  player2.scale = 0.06;
  player2.velocityX = -(6 + 2 * distance / 150);
  player2.addImage("obs2", obstacleImg2);
  player2.setLifetime = 170;
  obs2G.add(player2);
}

function obst3() {
  player3 = createSprite(1100, Math.round(random(50, 250)));
  player3.scale = 0.06;
  player3.velocityX = -(6 + 2 * distance / 250);
  player3.addImage("obs3", obstacleImg3);
  player3.setLifetime = 170;
  obs3G.add(player3);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  runner.addAnimation("runner", runnerImg);

  obs1G.destroyEach();
  obs2G.destroyEach();
  obs3G.destroyEach();

  distance = 0;
}