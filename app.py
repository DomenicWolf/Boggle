from boggle import Boggle
from flask import Flask,session,render_template,redirect,Request,request,jsonify


boggle_game = Boggle()
 
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the random string' 
boggle = Boggle()
@app.route('/')
def start_game():
    board = boggle.make_board()
    session['board'] = board
    return render_template('Start.html',board = board)
  


@app.route("/check-word")
def check_word():
    

    guess = request.args["guess"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, guess)

    return jsonify({'result': response})

@app.route('/save-score', methods=['POST'])
def save_score():
    new_score = request.json['scores']
    if 'score' in session and session['score'] < new_score:
        session['score'] = new_score
    elif 'score' not in session:
        session['score'] = new_score
    return jsonify({'scores': session['score']})