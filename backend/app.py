from flask import Flask, jsonify
app = Flask(__name__)
@app.route('/api/data')
def data():
    return jsonify({'message': 'Hello'})
app.run(debug=True)