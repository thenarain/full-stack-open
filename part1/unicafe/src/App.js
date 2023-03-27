import { useState } from "react";

const Statistics = (props) => {
  const avg = () => {
    let wholescore = props.value1 * 1 + props.value2 * 0 + props.value3 * -1;
    return wholescore / props.total;
  };

  const percentage = () => {
    return (props.value1 / props.total) * 100;
  };

  if (props.total !== 0) {
    return (
      <>
        <div>
          {props.feedback1} {props.value1}
        </div>
        <div>
          {props.feedback2} {props.value2}
        </div>
        <div>
          {props.feedback3} {props.value3}
        </div>
        <div>
          {props.all} {props.total}
        </div>
        <div>
          {props.average} {avg()}
        </div>
        <div>
          {props.positive} {percentage()} %
        </div>
      </>
    );
  }
  return <div>No feedback given</div>;
};

const Display = (props) => {
  return <h1>{props.heading}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <Display heading="give feedback" />
      <Button handleClick={handleGood} text="good" />{" "}
      <Button handleClick={handleNeutral} text="neutral" />{" "}
      <Button handleClick={handleBad} text="bad" />
      <Display heading="statistics" />
      <Statistics
        feedback1="good"
        feedback2="neutral"
        feedback3="bad"
        all="all"
        value1={good}
        value2={neutral}
        value3={bad}
        total={good + neutral + bad}
        average="average"
        positive="positive"
      />
    </>
  );
};

export default App;
