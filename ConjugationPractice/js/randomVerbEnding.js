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



function generateRandomWords(){
	const inputField = document.getElementById('input-box');
	inputField.value = '';


	const tense = listOfTenses[Math.floor(Math.random() * listOfTenses.length)];
	const ending = listOfEndings[Math.floor(Math.random() * listOfEndings.length)];

	const randomConjugation = document.getElementById('randomConjugation');


	randomConjugation.textContent = "Conjugate " + ending + " to " + tense;
}

