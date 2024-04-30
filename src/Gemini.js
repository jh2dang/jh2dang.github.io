import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import logo from "./minigemini.png";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const Gemini = forwardRef((props, ref) => {
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
    <div id="ChatbotGemini">
      <div className="logoContainer">
        <div className="geminiLogoBox">
          <img src={logo} alt="..." className="geminiLogo" />
        </div>
      </div>

      <div className="contentBox">
        {loading ? (
          <div className="loadingBox">
            <span className="messageWait">
              Gemini가 답변을 생성하고 있습니다...
            </span>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className="message">
                {msg.message}
              </div>
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
});

export default Gemini;
