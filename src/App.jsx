import './App.css'
import {useState, useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import {shuffle} from "./shuffle";

const SECS_PER_QUESTION = 5;

// We need to define the intialState in order to use useReduce Hook.
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  ans:0
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        ans: action.payload==question.correctOption?state.ans+1:state.ans,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        ans: state.ans,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);  
const [cat,setCat]=useState("");
const handleChange = (event) => {
setCat(event.target.value);
};
const [timed,setTimed]=useState(false);
const handleTimed = (event) => setTimed(event.target.checked);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
let v;
if(cat.length>0){
  v=(item)=>item.category==cat;
} else {
  v=(item)=>item;
}
  useEffect(function () {
    fetch("https://raw.githubusercontent.com/JBreitenbr/psychic-meme/refs/heads/main/questions.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: /*shuffle(data["questions"].filter((item)=>item.category==cat)).slice(0,15)*/shuffle(data["questions"]).filter(v).slice(0,10)
        })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, [cat]);

  return (
    <div className="wrapper">
      <div className="app">
        <div className="headerWrapper">
          <Header />

         {/* <Main>*/}
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && (
            <><StartScreen numQuestions={numQuestions} dispatch={dispatch} cat={cat} timed={timed} handleChange={handleChange} handleTimed={handleTimed}/>{/*<select value={cat} onChange={handleChange} style={{color:"navy"}}><option style={{color:"navy"}}>Select a category</option>{categories.map(item=><option  value={item}>{item}</option>)}</select>*/}</>
            )}{" "}
            {status === "active" && (
              <>
                {/*<Progress
                  index={index}
                  numQuestions={numQuestions}
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  answer={answer}
                />*/}<h2>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </h2>
                <Question
                  question={questions[index]}
                  dispatch={dispatch}
                  answer={answer}
                />
              { /* <Footer> */}
              {timed? <Timer
                    dispatch={dispatch}
                    secondsRemaining={secondsRemaining}
                  />:null}
                  <NextButton
                    dispatch={dispatch}
                    answer={answer}
                    numQuestions={numQuestions}
                    index={index}
                  />
                {/* </Footer>*/}
              </>
            )}
            {status === "finished" && (
              <FinishScreen
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                highscore={highscore}
                dispatch={dispatch}
              />
            )}
          { /* </Main> */}
        </div>
      </div>
    </div>
  );
}