import { receiveUsers, addAnswer, addQuestion } from './users';
import { receiveQuestions, receiveAnswer, receiveQuestion } from './questions';
import { getInitialData } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestionAnswer, saveQuestion } from '../utils/api';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
  }
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(addAnswer(qid, authedUser, answer));
        dispatch(receiveAnswer(qid, authedUser, answer));
      })
      .then(() => {
        dispatch(hideLoading());
      });
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    return saveQuestion({ optionOneText, optionTwoText, author: authedUser })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(receiveQuestion(question));
      })
      .then(() => {
        dispatch(hideLoading());
      });
  }
}