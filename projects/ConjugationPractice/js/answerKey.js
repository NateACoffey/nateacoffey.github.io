// Import the random tense and ending from randomVerbEnding.js
import {tense, ending} from './randomVerbEnding.js';

import { generateRandomWords } from './randomVerbEnding.js';



const answer = new Map([
	["present polite", new Map([
		["う", "います"],
		["く", "きます"],
		["ぐ", "ぎます"],
		["す", "します"],
		["つ", "ちます"],
		["ぬ", "にます"],
		["ぶ", "びます"],
		["む", "みます"],
		["る", "ります"],
		["える", "えます"],
		["いる", "います"],
	])],
	["present negative plain", new Map([
		["う", "わない"],
		["く", "かない"],
		["ぐ", "がない"],
		["す", "さない"],
		["つ", "たない"],
		["ぬ", "なない"],
		["ぶ", "ばない"],
		["む", "まない"],
		["る", "らない"],
		["える", "えない"],
		["いる", "いない"],
	])],
	["present negative polite", new Map([
		["う", "いません"],
		["く", "きません"],
		["ぐ", "ぎません"],
		["す", "しません"],
		["つ", "ちません"],
		["ぬ", "にません"],
		["ぶ", "びません"],
		["む", "みません"],
		["る", "りません"],
		["える", "えません"],
		["いる", "いません"],
	])],
	["past plain", new Map([
		["う", "った"],
		["く", "いた"],
		["ぐ", "いだ"],
		["す", "した"],
		["つ", "った"],
		["ぬ", "んだ"],
		["ぶ", "んだ"],
		["む", "んだ"],
		["る", "った"],
		["える", "えた"],
		["いる", "いた"],
	])],
	["past polite", new Map([
		["う", "いました"],
		["く", "きました"],
		["ぐ", "ぎました"],
		["す", "しました"],
		["つ", "ちました"],
		["ぬ", "にました"],
		["ぶ", "びました"],
		["む", "みました"],
		["る", "りました"],
		["える", "えました"],
		["いる", "いました"],
	])],
	["past negative plain", new Map([
		["う", "わなかった"],
		["く", "かなかった"],
		["ぐ", "がなかった"],
		["す", "さなかった"],
		["つ", "たなかった"],
		["ぬ", "ななかった"],
		["ぶ", "ばなかった"],
		["む", "まなかった"],
		["る", "らなかった"],
		["える", "えなかった"],
		["いる", "いなかった"],
	])],
	["past negative polite", new Map([
		["う", "いませんでした"],
		["く", "きませんでした"],
		["ぐ", "ぎませんでした"],
		["す", "しませんでした"],
		["つ", "ちませんでした"],
		["ぬ", "にませんでした"],
		["ぶ", "びませんでした"],
		["む", "みませんでした"],
		["る", "りませんでした"],
		["える", "えませんでした"],
		["いる", "いませんでした"],
	])],
	["conditional", new Map([
		["う", "えば"],
		["く", "けば"],
		["ぐ", "げば"],
		["す", "せば"],
		["つ", "てば"],
		["ぬ", "ねば"],
		["ぶ", "べば"],
		["む", "めば"],
		["る", "れば"],
		["える", "えれば"],
		["いる", "いれば"],
	])],
	["conditional negative", new Map([
		["う", "わなければ"],
		["く", "かなければ"],
		["ぐ", "がなければ"],
		["す", "さなければ"],
		["つ", "たなければ"],
		["ぬ", "ななければ"],
		["ぶ", "ばなければ"],
		["む", "まなければ"],
		["る", "らなければ"],
		["える", "えらなければ"],
		["いる", "いらなければ"],
	])],
	["te form", new Map([
		["う", "って"],
		["く", "いて"],
		["ぐ", "いで"],
		["す", "して"],
		["つ", "って"],
		["ぬ", "んで"],
		["ぶ", "んで"],
		["む", "んで"],
		["る", "って"],
		["える", "えて"],
		["いる", "いて"],
	])],
	["volitional plain", new Map([
		["う", "おう"],
		["く", "こう"],
		["ぐ", "ごう"],
		["す", "そう"],
		["つ", "とう"],
		["ぬ", "のう"],
		["ぶ", "ぼう"],
		["む", "もう"],
		["る", "ろう"],
		["える", "えよう"],
		["いる", "いよう"],
	])],
	["volitional polite", new Map([
		["う", "いましょう"],
		["く", "きましょう"],
		["ぐ", "ぎましょう"],
		["す", "しましょう"],
		["つ", "ちましょう"],
		["ぬ", "にましょう"],
		["ぶ", "びましょう"],
		["む", "みましょう"],
		["る", "りましょう"],
		["える", "えましょう"],
		["いる", "いましょう"],
	])],
	["potential plain", new Map([
		["う", "える"],
		["く", "ける"],
		["ぐ", "げる"],
		["す", "せる"],
		["つ", "てる"],
		["ぬ", "ねる"],
		["ぶ", "べる"],
		["む", "める"],
		["る", "れる"],
		["える", "えられる"],
		["いる", "いられる"],
	])],
	["potential polite", new Map([
		["う", "えます"],
		["く", "けます"],
		["ぐ", "げます"],
		["す", "せます"],
		["つ", "てます"],
		["ぬ", "ねます"],
		["ぶ", "べます"],
		["む", "めます"],
		["る", "れます"],
		["える", "えられます"],
		["いる", "いられます"],
	])],
	["potential negative plain", new Map([
		["う", "えない"],
		["く", "けない"],
		["ぐ", "げない"],
		["す", "せない"],
		["つ", "てない"],
		["ぬ", "ねない"],
		["ぶ", "べない"],
		["む", "めない"],
		["る", "れない"],
		["える", "えられない"],
		["いる", "いられない"],
	])],
	["potential negative polite", new Map([
		["う", "えません"],
		["く", "けません"],
		["ぐ", "げません"],
		["す", "せません"],
		["つ", "てません"],
		["ぬ", "ねません"],
		["ぶ", "べません"],
		["む", "めません"],
		["る", "れません"],
		["える", "えられません"],
		["いる", "いられません"],
	])],
	["causative plain", new Map([
		["う", "わせる"],
		["く", "かせる"],
		["ぐ", "がせる"],
		["す", "させる"],
		["つ", "たせる"],
		["ぬ", "なせる"],
		["ぶ", "ばせる"],
		["む", "ませる"],
		["る", "らせる"],
		["える", "えさせる"],
		["いる", "いさせる"],
	])],
	["causative polite", new Map([
		["う", "わせます"],
		["く", "かせます"],
		["ぐ", "がせます"],
		["す", "させます"],
		["つ", "たせます"],
		["ぬ", "なせます"],
		["ぶ", "ばせます"],
		["む", "ませます"],
		["る", "らせます"],
		["える", "えさせます"],
		["いる", "いさせます"],
	])],
	["causative negative plain", new Map([
		["う", "わせない"],
		["く", "かせない"],
		["ぐ", "がせない"],
		["す", "させない"],
		["つ", "たせない"],
		["ぬ", "なせない"],
		["ぶ", "ばせない"],
		["む", "ませない"],
		["る", "らせない"],
		["える", "えさせない"],
		["いる", "いさせない"],
	])],
	["causative negative polite", new Map([
		["う", "わせません"],
		["く", "かせません"],
		["ぐ", "がせません"],
		["す", "させません"],
		["つ", "たせません"],
		["ぬ", "なせません"],
		["ぶ", "ばせません"],
		["む", "ませません"],
		["る", "らせません"],
		["える", "えさせません"],
		["いる", "いさせません"],
	])],

]);


