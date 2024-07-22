import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Button = styled.div`
  background-color: #2681ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1061df;
  }

  font-size: 14px;
`;

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>일단은 메인페이지입니다</h1>
      <button
        onClick={() => navigate("/unitypage")}
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
      <Button onClick={() => navigate("/login")}>로그인</Button>
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
    </Container>
  );
}

export default Home;
