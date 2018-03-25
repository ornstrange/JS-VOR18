const BALLCOLOR = [0,125,30];
const ENDBALLR = 50;

const Engine			= Matter.Engine,
			Body				= Matter.Body,
			Events			= Matter.Events,
			Constraint	= Matter.Constraint,
			Mouse				= Matter.Mouse,
			MouseConst	= Matter.MouseConstraint,
			World				= Matter.World,
			Sleeping		= Matter.Sleeping,
			Bodies			= Matter.Bodies;

var engine;
var world;
var collGroup = 0x0001;
var collGroup2 = 0x0002;

var ball;
var cupString;
var ground;

function pX(percent) {
	return Math.round(percent/100 * windowWidth);
}

function pY(percent) {
	return Math.round(percent/100 * windowHeight);
}

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
		pX(50),
		pY(5),
		pX(2),
		color(BALLCOLOR),
		{
			density: 1,
			friction: 0.05,
			frictionAir: 0.005,
			restitution: 0.4,
			isSleeping:true,
		}
	);

	ground = new Rectangle(
		pX(50),
		pY(100) - pY(1),
		pX(100),
		pY(2),
		50,
		{
			isStatic:true,
		}
	);


	// add mouse control
	var mouse = Mouse.create(canvas.elt),
	mouseConstraint = MouseConst.create(engine, {
		mouse: mouse,
		constraint: {
			angularStiffness: 1,
		}
	});

	World.add(world, mouseConstraint);
};

function draw() {
	background(254, 211, 48);

	ground.show();
	ball.show();
};

// frekar gagnslaust...
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
};