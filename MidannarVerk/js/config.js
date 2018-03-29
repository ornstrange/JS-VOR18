// vars
var isPhone = false,
		canvas,
		body,
		engine,
		world,
		defaultColl = 0x0001,
		mouseColl = 0x0002,
		ballColl = 0x0004,
		mouse,
		mouseConstraint,
		cup,
		string,
		oldScore = 0,
		score = 0,
		highScore = localStorage.getItem("hiscore"),
		gravity = 1.2,
		timeScale = 1.05,
		fromZero = true,
		startTimer = 0,
		timeSec = 4.2, // má fínstilla, vil hafa þetta erfitt samt
		countdown = false,
		showHelp = true,
		plops = [],
		victory = [],
		looser = [],
		colorPicker = 0;

var Per = function(){
	this.mWidth = windowWidth;
	this.mHeight = windowHeight;
	if (this.mWidth >= 1920) {
		this.mWidth = 1920;
	};
	if (this.mHeight >= 1080) {
		this.mHeight = 1080;
	};
	this.x = function(numb) { return Math.round(numb/100 * this.mWidth); };
	this.y = function(numb) { return Math.round(numb/100 * this.mHeight); };
};

// MATTER STYTTINGAR
const Engine			= Matter.Engine,
			Render 			= Matter.Render,
			Body				= Matter.Body,
			Events			= Matter.Events,
			Constraint	= Matter.Constraint,
			Compound		= Matter.Compound,
			Composite		= Matter.Composite,
			Composites	= Matter.Composites,
			Mouse				= Matter.Mouse,
			MouseConst	= Matter.MouseConstraint,
			World				= Matter.World,
			Sleeping		= Matter.Sleeping,
			Bodies			= Matter.Bodies;

// BASIC SIZE OG EHV STILLINGAR
var startXPercent = 20,
		startYPercent = 20,
		cupBouncyness = 0.75,
		endBallBouncyness = 0.4,
		endBallRadiusPercent = 3,
		endBallMass = endBallRadiusPercent*9,
		cupWidthPercent = endBallRadiusPercent * 2.58, // þetta er akkurat pirrandi erfitt
		cupHeightPercent = endBallRadiusPercent * 2,
		cupWallWidthPercent = endBallRadiusPercent*0.2,
		stringNodeCount = 20,
		stringNodeWidthPercent = endBallRadiusPercent*0.08;
		stringNodeOffsetPercent = 0;

function phoneSettings() {
	cupBouncyness = 0.5,
	endBallRadiusPercent = 8;
	endBallMass = endBallRadiusPercent*2.3;
	cupWidthPercent = endBallRadiusPercent * 2.8; // þetta er akkurat pirrandi erfitt
	cupHeightPercent = endBallRadiusPercent * 2;
	cupWallWidthPercent = endBallRadiusPercent*0.2;
	stringNodeWidthPercent = endBallRadiusPercent*0.08;
	stringNodeCount = 20;
};

// color schemes
var ballColors 				= ["#f1404b", "#cff09e", "#00dffc", "#fbffb9"];
var cupColors 				= ["#252c41", "#a8dba8", "#008c9e", "#ec7357"];
var stringColors 			= ["#9c8c91", "#79bd9a", "#005f6b", "#fdd692"];
var backgroundColors 	= ["#f4f5f9", "#3b8686", "#343838", "#754f44"];