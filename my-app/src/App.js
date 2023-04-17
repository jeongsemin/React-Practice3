import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import generateRandoNumber from "./components/random";
import Logs from "./components/Logs";

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandoNumber());
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);
  const [isSucess, setIsSucess] = useState(false);

  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber]);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleRetry = () => {
    setRandomNumber(generateRandoNumber());
    setAnswer("");
    setLogs([]);
    setIsSucess(false);
  };

  const handleSubmit = () => {
    const answers = answer.split("").map((item) => Number(item));

    if (answers.some((number) => isNaN(number))) {
      alert("숫자만 입력해주세요");
      return;
    }

    if (answers.length !== 4) {
      alert("4자리 숫자만 입력해주세요");
      return;
    }

    const isDuplicate = answers.some((number) => {
      return answers.indexOf(number) !== answers.lastIndexOf(number);
    });

    if (isDuplicate) {
      alert("입력 값에 중복이 있습니다.");
      return;
    }
    const { strike, ball } = randomNumber.reduce(
      (prev, cur, index) => {
        if (answers[index] === cur) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }

        if (answers.includes(cur)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        }
        return prev;
      },
      {
        strike: 0,
        ball: 0,
      }
    );
    if (strike === 4) {
      alert("정답입니다!");
      setLogs([...logs, `${answer} (축하합니다 정답입니다.)`]);
      setIsSucess(true);
      return;
    }
    setLogs([...logs, `${answer} (strike: ${strike} ball: ${ball})`]);
  };
  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">
        {isSucess ? `정답: ${answer}` : "----"}
      </header>
      <section>
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          maxLength={4}
          disabled={isSucess}
        />
        {isSucess ? (
          <button onClick={handleRetry}>다시하기</button>
        ) : (
          <button onClick={handleSubmit}>맞춰보기</button>
        )}
      </section>
      <Logs logs={logs} />
    </div>
  );
}

export default App;
