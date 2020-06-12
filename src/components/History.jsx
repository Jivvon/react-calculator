import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  height: 374px;
  padding: 10px;
  margin: 20px auto;
  border: 2px solid #000;
  border-radius: 5px;
  text-align: center;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

class History extends React.Component {
  render() {
    return <Container data-testid="history">{this.props.children}</Container>;
  }
}

export default History;
// TODO: Panel 을 참고해서 History component 생성 및 export
