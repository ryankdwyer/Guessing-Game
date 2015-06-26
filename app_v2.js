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
// Change number of guesses div text
$("#guessesLeft").text("You have " + (guessLimit - numGuesses) + " guesses left.")
// focus on input
$("#guess").focus();
// Add 1 - 100 div tags hide all
var $ul = $('<ul id="Container"></ul>');
var $ul2 = $('<ul id="Container"></ul>');
for (var i=1; i < 51; i++) {
	$ul.append($('<li id=' + i + ' class="numString">' + i + '</li>'));
};
for (var i=51; i < 101; i++) {
	$ul2.append($('<li id=' + i + ' class="numString">' + i + '</li>'));
};
$("#input").append($ul);
$("#input").append($ul2);

// Validate the input is not a repeat
function newGuess(inputGuess) {
	if ($.inArray(inputGuess, guesses) === -1) {
		return true;		
	} else {
		alert("It looks like you already guessed that number.")
		$("#guess").val('');	
	}
}

// Resets game
function reset() {
	answer = randomNumberGenerator(1,100);
	guesses = [];
	numGuesses = guesses.length;
	$("#guessesLeft").text("You have " + (guessLimit - numGuesses) + " guesses left.");
	$("#guess").val('');
	$("#guess").focus();
	$("#feedback").text("Guess a number from 1 to 100");
}

// Creates response decisions
function responses() {
	var guess = Number(currentGuess);
	// If guess is greater than 20 numbers away
	if (guess > answer) {
		if ((guess - answer) > 20) {
			$("#guess").val('');
			$("#feedback").text("Guess lower");
		} else if (10 <= (guess - answer) < 20) {
			$("#guess").val('');
			$("#feedback").text("You're getting close! Guess lower.");
		} else {
			$("#feedback").text("You're REALLY close! Guess lower.");
		}
	} else {
		if ((answer - guess) > 20) {
			$("#guess").val('');
			$("#feedback").text("Guess higher");
		} else if (10 <= (answer - guess) < 20) {
			$("#guess").val('');
			$("#feedback").text("You're getting close! Guess higher.");
		} else {
			$("#feedback").text("You're REALLY close! Guess higher.");
		}
	}
	$("#guess").focus();
}

// User enters guess in input and clicks submit
$("#submit").click(function () {
	currentGuess = $("#guess").val();
	// currentGuess = Number($("#guess").val());
	if ($.isNumeric(currentGuess) && newGuess(Number(currentGuess)) && (1 <= Number(currentGuess) <= 100)) {

		if (Number(currentGuess) === answer) {
		// If correct
		$("#feedback").text("yay you win!");
		} else {
			// append to guesses
			guesses.push(Number(currentGuess));
			// update numGuesses
			numGuesses = guesses.length;
			$("#guessesLeft").text("You have " + (guessLimit - numGuesses) + " guesses left.");
			// check if it exceeds limit
			if (numGuesses >= guessLimit) {
				alert("Sorry, you are out of guesses.");
				reset();
			} else {
				responses();
			}
		}
		// Add guess to the number line
		// Change class of div to 'seleceted'
			// This will show the number on the number line of guesses
		// Test whether this value is correct
	} else {
		$("#feedback").text("That is not a number!");
		$("#guess").val('');
	}
});

// User clicks reset button
$("#reset").click(function (){
	// require user confirmation of game reset through a prompt
	if (confirm("Are you sure you want to reset the game?")) {
		reset();
	}
});
	
// User clicks hint
$("#hint").click(function (){
	if (confirm('Are you sure you want a hint? It will cost you a guess!')) {
		if (answer < 10) {
			var lower = 0;
			var higher = answer + 10;
		} else if (answer > 90) {
			var lower = answer - 10;
			var higher = 100;
		} else {
			var lower = answer - 10;
			var higher = answer + 10;
		};
		alert("The answer is between " + lower + " and " + higher + ".");
	}
});

