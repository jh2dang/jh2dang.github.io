import React, { useState, useRef } from "react";
import ChatGpt from "./ChatGpt";
import Gemini from "./Gemini";
import "./App.css";

const App = () => {
  const [userInput, setUserInput] = useState("");

  const chatGptRef = useRef({});
  const geminiRef = useRef({});

  const Go = () => {
    // 자식 컴포넌트의 handleSendMessage 함수 호출
    chatGptRef.current.handleSendMessage();
    geminiRef.current.handleSendMessage();
    console.log(userInput.trim());
    setUserInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      Go();
    }
  };

  return (
    <div className="container">
      <div className="subContainer">
        <div className="inputContainer content">
          <input
            className="inputField"
            type="text"
            placeholder="무엇이든 물어보세요."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="submitButton" onClick={Go}>
            전송
          </div>
        </div>
        <ChatGpt ref={chatGptRef} inputMessage={userInput.trim()} />
        <Gemini ref={geminiRef} inputMessage={userInput.trim()} />
      </div>
    </div>
  );
};

export default App;
