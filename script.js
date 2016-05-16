// Initialise variable for keeping track of the recognition engine
var recognition = null;
var level = 1;
var nmbrOfWrongAnswers = 0;
var nmbrOfTries = 0;
var ratio;

var sentences = [
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood",
    "I wish to wash my Irish wristwatch",
    "He threw three free throws",
    "Nine nice night nurses nursing nicely",
    "I saw Susie sitting in a shoe shine shop",
    "I scream, you scream, we all scream for ice cream",
    "She sells sea-shells on the sea-shore, the shells she sells are sea-shells, I'm sure",
    "Picky people pick Peter Pan Peanut-Butter, it's the peanut-butter picky people pick",
    "If two witches would watch two watches, which witch would watch which watch?",
    "The 33 thieves thought that they thrilled the throne throughout Thursday"
]

// A simple system for responding to speech.
// Keys are the trigger phrases, and the values are functions to execute for a phrase
var commands = {
    'how much wood would a woodchuck chuck if a woodchuck could chuck wood': level1,
    'i wish to wash my irish wristwatch': level2,
    'he threw three free throws': level3,
    'nine nice night nurses nursing nicely': level4,
    'i saw susie sitting in a shoe shine shop': level5,
    'i scream you scream we all scream for ice cream': level6,
    'she sells seashells on the seashore the shells she sells are seashells i\'m sure': level7,
    'picky people pick peter pan peanut butter it\'s the peanut butter picky people pick': level8,
    'if two witches would watch two watches which witch would watch which watch': level9,
    'the 33 thieves thought that they thrilled the throne throughout thursday': level10,
    'the thirty-three thieves thought that they thrilled the throne throughout thursday': level10,
    'the thirty three thieves thought that they thrilled the throne throughout thursday': level10,
    'hello': level10,

    'dance time': onRandom
};

// Initialise event handlers when document is ready
$(document).ready(function() {

    $(".sentence").text(sentences[level - 1]);
    $("#level").text("Level " + level + "/10");

    // Initialise speech recogniser
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Wire up events fired from the recogniser
    $(recognition).on('start', onStart);
    $(recognition).on('end', onEnd);
    $(recognition).on('result', onResult);

    // Wire up event when user clicks listen button
    $('#startListeningButton').on('click', onClick);

});

/*
// Handle the click event
$('#startListeningButton').on('click', function(e) {
$(document).ready(function(e) {

    lastClick = performance.now();
    // Calculate the difference, and round the number off
    var elapsedTime = Math.round(performance.now() - lastClick);

    // Print it out for our own testing:
    console.log("Elapsed time: " + elapsedTime);

    // Send to GA
    ga('send', {
        hitType: 'timing',
        timingCategory: 'Listen Button',
        timingVar: 'Clicked',
        timingValue: elapsedTime
    });

    // Keep track of the current time
});

})
*/

// User has clicked the "Listen" button
function onClick() {
    // Start recogniser
    recognition.start();
    console.log(level);
    nmbrOfTries = nmbrOfTries + 1;

    console.log("nmbrOfTries: " + nmbrOfTries);
    console.log("nmbrOfWrongAnswers: " + nmbrOfWrongAnswers);
}

// Recogniser has started listening for speech
function onStart() {
    console.log('Started listening');

    $('#hidden').fadeIn(); // Show status
}

// Recogniser tells us that speech has stopped
function onEnd() {
    console.log('Stopped listening');

    $('#hidden').fadeOut(); // Hide status

}

// When we have a match from the voice-recognition engine
function onResult(e) {
    // Get the results
    var results = e.originalEvent.results;

    // Loop through all the results
    for (var i = 0; i < results.length; i++) {
        var result = results[i];

        // If isFinal is true, this particular result is good enough to use
        if (result.isFinal) {
            // Get the transcript of the text
            var text = result[0].transcript;
            text = text.toLowerCase();

            ratio = nmbrOfWrongAnswers / nmbrOfTries;
            ratio = Math.round((1 - ratio) * 100);

            ga('send', {
                    hitType: 'event',
                    eventCategory: 'Done listening',
                    eventAction: 'Level: ' + level + ', TotalTries: ' + nmbrOfTries + ', WrongAnsw: ' + nmbrOfWrongAnswers + ", Ratio: " + ratio + "%",
                    eventLabel: text,
                });

            // Look up the same text in our little 'commands' dictionary
            if (commands[text]) {

                // Found it! Add the text to the transcription panel in green
                $('section').prepend('<div class="green">' + text + '</div>');
                // ...and execute corresponding function
                commands[text].call();
            } else {

                nmbrOfWrongAnswers = nmbrOfWrongAnswers + 1;
                // Text is unknown, add it to the transcription panel in red
                $('section').prepend('<div class="red">' + text + '</div>');
            }
        }
    }
}

// Triggered when person says "lights on"
function level1() {
    //Woodchuck
    if (level == 1) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level2() {
    //Irish wristwatch
    if (level == 2) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level3() {
    //Three free throws
    if (level == 3) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level4() {
    //33 theives
    if (level == 4) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level5() {
    if (level == 5) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level6() {
    if (level == 6) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level7() {
    if (level == 7) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level8() {
    if (level == 8) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level9() {
    if (level == 9) {
        level = level + 1;
        $(".sentence").text(sentences[level - 1]);
        $("#level").text("Level " + level + "/10");
    }
}

function level10() {
    if (level == 10) {
        $("#level").text("You won!");
        $("#level").css('color', '#0ACC31');
        $(".bold").text("Here are your results:");
        $(".sentence").text("Total number of tries: " + nmbrOfTries);
        $(".sentence").append("<br>Number of wrong answers: " + nmbrOfWrongAnswers);
        $(".sentence").append("<br>Ratio: " + ratio + "% correct");
        $("#startListeningButton").hide();
        //congratulations();
    }
}

function congratulations() {
    //$(".sentence").text(sentences[level-1]);
    $('body').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/1Bix44C1EzY?autoplay=1" frameborder="0" allowfullscreen></iframe>');
}

// Triggered when the person says "dance time"
function onRandom() {
    // Start a video  with the Nyancat by adding the appropriate tag to the page
    $('body').append('<iframe width="420" height="315" src="//www.youtube.com/embed/QH2-TGUlwu4?autoplay=1" frameborder="0" allowfullscreen></iframe>');
}
