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
				plops[floor(random(plops.length))].play();
			} else if (pair.bodyB === endBall &&
			   (pair.bodyA === cup.cup.parts[1] ||
			    pair.bodyA === cup.cup.parts[2] ||
			    pair.bodyA === cup.cup.parts[3])) {
				plops[floor(random(plops.length))].play();
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

			if (pair.bodyA === endBall && pair.bodyB === cupSensor) {
				score++;
				string.nudgeEndBall();
				victory[floor(random(victory.length))].play();
			} else if (pair.bodyB === endBall && pair.bodyA === cupSensor) {
				score++;
				string.nudgeEndBall();
				victory[floor(random(victory.length))].play();
			}
		}
	});
};

function scoreTimerEvents() {
	if (score > oldScore) {
		startTimer = round(millis());
		countdown = true;
	} else if (round(millis()) - startTimer >= timeSec * 1000 && countdown) {
		score = 0;
		countdown = false;
		looser[floor(random(looser.length))].play();
	};
	oldScore = score;
	// if (score === 1 && fromZero) {
	// 	startTimer = round(millis());
	// 	fromZero = false;
	// 	countdown = true;
	// };
	// if (round(millis()) - startTimer >= timeSec * 1000) {
	// 	score = 0;
	// 	fromZero = true;
	// 	countdown = false;
	// };
};