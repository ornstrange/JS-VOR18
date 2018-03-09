let bg;
let Engine	= Matter.Engine,
		World		= Matter.World,
		Bodies	= Matter.Bodies;

let engine;
let world;
let ball1;

function setup() {
	// canvas og bg color
	createCanvas(windowWidth, windowHeight);
	bg = color(30, 30, 30);

	// matterjs stuff
	engine = Engine.create();
	world = engine.world;
	ball1 = new Ball(500,200,BALLRAD,color(64,125,255));
	Engine.run(engine);
}

function draw() {
	background(bg);
	ball1.show();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}