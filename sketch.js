const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var player, playerImage
var opponent, opponentImage, opponentBody
var hoopPiece1, hoopPiece2, net, netImage, backboard, pole
//var stopper
var ground
var basketball
var bind;
var gameState = "onSling";
var level = "homeScreen"

function preload() {
  playerImage = loadImage("Player.png");
  netImage = loadImage("Hoop+Net.png");
  opponentImage = loadImage("Opponent.png");
}

function setup() {
  createCanvas(1300,600);
  engine = Engine.create();
  world = engine.world;

  if (level === "1") {
    ground = new Ground(650, height, 1300, 20);
    basketball = new Basketball(226, 502);
    bind = new Bind(basketball.body, {x: 226, y: 487});
  
    player = createSprite(200, 515, 50, 50);
    player.addImage(playerImage);
    player.scale = 0.5
  
    opponent = createSprite(600, 502, 90, 150);
    opponent.addImage(opponentImage);
    opponent.scale = 1
  
    opponentBody = Bodies.circle(600, 502, 60, {density: 1.5, friction: 2});
    World.add(world, opponentBody);
  
    net = createSprite(960, 260, 50, 50);
    net.addImage(netImage);
    net.scale = 1.5
  
    hoopPiece1 = new Hoop(985, 315, 10, 100, PI, "red");
    hoopPiece2 = new Hoop(1096, 310, 10, 100, PI, "red");
    backboard = new Hoop(1130, 220, 20, 200, PI, "red");
    pole = new Hoop(1160, 410, 50, 350, PI, "black");
    //stopper = new Hoop(600, 100, 1, 1, PI, "black");
  
    /*
    hoopPiece1 = createSprite(800, 300, 10, 150);
    hoopPiece1.shapeColor = "red"
  
    hoopPiece2 = createSprite(900, 300, 10, 150);
    hoopPiece2.shapeColor = "red"
    */
  }
}

function draw() {
  Engine.update(engine);
  if (level === "homeScreen") {
    background(150);
  
    textSize(30);
    stroke("blue");
    strokeWeight(4);
    fill("orange");
    text("Press Space to Start Game", 500, 300);
    if(keyCode === 32){
      level = "1"
    }
  }

  if (level === "1") {
    background(150);

    //opponent.x= opponentBody.position.x
    //opponent.y= opponentBody.position.y
  
    opponent.x=600
    opponentBody.position.x=600

    if (opponent.y>490) {
      Matter.Body.applyForce(opponentBody, opponentBody.position, {x:0, y:-600});
    }

    if (opponent.y<120) {
      Matter.Body.applyForce(opponentBody, opponentBody.position, {x:0, y:150});
    }

    if (basketball.body.position.x > 1000) {
      if (basketball.body.position.x < 1070) {
        if (basketball.body.position.y > 265) {
          if (basketball.body.position.y < 350) {
            gameState = "YOUWIN"
          }
        }
      }
    }

    drawSprites();

    ground.display();
    basketball.display();
    bind.display();

    //hoopPiece1.display();
    //hoopPiece2.display();
    //backboard.display();
    pole.display();

    if (gameState === "YOUWIN") {
      Matter.Body.setStatic(basketball.body, true);
      background("orange");
      textSize(200);
      stroke("blue");
      strokeWeight(8);
      fill("green");
      text("YOU WIN", 220, 340);
      textSize(50);
      stroke("purple");
      strokeWeight(4);
      fill("yellow");
      text("Press Space to Play Again", 350, 450);
    }
    if (keyCode === 32) {
      if (gameState === "YOUWIN") {
        Matter.Body.setStatic(basketball.body, false);
      }
    }
  }
}

function mouseDragged(){
  if (level !== "homeScreen") {
    if (gameState!=="launched"){
      Matter.Body.setPosition(basketball.body, {x: mouseX , y: mouseY});
    }
  }
}


function mouseReleased(){
  if (level !== "homeScreen") {
    bind.fly();
    gameState = "launched";
  }
}

function keyPressed(){
  if (level !== "homeScreen") {
    if(keyCode === 32){
      bind.attach(basketball.body);
      Matter.Body.setPosition(basketball.body, {x: 226, y:502});
      gameState = "onSling"
    }
  }
}