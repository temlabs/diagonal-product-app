import { gridInputProperties } from "../utils/Interfaces";

export default function GridInput(props: gridInputProperties): JSX.Element {
  return (
    <input
      placeholder={props.index.toString()}
      onChange={(e) => props.onChangeFunction(props.index, e.target.value)}
      value={props.inputValue}
      className="grid-input"
    ></input>
  );
}
