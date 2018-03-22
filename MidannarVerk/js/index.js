const BALLCOLOR = [0,125,30];

const Engine			= Matter.Engine,
			Body				= Matter.Body,
			Events			= Matter.Events,
			Constraint	= Matter.Constraint,
			World				= Matter.World,
			Sleeping		= Matter.Sleeping,
			Bodies			= Matter.Bodies;

var engine;
var world;

var ball;
var cupString;
var ground;

function matterSetup() {
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 1;
	Engine.run(engine);
	// smá debug til að sjá þegar nýjum phys object er bætt við í heiminn
	Events.on(world, "afterAdd", function(event) {
		console.log("added to world:", event.object);
	});
};

function setup() {
	// canvas og bg color
	var canvas = createCanvas(windowWidth, windowHeight);

	// matter stuff
	matterSetup();

	ball = new Ball(
		width/2-400,
		50,
		50,
		color(BALLCOLOR),
		{}
	);

	ground = new Rectangle(
		width/2,
		height-10,
		width,
		20,
		50,
		{isStatic:true}
	);
};

function draw() {
	background(254, 211, 48);

	ball.show();
	ground.show();
};

// frekar gagnslaust...
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
};

// mouse stuff
function mouseClicked() {
  if (!ball.anchored) {
  	cupString.startDrag();
  } else {
  	cupString.endDrag();
  }
}