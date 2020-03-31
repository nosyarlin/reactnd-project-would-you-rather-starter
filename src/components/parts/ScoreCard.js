import React from 'react';
import Card from './Card';

const ScoreCard = (props) => {
  const { userId, numAnswered, numAsked, score } = props;
  const cardBody = (
    <div className="card-body">
      <p>{`Answered ${numAnswered} questions`}</p>
      <p>{`Asked ${numAsked} questions`}</p>
      <p>{`Score: ${score}`}</p>
    </div>
  );

  return (
    <Card 
      cardBody={cardBody}
      userId={userId}
    />
  );
}

export default ScoreCard;
