let tense;
let ending;

const listOfTenses = [
	"present polite",
	"present negative plain",
	"present negative polite",
	"past plain",
	"past polite",
	"past negative plain",
	"past negative polite",
	"conditional",
	"conditional negative",
	"te form",
	"volitional plain",
	"volitional polite",
	"potential plain",
	"potential polite",
	"potential negative plain",
	"potential negative polite",
	"causative plain",
	"causative polite",
	"causative negative plain",
	"causative negative polite"
];

const listOfEndings = [
	"う",
	"く",
	"ぐ",
	"す",
	"つ",
	"ぬ",
	"ぶ",
	"む",
	"る",
	"える",
	"いる"
];

window.addEventListener("load", generateRandomWords);

function generateRandomWords(){
	const inputField = document.getElementById('input-box');
	inputField.value = '';


	tense = listOfTenses[Math.floor(Math.random() * listOfTenses.length)];
	ending = listOfEndings[Math.floor(Math.random() * listOfEndings.length)];

	const randomConjugation = document.getElementById('randomConjugation');


	randomConjugation.textContent = "Conjugate " + ending + " to " + tense;


}

//export the randoms so answerKey.js can use them for comparison
export {tense, ending};
