let bg;
let ballCol;
let cupCol;
let Engine			= Matter.Engine,
		Render			= Matter.Render,
		Runner			= Matter.Runner,
		Body				= Matter.Body,
		Events			= Matter.Events,
		Mouse				= Matter.Mouse,
		Constraint	= Matter.Constraint,
		World				= Matter.World,
		Bodies			= Matter.Bodies;

let engine;
let world;
let string;
let cup;
let ground;

function setup() {
	// canvas og bg color
	var canvas = createCanvas(windowWidth, windowHeight);
	bg = color(30, 30, 30);
	ballCol = color(64,125,255);
	cupCol = color(255,125,64);

	// matterjs stuff
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = GRAVITY;
	Engine.run(engine);
	Events.on(world, 'afterAdd', function(event) {
		console.log('added to world:', event.object);
	});

	// objects
	ground = new Rectangle(width/2,height-10,width+200,20,255,{isStatic:true});
	string = new String(0,0,ballCol);
	cup = new Cup(0,0,cupCol);
}

function draw() {
	background(bg);
	string.show();
	cup.show();
	ground.show();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}