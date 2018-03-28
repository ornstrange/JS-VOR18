// vars
var engine,
		world,
		defaultColl = 0x0001,
		mouseColl = 0x0002,
		ballColl = 0x0004,
		mouse,
		mouseConstraint,
		cup,
		string,
		oldScore = 0;
		score = 0;
		gravity = 1.2,
		timeScale = 1.05,
		fromZero = true,
		startTimer = 0,
		timeSec = 5.5, // má fínstilla, vil hafa þetta erfitt samt
		countdown = false,
		showHelp = true,
		plops = [],
		victory = [],
		looser = [],
		per = {
			x: function(x) {
				return Math.round(x/100 * windowWidth);
			},
			y: function(y) {
				return Math.round(y/100 * windowHeight);
			}
		};

// MATTER STYTTINGAR
const Engine			= Matter.Engine,
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
const startXPercent = 20,
			startYPercent = 20,
			cupBouncyness = 0,
			endBallBouncyness = 0,
			endBallRadiusPercent = 3,
			endBallMass = endBallRadiusPercent**3,
			cupWidthPercent = endBallRadiusPercent * 2.55, // þetta er akkurat pirrandi erfitt
			cupHeightPercent = cupWidthPercent * 0.8,
			cupWallWidthPercent = endBallRadiusPercent*0.25,
			stringNodeCount = 20,
			stringNodeWidthPercent = endBallRadiusPercent*0.07;
			stringNodeOffsetPercent = 0;