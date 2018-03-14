let bg;
let ballCol;
let cupCol;
let Engine					= Matter.Engine,
		World						= Matter.World,
		Body 						= Matter.Body,
		Mouse 					= Matter.Mouse,
		MouseConstraint = Matter.MouseConstraint,
		Bodies					= Matter.Bodies,
		Constraint 			= Matter.Constraint;

let engine;
let world;
let ball1;
let string;
let mConstr;

function setup() {
	// canvas og bg color
	var canvas = createCanvas(windowWidth, windowHeight);
	bg = color(30, 30, 30);
	ballCol = color(64,125,255);
	cupCol = color(255,125,64);

	var guh = new Rectangle(50,150,100,100,cupCol);

	// matterjs stuff
	engine = Engine.create();
	world = engine.world;
	string = new String(200,10,ballCol);
	let gr = Bodies.rectangle(width/2,height+9,width,20, {isStatic: true});
	World.add(world, gr);
	Engine.run(engine);
	var mouse = Mouse.create(canvas.elt);
	mConstr = MouseConstraint.create(engine, {mouse: mouse});
	World.add(world, mConstr);
}

function draw() {
	background(bg);
	string.anchorMouse();
	string.show();
	// guh.show();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}