var qindex = 0;
var right = 0;
var wrong = 0;
var qs = [
	"Hitler was born in?",
	"What is the currency of Japan?"
];
var ans = [
	["Austria", "Germany", "Austria"],
	["Yen", "Pounds", "Japanese dollars", "Riki", "Yen"]
];

var rightEl = document.getElementById("score-right");
var wrongEl = document.getElementById("score-wrong");
var qEl = document.getElementById("question");
var ansEl = document.getElementById("ans");

function setupQ() {
	rightEl.innerHTML = right;
	wrongEl.innerHTML = wrong;
	qEl.innerHTML = qs[qindex];
	ansEl.innerHTML = "";

	for (var i = 1; i < ans[qindex].length; i++) {
		ansEl.innerHTML += "<div class=\"ans\">" + ans[qindex][i] + "</div>";
	}
}

setupQ();

var ansList = document.querySelectorAll(".ans");

ansList[0].onclick = checkAns(ansList[0].innerHTML);
ansList[1].onclick = checkAns(ansList[1].innerHTML);

function checkAns(t) {
	if (t == ans[qindex][0]) {
		right++;
	} else {
		wrong++;
	}
	qindex++;
	setupQ();
}