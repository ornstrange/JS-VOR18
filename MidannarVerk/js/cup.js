const Cup = function(x,y,w,h,ww,col) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.ww = ww;
	this.col = col;
	this.makeWalls(this.w,this.h,this.ww);
	this.makeSensorBar();
	this.anchored = false;
};

Cup.prototype.makeWalls = function(w,h,ww){
	this.walls = [];
	this.walls.push(Bodies.rectangle(this.x,this.y,w,ww));
	let leftX = this.x - (w/2) + (ww/2);
	let leftY = this.y - (h/2) - (ww/2);
	this.walls.push(Bodies.rectangle(leftX,leftY,ww,h));
	let rightX = this.x + (w/2) - (ww/2);
	let rightY = this.y - (h/2) - (ww/2);
	this.walls.push(Bodies.rectangle(rightX,rightY,ww,h));
	this.cup = Body.create({
		parts: this.walls,
		isSleeping: true,
		restitution: cupBouncyness,
		collisionFilter: { category: mouseColl, mask: ballColl }
	});
	Body.setInertia(this.cup, Infinity); // svo bollinn snúist ekki
	Body.setMass(this.cup, 10**100); // svo hann dragist ekki niður
	World.add(world, this.cup);
};

Cup.prototype.makeSensorBar = function() {
	this.sensorBar = Bodies.rectangle(this.x, this.y - this.ww*2, this.w - (this.ww*4), this.ww, { isSensor: true });
	let sensorConst = Constraint.create({
		bodyA: this.sensorBar,
		bodyB: this.cup,
		pointB: { x: 0, y: (this.cup.parts[1].position.y - this.cup.position.y) - this.ww*2 },
		stiffness: 1,
		angularStiffness: 1
	});
	Body.setInertia(this.sensorBar, 10**100);
	World.add(world, [this.sensorBar, sensorConst]);
};

Cup.prototype.update = function() {
	this.x = this.cup.position.x;
	this.y = this.cup.parts[1].position.y;
};

Cup.prototype.sleepHandler = function() {
	if (this.anchored) {
		Sleeping.set(cup.cup, false);
	} else {
		Sleeping.set(cup.cup, true);
	};
};

Cup.prototype.show = function() {
	this.update();
	this.sleepHandler();

	// teikna
	push();
	noFill();
	stroke(this.col);
	strokeWeight(this.ww);
	beginShape();
	let bottom = this.cup.parts[1],
			left = this.cup.parts[2],
			right = this.cup.parts[3];
	curveVertex( left.position.x - (this.ww/2), left.position.y - (this.w/2) + this.ww ); // left top corner
	curveVertex( left.position.x, left.position.y - (this.w/2) + this.ww );
	curveVertex( bottom.position.x - (this.w/2) + (this.ww/2), bottom.position.y - (this.ww) );
	curveVertex( bottom.position.x, bottom.position.y );
	curveVertex( bottom.position.x + (this.w/2) - (this.ww/2), bottom.position.y - (this.ww) );
	curveVertex( right.position.x, right.position.y - (this.w/2) + this.ww );
	curveVertex( right.position.x + (this.ww/2), right.position.y - (this.w/2) + this.ww ); // right top corner
	endShape();
	pop();

	// // debug sjá this.x og this.y og sensor bar
	// push();
	// rectMode(CENTER);
	// fill(0);
	// rect(this.x, this.y, this.ww, this.ww);
	// fill(0);
	// noStroke();
	// beginShape();
	// for (let i = 0; i < 4; i++) {
	// 	vertex(this.sensorBar.vertices[i].x,this.sensorBar.vertices[i].y);
	// };
	// endShape(CLOSE);
	// pop();
};