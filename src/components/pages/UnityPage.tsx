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
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    unityProvider,
    sendMessage,
    isLoaded: unityIsLoaded,
    unload
  } = useUnityContext({
    loaderUrl: "build/WebGLBuild.loader.js",
    dataUrl: "build/WebGLBuild.data",
    frameworkUrl: "build/WebGLBuild.framework.js",
    codeUrl: "build/WebGLBuild.wasm",
  });

  useEffect(() => {
    if (unityIsLoaded) {
      setIsLoaded(true);
    }
  }, [unityIsLoaded]);

  const sendDataToUnity = () => {
    const data = {
      roomName: "jeonghee",
      furniture: [
        {
          name: "RoomName",
          position: { x: 0, y: -0.65, z: 4.17 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 0.158844, y: 1, z: 2.5286 }
        }
      ]
    };

    // Send the JSON stringified data to Unity
    sendMessage("CustomRoomManager", "ReceiveDataFromReact", JSON.stringify(data));
  };

  const goHome = async () => {
    try {
      await unload();
      navigate("/");
    } catch (error) {
      console.error("Failed to unload Unity instance", error);
      navigate("/"); // Ensure navigation even if unload fails
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <button
          onClick={sendDataToUnity}
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
          데이터받기
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
