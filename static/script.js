let quizQuestions = [];
let currentQuestion = 0;
let score = 0;


function showSection(sectionId) {

    document.getElementById(sectionId)
        .scrollIntoView({
            behavior: "smooth"
        });
}


async function loadLesson(lessonId) {

    const response =
        await fetch(`/api/lesson/${lessonId}`);

    const lesson =
        await response.json();

    const lessonView =
        document.getElementById("lesson-view");

    const lessonContent =
        document.getElementById("lesson-content");

    let html = `
        <div class="lesson-header">

            <p class="tag">LESSON</p>

            <h2>${lesson.title}</h2>

            <p>${lesson.description}</p>

        </div>

        <div class="word-grid">
    `;

    lesson.content.forEach(item => {

        html += `
            <div class="word-card">

                <div class="sanskrit">
                    ${item.sanskrit}
                </div>

                <div class="transliteration">
                    ${item.transliteration}
                </div>

                <div class="meaning">
                    ${item.meaning}
                </div>

            </div>
        `;

    });

    html += "</div>";

    lessonContent.innerHTML = html;

    lessonView.classList.remove("hidden");

    lessonView.scrollIntoView({
        behavior: "smooth"
    });
}


function closeLesson() {

    document
        .getElementById("lesson-view")
        .classList.add("hidden");

    showSection("learn");
}


/* QUIZ */

async function startQuiz() {

    const response =
        await fetch("/api/quiz");

    quizQuestions =
        await response.json();

    currentQuestion = 0;

    score = 0;

    document
        .getElementById("quiz-start")
        .classList.add("hidden");

    document
        .getElementById("quiz-result")
        .classList.add("hidden");

    document
        .getElementById("quiz-question")
        .classList.remove("hidden");

    showQuestion();
}


function showQuestion() {

    const question =
        quizQuestions[currentQuestion];

    document
        .getElementById("question-number")
        .innerText =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    document
        .getElementById("score-display")
        .innerText =
        `Score: ${score}`;

    document
        .getElementById("question-text")
        .innerText =
        question.question;

    const progress =
        ((currentQuestion) /
        quizQuestions.length) * 100;

    document
        .getElementById("progress")
        .style.width =
        progress + "%";

    const options =
        document.getElementById("options");

    options.innerHTML = "";

    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.className = "option";

        button.innerText = option;

        button.onclick = () =>
            selectAnswer(index);

        options.appendChild(button);

    });

    document
        .getElementById("next-button")
        .classList.add("hidden");
}


function selectAnswer(selectedIndex) {

    const question =
        quizQuestions[currentQuestion];

    const options =
        document.querySelectorAll(".option");

    options.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === question.answer) {

        options[selectedIndex]
            .classList.add("correct");

        score++;

    } else {

        options[selectedIndex]
            .classList.add("wrong");

        options[question.answer]
            .classList.add("correct");
    }

    document
        .getElementById("score-display")
        .innerText =
        `Score: ${score}`;

    document
        .getElementById("next-button")
        .classList.remove("hidden");
}


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= quizQuestions.length) {

        showResult();

    } else {

        showQuestion();
    }
}


function showResult() {

    document
        .getElementById("quiz-question")
        .classList.add("hidden");

    document
        .getElementById("quiz-result")
        .classList.remove("hidden");

    const total =
        quizQuestions.length;

    const percentage =
        Math.round((score / total) * 100);

    document
        .getElementById("final-score")
        .innerText =
        `Your Score: ${score} / ${total} (${percentage}%)`;

    let message;

    if (percentage >= 80) {

        message =
            "Excellent! Your Sanskrit knowledge is very good.";

    } else if (percentage >= 60) {

        message =
            "Good job! Keep practicing to improve.";

    } else {

        message =
            "Keep learning! Review the lessons and try again.";

    }

    document
        .getElementById("result-message")
        .innerText =
        message;
}


/* CHATBOT */

async function sendMessage() {

    const input =
        document.getElementById("chat-message");

    const message =
        input.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    input.value = "";

    const response =
        await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

    const data =
        await response.json();

    addMessage(data.response, "bot");
}


function addMessage(message, type) {

    const chatBox =
        document.getElementById("chat-box");

    const div =
        document.createElement("div");

    div.className =
        `message ${type}`;

    const title =
        type === "bot"
            ? "Sanskrit Bot"
            : "You";

    div.innerHTML = `
        <strong>${title}</strong>
        <p>${message}</p>
    `;

    chatBox.appendChild(div);

    chatBox.scrollTop =
        chatBox.scrollHeight;
}


function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }
}