import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const [count, setCount] = useState(0);
  const [playerName, setPlayerName] = useState("");

  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "build/React.loader.js",
    dataUrl: "build/React.data",
    frameworkUrl: "build/React.framework.js",
    codeUrl: "build/React.wasm",
  });

  const handleStart = () => {
    sendMessage("PlayerNameScript", "SetPlayerName", playerName);
    setPlayerName("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleStart();
    }
  };

  const changeScene = () => {
    sendMessage("SceneController", "ChangeScene");
  };


  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            opacity: "0.8",
            top: "10%",
            left: "30%",
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
            placeholder="플레이어 이름"
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
            Start
          </button>
        </div>
        <Unity
          unityProvider={unityProvider}
          style={{ width: 800, height: 500 }}
        />
        <button
          onClick={changeScene}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          방 바꿀래!
        </button>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Unity가보자고</h1>
      <h1>아직 유니티 추가안함!!</h1>
      <h1>TEST</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
