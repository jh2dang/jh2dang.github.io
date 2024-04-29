import React, { useState, useRef } from "react";
import ChatGpt from "./ChatGpt";
import Gemini from "./Gemini";
import "./App.css";
import Claude3 from "./Anthropic";

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
    <>
      <div className="inputContainer">
        <input
          className="inputField"
          type="text"
          placeholder="메시지를 입력하세요"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="submitButton" onClick={Go}>
          전송
        </button>
      </div>
      <ChatGpt ref={chatGptRef} inputMessage={userInput.trim()} />
      <Gemini ref={geminiRef} inputMessage={userInput.trim()} />
      <Claude3 />
    </>
  );
};

export default App;
