import { useState } from "react";
const getRandomAnecdotes = (max) => {
  return Math.floor(Math.random() * max);
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  // create a zero-filled array of the desired length.
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const voteAnecdotes = () => {
    const copy = [...votes];
    // increment the value in position 2 by one
    copy[selected] += 1;
    setVotes(copy);
  };

  const mostVotes = () => {
    return votes.indexOf(Math.max(...votes));
  };

  return (
    <>
      <h1>Anecdotes of the day</h1>
      <div>
        {anecdotes[selected]} has {votes[selected]}
      </div>

      <button
        onClick={() => {
          setSelected(getRandomAnecdotes(anecdotes.length));
        }}
      >
        Next anecdote
      </button>
      <button onClick={voteAnecdotes}>vote</button>
      <h1>Anecdotes with the most votes</h1>
      <div>
        {anecdotes[mostVotes()]} with {votes[mostVotes()]} votes
      </div>
    </>
  );
};

export default App;
