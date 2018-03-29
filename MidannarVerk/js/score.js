function drawScore() {
	textSize(per.y(120));
	if (isPhone) {textSize(per.x(60));}
	textAlign(CENTER,CENTER);
	noStroke();
	let textColor;
	if (brightness(color(backgroundColors[colorPicker])) >= 75) {
		textColor = color(0,0,0,10);
	} else {
		textColor = color(255,255,255,10);
	}
	fill(textColor);
	text(score, per.x(50), per.y(50));
};

function drawHighScore() {
	if (highScore !== null) {
		textSize(per.x(1.5));
		if (isPhone) {textSize(per.x(5));}
		textAlign(RIGHT);
		fill(0,0,0,190);
		text("highscore: " + highScore, per.x(98), per.y(96));
	};
};

function drawCountdown() {
	if (countdown) {
		noStroke();
		let countdownColor = color(0,0,0,20);
		fill(countdownColor);
		let newX = map(round(millis()) - startTimer, 0, timeSec*1000, 100, 0);
		rect(0,0,per.x(newX),per.y(100));
	};
};