function drawScore() {
	textSize(per.y(120));
	textFont('roboto');
	textAlign(CENTER,CENTER);
	fill(0,0,0,25);
	text(score, per.x(50), per.y(50));
};