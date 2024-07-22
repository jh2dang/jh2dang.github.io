import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function Home() {
  const navigate = useNavigate();

  const goUnity = () => {
    navigate("/unitypage");
  };
  return (
    <Container>
      <button
        onClick={goUnity}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          padding: "10px",
        }}
      >
        내 방 입장하기
      </button>
    </Container>
  );
}

export default Home;
