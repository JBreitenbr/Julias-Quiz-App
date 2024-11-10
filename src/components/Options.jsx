function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
/*let answerChoices = question.incorrectAnswers.slice();

          answerChoices.splice(
            Math.floor(Math.random() * 4),
            0,
            question.correctAnswer
          );

          question.opts = answerChoices;
question.correctOpt=question.opts.indexOf(question.correctAnswer);*/
          
  return (
    <div>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;