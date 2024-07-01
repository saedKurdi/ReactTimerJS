import React, { useRef, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [array, setArray] = useState([]);
  const startBtn = useRef(null);
  const stopBtn = useRef(null);
  const interval = useRef(null);

  const startTimer = (e) => {
    e.preventDefault(); // Prevent form submission
    startBtn.current.disabled = true;
    stopBtn.current.disabled = false;

    // Using a functional update to ensure the interval function captures the latest state
    interval.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0 || prevTime === 1) {
          clearInterval(interval.current);
          return 0;
        }
        return prevTime - 1; // Decrement the time
      });
    }, 1000);
  };

  const stopTimer = (e) => {
    e.preventDefault(); // Prevent form submission
    startBtn.current.disabled = false;
    stopBtn.current.disabled = true;
    clearInterval(interval.current);
    setArray([...array, time]);
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Enter Time"
          onChange={(e) => setTime(parseInt(e.target.value))}
        />
        <button ref={startBtn} onClick={startTimer}>
          Start
        </button>
        <button ref={stopBtn} onClick={stopTimer}>
          Stop
        </button>
      </form>
      <h1>TIMER: {time}</h1>
      <ul>
        {array.map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>
    </>
  );
}
