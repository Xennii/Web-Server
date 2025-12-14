from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/factions")
def factions():
    return render_template("factions.html")

@app.route("/lore")
def lore():
    return render_template("lore.html")

@app.route("/characters")
def characters():
    return render_template("characters.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
