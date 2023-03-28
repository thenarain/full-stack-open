import { useState } from "react";

const Button = (props) => {
  return (
    <>
      <button onClick={props.handler}>{props.text}</button>{" "}
    </>
  );
};

const Display = (props) => {
  return (
    <>
      <h1>{props.heading}</h1>
    </>
  );
};

const MostVotes = (props) => {
  const maxVotes = () => {
    return Math.max(...props.votes);
  };

  const maxIndex = () => {
    return props.votes.indexOf(maxVotes());
  };
  if (Math.max(...props.votes) === 0) {
    return <p>No votes given</p>;
  }
  return (
    <>
      <div>{props.array[maxIndex()]}</div>
      <div>has {maxVotes()} votes</div>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <div>{props.content}</div>
      <div>has {props.value} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
    "The goal of Computer Science is to build something that will last at least until we've finished building it.",
    "Inside every large program, there is a small program trying to get out.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 10));
  };

  const handleVotes = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  return (
    <>
      <Display heading="Anecdote of the day" />
      <Content content={anecdotes[selected]} value={votes[selected]} />
      <Button handler={handleVotes} text="votes" />
      <Button handler={handleClick} text="next anecdotes" />
      <Display heading="Anecdote with most votes" />
      <MostVotes array={anecdotes} votes={votes} />
    </>
  );
};

export default App;
