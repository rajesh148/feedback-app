import React, { useState, useContext, useEffect } from "react";
import FeedbackContext from "./context/FeedbackContext";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";

const FeedbackForm = () => {
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const handleOnChange = (e) => {
    let tempText = e.target.value;
    if (tempText === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (tempText !== "" && tempText.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(tempText);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      text,
      rating,
    };

    if (feedbackEdit.edit === true) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }

    setText("");
    setBtnDisabled(true);
    setMessage(null);
  };

  return (
    <Card>
      <form onSubmit={handleOnSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />

        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            onChange={handleOnChange}
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            {feedbackEdit.edit && !btnDisabled ? "Update" : "Send"}
          </Button>
        </div>
      </form>
      <div className="message">{message}</div>
    </Card>
  );
};

export default FeedbackForm;
