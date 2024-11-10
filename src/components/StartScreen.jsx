import {useState} from 'react';
function StartScreen({ numQuestions, dispatch, cat, timed,handleChange,handleTimed }) {let cats=["Literature","Philosophy","Biology","History","Geography","Movies","Music","Literature","Computer Science","Mathematics"];
                                    
  return (
    <div className="start">
      <h2>Have lots of fun!</h2>
      {/*<h3>{numQuestions} questions to test your React mastery</h3>*/}
      <select value={cat} onChange={handleChange} style={{color:"navy",borderRadius:"12px"}} className="p-4 m-6"><option style={{color:"navy"}}>Select a category</option>{cats.map(item=><option  value={item}>{item}</option>)}</select>
      <input type="checkbox" id="timer" checked={timed} onChange={handleTimed} /><label htmlFor="timer"> Timer set?</label>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;