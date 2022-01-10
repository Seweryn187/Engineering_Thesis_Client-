export interface Currency {
  name: string;
  abbr: string;
}

export interface CurrentValue {
  bidValue: number;
  askValue: number;
  source: Source;
  meanValue: number;
  date: Date;
  spread: number;
  bidIncrease: boolean;
  askIncrease: boolean;
  currency: Currency;
}

export interface CurrentValues {
  values: CurrentValue[];
}

export interface Source {
  name: string;
  type: string;
}

export interface HistoricalValue {
  meanBidValue: number;
  meanAskValue: number;
  source: Source;
  meanValue: number;
  date: Date;
  spread: number;
  currency: Currency;
}

export interface User {
  name: string;
  surname: string;
  email: string;
  login: string;
  password: string;

}

export class GenericResponse {
  response?: string;
}
