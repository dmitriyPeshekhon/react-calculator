import style from "./App.module.css";
import { useState } from "react";

const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "=", "C"];

export const App = () => {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [sign, setSign] = useState("");
  const [animationBtn, setAnimationBtn] = useState(null);

  const handleClickButton = (content) => {
    if (/^[0-9]$/.test(content)) {
      if (sign) {
        if (secondNum.length === 0 && content === 0) {
          // проверка, что бы нельзя было ввести нули в начале
        } else {
          setSecondNum(secondNum + content);
        }
      } else {
        if (firstNum.length === 0 && content === 0) {
          // проверка, что бы нельзя было ввести нули в начале
        } else {
          setFirstNum(firstNum + content);
        }
      }
    } else if (/^[+-]$/.test(content)) {
      if (firstNum.length > 0) {
        setSign(content);
      }
    } else if (/^[C]$/.test(content)) {
      setFirstNum("");
      setSecondNum("");
      setSign("");
    } else if (/^[=]$/.test(content)) {
      if (firstNum && sign && secondNum) {
        const NumberFirst = Number(firstNum);
        const NumberSecond = Number(secondNum);
        let result;

        if (sign === "+") {
          result = NumberFirst + NumberSecond;
        } else if (sign === "-") {
          result = NumberFirst - NumberSecond;
        }

        setFirstNum(result.toString());
        setSign("");
        setSecondNum("");
      }
    }
  };

  return (
    <div className={style.app}>
      <div className={style.header}>
        <div className={style.tablo}>
          <h1>{`${firstNum}${sign}${secondNum}`}</h1>
        </div>
      </div>

      <div className={style.buttons}>
        {buttons.map((e) => {
          return (
            <button
              className={`${style.button} ${animationBtn === e ? style.active : ""}`}
              key={e}
              onClick={() => handleClickButton(e)}
              onMouseDown={() => setAnimationBtn(e)}
              onMouseUp={() => setAnimationBtn(null)}
            >
              {e}
            </button>
          );
        })}
      </div>
    </div>
  );
};
