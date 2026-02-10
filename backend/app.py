from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

TECHS = [
    {"id": 1, "name": "HTML", "category": "Front-end"},
    {"id": 2, "name": "CSS", "category": "Front-end"},
    {"id": 3, "name": "JavaScript", "category": "Front-end"},
    {"id": 4, "name": "Python", "category": "Back-end"},
    {"id": 5, "name": "Flask", "category": "Back-end"},
    {"id": 6, "name": "PostgreSQL", "category": "Database"},
]

@app.get("/api/techs")
def get_techs():
    q = request.args.get("q", "").strip().lower()

    if q:
        results = [t for t in TECHS if q in t["name"].lower()]
        return jsonify({
            "count": len(results),
            "results": results
        })

    return jsonify({
        "count": len(TECHS),
        "results": TECHS
    })


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

