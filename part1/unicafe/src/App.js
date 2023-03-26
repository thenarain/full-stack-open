import { useState } from "react";

const Feedback = (props) => {
  return (
    <div>
      {props.feedback} {props.value}
    </div>
  );
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
      <Feedback feedback="good" value={good} />
      <Feedback feedback="neutral" value={neutral} />
      <Feedback feedback="bad" value={bad} />
    </>
  );
};

export default App;
