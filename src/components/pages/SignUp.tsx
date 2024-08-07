import { defaultInstance } from "../../apis/axios.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logoflatblack.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  // background-color: #f4f4f9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  &:focus {
    border-color: #6658f6;
  }
`;

const Button = styled.button`
  width: 95%;
  padding: 12px 15px;
  background-color: #4483db;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0855c2;
  }

  transition: background-color 0.3s;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const MiniText = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;

function SignUp() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 제출", userId, password);

    try {
      const response = await defaultInstance.post("/user/joinUser", {
        userId: userId,
        userPassword: password,
        userPasswordCheck: passwordCheck,
        userName: userName,
        userSmartToken: "",
      });
      if (response.data.result === "success") {
        console.log(response.data.message);
        alert(response.data.message);
        navigate("/login");
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img src={logo} style={{ width: "250px" }} />
        <Title>세이브윗 회원가입</Title>
        <Input
          type="text"
          value={userId}
          placeholder="아이디"
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          value={passwordCheck}
          placeholder="비밀번호 확인"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <Input
          type="text"
          value={userName}
          placeholder="이름"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
        <MiniText onClick={() => navigate("/")}>홈으로</MiniText>
      </Form>
    </Container>
  );
}

export default SignUp;
