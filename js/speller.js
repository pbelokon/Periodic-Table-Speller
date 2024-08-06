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

function check(inputWord) {
	// TODO: determine if `inputWord` can be spelled
	// with periodic table symbols; return array with
	// them if so (empty array otherwise)
	if (inputWord.length > 0){ 
		for (let element of elements) { 
			let symbol = element.symbol.toLowerCase();
			if (symbol.length <= inputWord.length) { 
				// did the symbol match the first
				// one or two characters in 'inputWord' 
				if (inputWord.slice(0, symbol.length) == symbol) { 
					// still have characters left in inputWord ? 
					if (inputWord.length > symbol.length) { 
						let res = check(inputWord.slice(symbol.length))
						// match successfully ? 
						if (res.length > 0) { 
							return [symbol, ...res];
						}
					} else { 
						return [symbol]; 
					}
				}
			}
		}
	}

	return [];
}

function lookup(elementSymbol) {
	return symbols[elementSymbol];
}

