$(document).ready(function() {
    console.log("ready!");


    window.onload = function() {
        $("#trivia").html("<button type='button' id='start'>Start</button>");
    }

//setting variables
    var i = 0;
    var guess = {
        pickQuestion: [{
                question: "How do you know when a Chef is angry?",
                a1: "When he whips the cream and beats the eggs.",
                a2: "When he stomps his feet and screams out loud.",
                a3: "When he breaks dishes.",
                a4: "When he burns the toast.",
                answer: "When he whips the cream and beats the eggs.",
            },
            {
                question: "What has hands but can not clap?",
                a1: "Gloves",
                a2: "A ship",
                a3: "T-Rex",
                a4: "A clock",
                answer: "A clock",
            },
            {
                question: "You walk into a room with a match, a karosene lamp, a candle, and a fireplace. Which do you light first?",
                a1: "A match",
                a2: "A karosene lamp",
                a3: "A candle",
                a4: "A fireplace",
                answer: "A match",
            },
            {
                question: "How many months have 28 days?",
                a1: "1",
                a2: "3",
                a3: "8",
                a4: "12",
                answer: "12",
            },
            {
                question: "If there are 3 apples and you take away 2, how many do you have?",
                a1: "1",
                a2: "2",
                a3: "3",
                a4: "none",
                answer: "2",
            },
        ],
    };


    var clockRunning = false;
    var number = 30;
    var countDown;
    var wins = 0;
    var loses = 0;
    var images = ["assets/images/chef.gif", "assets/images/clock.gif", "assets/images/match.gif", "assets/images/month.gif", "assets/images/apple.gif"];

//Helps to show the count down.
    function decrement() {
        number--;
        $("#time").html("<h2>Time Remaining: " + number + "</h2>");
        if (number === 0) {
            $("h2").remove();
            stop();

            $("#trivia").html("<p class='question'>Wrong!</p>");
            $("#trivia").append("<p class='question'>Correct answer is</p>");
            $("#trivia").append("<p class='question'>" + guess.pickQuestion[i].answer + "</p>");
            $("#trivia").append("<img src='assets/images/wrong.gif'>");
            i++;
            setTimeout(next, 5000);

        }
    }

//To start the count down
    function run() {
        if (!clockRunning) {
            countDown = setInterval(decrement, 1000);
            clockRunning = true;
        }
    }

//To reset the variables
    function reset() {
        clockRunning = false;
        number = 30;
        i = 0;
        wins = 0;
        loses = 0;
        next();
    }

//To reset the clock
    function stop() {
        clearInterval(countDown);
        clockRunning = false;
        number = 30;
    }

//To ask the questions and gives choices
    function initial() {
        run();
        if (i === 5) {
            $("h2").remove();
            stop();
            $("#trivia").html("<p class='question'>game over</p>");
            $("#trivia").append("<p class='question'>Wins: " + wins + "</p>");
            $("#trivia").append("<p class='question'>Loses: " + loses + "</p>");
            setTimeout(reset, 5000);

        } else {
            $("#time").html("<h2>Time Remaining: 30</h2>");
            $("#trivia").html("<p class='question'>" + guess.pickQuestion[i].question + "</p>");
            $("#trivia").append("<p class='choice'>" + guess.pickQuestion[i].a1 + "</p><br>");
            $("#trivia").append("<p class='choice'>" + guess.pickQuestion[i].a2 + "</p><br>");
            $("#trivia").append("<p class='choice'>" + guess.pickQuestion[i].a3 + "</p><br>");
            $("#trivia").append("<p class='choice'>" + guess.pickQuestion[i].a4 + "</p><br>");
        }

    }

//Determines if the anwer is right or wrong
    function next() {
        initial();
        $(".choice").on("click", function() {
            var picked = ($(this).text());
            console.log(picked);

            if (picked === guess.pickQuestion[i].answer) {
                $("h2").remove();
                stop();

                $("#trivia").html("<p class='question'>Correct!</p>");
                $("#trivia").append("<img src='" + images[i] + "'>");
                i++;
                wins++;
                setTimeout(next, 5000);

            } else if (picked !== guess.pickQuestion[i].answer) {
                $("h2").remove();
                stop();

                $("#trivia").html("<p class='question'>Wrong!</p>");
                $("#trivia").append("<p class='question'>Correct answer is</p>");
                $("#trivia").append("<p class='question'>" + guess.pickQuestion[i].answer + "</p>");
                $("#trivia").append("<img src='assets/images/wrong.gif'>");
                i++;
                loses++;
                setTimeout(next, 5000);
            }

        });
    }

//Click on start to begin the game
    $("#trivia").on("click", "#start", function() {

        initial();
        next();
    });
});