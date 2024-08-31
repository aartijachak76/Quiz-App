const quizData = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      correct: 0
    },
    {
      question: "Which is the largest planet in our solar system?",
      choices: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 2
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correct: 1
    },
    {
      question: "What is the speed of light?",
      choices: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "200,000 km/s"],
      correct: 0
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      choices: ["Oxygen", "Gold", "Osmium", "Iron"],
      correct: 0
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: 1
    },
    {
      question: "In which year did the Titanic sink?",
      choices: ["1912", "1905", "1918", "1921"],
      correct: 0
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let answerResults = [];
  
  const questionEl = document.getElementById('question');
  const answerButtonsEl = document.getElementById('answer-buttons');
  const nextButtonEl = document.getElementById('next-btn');
  const quizContainerEl = document.getElementById('quiz-container');
  const resultContainerEl = document.getElementById('result-container');
  const scoreEl = document.getElementById('score');
  const summaryEl = document.getElementById('summary');
  const restartButtonEl = document.getElementById('restart-btn');
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerResults = [];
    nextButtonEl.classList.remove('hidden');
    resultContainerEl.classList.add('hidden');
    quizContainerEl.classList.remove('hidden');
    loadQuestion();
  }
  
  function loadQuestion() {
    resetState();
    const currentQuizData = quizData[currentQuestionIndex];
    questionEl.innerText = currentQuizData.question;
    
    currentQuizData.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.innerText = choice;
      button.classList.add('btn');
      button.addEventListener('click', () => selectAnswer(index));
      answerButtonsEl.appendChild(button);
    });
  }
  
  function resetState() {
    nextButtonEl.classList.add('hidden');
    while (answerButtonsEl.firstChild) {
      answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
  }
  
  function selectAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
      score++;
      answerResults.push({ question: quizData[currentQuestionIndex].question, correct: true });
    } else {
      answerResults.push({ question: quizData[currentQuestionIndex].question, correct: false });
    }
    Array.from(answerButtonsEl.children).forEach((button, index) => {
      button.classList.add(index === correctIndex ? 'correct' : 'incorrect');
      button.disabled = true;
    });
    nextButtonEl.classList.remove('hidden');
  }
  
  function showResult() {
    quizContainerEl.classList.add('hidden');
    resultContainerEl.classList.remove('hidden');
    scoreEl.innerText = `${score} out of ${quizData.length}`;
  
    summaryEl.innerHTML = "";
    answerResults.forEach((result, index) => {
      const resultText = document.createElement('p');
      resultText.innerText = `Q${index + 1}: ${result.question} - ${result.correct ? "Correct" : "Incorrect"}`;
      resultText.classList.add(result.correct ? 'correct' : 'incorrect');
      summaryEl.appendChild(resultText);
    });
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  nextButtonEl.addEventListener('click', handleNextButton);
  restartButtonEl.addEventListener('click', startQuiz);
  
  startQuiz();
  
  