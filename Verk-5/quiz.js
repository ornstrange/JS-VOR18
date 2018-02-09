// elements
var rightEl = document.getElementById("score-right");
var wrongEl = document.getElementById("score-wrong");
var qEl = document.getElementById("question");
var ansEl = document.getElementById("ans");
var ansList;

// object definitons
function Question(q, corr = "", ans = []) {
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

	this.qs = [
		new Question("Hitler was born in?", "Austria", ["Austria", "Germany"]),
		new Question("What is the currency of Japan?", "Yen", ["Pounds", "Japanese dollars", "Riki", "Yen"]),
		new Question("FINISHED")
	];

	this.setupQ = function() {
		// fokking mögnuð strengja vinnsla! mjög mikilvægt
		if (this.qs[this.qindex].quest === "FINISHED") {
			let wq = " question";
			let rq = " question";
			let baseStr = "You finished the Quiz!\nyou got ";

			if (this.wrong != 0) {
				if (this.wrong > 1) {
					wq += "s";
				}

				baseStr += this.wrong + wq + " wrong"

				if (this.right == 0) {
					baseStr += "!"
				} else {
					baseStr += "\n"
				}
			}

			if (this.right > 0 && this.wrong > 0) {
				baseStr += " and "
			}

			if (this.right != 0) {
				if (this.right > 1) {
					rq += "s";
				}

				baseStr += this.right + rq + " right!"
			}

			qEl.innerText = baseStr;
		} else {
			qEl.innerText = this.qs[this.qindex].quest;
		}

		ansEl.innerHTML = "";

		for (let i = 0; i < this.qs[this.qindex].ans.length; i++) {
			ansEl.innerHTML += "<div class=\"ans\">" + this.qs[this.qindex].ans[i] + "</div>";
		}
		this.clickEvents();
	};

	this.nextQ = function() {
		if (this.qindex + 1 < this.qs.length) {
			this.qindex += 1;
			this.setupQ();
		}
	};

	this.checkAnswer = function(s) {
		if (this.qindex + 1 < this.qs.length) {

			if (this.qs[this.qindex].checkAnswer(s)) {
				this.right++;
			} else {
				this.wrong++;
			}
		}

		this.nextQ();
		this.showScore();
	};

	this.showScore = function() {
		rightEl.innerHTML = this.right;
		wrongEl.innerHTML = this.wrong;
	};

	this.start = function() {
		this.setupQ();
		this.showScore();
	};

	this.clickEvents = function() {
		ansList = document.querySelectorAll(".ans");
		for (let i = 0; i < ansList.length; i++) {
			ansList[i].addEventListener("click", () => {game.checkAnswer(ansList[i].innerText);}, false);
		}
	};
}

// game object
var game = new Game();

// start
game.start();

