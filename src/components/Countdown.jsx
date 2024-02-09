import React, { useState, useEffect } from 'react';
import './countdown.css';

export default function Countdown() {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  
  useEffect(() => {
    let intervalId;
    if (timerActive && time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalId);
      setTimerActive(false);
    }
    return () => clearInterval(intervalId);
  }, [timerActive, time]);

  const handleStart = () => {
    if (inputTime && !timerActive) {
      setTime(parseInt(inputTime));
      setTimerActive(true);
    }
  };

  const handleStop = () => {
    setTimerActive(false);
  };

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="countdown-timer">
      <h2>Countdown Timer</h2>
      <input
        type="number"
        value={inputTime}
        onChange={handleInputChange}
        placeholder="Enter time in seconds"
        disabled={timerActive}
      />
      <div className="button-container">
        <button className="start-button" onClick={handleStart} disabled={timerActive}>Start</button>
        <button className="stop-button" onClick={handleStop} disabled={!timerActive}>Stop</button>
      </div>
      <p className="current-time">Current Time: {formatTime(time)}</p>
    </div>
  );
}


