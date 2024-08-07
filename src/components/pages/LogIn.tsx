import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logoflatblack.png";

// interface LoginFormProps {
//   onSubmit: (userId: string, password: string) => void;
// }

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

function LogIn() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted:", userId, password);
    alert("로그인 성공!");
    navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img src={logo} style={{ width: "250px" }} />
        <Title>세이브윗 로그인</Title>
        <Input
          type="userId"
          value={userId}
          placeholder="id"
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <MiniText onClick={() => navigate("/")}>홈으로</MiniText>
      </Form>
    </Container>
  );
}

export default LogIn;
