import { useState } from "react";
import GridInput from "./Components/GridInput";
import { gridProperties } from "./utils/Interfaces";
import { gridInputProperties } from "./utils/Interfaces";

// when dimension is changed, a new grid object should be created and the state updated. existing input values should be retained if possible
export default function Grid(): JSX.Element {
  const startingDimension = 3;
  const startingInputIndexes = Array.from(
    Array(startingDimension * startingDimension).keys()
  );
  const inputs: gridInputProperties[] = startingInputIndexes.map((x) => {
    const rowIndex = Math.floor(x / startingDimension);
    const colIndex = x % startingDimension;
    const newInputObject: gridInputProperties = {
      rowIndex: rowIndex,
      colIndex: colIndex,
      index: x,
      inputValue: "",
      onChangeFunction: inputOnChangeHandler,
    };
    return newInputObject;
  });
  const defaultGrid: gridProperties = {
    inputs: inputs,
    dimension: startingDimension,
  };

  const [gridProps, setGridProps] = useState(defaultGrid);

  const columnsStyle = {
    gridTemplateColumns: "75px ".repeat(gridProps.dimension),
    gridTemplateRows: "75px ".repeat(gridProps.dimension),
    width: (gridProps.dimension * 75).toString().concat("px"),
  };

  function modifyGridDimension(toAdd: number) {
    const { dimension: currentDimension } = gridProps;
    const newDimension = currentDimension + toAdd;
    if (newDimension > 0) {
      const newInputIndexes = Array.from(
        Array(newDimension * newDimension).keys()
      );
      const newInputs: gridInputProperties[] = newInputIndexes.map((x) => {
        const rowIndex = Math.floor(x / newDimension);
        const colIndex = x % newDimension;
        const matchingValue = gridProps.inputs.find(
          (x) => x.colIndex === colIndex && x.rowIndex === rowIndex
        );
        const value: string =
          matchingValue === undefined ? "" : matchingValue.inputValue;

        const newInputObject: gridInputProperties = {
          rowIndex: rowIndex,
          colIndex: colIndex,
          index: x,
          inputValue: value,
          onChangeFunction: inputOnChangeHandler,
        };
        return newInputObject;
      });
      setGridProps({ inputs: newInputs, dimension: newDimension });
    }
  }

  function inputOnChangeHandler(inputIndex: number, newInputValue: string) {
    const regExpression = /(^-)|(\d+)/g;
    const matchesFromInput: RegExpMatchArray | null =
      newInputValue.match(regExpression);
    const refinedInput =
      matchesFromInput == null ? "" : matchesFromInput.join("");
    console.log(refinedInput);
    const { inputs, dimension } = gridProps;

    const { rowIndex, colIndex } = inputs[inputIndex];
    const newInputObj: gridInputProperties = {
      rowIndex: rowIndex,
      colIndex: colIndex,
      index: inputIndex,
      inputValue: refinedInput,
      onChangeFunction: inputOnChangeHandler,
    };
    inputs[inputIndex] = newInputObj;
    const newGridObj: gridProperties = { inputs: inputs, dimension: dimension };
    setGridProps(newGridObj);
  }

  const inputIndexes = Array.from(
    Array(gridProps.dimension * gridProps.dimension).keys()
  );

  return (
    <div>
      <button onClick={() => modifyGridDimension(1)}>+</button>
      <button onClick={() => modifyGridDimension(-1)}>-</button>
      <div className="grid-container main-grids">
        <div
          className="grid-container left-grid grid-item"
          style={columnsStyle}
        >
          {inputIndexes.map((v) => (
            <div className="grid-item" key={v}>
              <GridInput
                rowIndex={gridProps.inputs[v].rowIndex}
                colIndex={gridProps.inputs[v].colIndex}
                index={gridProps.inputs[v].index}
                inputValue={gridProps.inputs[v].inputValue}
                onChangeFunction={inputOnChangeHandler}
              />
            </div>
          ))}
        </div>
        <div
          className="grid-container right-grid grid-item"
          style={columnsStyle}
        >
          {inputIndexes.map((v) => (
            <div className="grid-item" key={v}>
              {gridProps.inputs[v].inputValue}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
