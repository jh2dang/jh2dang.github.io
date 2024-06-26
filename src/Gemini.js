import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import "./ChatGpt.css";
import logo from "./minigemini.png";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const ChatbotGemini = styled.div`
  background-color: rgb(240, 244, 255);
  border: 1px solid #cedcff;
  border-radius: 5px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  display: ${(props) => (props.visible ? "flex" : "none")};
`;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const Gemini = forwardRef((props, ref) => {
  console.log(props);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  // 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    const message = props.inputMessage;
    if (message.length === 0) return;

    // addMessage("user", message);
    setLoading(true);

    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(apiKey);

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = message;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log("제미나이 응답:", response);
      const text = await response.text();
      console.log("제미나이 답변:", text);
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
    <ChatbotGemini visible={props.showGemini}>
      <div className="logoContainer">
        <div
          className="geminiLogoBox"
          onClick={() => props.setShowGpt((prevState) => !prevState)}
        >
          <img src={logo} alt="..." className="geminiLogo" />
        </div>
      </div>

      <div className="contentBox">
        {/* <div className="message">
          긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변
          테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴
          답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변
          테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴
          답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변
          테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴
          답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변
          테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴
          답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변
          테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트 긴 답변 테스트
        </div> */}
        {loading ? (
          <div className="loadingBox">
            <div className="messageWait">
              Gemini가 답변을
              <br />
              생성하고 있습니다...
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <ReactMarkdown>{msg.message}</ReactMarkdown>
              </div>
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ChatbotGemini>
  );
});

export default Gemini;
