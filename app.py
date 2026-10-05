from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


def get_response(message):
    message = message.lower().strip()

    responses = {
        "namaste": "नमस्ते! भवतः स्वागतं अस्ति। अहं संस्कृत-चैटबोट् अस्मि।",
        "नमस्ते": "नमस्ते! भवतः स्वागतं अस्ति। अहं संस्कृत-चैटबोट् अस्मि।",

        "what is sanskrit": "Sanskrit is an ancient classical language of India.",
        "संस्कृत क्या है": "संस्कृतम् भारतस्य प्राचीनं शास्त्रीयं भाषा अस्ति।",

        "your name": "मम नाम संस्कृत-चैटबोट् अस्ति।",
        "what is your name": "मम नाम संस्कृत-चैटबोट् अस्ति।",

        "धन्यवाद": "स्वागतम्! भवतः दिनं शुभं भवतु।",
        "thank you": "स्वागतम्! भवतः दिनं शुभं भवतु।",

        "hello": "नमस्ते! कथम् अस्ति भवान्?",
        "hi": "नमस्ते! कथम् अस्ति भवान्?"
    }

    return responses.get(
        message,
        "क्षम्यताम्। अहं एतत् प्रश्नं न अवगच्छामि। कृपया अन्यं प्रश्नं पृच्छतु।"
    )


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    response = get_response(message)

    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)