import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/image 11.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f9;
`;

const Form = styled.form`
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 20px;
  &:focus {
    border-color: #6658f6;
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #4483db;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0855c2;
  }
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup submitted:", email, password);
    navigate("/login");
    alert("회원가입이 완료되었습니다.");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img src={logo} style={{ width: "100px" }} />
        <Title>세이브윗 회원가입</Title>
        <Input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
}

export default SignUp;
