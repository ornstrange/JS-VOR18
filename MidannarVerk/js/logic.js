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
		cupColors[colorPicker]
	);

	string = new String(
		per.x(startXPercent),
		per.y(startYPercent),
		stringNodeCount,
		per.y(stringNodeOffsetPercent),
		per.x(stringNodeWidthPercent),
		per.x(endBallRadiusPercent),
		stringColors[colorPicker],
		ballColors[colorPicker]
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
		if (isPhone) {textSize(per.x(4));}
		textAlign(RIGHT);
		fill(0,0,0,190);
		text("Click and hold the cup to drag it,\nget the ball in the cup!", per.x(98), per.y(10));
	};
};

function preload() {
	plops = [
		loadSound("../sound/plop-1.wav"),
		loadSound("../sound/plop-2.wav"),
		loadSound("../sound/plop-3.wav"),
		loadSound("../sound/plop-4.wav"),
		loadSound("../sound/plop-5.wav"),
	];
	victory = [
		loadSound("../sound/victory-1.wav"),
		loadSound("../sound/victory-2.wav"),
		loadSound("../sound/victory-3.wav"),
	];
	looser = [
		loadSound("../sound/looser-1.wav"),
		loadSound("../sound/looser-2.wav"),
	];
	masterVolume(1.8);

	if (windowWidth <= 480) {
		isPhone = true;
	};
};

function setup() {
	per = new Per();
	if (isPhone) {
		phoneSettings();
	};

	// canvas og bg color
	canvas = createCanvas(per.x(100), per.y(100));
	body = document.getElementsByTagName("body")[0];
	body.style.background = backgroundColors[colorPicker];
	pixelDensity(1);
	textFont("Arial");
	textFont("Helvetica");
	matterSetup();
	addItems();

	// mús drasl
	mouse = Mouse.create(canvas.elt);
	addMouse();

	// bæta events inn
	allEvents();
};

function draw() {
	background(backgroundColors[colorPicker]);
	scoreTimerEvents();
	drawCountdown();
	drawScore();
	drawHighScore();

	string.show();
	cup.show();

	helpText();
};

// frekar gagnslaust...
function windowResized() {
	resizeCanvas(per.x(100), per.y(100));
};

function mousePressed() {
	if (mouseX <= per.x(startXPercent) + 100 &&
	    mouseX >= per.x(startXPercent) - 100 &&
	    mouseY <= per.y(startYPercent) + 100 &&
	    mouseY >= per.y(startYPercent) - 100) {
		showHelp = false;
	};
};