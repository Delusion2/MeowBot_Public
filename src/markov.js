/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

// Heavily based on code examples from Daniel Shiffman
// https://github.com/shiffman/A2Z-F16/tree/gh-pages/week7-markov/03_markov_byword

// A MarkovGenerate object
function MarkovGeneratorWord(n = 4, max = 60) {
  this.n = n; // order (length) of each ngram
  this.max = max; // maximum amount to generate
  this.ngrams = {};
  // program's dictionary -- each ngram is the key, list of possible next elements are the values
  this.ngramValues = []; // array of ngrams only
  this.grams = 0;
  this.tokens = 0;

  this.getUniqueWords = function () {
    return this.ngramValues;
  };

  this.getTokens = function () {
    return this.tokens;
  };

  this.getNGrams = function () {
    return this.grams;
  };

  this.getRandomWord = function () {
    return this.ngramValues.choice();
  };

  // A function to feed in text to the markov chain
  this.feed = function (text) {
    const tokens = text.tokenize();
    // console.log("processing " + tokens.length + " tokens");

    // Discard this line if it's too short
    if (tokens.length < this.n) return false;

    // Store the first ngram of this line
    // Now let's go through everything and create the dictionary
    const numOfNgrams = tokens.length - this.n;
    for (let i = 0; i < numOfNgrams; i++) {
      this.tokens += tokens.length;

      // pull out N elements from the array to create new ngram
      const sliced = tokens.slice(i, i + this.n);
      const gram = tokens.slice(i, i + this.n).join(' ');
      this.grams += sliced.length;
      this.tokens += tokens.length;

      // if this ngram doesn't exist yet, create array for it
      if (!this.ngrams[gram]) {
        this.ngrams[gram] = [];
        this.ngramValues.push(gram);
      }

      // what's the word following this ngram?
      const next = tokens[i + this.n];
      // if this word doesn't exist yet, add to the list
      // if you want frequency of word appearance to affect frequency of output, remove "if" section to allow duplicates
      // if (!this.ngrams[gram].includes(next)) {
      this.ngrams[gram].push(next);
      // }
    }
  };

  // Generate a text from the information ngrams
  this.generate = function (search = false, isStrict = false) {
    let { ngramValues } = this; // local variable version that can be manipulated
    let currentNgram = ''; // current term being used
    let output = []; // array of tokens that we'll add to on each run and join at the end
    // let process = "";
    // process = process + "\n Generation Process: \n";
    // process = process + "\n isStrict = " + isStrict;
    // process = process + "\n search = " + search;
    if (search) {
      const searchTokens = isStrict ? search.trim().tokenize() : search.trim().clean().tokenize(); // array of clean search tokens
      // process = process + "\n ssearchTokens = " + searchTokens.toString();
      const searchFirstWord = searchTokens[0];
      // process = process + "\n searchFirstWord = " + searchFirstWord;
      // process = process + "\n searchTokens.length = " + searchTokens.length;
      for (let i = 0; i < searchTokens.length; i++) {
        const isFirstRun = i === 0;
        const isLastRun = i >= searchTokens.length - this.n;

        // pull out N elements from the array to create new ngram
        const searchNgram = searchTokens.slice(i, i + this.n).join(' ');
        // process = process + "\n searchNgram = " + searchNgram;

        // filter where similar
        let searchResults = ngramValues.filter((ngram) => (isStrict ? ngram : ngram.clean()).startsWith(searchNgram));
        // process = process + "\n searchResults = " + searchResults.toString();
        if (!searchResults.length) {
          if (isFirstRun) {
            // check if the first word matches
            searchResults = ngramValues.filter((ngram) => (isStrict ? ngram.split(' ')[0] : ngram.split(' ')[0].clean()).startsWith(searchFirstWord));
            if (!searchResults.length) break;
          } else {
            break;
          }
        }

        // filter further where exact
        let searchResultsExact = searchResults.filter((ngram) => (isStrict ? ngram : ngram.clean()) === searchNgram);
        // process = process + "\n searchResultsExact = " + searchResultsExact.toString();

        if (isFirstRun && !searchResultsExact.length) {
          // process = process + "\n isFirstRun = " + isFirstRun;
          // process = process + "\n !searchResultsExact.length = " + searchResultsExact.length;

          searchResultsExact = searchResults.filter((ngram) => (isStrict ? ngram.split(' ')[0] : ngram.split(' ')[0].clean()) === searchFirstWord);
          // process = process + "\n searchResultsExact = " + searchResultsExact;
        }

        const searchResult = searchResultsExact.choice() || searchResults.choice();
        // process = process + "\n searchResult.choice = " + searchResult;
        if (isFirstRun) {
          // process = process + "\n isFirstRun = " + isFirstRun;
          output.push(searchResult.tokenize()[0]);
          // process = process + "\n output.push = " + searchResult.tokenize()[0];
        }
        output.push(searchResult.tokenize()[1]);
        // process = process + "\n output.push = " + searchResult.tokenize()[1];
        if (isLastRun) {
          // process = process + "\n isLastRun = " + isLastRun;
          break;
        }
      }

      if (output.length) {
        // process = process + "\n output.length = " + output.length;

        // get last 2 words from match list
        currentNgram = output.getNLastWords(this.n);
        // process = process + "\n currentNgram = " + currentNgram.toString();
      } else {
        // no search matched - get a random beginning
        currentNgram = ngramValues.choice();
        // process = process + "\n currentNgram = " + currentNgram.toString();
        output = currentNgram.tokenize();
        // process = process + "\n output = " + output;
      }
    } else {
      // no search - get a random beginning
      currentNgram = ngramValues.choice();
      // process = process + "\n currentNgram = " + currentNgram.toString();

      output = currentNgram.tokenize();
      // process = process + "\n output = " + output;
    }

    const numOfRemainingWords = this.max - output.length;
    // process = process + "\n numOfRemainingWords = " + numOfRemainingWords;

    for (let i = 0; i < numOfRemainingWords; i++) {
      const currentNgramClean = currentNgram.clean();
      // process = process + "\n currentNgramClean = " + currentNgramClean.toString();

      // get an ngram where clean ngram === clean current or search for similar
      const currentResults = ngramValues.filter((ngram) => ngram.clean().startsWith(currentNgramClean));
      // process = process + "\n currentResults = " + currentResults.toString();
      let currentResultsExact = [];
      if (currentResults.length) {
        // process = process + "\n currentResults.length = " + currentResults.length;
        currentResultsExact = currentResults.filter((ngram) => ngram.clean() === currentNgramClean);
        // process = process + "\n currentResultsExact = " + currentResultsExact.toString();
      }

      // update next ngram
      const nextNgram = currentResultsExact.choice() || currentResults.choice();
      // if (nextNgram) process = process + "\n nextNgram = " + nextNgram.toString();

      // get possible next token, if they don't exist break the for loop
      const possibleNextTokens = this.ngrams[nextNgram];
      // if (possibleNextTokens) process = process + "\n possibleNextTokens = " + possibleNextTokens.toString();
      if (!possibleNextTokens) break;

      // filter this ngram so it's not used again (prevents repeats)
      ngramValues = ngramValues.filter((ngram) => ngram !== nextNgram);

      // Pick one of the possible next tokens randomly and add to output
      output.push(possibleNextTokens.choice());
      // process = process + "\n nextTokens = " + possibleNextTokens.choice().toString();

      // Get the last N entries of the output; this is our new ngram that we'll use in the next iteration of the loop
      currentNgram = output.getNLastWords(this.n);
      // process = process + "\n currentNgram = " + currentNgram.toString();
    }
    // process = process + "\n\nDONE!\noutput: " + output.join(' ');
    // console.log(process);
    // here's what we got!
    return output.join(' ');
  };
}

module.exports = {
  MarkovGeneratorWord,
};
