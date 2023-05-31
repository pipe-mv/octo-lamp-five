/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia?",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "The Australian continent is perched on the planet's fastest moving tectonic plate - how fast is it moving each year?",
      o: ["10 Meters", " 87 Centimeters", "2 Meters", "7 Centimeters"],
      a: 3,
    },
    {
      q: "What native wild fruit is illegal to forege in Australia?",
      o: ["Bunya nuts", "Quandong", "Finger lime", "Kakadu plum"],
      a: 1,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  //Reset button
  const btnRST = document.querySelector("#btnReset");
  btnRST.addEventListener("click", function () {
    window.location.reload();
  });

  //submit button
  const btnSubmit = document.querySelector("#btnSubmit");
  btnSubmit.addEventListener("click", function (e) {
    const score = calculateScore();

    document.querySelector("#correct").textContent = score;
    document.querySelector("#incorrect").textContent = quizArray.length - score;
  });

  // Calculate the score
  const calculateScore = () => {
    let score = 0;

    quizArray.forEach((question, indexQuestion) => {
      question.o.forEach((option, indexOption) => {
        const liElement = document.querySelector(
          `#li_${indexQuestion}_${indexOption}`
        );
        const radioElement = document.querySelector(
          `#radio_${indexQuestion}_${indexOption}`
        );
        question.a === indexOption && (liElement.style.background = "green");
        radioElement.checked &&
          question.a !== indexOption &&
          (liElement.style.background = "red");
        if (radioElement.checked && question.a === indexOption) {
          score++;
        }
      });
    });
    return score;
  };

  //Finish quiz when time is over
  const finishQuiz = () => {
    const score = calculateScore();

    document.querySelector("#correct").textContent = score;
    document.querySelector("#incorrect").textContent = quizArray.length - score;
  };

  //Timer
  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    const endInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
        clearInterval(endInterval);
        finishQuiz();
      }
    }, 1000);
  }

  window.onload = function () {
    var fiveMinutes = 60,
      display = document.querySelector("#time");
    startTimer(fiveMinutes, display);
  };
  // call the displayQuiz function
  displayQuiz();
});
