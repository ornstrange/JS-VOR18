const Rectangle = function(x,y,w,h,col,opts) {
	Base.call(this,x,y,col,opts);
	this.w = w;
	this.h = h;
	// bua til physics body
	this.makeBody();
}

Rectangle.prototype.makeBody = function() {
	this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.opts);
	World.add(world, this.body);
}

Rectangle.prototype.update = function() {
	this.x = this.body.position.x;
	this.y = this.body.position.y;
	this.angle = this.body.angle;
}

Rectangle.prototype.show = function() {
	// uppfæra staðsetningu
	this.update();

	// teikna
	push();
	translate(this.x,this.y);
	rotate(this.angle);
	noStroke();
	fill(this.col);
	rectMode(CENTER);
	rect(0,0,this.w,this.h);

	// debug angle lína
	stroke(255-this.col);
	strokeWeight(2);
	line(0,0,this.w/2,0);
	line(0,0,0,-this.h/2);
	pop();
}