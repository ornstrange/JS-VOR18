const Cup = function(x,y,w,h,ww,col,opts) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.ww = ww;
	this.col = col;
	this.opts = opts;
	this.makeWalls(this.w,this.h,this.ww);
	this.anchored = false;
};

Cup.prototype.makeWalls = function(w,h,ww){
	this.walls = [];
	this.walls.push(Bodies.rectangle(this.x,this.y,w,ww,this.opts));
	let leftX = this.x - (w/2) + (ww/2);
	let leftY = this.y - (h/2) - (ww/2);
	this.walls.push(Bodies.rectangle(leftX,leftY,ww,h,this.opts));
	let rightX = this.x + (w/2) - (ww/2);
	let rightY = this.y - (h/2) - (ww/2);
	this.walls.push(Bodies.rectangle(rightX,rightY,ww,h,this.opts));
	this.cup = Body.create({
		parts: this.walls,
		isSleeping: true,
		collisionFilter: { category: mouseColl }
	});
	World.add(world, this.cup);
};

Cup.prototype.update = function() {
	this.x = this.cup.parts[0].position.x;
	this.y = this.cup.parts[0].position.y;
};

Cup.prototype.sleepHandler = function() {
	if (this.anchored) {
		Sleeping.set(cup.cup, false);
	} else {
		Sleeping.set(cup.cup, true);
	};
};

Cup.prototype.keepUpright = function() {
	Body.setAngularVelocity(this.cup, 0);
};

Cup.prototype.show = function() {
	this.update();
	this.sleepHandler();
	this.keepUpright();

	let edges = [
		{ x: this.x - (this.w/2) - (this.ww/2),
			y: this.y - this.h},
		{ x: this.x - (this.w/2),
			y: this.y - this.h + (this.ww/2)},
		{ x: this.x - (this.w/2) + (this.ww/2),
			y: this.y + (this.ww/2)},
		{ x: this.x + (this.w/2) - (this.ww/2),
			y: this.y + (this.ww/2)},
		{ x: this.x + (this.w/2),
			y: this.y - this.h + (this.ww/2)},
		{ x: this.x + (this.w/2) + (this.ww/2),
			y: this.y - this.h}
	];
	// teikna, þetta lítur mehh út
	noFill();
	stroke(this.col);
	strokeWeight(this.ww);
	beginShape();
	edges.forEach(function(edge) {
		curveVertex(edge.x, edge.y);
	})
	endShape();
};