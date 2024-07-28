import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import backgroundImg from "../../assets/mainbackground.png";
import logo from "../../assets/logowhite.png";

const animateBackground = keyframes`
  from {
    background-position: 0% 0;
  }
  to {
    background-position: 100% 0;
  }
`;

const MovingBackgroundContainer = styled.div`
  height: 100vh;
  color: white;
  gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  animation: ${animateBackground} 40s linear infinite;
  background-color: black;
`;

const Title = styled.div`
  line-height: 1.5em;
  // font-size: 24px;
  font-family: "Pretendard Variable";
  font-weight: 700;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); // 좀 더 자연스러운 그림자 효과
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const EnterButton = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 60%;
  background-color: #fee500;
  border: none;
  cursor: pointer;
  padding: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6cf00;
  }

  font-size: 15px;
`;

const SaveWithButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 60%;
  background-color: #2681ff;
  color: white;
  border: none;
  cursor: pointer;
  padding: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1061df;
  }

  font-size: 15px;
`;

const SignUpButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 25%;
  // background-color: #2681ff;
  color: white;
  border: 1px solid white;
  cursor: pointer;
  padding: 5px;
  margin-top: 20px;
  transition: background-color 0.3s;

  // &:hover {
  //   background-color: #1061df;
  // }

  font-size: 14px;
`;

function Home() {
  const navigate = useNavigate();

  return (
    <MovingBackgroundContainer>
      <Title>
        너와 나의<br></br>에너지 절약 플랫폼,
      </Title>
      <LogoContainer>
        <img src={logo} style={{ width: "200px" }}></img>
      </LogoContainer>
      <EnterButton onClick={() => navigate("/unitypage")}>
        내 방 입장하기
      </EnterButton>
      <SaveWithButton onClick={() => navigate("/login")}>
        세이브윗 계정으로 시작하기
      </SaveWithButton>
      <SignUpButton onClick={() => navigate("/signup")}>회원가입</SignUpButton>
    </MovingBackgroundContainer>
  );
}

export default Home;
