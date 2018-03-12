const String = function(x,y,col) {
	this.nodes = [];
	let group = Body.nextGroup(true);
	for(let i = 0; i < STRNODECOUNT; i++) {
		this.nodes.push(new Ball(x,y+(i*STRNODEOFF),STRNODERAD,col));
		this.nodes[i].body.collisionFilter.group = group;
	};
	for (let i = 0; i < this.nodes.length; i++) {
	 	let n = this.nodes[i];
		if (n.body.id != STRNODECOUNT) {
			let options = {
				bodyA: n.body,
				bodyB: this.nodes[i+1].body,
				length: STRNODEOFF,
				stiffness: STRNODESTIFF
			};
			let constraint = Constraint.create(options);
			World.add(world, constraint);
		};
	};

	this.x = x;
	this.y = y;
	this.w = STRWIDTH;
	this.col = col;
};

String.prototype.anchorMouse = function() {
	this.nodes[0].body.position.x = mouseX;
	this.nodes[0].body.position.y = mouseY;
}

String.prototype.show = function() {
	noFill();
	stroke(255);
	strokeWeight(STRWIDTH);
	line(this.nodes[0].pos.x, this.nodes[0].pos.y, this.nodes[1].pos.x, this.nodes[1].pos.y);
	beginShape();
	for (let i = 0; i < this.nodes.length; i++) {
		let pos = this.nodes[i].pos;
		curveVertex(pos.x, pos.y);
	}
	endShape();


	// for (let i = 0; i < this.nodes.length; i++) {
	// 	this.nodes[i].show();
	// }
};