// a)
function Spaceship() {
	this.name = "Space Racer";
	this.life = 10;
}
Spaceship.prototype.showName = function() {
	console.log(this.name);
};

g1 = new Spaceship();
g2 = new Spaceship();
g3 = new Spaceship();

// b)
g1.name = "Trace Pacer";
g1.showName();

// c)
Spaceship.prototype.speed = 5;
Spaceship.prototype.fly = function() {
	this.speed++;
};

// d)
g4 = new Spaceship();
g4.damage = function() {
	this.life--;
};
