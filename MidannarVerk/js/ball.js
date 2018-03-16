const Ball = function(x,y,r,col,opts={}) {
	this.body = Bodies.circle(x, y, r, opts);
	World.add(world, this.body);
	this.pos = this.body.position;
	this.r = r;
	this.w = this.r*2;
	this.col = col;
};

Ball.prototype.updatePos = function() {
	this.x = this.pos.x;
	this.y = this.pos.y;
};

Ball.prototype.show = function() {
	this.updatePos();
	noStroke();
	fill(this.col);
	ellipse(this.x, this.y, this.w, this.w);
};