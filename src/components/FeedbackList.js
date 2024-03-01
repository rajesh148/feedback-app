import React, { useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "./context/FeedbackContext";

const FeedbackList = () => {
  const { feedback } = useContext(FeedbackContext);
  return (
    <div className="feedback-list">
      {feedback && feedback.length > 0 ? (
        feedback.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id} item={feedbackItem} />
        ))
      ) : (
        <div>No feedback found</div>
      )}
    </div>
  );
};

export default FeedbackList;
