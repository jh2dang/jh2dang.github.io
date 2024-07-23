import { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  zindex: 20;
  font-size: 18px;
`;

function UnityPage() {
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    unityProvider,
    sendMessage,
    isLoaded: unityIsLoaded,
  } = useUnityContext({
    loaderUrl: "build/React.loader.js",
    dataUrl: "build/React.data",
    frameworkUrl: "build/React.framework.js",
    codeUrl: "build/React.wasm",
  });

  useEffect(() => {
    if (unityIsLoaded) {
      setIsLoaded(true);
    }
  }, [unityIsLoaded]);

  const handleStart = () => {
    sendMessage("PlayerNameScript", "SetPlayerName", playerName);
    setPlayerName("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleStart();
    }
  };

  const changeScene = () => {
    sendMessage("SceneController", "ChangeScene");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            opacity: "0.8",
            top: "10%",
            left: "10%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            padding: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="채팅을 입력해 주세요."
            style={{
              height: "40px",
              padding: "0 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
            }}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleStart}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            SEND
          </button>
        </div>
        <button
          onClick={changeScene}
          style={{
            position: "absolute",
            opacity: "0.8",
            bottom: "5%",
            right: "10%",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            padding: "10px",
          }}
        >
          다음방
        </button>
        <button
          onClick={goHome}
          style={{
            position: "absolute",
            opacity: "0.8",
            bottom: "5%",
            left: "10%",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            padding: "10px",
          }}
        >
          홈으로
        </button>
        {!isLoaded && (
          <LoadingMessage>Unity를 불러오는 중입니다...'ㅅ'</LoadingMessage>
        )}
        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={4}
          style={{ width: "100%", height: "100vh", maxHeight: "1000px" }}
        />
      </div>
    </>
  );
}

export default UnityPage;
