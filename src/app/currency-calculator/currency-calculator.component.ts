import { Component, OnInit } from '@angular/core';
import {CurrentValueService} from "../services/current-value.service";
import {CurrencyService} from "../services/currency.service";
import {CurrentValue, Source} from "../models/models";
import {SourceService} from "../services/source.service";

@Component({
  selector: 'app-currency-calculator',
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['./currency-calculator.component.sass']
})
export class CurrencyCalculatorComponent implements OnInit {

  sources: Source[] = [];
  selectedSource: Source;
  currentValues: CurrentValue[]= [];
  plnAmount: number = 0;
  exchangedValues: Map<String, number> = new Map();


  constructor(private currentValueService: CurrentValueService, private currencyService: CurrencyService, private sourceService: SourceService) {
    this.selectedSource = this.sourceService.getCurrentSource();
  }

  ngOnInit(): void {
    this.sourceService.getSources().subscribe((data:any) => {
      this.sources = data;

    });

    this.currentValueService.getCurrentValues().subscribe((data:any) => {
      this.currentValues = data;
      this.exchangedValues = new Map([
        [this.currentValues[0].currency.abbr, 0],
        [this.currentValues[1].currency.abbr, 0],
        [this.currentValues[2].currency.abbr, 0],
        [this.currentValues[3].currency.abbr, 0],
        [this.currentValues[4].currency.abbr, 0],
        [this.currentValues[5].currency.abbr, 0],
        [this.currentValues[6].currency.abbr, 0],
        [this.currentValues[7].currency.abbr, 0],
      ])
    })
  }

  onDropdownChange(event:any){
    this.sourceService.setCurrentSource(event.value.name);
    this.currentValueService.setCurrentValues(this.currentValueService.getCurrentValuesBySourceNameFromServer(event.value.name));
    this.currentValueService.getCurrentValues().subscribe((data:any) => {
      this.currentValues = data;
      this.calculateExchangeValues();
    });


  }

  onButtonClick() {
    this.calculateExchangeValues();
  }

  calculateExchangeValues() {
    this.exchangedValues = new Map([
      [this.currentValues[0].currency.abbr, this.plnAmount/(this.currentValues[0].askValue/1000)],
      [this.currentValues[1].currency.abbr, this.plnAmount/(this.currentValues[1].askValue/1000)],
      [this.currentValues[2].currency.abbr, this.plnAmount/(this.currentValues[2].askValue/1000)],
      [this.currentValues[3].currency.abbr, this.plnAmount/(this.currentValues[3].askValue/1000)],
      [this.currentValues[4].currency.abbr, this.plnAmount/(this.currentValues[4].askValue/1000)],
      [this.currentValues[5].currency.abbr, this.plnAmount/(this.currentValues[5].askValue/1000)],
      [this.currentValues[6].currency.abbr, this.plnAmount/(this.currentValues[6].askValue/1000)],
      [this.currentValues[7].currency.abbr, this.plnAmount/(this.currentValues[7].askValue/1000)],
    ])
  }
}
