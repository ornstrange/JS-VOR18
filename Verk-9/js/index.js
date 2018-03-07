let bg;

function setup() {
	createCanvas(windowWidth, windowHeight);
	bg = color(255, 255, 0);
}

function draw() {
	background(bg);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}