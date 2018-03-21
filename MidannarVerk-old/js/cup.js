const Cup = function(x,y,col) {
	this.x = x;
	this.y = y;
	this.col = col;
	this.walls = [];
	this.makeWalls(this.x,this.y,this.col);
	// this.sensor;
	// this.makeSensor(group);
};

Cup.prototype.makeWalls = function(x,y,col) {
	this.walls.push(new Rectangle(x, y, CUPW, CUPWALLW, col)); // bottom
};

Cup.prototype.anchorMouse = function() {
	this.x = mouseX;
	this.y = mouseY;
};

Cup.prototype.updatePos = function() {
	this.walls[0].pos.x = this.x;
	this.walls[0].pos.y = this.y;
}

Cup.prototype.show = function() {
	this.anchorMouse();
	this.updatePos();
	fill(this.col);
	this.walls.forEach(function(x){x.show();});
};