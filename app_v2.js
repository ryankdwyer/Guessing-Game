$(document).ready(function () {
    // Generate random number 1-100 - store in variable
    function randomNumberGenerator(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var answer = randomNumberGenerator(1, 100);
    // Initialize an array to hold guesses
    var guesses = [];
    // Initialize variable to count number of guesses
    var numGuesses = guesses.length;
    // Initialize guess limit
    var guessLimit = 10;
    // Initialize guess variable
    var currentGuess;
    // Change number of guesses div text
    function guessesLeft() {
        $("#guessesLeft").text("You have " + (guessLimit - numGuesses) + " guesses left.");
    }
    guessesLeft();
    // focus on input
    $("#guess").focus();
    // Add 1 - 100 div hidden tags
    // Adds the div tags in two rows of 50
    var $ul = $('<ul id="Container"></ul>');
    var $ul2 = $('<ul id="Container"></ul>');

    for (var i = 1; i < 51; i++) {
        $ul.append($('<li id=' + i + ' class="numString">' + i + '</li>').css("visibility", "hidden"));
    }
    $("#input").append($ul);

    for (i = 51; i < 101; i++) {
        $ul2.append($('<li id=' + i + ' class="numString">' + i + '</li>').css("visibility", "hidden"));
    }
    $("#input").append($ul2);

    // Validate the input is not a repeat
    function newGuess(inputGuess) {
        if ($.inArray(inputGuess, guesses) === -1) {
            return true;
        } else {
            alert("It looks like you already guessed that number. \n Please guess again.");
            $("#guess").val('');
        }
    }

    // Resets game
    function reset() {
        answer = randomNumberGenerator(1, 100);
        guesses = [];
        numGuesses = guesses.length;
        guessesLeft();
        $("#guess").val('');
        $("#guess").focus();
        $("#feedback").text("Guess a number from 1 to 100");
        for (var i = 1; i < 101; i++) {
            $("#" + i).css("visibility", "hidden");
        }
    }

    // Creates response decisions based on currentGuess value
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
        currentGuess = +$("#guess").val();
        // currentGuess = Number($("#guess").val());
        if ($.isNumeric(currentGuess) && newGuess(currentGuess) && (1 <= currentGuess <= 100)) {

            if (currentGuess === answer) {
                // If correct
                $("#feedback").text("yay you win!");
                // Animate li of the answer
                $("#" + currentGuess).css("visibility", "visible").fadeOut(300).fadeIn(300);
            } else {
                // append to guesses
                guesses.push(currentGuess);
                // update numGuesses
                numGuesses = guesses.length;
                guessesLeft();
                $("#" + currentGuess).css("visibility", "visible");
                // check if it exceeds limit
                if (numGuesses >= guessLimit) {
                    alert("Sorry, you are out of guesses.");
                    reset();
                } else {
                    responses();
                }
            }
            // Test whether this value is correct
        } else {
            if (!$.isNumeric(currentGuess)) {
                $("#feedback").text("That is not a number!");
                $("#guess").val('');
            }
        }
    });

    // User clicks reset button
    $("#reset").click(function () {
        // require user confirmation of game reset through a prompt
        if (confirm("Are you sure you want to reset the game?")) {
            reset();
        }
    });

    // User clicks hint
    // Randomly creates the upper and lower bound of the hint to stop from giving away the answer
    // Requires a confirmation from the user
    // Costs 1 guess by appending 'hint' to guesses
    $("#hint").click(function () {
        var higher = randomNumberGenerator(1, 10);
        var lower = randomNumberGenerator(1, 10);
        if (confirm('Are you sure you want a hint? It will cost you a guess!')) {
            if (answer < 10) {
                lower = 0;
                higher = answer + higher;
            } else if (answer > 90) {
                lower = answer - lower;
                higher = 100;
            } else {
                lower = answer - lower;
                higher = answer + higher;
            }
            alert("The answer is between " + lower + " and " + higher + ".");
        }
        guesses.push('hint');
        numGuesses = guesses.length;
        guessesLeft();
    });

});