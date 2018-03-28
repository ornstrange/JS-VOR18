function allEvents() {
	mouseEvents();
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
			} else if (pair.bodyB === endBall && pair.bodyA === cupSensor) {
				score++;
				string.nudgeEndBall();
			}
		}
	});
};