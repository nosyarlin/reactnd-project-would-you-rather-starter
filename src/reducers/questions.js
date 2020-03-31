import { RECEIVE_QUESTIONS, RECEIVE_ANSWER, RECEIVE_QUESTION } from '../actions/questions';
import { UNSET_AUTHED_USER } from '../actions/authedUser';

export default function questions(state={}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.questions;
    case RECEIVE_ANSWER:
      const { qid, authedUser, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser),
          }
        }
      }
    case RECEIVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    case UNSET_AUTHED_USER:
      return {}
    default:
      return state;
  }
}