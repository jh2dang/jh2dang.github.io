import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import "./ChatGpt.css";
import logo from "./chatgpt.png";

const ChatGpt = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = process.env.REACT_APP_CHAT_API_KEY;
  const apiEndpoint = "https://api.openai.com/v1/chat/completions";

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

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          max_tokens: 1024, // 답변 최대 글자 수,
          top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
          temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
          frequency_penalty: 0.8, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
          presence_penalty: 0.7, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
          stop: ["문장 생성 중단 단어"],
        }),
      });

      const data = await response.json();
      console.log(data);
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      addMessage("bot", aiResponse);
    } catch (error) {
      console.error("오류 발생!", error);
      addMessage("오류 발생!");
    } finally {
      setLoading(false);
    }
  };
  useImperativeHandle(ref, () => ({
    handleSendMessage,
  }));

  return (
    <div id="ChatbotGpt">
      <div className="logoContainer">
        <div className="chatGptLogoBox">
          <img src={logo} alt="..." className="chatGptLogo" />
        </div>
      </div>

      <div className="contentBox">
        {loading ? (
          <div className="loadingBox">
            <span className="messageWait">
              Gpt-3.5-turbo가 답변을 생성하고 있습니다...
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

export default ChatGpt;
