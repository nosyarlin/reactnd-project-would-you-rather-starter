import { RECEIVE_USERS, ADD_ANSWER, ADD_QUESTION } from '../actions/users';
import { UNSET_AUTHED_USER } from '../actions/authedUser';

export default function users(state={}, action) {
  let user = {};
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case ADD_ANSWER:
      const { qid, authedUser, answer } = action;
      user = {
        ...state[authedUser],
        answers: {
          ...state[authedUser].answers,
          [qid]: answer,
        },
      }
      return {
        ...state,
        [authedUser]: user,
      }
    case ADD_QUESTION:
      const { question } = action;
      user = {
        ...state[question.author],
        questions: state[question.author].questions.concat(question.id),
      }
      return {
        ...state,
        [question.author]: user,
      }
    case UNSET_AUTHED_USER:
      return {}
    default:
      return state;
  }
}