export interface Currency {
  name: string;
  abbr: string;
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
  bestPrice: boolean;
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

export interface Alert {
  id?: number;
  currency: Currency;
  user?: User;
  alertValue: number;
  increase: boolean;
  repeatable: boolean;
}

export interface dateRange {
  name: string;
  value: string;
}