let guesses = 3;

const inputBox = document.getElementById('input-box');
const feedbackMessage = document.getElementById('feedback-message');

let userInput;
let correctAnswer;
let hasAnswered = false;


function waitForEnter() {
	function handleKeyPress(event) {
		if (event.key === "Enter") {
			document.removeEventListener('keyup', handleKeyPress);
			generateRandomWords();
			hasAnswered = false;
		}
	}
	
	document.addEventListener('keyup', handleKeyPress);
	
}

function answerIsCorrect(){
	feedbackMessage.textContent = `${userInput} is correct!`;
	feedbackMessage.style.fontSize = "25px";
	
	guesses = 3;
	hasAnswered = true;
	
	setTimeout(function(){
		waitForEnter();
	}, 100);
}

function answerIsIncorrect(){
	--guesses;
	
	if(guesses <= 0) {
		feedbackMessage.textContent = `Incorrect, the correct answer is ${correctAnswer}.`;
		feedbackMessage.style.fontSize = "25px";

		guesses = 3;
		
		hasAnswered = true;
		setTimeout(function(){
			waitForEnter();
		}, 100);
		
	} else {
		feedbackMessage.textContent = `${userInput} is incorrect. Remaining guesses: ${guesses}`;
	}
}


inputBox.addEventListener('keyup', function(event) {
	if(hasAnswered) return;
	
	userInput = inputBox.value.trim();

	if (event.key === "Enter" & userInput != '') {
		
		correctAnswer = answer.get(tense).get(ending);
		
		inputBox.value = '';
		feedbackMessage.style.display = "block";
		
		if (userInput === correctAnswer) {
			answerIsCorrect();
		} else {
			answerIsIncorrect();
		}	
	}
});

