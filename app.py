from flask import Flask, render_template, jsonify, request
from data.lessons import lessons, quiz_questions

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/lessons")
def get_lessons():
    return jsonify(lessons)


@app.route("/api/quiz")
def get_quiz():
    return jsonify(quiz_questions)


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").lower().strip()

    if "hello" in message or "hi" in message:
        response = "नमस्ते! Welcome to the Sanskrit Learning Chatbot."

    elif "namaste" in message:
        response = "नमस्ते means Hello or Greetings in Sanskrit."

    elif "sanskrit" in message:
        response = (
            "Sanskrit is an ancient classical language of India. "
            "It is written as संस्कृतम् in Sanskrit."
        )

    elif "thank" in message:
        response = "धन्यवादः means Thank you."

    elif "bye" in message:
        response = "पुनः मिलामः means Goodbye. Keep learning Sanskrit!"

    elif "help" in message:
        response = (
            "You can ask me about Sanskrit greetings, numbers, "
            "pronouns, vocabulary, grammar, and simple sentences."
        )

    else:
        response = (
            "I can help you learn Sanskrit. "
            "Try asking about greetings, numbers, vocabulary, "
            "grammar, or sentences."
        )

    return jsonify({"response": response})


@app.route("/api/lesson/<lesson_id>")
def get_lesson(lesson_id):
    lesson = lessons.get(lesson_id)

    if lesson:
        return jsonify(lesson)

    return jsonify({"error": "Lesson not found"}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)