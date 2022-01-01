export interface Currency {
  id: number;
  name: string;
  abbr: string;
  currentValue: CurrentValue;
}

export interface CurrentValue {
  id: number;
  bidValue: number;
  askValue: number;
  source: Source;
  meanValue: number;
  date: Date;
  spread: number;
  bidIncrease: boolean;
  askIncrease: boolean;
}

export interface CurrentValues {
  values: CurrentValue[];
}

export interface Source {
  id: number;
  name: string;
  type: string;
}
