const Ball = function(x,y,r,col,opts) {
	Base.call(this,x,y,col,opts);
	this.r = r;
	
	this.makeBody();
}

Ball.prototype.makeBody = function() {
	this.body = Bodies.circle(this.x, this.y, this.r, this.opts);
	World.add(world, this.body);
}

Ball.prototype.update = function() {
	this.x = this.body.position.x;
	this.y = this.body.position.y;
	this.ang = this.body.angle;
}

Ball.prototype.show = function() {
	push();
	translate(this.x,this.y);
	rotate(this.ang);
	noStroke();
	fill(this.col);
	ellipseMode(CENTER);
	ellipse(0,0,this.r*2);
	pop();
}