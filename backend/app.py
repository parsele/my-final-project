from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import openai
import os

app = Flask(__name__)
CORS(app)

DB_NAME = 'mifugocare.db'

# --- Database Setup ---
def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, animal TEXT, amount REAL, reason TEXT, contact TEXT
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, animal TEXT, date TEXT, time TEXT, location TEXT, contact TEXT
    )''')
    conn.commit()
    conn.close()

init_db()

openai.api_key = os.environ.get("OPENAI_API_KEY")

# --- Loan Endpoints ---
@app.route('/api/loans', methods=['POST'])
def add_loan():
    data = request.json
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('INSERT INTO loans (name, animal, amount, reason, contact) VALUES (?, ?, ?, ?, ?)',
              (data['name'], data['animal'], data['amount'], data['reason'], data['contact']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Loan application received'}), 201

@app.route('/api/loans', methods=['GET'])
def get_loans():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('SELECT id, name, animal, amount, reason, contact FROM loans')
    loans = [dict(zip(['id', 'name', 'animal', 'amount', 'reason', 'contact'], row)) for row in c.fetchall()]
    conn.close()
    return jsonify(loans)

# --- Booking Endpoints ---
@app.route('/api/bookings', methods=['POST'])
def add_booking():
    data = request.json
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('INSERT INTO bookings (name, animal, date, time, location, contact) VALUES (?, ?, ?, ?, ?, ?)',
              (data['name'], data['animal'], data['date'], data['time'], data['location'], data['contact']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Booking received'}), 201

@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('SELECT id, name, animal, date, time, location, contact FROM bookings')
    bookings = [dict(zip(['id', 'name', 'animal', 'date', 'time', 'location', 'contact'], row)) for row in c.fetchall()]
    conn.close()
    return jsonify(bookings)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    client = openai.OpenAI(api_key=openai.api_key)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an expert on livestock and pet health, care, and finance in Kenya. Answer questions with detailed, accurate, and friendly advice."},
            {"role": "user", "content": user_message}
        ]
    )
    return jsonify({"reply": response.choices[0].message.content})

if __name__ == '__main__':
    app.run(debug=True) 