var qindex = 0;
var right = 0;
var wrong = 0;

var rightEl = document.getElementById("score-right");
var wrongEl = document.getElementById("score-wrong");
var qEl = document.getElementById("question");
var ansEl = document.getElementById("ans");
var ansList;

// object definitons
function Question(q, corr, ans) {
	this.quest = q;
	this.corr = corr;
	this.ans = ans;

	this.checkAnswer = function(s) {
		if (s == corr) {
			return true;
		}
		return false;
	};
}

function Game() {
	this.qindex = 0;
	this.right = 0;
	this.wrong = 0;

	this.setupQ = function() {
		rightEl.innerHTML = right;
		wrongEl.innerHTML = wrong;
		qEl.innerHTML = qs[this.qindex].quest;
		ansEl.innerHTML = "";

		for (var i = 0; i < qs[this.qindex].ans.length; i++) {
			ansEl.innerHTML += "<div class=\"ans\">" + qs[this.qindex].ans[i] + "</div>";
		}

		ansList = document.querySelectorAll(".ans");
	}

	this.nextQ = function() {
		if (this.qindex + 1 < qs.length) {
			this.qindex += 1;
			this.setupQ();
		}
	}
}

// objects
var qs = [
	new Question("Hitler was born in?", "Austria", ["Austria", "Germany"]),
	new Question("What is the currency of Japan?", "Yen", ["Pounds", "Japanese dollars", "Riki", "Yen"])
];
var game = new Game();

// start
game.setupQ();