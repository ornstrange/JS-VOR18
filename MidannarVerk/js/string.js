const String = function(x,y,nc,no,nr,br,col,bcol,opts) {
	this.x = x;
	this.y = y;
	this.nc = nc;
	this.nr = nr;
	this.no = no;
	this.br = br;
	this.col = col;
	this.bcol = bcol;
	this.opts = opts;
	this.makeNodes(this.nc,this.nr,this.no,this.br);
};

String.prototype.makeNodes = function(nc,nr,no,br){
	this.nodes = [];
	for (let i = 0; i < nc; i++) {
		let node;
		if (i == nc-1) {
			node = Bodies.circle(this.x,this.y+(nr*2*(i-1))+(no*i)+br,br,{ collisionFilter: {
				group: mouseColl,
				category: mouseColl
			}});
		} else {
			node = Bodies.circle(this.x,this.y+(nr*2*i)+(no*i),nr,{
				collisionFilter: {
					group: 2**(i+2),
					category: 2**(i+2)
				}
			});
		};
		this.nodes.push(node);
		World.add(world, this.nodes[i]);
		if (i > 0) {
			let constraint = Constraint.create({
				bodyA: this.nodes[i-1],
				bodyB: this.nodes[i],
				stiffness: 1
			});
			World.add(world, constraint);
		}
	};
};

String.prototype.update = function() {
	this.x = this.nodes[0].position.x;
	this.y = this.nodes[0].position.y;
};

String.prototype.show = function() {
	this.update();

	// teikna, þetta lítur mehh út
	noFill();
	stroke(this.col);
	strokeWeight(this.nr);
	beginShape();
	curveVertex(this.x, this.y-(this.nr/2));
	for (let i = 0; i < this.nc; i++) {
		curveVertex(this.nodes[i].position.x, this.nodes[i].position.y);
	}
	curveVertex(this.nodes[this.nc-1].position.x, this.nodes[this.nc-1].position.y+(this.nr/2));
	endShape();
	// endball
	noStroke();
	fill(this.bcol);
	ellipse(this.nodes[this.nc-1].position.x, this.nodes[this.nc-1].position.y,this.br,this.br);
};