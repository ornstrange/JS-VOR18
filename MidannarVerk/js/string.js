const String = function(x,y,col) {
	this.x = x;
	this.y = y;
	this.w = STRWIDTH;
	this.col = col;
	let group = Body.nextGroup(true);
	this.nodes = [];
	this.makeNodes(this.x,this.y,this.col,group);
	this.endBall;
	this.makeEndBall(this.col,group);
};

String.prototype.makeNodes = function(x,y,col,group) {
	let opts = {
		collisionFilter: {
			group: group
		}
	}
	for(let i = 0; i < STRNODECOUNT; i++) {
		this.nodes.push(new Ball(x,y+(i*STRNODEOFF),STRNODERAD,col,opts));
	};

	for (let i = 0; i < this.nodes.length-1; i++) {
	 	let n = this.nodes[i];
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

String.prototype.makeEndBall = function(col,group) {
	let endBallPos = this.nodes[STRNODECOUNT-1].pos;
	let opts = {
		mass: BALLMASS,
		collisionFilter: {
			group: group
		}
	}
	this.endBall = new Ball(endBallPos.x, endBallPos.y, BALLRAD, col, opts);

	let options = {
		bodyA: this.endBall.body,
		bodyB: this.nodes[STRNODECOUNT-1].body,
		length: 0,
		stiffness: 1
	};

	let constraint = Constraint.create(options)
	World.add(world, constraint);
};

String.prototype.anchorMouse = function() {
	this.nodes[0].pos.x = mouseX;
	this.nodes[0].pos.y = mouseY;
};

String.prototype.show = function() {
	this.anchorMouse();
	noFill();
	stroke(255);
	strokeWeight(STRWIDTH);
	let fNodePos = this.nodes[0].pos;
	let sNodePos = this.nodes[1].pos;
	let slNodePos = this.nodes[STRNODECOUNT-2].pos;
	let lNodePos = this.nodes[STRNODECOUNT-1].pos;
	line(fNodePos.x, fNodePos.y, sNodePos.x, sNodePos.y);
	line(slNodePos.x, slNodePos.y, lNodePos.x, lNodePos.y);
	beginShape();
	for (let i = 0; i < this.nodes.length; i++) {
		let pos = this.nodes[i].pos;
		curveVertex(pos.x, pos.y);
	}
	endShape();

	// endBall
	this.endBall.show();

	// this.nodes.forEach(function(n){n.show();}) sýnir strengja nóður
};