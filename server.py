from dotenv import load_dotenv
load_dotenv()
from flask import Flask, render_template, request
from flask_cors import CORS
import openai
import requests
import json

app = Flask(__name__)
CORS(app)

# OpenAI GPT-3 endpoint URL (this might change, always refer to the official documentation)
# OpenAI_URL = 'https://api.openai.com/v1/chat/completions'

prompt_history = []

# Route for the homepage
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return 'Hello World'
    elif request.method == 'POST':
        keywords = request.form.get('keywords')
        return f'Hello, here are the keywords: {keywords}.'

@app.route('/generate-prompt', methods=['POST'])
def generate_prompt():

    prompt_input = request.form.get('prompt')

    data = {
        'messages': [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Can you please generate the best prompt using these keywords? {prompt_input}"},
        ]
    }

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=data['messages']
    )

    # Parsing the API response
    prompt_response = response['choices'][0]['message']['content']

    prompt_history.append(prompt_response)

    print(prompt_response)
    return prompt_response


@app.route('/generate-convo', methods=['POST'])
def generate_convo():

    convo_input = request.form.get('convo')

    data = {
        'messages': [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"{convo_input}"},
        ]
    }

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=data['messages']
    )

    # Parsing the API response
    chat_response = response['choices'][0]['message']['content']
    print(chat_response)
    return chat_response


@app.route('/prompt-history', methods=['GET'])
def get_prompt_history():
    return prompt_history


if __name__ == '__main__':
    app.run(debug=True)
