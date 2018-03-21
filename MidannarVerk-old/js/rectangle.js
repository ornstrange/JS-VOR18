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
	this.angle = 0;
	this.body.angle = 0;
};

Rectangle.prototype.show = function() {
	this.updatePos();
	rectMode(CENTER);
	noStroke();
	fill(this.col);
	push();
	translate(this.x,this.y)
	rotate(this.angle);
	rect(0,0, this.w, this.h);
	pop();
};