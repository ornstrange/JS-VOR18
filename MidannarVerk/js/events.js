function allEvents() {
	mouseEvents();
	ballCollideEvents();
	ballInCupEvents();
};

function mouseEvents() {
	Events.on(mouseConstraint, "startdrag", function(event) {
		cup.anchored = true;
	});
	Events.on(mouseConstraint, "enddrag", function(event) {
		cup.anchored = false;
	});
};

function ballCollideEvents() {
	Events.on(engine, 'collisionStart', function(event) {
		let pairs = event.pairs;
		for (var i = 0, j = pairs.length; i != j; ++i) {
			let pair = pairs[i];
			let endBall = string.nodes.bodies.slice(-1)[0];

			if (pair.bodyA === endBall &&
			   (pair.bodyB === cup.cup.parts[1] ||
			    pair.bodyB === cup.cup.parts[2] ||
			    pair.bodyB === cup.cup.parts[3])) {
				plops[floor(Math.random() * plops.length)].play();
			} else if (pair.bodyB === endBall &&
			   (pair.bodyA === cup.cup.parts[1] ||
			    pair.bodyA === cup.cup.parts[2] ||
			    pair.bodyA === cup.cup.parts[3])) {
				plops[floor(Math.random() * plops.length)].play();
			}
		}
	});
};

function ballInCupEvents() {
	Events.on(engine, 'collisionStart', function(event) {
		let pairs = event.pairs;
		for (var i = 0, j = pairs.length; i != j; ++i) {
			let pair = pairs[i];
			let endBall = string.nodes.bodies.slice(-1)[0];
			let cupSensor = cup.sensorBar;

			if (cup.cup.speed <= 60 && string.endBall.speed <= 60) {
				if (pair.bodyA === endBall && pair.bodyB === cupSensor) {
					scored();
				} else if (pair.bodyB === endBall && pair.bodyA === cupSensor) {
					scored();
				};
			};
		}
	});
};

function scored() {
	score++;
	string.nudgeEndBall();
	victory[floor(random(victory.length))].play();
	if (score % 5 == 0) {
		colorPicker = floor(Math.random() * 4);
		body.style.background = backgroundColors[colorPicker];
		cup.col = cupColors[colorPicker];
		string.ballCol = ballColors[colorPicker];
		string.stringCol = stringColors[colorPicker];
	};
};

function scoreTimerEvents() {
	if (score > oldScore) {
		startTimer = round(millis());
		countdown = true;
	} else if (round(millis()) - startTimer >= timeSec * 1000 && countdown) {
		if (score > highScore) {
			localStorage.setItem("hiscore", score);
			highScore = localStorage.getItem("hiscore");
		}
		score = 0;
		countdown = false;
		looser[floor(Math.random() * looser.length)].play();
	};
	oldScore = score;
};