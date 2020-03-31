import React from 'react';
import Card from './Card';
import { withRouter } from "react-router-dom";

class QuestionSummaryCard extends React.Component {
  toQuestion = (e) => {
    e.preventDefault();
    const { qid } = this.props;
    this.props.history.push(`/questions/${qid}`);
  }

  getCardBody = () => {
    const { questionSummary } = this.props;
    return (
      <div className="card-body">
        <p className="card-text">{questionSummary}</p>
        <button
          className="btn btn-primary"
          onClick={this.toQuestion}
        >
          View
        </button>
      </div>
    );
  }

  render() {
    const { userId } = this.props;
    return (
      <Card 
        cardBody={this.getCardBody()}
        userId={userId}
      />
    );
  }
}

export default withRouter(QuestionSummaryCard);
