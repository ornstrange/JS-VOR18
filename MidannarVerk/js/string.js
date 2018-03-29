const String = function(x,y,nodeCount,nodeOffset,nodeRadius,ballRadius,stringCol,ballCol) {
	this.x = x;
	this.y = y;
	this.nodeCount = nodeCount;
	this.nodeOffset = nodeOffset;
	this.nodeRadius = nodeRadius;
	this.ballRadius = ballRadius;
	this.stringCol = stringCol;
	this.ballCol = ballCol;
	this.nodes = [];
	this.makeNodes(this.nodeCount,this.nodeOffset,this.nodeRadius,this.ballRadius);
	this.endBall = this.nodes.bodies[this.nodeCount-1];
};

String.prototype.makeNodes = function(nc,no,nr,br){
	let nodeCounter = 0;
	let group = Body.nextGroup(true);
	let category = defaultColl;
	this.nodes = Composites.stack(this.x, this.y, 1, nc, 0, no, function(x, y) {
		nodeCounter++;
		let radius = nr;
		if (nodeCounter === nc) {
			radius = br;
			group = defaultColl;
			category = ballColl;
		};
		x = x - (per.x(1)*(nodeCounter-1));
		return Bodies.circle(x, y, radius, { density: 0.01, collisionFilter: { group: group, category: category, restitution: endBallBouncyness } });
	});
	Body.setMass(this.nodes.bodies[nc-1], endBallMass);
	Body.set(this.nodes.bodies[nc-1], "slop", 0.001);
	Composites.chain(this.nodes, 0, 0, 0, 0, { stiffness: 1 });
	Composite.add(this.nodes, Constraint.create({
		bodyA: cup.cup,
		pointA: { x: 0, y: cup.cup.parts[1].position.y - cup.cup.position.y },
		bodyB: this.nodes.bodies[0],
		stiffness: 1,
		angularStiffness: 1
	}));
	World.add(world, this.nodes);
};

String.prototype.nudgeEndBall = function() {
	Body.setVelocity(this.endBall, { x: 0, y: 0 });
	Body.translate(this.endBall, { x: -per.x(10), y: per.y(50) });
};

String.prototype.update = function() {
	this.x = cup.cup.parts[1].position.x;
	this.y = cup.cup.parts[1].position.y;
};

String.prototype.show = function() {
	this.update();

	noFill();
	stroke(this.stringCol);
	strokeWeight(this.nodeRadius*2);
	beginShape();
	curveVertex(this.x, this.y-10);
	for (let i = 0; i < this.nodeCount; i++) {
		curveVertex(this.nodes.bodies[i].position.x, this.nodes.bodies[i].position.y);
	};
	curveVertex(this.endBall.position.x, this.endBall.position.y+10);
	endShape();
	// endball
	noStroke();
	fill(this.ballCol);
	ellipse(this.endBall.position.x,this.endBall.position.y,this.ballRadius*2);
};