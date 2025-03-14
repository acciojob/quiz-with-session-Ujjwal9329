document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "What is the highest mountain in the world?", options: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
        { question: "What is the largest country by area?", options: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
        { question: "Which is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
        { question: "What is the capital of Canada?", options: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
    ];

    const questionsContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");
    let userSelections = JSON.parse(sessionStorage.getItem("progress")) || {};

    function renderQuestions() {
        questionsContainer.innerHTML = "";
        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `<p>${q.question}</p>`;

            q.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question${index}`;
                input.value = option;

                if (userSelections[index] === option) {
                    input.checked = true;
                }

                input.addEventListener("change", function () {
                    userSelections[index] = option;
                    sessionStorage.setItem("progress", JSON.stringify(userSelections));
                });

                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement("br"));
            });

            questionsContainer.appendChild(questionDiv);
        });
    }

    submitButton.addEventListener("click", function () {
        let score = 0;
        questions.forEach((q, index) => {
            if (userSelections[index] === q.answer) {
                score++;
            }
        });

        scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
        localStorage.setItem("score", score);
    });

    function loadPreviousScore() {
        const savedScore = localStorage.getItem("score");
        if (savedScore !== null) {
            scoreDisplay.textContent = `Your last score was ${savedScore} out of ${questions.length}.`;
        }
    }

    renderQuestions();
    loadPreviousScore();
});
