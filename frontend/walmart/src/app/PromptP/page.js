"use client";

import React from "react";
import {
  User,
  UploadCloud,
  Mic,
  Send,
  Loader2,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./Main.css";

const Main = () => {
  const [input, setInput] = React.useState("");
  const [showResult, setShowResult] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [recentPrompt, setRecentPrompt] = React.useState("");
  const [resultData, setResultData] = React.useState("");

  const onSent = () => {
    if (!input) return;
    setShowResult(true);
    setRecentPrompt(input);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResultData(`<strong>Here's your answer about:</strong> ${input}`);
    }, 2000);
  };

  return (
    <div className="main">
      {/* Navbar */}
      <div className="nav">
        <p>SmartMeal</p>
        <a target="_blank" href="#">
          <User size={28} />
        </a>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            {/* Greeting */}
            <div className="greet">
              <p><span>Welcome back!</span></p>
              <p>What would you like to plan or learn today?</p>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <User size={24} />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              {loading ? (
                <div className="loader flex flex-col items-center">
                  <Loader2 className="animate-spin" size={32} />
                  <p>Loading...</p>
                </div>
              ) : (
                <p
                  style={{ marginTop: "0px" }}
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Ask SmartMeal anything about food or nutrition..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (input && e.key === "Enter") onSent();
              }}
            />
            <div className="icon-group">
              <span>
                <UploadCloud
                  size={20}
                  data-tooltip-id="upload-image"
                  data-tooltip-content="Upload image"
                />
                <Tooltip id="upload-image" />
              </span>
              <span>
                <Mic
                  size={20}
                  data-tooltip-id="use-microphone"
                  data-tooltip-content="Use microphone"
                />
                <Tooltip id="use-microphone" />
              </span>
              {input.length > 0 && (
                <span className="send-icon">
                  <Send
                    size={20}
                    onClick={onSent}
                    data-tooltip-id="submit"
                    data-tooltip-content="Submit"
                  />
                  <Tooltip id="submit" />
                </span>
              )}
            </div>
          </div>

          <p className="bottom-info">
            SmartMeal is your AI-powered assistant for meal planning and healthy eating.
            Double-check nutritional info for accuracy.{" "}
            <a href="/privacy">Privacy Notice</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
