export interface gridInputProperties {
  rowIndex: number;
  colIndex: number;
  index: number;
  inputValue: string;
  onChangeFunction: (inputIndex: number, newInputValue: string) => void;
}

export interface gridProperties {
  inputs: gridInputProperties[];
  dimension: number;
}
