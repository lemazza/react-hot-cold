//reducers
import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE} from './actions'

const initialState = {
  guesses: [],
  feedback: 'Make your guess!',
  auralStatus: '',
  correctAnswer: Math.round(Math.random() * 100) + 1
};

function createFeedback(guess, correctAnswer) {
  let feedback;
  guess = parseInt(guess, 10);
    if (isNaN(guess)) {
      feedback = 'Please enter a valid number';
      return feedback;   
    }

  const difference = Math.abs(guess - correctAnswer);

    if (difference >= 50) {
      feedback = 'You\'re Ice Cold...';
    } else if (difference >= 30) {
      feedback = 'You\'re Cold...';
    } else if (difference >= 10) {
      feedback = 'You\'re Warm.';
    } else if (difference >= 1) {
      feedback = 'You\'re Hot!';
    } else {
      feedback = 'You got it!';
    }

    return feedback;
}

export default reducer = (state=initialState, action) => {
  switch (action.type) {

    case RESTART_GAME:
      return Object.assign({}, state, {
        guesses: [],
        feedback: 'Make your guess!',
        auralStatus: '',
        correctAnswer: action.correctAnswer || Math.round(Math.random() * 100) + 1
      })
      break;

    case MAKE_GUESS:

      return Object.assign({}, state, {
        guesses: [...state.guesses, action.guess],
        feedback: createFeedback(action.guess, state.correctAnswer)
      })
      break;

    case GENERATE_AURAL_UPDATE:
      const {guesses, feedback} = state;
      const pluralize = guesses.length !== 1;

      let auralStatus = `Here's the status of the game right now: ${feedback} 
      You've made ${guesses.length} ${pluralize? 'guesses' : 'guess'}.`;

      if (guesses.length > 0) {
        auralStatus += `${pluralize? 'In order of most- to least-recent, they are' : 'It was'}
        : ${guesses.reverse().join(', ')}`;
      }

      return Object.assign({}, state, {auralStatus});
  }
}