const BALLWIDTH = 50;

const Ball = function(x,y,col) {
	this.x = x,
	this.y = y,
	this.w = BALLWIDTH,
	this.col = col;
}

Ball.prototype.show = function() {
	ellipse(this.x, this.y, this.w, this.w);
};