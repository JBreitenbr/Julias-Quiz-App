function Progress({ index, numQuestions }) {
  return (
   /* <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />*/
      <h2>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </h2>
     /* <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>*/
  );
}

export default Progress;