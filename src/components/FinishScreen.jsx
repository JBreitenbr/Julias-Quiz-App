function FinishScreen({ points, ans,maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  const ans2=ans;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
function refreshPage() {
    window.location.reload(false);
}
  return (
    <div className="result_container">
      <p className="result">
       { /*<span>{emoji}</span>*/}You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      {/* <p className="highscore">(Highscore: {highscore} points)</p>*/}
      <h2>{ans2}</h2>
      <button
        className="btn btn-ui"
        onClick={() => /*dispatch({ type: "restart" })*/refreshPage()}
      >
        Restart quiz
      </button>
    </div>
  );
}
export default FinishScreen;