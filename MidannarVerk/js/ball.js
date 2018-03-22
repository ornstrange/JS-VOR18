const Ball = function(x,y,r,col,opts) {
	Base.call(this,x,y,col,opts);
	this.r = r;
	// búa til physics object
	this.makeBody();
}

Ball.prototype.makeBody = function() {
	this.body = Bodies.circle(this.x, this.y, this.r, this.opts);
	World.add(world, this.body);
}

Ball.prototype.update = function() {
	this.x = this.body.position.x;
	this.y = this.body.position.y;
	this.angle = this.body.angle;
}

Ball.prototype.show = function() {
	// uppfæra staðsetningu
	this.update();

	// teikna stuff
	push();
	translate(this.x,this.y);
	rotate(this.angle);
	noStroke();
	fill(this.col);
	ellipseMode(CENTER);
	ellipse(0,0,this.r*2);

	// debug angle lína
	stroke(255-this.col);
	strokeWeight(2);
	line(0,0,this.r,0);
	pop();
}