function drawScore() {
	textSize(per.y(120));
	// textFont('Sans-Serif');
	textAlign(CENTER,CENTER);
	noStroke();
	fill(0,0,0,45);
	text(score, per.x(50), per.y(50));
};

function drawCountdown() {
	if (countdown) {
		noStroke();
		fill(244,67,54);
		let newX = map(round(millis()) - startTimer, 0, timeSec*1000, 100, 0);
		rect(0,0,per.x(newX),per.y(100));
	};
};