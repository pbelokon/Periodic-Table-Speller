export default {
	check,
	lookup,
};

var elements;
let symbols = {}; 

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();
	// Indexing / "hashing "
	for (let element of elements) { 
		symbols[element.symbol.toLowerCase()] = element; 
	}
}

function findCandidates(inputWord) { 
	var oneLetterSymbols = []; 
	var twoLetterSymbols = []; 

	for(let i = 0; i < inputWord.length; i++) { 
		// collect all one-letter candidates 
		if (inputWord[i] in symbols && !oneLetterSymbols.includes(inputWord[i])) { 
			oneLetterSymbols.push(inputWord[i]);
		}

		// collet all two-letter  candidates 
		if(i <= (inputWord.length - 2)) { 
			let two = inputWord.slice(i, i+2); 
			if(two in symbols && !twoLetterSymbols.includes(two)){ 
				twoLetterSymbols.push(two); 
			}
		}		
	} 

	return [...twoLetterSymbols, ...oneLetterSymbols]; 
}

function spellWord(candidates, charsLeft) { 

	if(charsLeft.length == 0) { 
		return [ ]; 
	} else { 
		// check for two letter symbols first 
		if (charsLeft.length >= 2) { 
			let two = charsLeft.slice(0, 2); 
			let rest = charsLeft.slice(2); 

			// found a match
			if (candidates.includes(two)) {
				// more characters too mach ?  
				if (rest.length > 0)  { 
					let result = spellWord(candidates, rest); 

					if (result.join("") == rest) { 
						return [two, ...result]; 
					}
				} 
				else { 
					return [two]; 
				}
			}
		}

		// check for one letter symbols 
		if (charsLeft.length >= 1) { 
			let one = charsLeft[0] ;
			let rest = charsLeft.slice(1); 


			if (candidates.includes(one)) { 
				if (rest.length > 0) { 
					let result = spellWord(candidates, rest); 

					if (result.join("") == rest) { 
						return [one, ...result];
					}
				} 
				else { 
					return [ one ];  
				}
			}
		}
	}

	return []; 
}

function check(inputWord) {
	var candidates = findCandidates(inputWord); 
	return spellWord(candidates, inputWord); 
}

function lookup(elementSymbol) {
	return symbols[elementSymbol];
}

