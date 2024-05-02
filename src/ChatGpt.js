import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import "./ChatGpt.css";
import logo from "./minigpt.png";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const ChatbotGpt = styled.div`
  background-color: rgb(240, 247, 243);
  border: 1px solid #c4dfcf;
  border-radius: 5px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  display: ${(props) => (props.visible ? "flex" : "none")};
`;

const ChatGpt = forwardRef((props, ref) => {
  console.log(props);
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
          messages: [
            {
              role: "user",
              content: message,
            },
            // {
            //   role: "user",
            //   content:
            //     message + "답변이 길다면, 적절히 문단을 나누어서 작성해 줘.",
            // },
          ],
          max_tokens: 1024, // 답변 최대 글자 수,
          top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
          temperature: 0.3, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
          frequency_penalty: 0.3, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
          presence_penalty: 0.7, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
          stop: ["문장 생성 중단 단어"],
        }),
      });

      const data = await response.json();
      console.log("챗GPT 응답:", data);
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      console.log("챗GPT 답변:", aiResponse);
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

  console.log(props.showGpt);

  return (
    <ChatbotGpt visible={props.showGpt}>
      <div className="logoContainer">
        <div
          className="chatGptLogoBox"
          onClick={() => props.setShowGemini((prevState) => !prevState)}
        >
          <img src={logo} alt="..." className="chatGptLogo" />
        </div>
      </div>

      <div className="contentBox">
        {/* <div className="message">첫번째 답변입니다</div>
        <div className="message">
          두번째
          답변입니다아아아아아아아ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ아
        </div>
        <div className="message">
          세번째 답변입니다
          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </div>
        <div className="message">네번째 답변입니다ㄴㄴㄴ</div> */}
        {loading ? (
          <div className="loadingBox">
            <span className="messageWait">
              Gpt-3.5-turbo가 답변을
              <br />
              생성하고 있습니다...
            </span>
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
    </ChatbotGpt>
  );
});

export default ChatGpt;
