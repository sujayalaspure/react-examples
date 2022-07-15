import React, { useState } from "react";
import { Container, Square, Row, Wrapper, Heading } from "./style";
import Footer from "../../Components/footer";

const rows = [0, 1, 2, 3, 4, 5, 6, 7];

function Chessboard() {
  const [currentSquare, setCurrentSquare] = useState({
    row: -1,
    col: -9,
  });
  const onMouseOver = ({ row, col }) => {
    setCurrentSquare({ row, col });
  };

  return (
    <Container>
      <Heading>
        <h1>Bishop on Chessboard - Frontend Machine Coding </h1>
        <a href="https://workat.tech/frontend-development/practice/chessboard-showing-bishop-moves-21fq78tswbst">
          Link
        </a>
      </Heading>
      <Wrapper>
        <Row style={{ marginTop: 20 }}>
          {rows.map((row) => (
            <Square style={{ width: 30 }} key={row} index={1}>
              {row}
            </Square>
          ))}
        </Row>
        {rows.map((col) => {
          return (
            <Row key={col}>
              {col}
              {rows.map((row) => {
                const temp = currentSquare.row - row;
                const tt = {
                  rowUp: currentSquare.row - temp,
                  colUp: currentSquare.col - temp,
                  rowDown: currentSquare.row + temp,
                  colDown: currentSquare.col + temp,
                };

                return (
                  <Square
                    key={row}
                    onMouseLeave={() => setCurrentSquare({ row: -1, col: -9 })}
                    onMouseOver={() => onMouseOver({ row, col })}
                    index={Math.abs((row % 2) - (col % 2))}
                    canKill={(tt.rowUp === row && tt.colUp === col) || (tt.rowUp === row && tt.colDown === col)}
                    col={col}>
                    {`${row},${col}`}
                  </Square>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Chessboard;
