const Rectangle = function(x,y,w,h,col,opts={}) {
	this.body = Bodies.rectangle(x, y, w, h, opts);
	World.add(world, this.body);
	this.pos = this.body.position;
	this.w = w;
	this.h = h;
	this.angle = this.body.angle;
	this.col = col;
};

Rectangle.prototype.updatePos = function() {
	this.pos = this.body.position;
	this.x = this.pos.x;
	this.y = this.pos.y;
};

Rectangle.prototype.show = function() {
	this.updatePos();
	rectMode(CENTER);
	noStroke();
	fill(this.col);
	rotate(this.angle);
	rect(this.x, this.y, this.w, this.h);
};