import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Gemini = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    const message = props.inputMessage;
    if (message.length === 0) return;

    addMessage("user", message);
    setLoading(true);

    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(apiKey);

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = message;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      addMessage("bot", text);
    } catch (error) {
      console.error("Error fetching data:", error);
      addMessage("오류 발생!");
    } finally {
      setLoading(false);
    }
  };
  useImperativeHandle(ref, () => ({
    handleSendMessage,
  }));

  return (
    <div>
      <div id="Chatbot">
        <h1>Gemini (Google)</h1>
        <div className="chatDiv">
          {loading && (
            <span className="messageWait">답변을 기다리고 있습니다</span>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {`${msg.sender === "user" ? "나" : "챗봇"} : ${msg.message}`}
            </div>
          ))}
        </div>
        {/* <div className="inputDiv">
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage}>전송</button>
        </div> */}
      </div>
    </div>
  );
});

export default Gemini;
