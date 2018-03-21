var Engine			= Matter.Engine,
		Body				= Matter.Body,
		Events			= Matter.Events,
		Constraint	= Matter.Constraint,
		World				= Matter.World,
		Bodies			= Matter.Bodies;

var engine;
var world;

var ball;

function matterSetup() {
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 1;
	Engine.run(engine);
	Events.on(world, 'afterAdd', function(event) {
		console.log('added to world:', event.object);
	});
};

function setup() {
	// canvas og bg color
	var canvas = createCanvas(windowWidth, windowHeight);

	// matter stuff
	matterSetup();

	ball = new Ball(
		width/2,
		50,
		50,
		50,
		{}
	);
};

function draw() {
	background(254, 211, 48);

	ball.update();
	ball.show();
};

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
};