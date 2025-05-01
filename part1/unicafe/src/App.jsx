// a proper place to define a component

import { useState } from "react";
const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No Feedback is given</p>
      </div>
    );
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine
        text="average"
        value={
          (props.good + 0 - props.bad) /
          (props.good + props.neutral + props.bad)
        }
      />
      <StatisticLine
        text="positive"
        value={
          (props.good / (props.good + props.neutral + props.bad)) * 100 + "%"
        }
      />
    </div>
  );
};
const StatisticLine = (props) => {
  return (
    <div>
      <table>
        <tr>
          <td>{props.text}</td>
          <br></br>
          <td>{props.value}</td>
        </tr>
      </table>
    </div>
  );
};
const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} a />
    </>
  );
};

export default App;
