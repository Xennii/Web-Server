from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        # In a real app, save to database or send email
        print(f"Message from {name} ({email}): {message}")
        return "Thank you for your message!"
    return render_template('contact.html')

@app.route('/api/data')
def api_data():
    return jsonify({"message": "Hello from API", "data": [1, 2, 3, 4]})

if __name__ == '__main__':
    app.run(debug=True)