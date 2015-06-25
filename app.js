// Generate random number 1-100 - store in variable
function randomNumberGenerator (min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}
var answer = randomNumberGenerator(1,100);
// Initialize an array to hold guesses
var guesses = [];
// Initialize variable to count number of guesses
var numGuesses = guesses.length;
// Initialize guess limit
var guessLimit = 10;
// Initialize guess variable
var currentGuess;


// Validate the input is a number and between 1-100
function isNumber(currentGuess) {
	if (typeof currentGuess === 'number') {
		return true;
	} else {
		alert("That entry is not a number. Please enter a number between 1 and 100.")
		return false;
	}
}
// Validate the input is not a repeat
function newGuess(currentGuess) {
	if (currentGuess in guesses) {
		alert("It looks like you already guessed that number.")
		$("#guess").val('');
	} else {
		return true;
	}
}

// Resets game
function reset() {
	alert("Sorry, you are out of guesses");
	answer = randomNumberGenerator(1,100);
	guesses = [];
	$("#guess").val('');
}

// User enters guess in input and clicks submit
$("#submit").click(function () {
	currentGuess = Number($("#guess").val());
	if (isNumber(currentGuess) && newGuess(currentGuess)) {
		// Add guess to the number line
		// Change class of div to 'seleceted'
			// This will show the number on the number line of guesses
		// Test whether this value is correct
		if (currentGuess === answer) {
			// If correct
			$("#feedback").text("yay you win!");
		} else {
			// append to guesses
			guesses.push(currentGuess);
			if (numGuesses >= guessLimit) {
				reset();
			}

		}
			// check if it exceeds limit
			// tell user if they are hot or cold by updating a <p> - tell
			// tell the user if they need to guess higher or lower	
	}
});

// User clicks reset button
$("#reset").click(function (){
	if (confirm("Are you sure you want to reset the game?")) {
		reset();
	}
});
	// require user confirmation of game reset through a prompt
	// clear variables saving game state
	// generate new random number
	// redisplay opening message

// User clicks hint
	// tell user the number is between -5 & +5 of the answer
	// Count it as a guess?