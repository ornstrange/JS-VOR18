const Engine			= Matter.Engine,
			Body				= Matter.Body,
			Events			= Matter.Events,
			Constraint	= Matter.Constraint,
			Compound		= Matter.Compound,
			Composites	= Matter.Composites,
			Mouse				= Matter.Mouse,
			MouseConst	= Matter.MouseConstraint,
			World				= Matter.World,
			Sleeping		= Matter.Sleeping,
			Bodies			= Matter.Bodies;

var engine,
		world,
		defaultColl = 0x0001,
		mouseColl = 0x0002,
		mouse,
		mouseConstraint,
		cup,
		string;

var per = {
	x: function(x) {return Math.round(x/100 * windowWidth);},
	y: function(y) {return Math.round(y/100 * windowHeight);}
};

function matterSetup() {
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 0;
	Engine.run(engine);
	// smá debug til að sjá þegar nýjum phys object er bætt við í heiminn
	// Events.on(world, "afterAdd", function(event) {
	// 	console.log("added to world:", event.object);
	// });
};

function addItems() {
	cup = new Cup(
		per.x(50),
		per.y(40),
		per.x(10),
		per.y(10),
		per.y(2),
		100
	);

	string = new String(
		per.x(50),
		per.y(40),
		5,
		per.y(3),
		per.y(1),
		per.x(5),
		50,
		color(48,112,254)
  );

  let cupStringConstraint = Constraint.create({
  	bodyA: cup.cup.parts[1],
  	bodyB: string.nodes[0],
  	stiffness: 1
  });
  World.add(world, cupStringConstraint);
};

function addMouse() {
	mouseConstraint = MouseConst.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 1,
			angularStiffness: 1
		},
		collisionFilter: {
			mask: mouseColl
		}
	});
	World.add(world, mouseConstraint);
};

function mouseEvents() {
	Events.on(mouseConstraint, "startdrag", function(event) {
		cup.anchored = true;
	});
	Events.on(mouseConstraint, "enddrag", function(event) {
		cup.anchored = false;
	});
};

function setup() {
	// canvas og bg color
	var canvas = createCanvas(per.x(100), per.y(100));

	matterSetup();
	addItems();

	// mús drasl
	mouse = Mouse.create(canvas.elt);
	addMouse();
	mouseEvents();
};

function draw() {
	background(254, 211, 48);
	string.show();
	cup.show();
};

// frekar gagnslaust...
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
};