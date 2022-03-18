import { useState } from "react";

export default function Grid(): JSX.Element {
  const [cellDimension, setCellDimension] = useState(3);
  const cellNumbers = Array.from(Array(cellDimension * cellDimension).keys());
  console.log(cellNumbers);
  const columnsStyle = {
    gridTemplateColumns: "75px ".repeat(cellDimension),
    gridTemplateRows: "75px ".repeat(cellDimension),
    width: (cellDimension * 75).toString().concat("px"),
  };

  function modifyGridDimension(toAdd: number) {
    if (cellDimension + toAdd > 0) {
      setCellDimension((p) => p + toAdd);
    }
  }

  return (
    <div>
      <button onClick={() => modifyGridDimension(1)}>+</button>
      <button onClick={() => modifyGridDimension(-1)}>-</button>
      <div className="grid-container" style={columnsStyle}>
        {cellNumbers.map((v) => (
          <div className="grid-item" key={v}>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
