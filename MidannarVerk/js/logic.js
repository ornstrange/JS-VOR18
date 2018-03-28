function matterSetup() {
	engine = Engine.create({ timing: { timeScale: timeScale } });
	world = engine.world;
	world.gravity.y = gravity;
	Engine.run(engine);
	// smá debug til að sjá þegar nýjum phys object er bætt við í heiminn
	// Events.on(world, "afterAdd", function(event) {
	// 	console.log("added to world:", event.object);
	// });
};

function addItems() {
	cup = new Cup(
		per.x(startXPercent),
		per.y(startYPercent),
		per.x(cupWidthPercent),
		per.x(cupHeightPercent),
		per.x(cupWallWidthPercent),
		75
	);

	string = new String(
		per.x(startXPercent),
		per.y(startYPercent),
		stringNodeCount,
		per.y(stringNodeOffsetPercent),
		per.x(stringNodeWidthPercent),
		per.x(endBallRadiusPercent),
		50,
		color(48,112,254)
  );
};

function addMouse() {
	mouseConstraint = MouseConst.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 1,
			angularStiffness: 0.8
		},
		collisionFilter: {
			category: ballColl,
			mask: mouseColl
		}
	});
	World.add(world, mouseConstraint);
};

function helpText() {
	if (showHelp) {
		textSize(per.x(2.5));
		textFont('roboto');
		textAlign(RIGHT);
		fill(0,0,0,190);
		text("Click and hold the cup to drag it,\nget the ball in the cup!", per.x(98), per.y(10));
	};
};

function setup() {
	// canvas og bg color
	var canvas = createCanvas(per.x(100), per.y(100));
	fullscreen();

	matterSetup();
	addItems();

	// mús drasl
	mouse = Mouse.create(canvas.elt);
	addMouse();

	// bæta events inn
	allEvents();
};

function draw() {
	background(254, 211, 48);
	scoreTimerEvents();
	drawCountdown();
	drawScore();

	string.show();
	cup.show();

	helpText();
};

// frekar gagnslaust...
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
};

function mousePressed() {
	if (mouseX <= per.x(startXPercent) + 100 &&
	    mouseX >= per.x(startXPercent) - 100 &&
	    mouseY <= per.y(startYPercent) + 100 &&
	    mouseY >= per.y(startYPercent) - 100) {
		showHelp = false;
	}
};