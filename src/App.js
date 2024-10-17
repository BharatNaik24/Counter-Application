import React, { useEffect, useState } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import videoBg from "../src/assets/video.mp4";
import "./styles.css";

const App = () => {
  const [targetDate, setTargetDate] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (targetDate && !isPaused) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance <= 0) {
          alert("Your Time is Over");
          clearInterval(interval);
          setCountdown(0);
        } else {
          setCountdown(distance);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [targetDate, isPaused]);

  const handleStart = () => {
    const dateInput = document.getElementById("date").value;
    const timeInput = document.getElementById("time").value;

    if (dateInput && timeInput) {
      const targetDateString = `${dateInput}T${timeInput}`;
      setTargetDate(new Date(targetDateString).getTime());
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setTargetDate(null);
    setCountdown(0);
  };

  return (
    <section className="page">
      <div className="overlay"></div>
      <video src={videoBg} autoPlay loop muted></video>

      <div className="page__content">
        <h1>Countdown Timer</h1>
        <h3>Set your target date and time to start the countdown.</h3>

        <div className="input-container">
          <div className="inputsAlign">
            <input type="date" id="date" placeholder="Select date" />
            <input type="time" id="time" placeholder="Select time" />
          </div>
        </div>
        <div className="btn-group">
          <button className="btn" onClick={handleStart}>
            <FaPlay />
          </button>
          {targetDate && !isPaused && (
            <button className="btn" onClick={handlePause}>
              <FaPause />
            </button>
          )}
          {targetDate && isPaused && (
            <button className="btn" onClick={handleResume}>
              <FaPlay />
            </button>
          )}
          <button className="btn" onClick={handleReset}>
            <FaRedo />
          </button>
        </div>
        {targetDate && (
          <FlipClockCountdown
            to={targetDate}
            className="flip-clock"
            labels={["Days", "Hours", "Minutes", "Seconds"]}
            showLabels
            labelStyle={{ fontSize: "14px" }}
          />
        )}
        <p id="message">
          {countdown === 0 ? "Please enter the value to start" : ""}
        </p>
      </div>
    </section>
  );
};

export default App;
