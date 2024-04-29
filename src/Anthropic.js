import React, { useEffect, useState } from "react";
import Anthropic from "@anthropic-ai/sdk";

const Claude3 = () => {
  const [output, setOutput] = useState("");
  const [final, setFinal] = useState("");

  const anthropic = new Anthropic({
    apiKey: process.env.REACT_APP_ANTROPIC_API_KEY,
  });

  const fetchData = async () => {
    const stream = anthropic.messages.stream({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: "안녕! 오늘 날씨 어때?",
        },
      ],
      stream: true,
    });

    stream.on("text", (text) => {
      console.log(text);
      setOutput(text); // Update the output state with the received text
    });

    const message = await stream.finalMessage();
    console.log(message);
    setFinal(message);
  };

  const go = () => {
    fetchData();
  };

  // Cleanup function to close the stream if component unmounts
  // return () => {
  //   anthropic.messages.close();
  // };

  return (
    <div>
      <h1>Anthropic Output</h1>
      <button onClick={go}>TEST</button>
      <p>여기에 답변이 표시됩니다: {final}</p>
    </div>
  );
};

export default Claude3;
