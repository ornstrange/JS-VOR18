const Cup = function(x,y,w,h,ww,col,opts) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.ww = ww;
	this.col = col;
	this.opts = opts;
	this.walls = [];
}

Cup.prototype.update = function() {
	if (this.anchored) {this.drag();};
};

Cup.prototype.startDrag = function(){
	this.offX = mouseX-this.x;
	this.offY = mouseY-this.y;

	Sleeping.set(this.body, false);
	this.anchored = true;
};

Cup.prototype.drag = function() {
	let newX = mouseX - this.offX;
	let newY = mouseY - this.offY;
	Body.setPosition(this.body, {
		x:newX,
		y:newY
	});
};

Cup.prototype.endDrag = function(){
	Sleeping.set(this.body, true);
	this.anchored = false;
};