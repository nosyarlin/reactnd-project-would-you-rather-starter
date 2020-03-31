export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_ANSWER = 'RECEIVE_ANSWER';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function receiveAnswer(qid, authedUser, answer) {
  return {
    type: RECEIVE_ANSWER,
    qid,
    authedUser,
    answer,
  }
}

export function receiveQuestion(question) {
  return {
    type: RECEIVE_QUESTION,
    question,
  }
}
