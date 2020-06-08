import * as React from "react";
import styled from "styled-components";

import Panel from "./Panel";
import Display from "./Display";
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import History from "./History";

const Container = styled.div`
  margin: 30px auto;
  text-align: center;
`;

// TODO: History 내에서 수식 표시할 때 사용
const Box = styled.div`
  display: inline-block;
  width: 270px;
  height: 65px;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  text-align: right;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  cursor: pointer;
  h3 {
    margin: 0px;
  }
`;

const evalFunc = function(string) {
  // eslint-disable-next-line no-new-func
  if (string.indexOf("÷") !== -1) string = string.replace(/÷/g, "/");
  if (string.indexOf("×") !== -1) string = string.replace(/×/g, "*");
  return new Function("return (" + string + ")")();
};

class Calculator extends React.Component {
  // TODO: history 추가
  state = {
    displayValue: "",
    history: [],
  };

  onClickButton = (key) => {
    let { displayValue = "", history = [] } = this.state;
    displayValue = "" + displayValue;
    const lastChar = displayValue.substr(displayValue.length - 1);
    const operatorKeys = ["÷", "×", "-", "+"];
    const proc = {
      AC: () => {
        this.setState({ displayValue: "" });
      },
      BS: () => {
        if (displayValue.length > 0) {
          displayValue = displayValue.substr(0, displayValue.length - 1);
        }
        this.setState({ displayValue });
      },
      // TODO: 제곱근 구현
      "√": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          let prevVal = "√(" + displayValue + ")";
          displayValue = Math.sqrt(evalFunc(displayValue));
          this.setState({
            history: history.concat({
              prevVal,
              displayValue,
            }),
            displayValue,
          });
        }
      },
      // TODO: 사칙연산 구현
      "÷": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "÷" });
        }
      },
      "×": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "×" });
        }
      },
      "-": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "-" });
        }
      },
      "+": () => {
        // + 연산 참고하여 연산 구현
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "+" });
        }
      },
      "=": () => {
        if (lastChar !== "" && operatorKeys.includes(lastChar)) {
          displayValue = displayValue.substr(0, displayValue.length - 1);
        } else if (lastChar !== "") {
          let prevVal = displayValue;
          displayValue = evalFunc(displayValue);
          this.setState({ history: history.concat({ prevVal, displayValue }) });
        }
        this.setState({ displayValue });
      },
      ".": () => {
        if (Number(displayValue) !== 0) {
          displayValue += ".";
          this.setState({ displayValue });
        }
      },
      "0": () => {
        if (Number(displayValue) !== 0) {
          displayValue += "0";
          this.setState({ displayValue });
        }
      },
    };

    if (proc[key]) {
      proc[key]();
    } else {
      // 여긴 숫자
      this.setState({ displayValue: displayValue + key });
    }
  };

  render() {
    return (
      <Container>
        <Panel>
          <Display displayValue={this.state.displayValue} />
          <ButtonGroup onClickButton={this.onClickButton}>
            <Button size={1} color="gray">
              AC
            </Button>
            <Button size={1} color="gray">
              BS
            </Button>
            <Button size={1} color="gray">
              √
            </Button>
            <Button size={1} color="gray">
              ÷
            </Button>

            <Button size={1}>7</Button>
            <Button size={1}>8</Button>
            <Button size={1}>9</Button>
            <Button size={1} color="gray">
              ×
            </Button>

            <Button size={1}>4</Button>
            <Button size={1}>5</Button>
            <Button size={1}>6</Button>
            <Button size={1} color="gray">
              -
            </Button>

            <Button size={1}>1</Button>
            <Button size={1}>2</Button>
            <Button size={1}>3</Button>
            <Button size={1} color="gray">
              +
            </Button>

            <Button size={2}>0</Button>
            <Button size={1}>.</Button>
            <Button size={1} color="gray">
              =
            </Button>
          </ButtonGroup>
        </Panel>
        <History>
          {this.state.history.map((x, i) => {
            return (
              <Box
                key={i}
                onClick={() => {
                  this.setState({ displayValue: x.prevVal });
                }}
              >
                {x.prevVal}
                <br />= {x.displayValue}
              </Box>
            );
          })}
        </History>
        {/* TODO: History componet를 이용해 map 함수와 Box styled div를 이용해 history 표시 */}
      </Container>
    );
  }
}

export default Calculator;
