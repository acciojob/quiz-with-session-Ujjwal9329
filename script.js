const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

function saveProgress() {
  const progress = {};
  document.querySelectorAll("input[type='radio']:checked").forEach((input) => {
    progress[input.name] = input.value;
  });
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function loadProgress() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  document.querySelectorAll("input[type='radio']").forEach((input) => {
    if (savedProgress[input.name] === input.value) {
      input.checked = true;
    }
  });
}

function renderQuestions() {
  questionsElement.innerHTML = "";
  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${question.question}</p>`;
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.addEventListener("change", saveProgress);
      
      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });
    questionsElement.appendChild(questionDiv);
  });
  loadProgress();
}

function calculateScore() {
  let score = 0;
  questions.forEach((question, index) => {
    const selected = document.querySelector(`input[name='question-${index}']:checked`);
    if (selected && selected.value === question.answer) {
      score++;
    }
  });
  localStorage.setItem("score", score);
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
}

function loadScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your last score was ${savedScore} out of ${questions.length}.`;
  }
}

submitButton.addEventListener("click", calculateScore);

document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  loadScore();
});
