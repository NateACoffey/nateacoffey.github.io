// Mapping between English letters and Hiragana characters
const hiraganaMap = new Map([
	["a", "あ"],
	["i", "い"],
	["u", "う"],
	["e", "え"],
	["o", "お"],
	["ka", "か"],
	["ki", "き"],
	["ku", "く"],
	["ke", "け"],
	["ko", "こ"],
	["ga", "が"],
	["gi", "ぎ"],
	["gu", "ぐ"],
	["ge", "げ"],
	["go", "ご"],
	["sa", "さ"],
	["shi", "し"],
	["si", "し"],
	["su", "す"],
	["se", "せ"],
	["so", "そ"],
	["za", "ざ"],
	["ji", "じ"],
	["zi", "じ"],
	["zu", "ず"],
	["ze", "ぜ"],
	["zo", "ぞ"],
	["ta", "た"],
	["chi", "ち"],
	["ti", "ち"],
	["tsu", "つ"],
	["tu", "つ"],
	["te", "て"],
	["to", "と"],
	["da", "だ"],
	["di", "ぢ"],
	["dji", "ぢ"],
	["du", "づ"],
	["dzu", "づ"],
	["de", "で"],
	["do", "ど"],
	["na", "な"],
	["ni", "に"],
	["nu", "ぬ"],
	["ne", "ね"],
	["no", "の"],
	["ha", "は"],
	["hi", "ひ"],
	["fu", "ふ"],
	["he", "へ"],
	["ho", "ほ"],
	["ba", "ば"],
	["bi", "び"],
	["bu", "ぶ"],
	["be", "べ"],
	["bo", "ぼ"],
	["pa", "ぱ"],
	["pi", "ぴ"],
	["pu", "ぷ"],
	["pe", "ぺ"],
	["po", "ぽ"],
	["ma", "ま"],
	["mi", "み"],
	["mu", "む"],
	["me", "め"],
	["mo", "も"],
	["ya", "や"],
	["yu", "ゆ"],
	["yo", "よ"],
	["ra", "ら"],
	["ri", "り"],
	["ru", "る"],
	["re", "れ"],
	["ro", "ろ"],
	["wa", "わ"],
	["wo", "を"],
	["nn", "ん"],
	["nq", "んq"],
	["nw", "んw"],
	["nr", "んr"],
	["nt", "んt"],
	["np", "んp"],
	["ns", "んs"],
	["nd", "んd"],
	["nf", "んf"],
	["ng", "んg"],
	["nh", "んh"],
	["nj", "んj"],
	["nk", "んk"],
	["nl", "んl"],
	["nz", "んz"],
	["nx", "んx"],
	["nc", "んc"],
	["nv", "んv"],
	["nb", "んb"],
	["nm", "んm"],
	["kya", "きゃ"],
	["kyu", "きゅ"],
	["kyo", "きょ"],
	["gya", "ぎゃ"],
	["gyu", "ぎゅ"],
	["gyo", "ぎょ"],
	["sha", "しゃ"],
	["shu", "しゅ"],
	["sho", "しょ"],
	["ja", "じゃ"],
	["ju", "じゅ"],
	["jo", "じょ"],
	["cha", "ちゃ"],
	["chu", "ちゅ"],
	["cho", "ちょ"],
	["nya", "にゃ"],
	["nyu", "にゅ"],
	["nyo", "にょ"],
	["hya", "ひゃ"],
	["hyu", "ひゅ"],
	["hyo", "ひょ"],
	["bya", "びゃ"],
	["byu", "びゅ"],
	["byo", "びょ"],
	["pya", "ぴゃ"],
	["pyu", "ぴゅ"],
	["pyo", "ぴょ"],
	["mya", "みゃ"],
	["myu", "みゅ"],
	["myo", "みょ"],
	["rya", "りゃ"],
	["ryu", "りゅ"],
	["ryo", "りょ"],
	["la", "ぁ"],
	["li", "ぃ"],
	["lu", "ぅ"],
	["le", "ぇ"],
	["lo", "ぉ"],
	["xa", "ぁ"],
	["xi", "ぃ"],
	["xu", "ぅ"],
	["xe", "ぇ"],
	["xo", "ぉ"],
	["ltsu", "っ"]
	]);

function convertToHiragana(event){
	const inputText = event.target.value.toLowerCase();
	let hiraganaText = sokuon(inputText);

	//takes the last 4 characters
	let char = inputText.substr(-1);
	let twoChar = inputText.substr(-2);
	let threeChar = inputText.substr(-3);
	let fourChar = inputText.substr(-4);


	let hiraganaChar;

	//checks if the last 4 characters can be converted, starting from largest
	//also removes the last character on the original text to replace
	if (hiraganaMap.has(fourChar)){
		hiraganaText = hiraganaText.slice(0, -4);
		hiraganaChar = hiraganaMap.get(fourChar);

	}else if (hiraganaMap.has(threeChar)){
		hiraganaText = hiraganaText.slice(0, -3);
		hiraganaChar = hiraganaMap.get(threeChar);

	}else if (hiraganaMap.has(twoChar)){
		hiraganaText = hiraganaText.slice(0, -2);
		hiraganaChar = hiraganaMap.get(twoChar);

	}else if (hiraganaMap.has(char)){
		hiraganaText = hiraganaText.slice(0, -1);
		hiraganaChar = hiraganaMap.get(char);

	}else{
		hiraganaChar = '';
	}

	hiraganaText += hiraganaChar;



	event.target.value = hiraganaText;
}


//replaces duplicate letters with the small tsu so the hiragana map isn't absurdly big
function sokuon(str) {
	//ignores duplicate n to allow ん
	if(str.length < 2 || str.slice(-1) === 'n' || !str.slice(-1).match(/[a-z]/)){
		return str;
	}

	let newStr;

	//replaces second to last character if it's a duplicate
	if (str.slice(-1) === str.slice(-2, -1)) {
		newStr = str.slice(0, -2) + 'っ' + str.slice(-1);
	} else {
		return str;
	}


	return newStr;
}


