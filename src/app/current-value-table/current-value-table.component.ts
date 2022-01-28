import {Component, OnInit} from '@angular/core';
import {Currency, CurrentValue, Source} from "../models/models";
import {CurrentValueService} from "../services/current-value.service";
import {NavigationStart, Router} from "@angular/router";
import {SourceService} from "../services/source.service";
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-current-value-table',
  templateUrl: './current-value-table.component.html',
  styleUrls: ['./current-value-table.component.sass']
})
export class CurrentValueTableComponent implements OnInit {

  currentValues: CurrentValue[] = [];
  selectedCurrency: Currency | undefined;
  sources: Source[] = [];
  selectedSource: Source;
  bestPriceCurrentValues: CurrentValue[] = [];
  emptyCurrentValue: CurrentValue = {
    id: 0,
    bidValue: 0,
    askValue: 0,
    source: {
      name: '',
      type: ''
    },
    meanValue: 0,
    date: new Date(),
    spread: 0,
    bidIncrease: false,
    askIncrease: false,
    bestPrice: true,
    currency: {
        name: '',
        abbr: ''
    }
  };

  constructor(public currentValueService:CurrentValueService, private router: Router, public sourceService:SourceService, private currencyService: CurrencyService) {
    this.selectedSource = this.sourceService.getCurrentSource();
    this.currentValueService.getCurrentValuesByBestPriceFromServer().subscribe((data:any) => {
      this.bestPriceCurrentValues = data;
      console.log(this.bestPriceCurrentValues);
    });
  }

  ngOnInit(): void {
    this.sourceService.getSources().subscribe((data:any) => {
      this.sources = data;
    });

    this.currentValueService.getCurrentValues().subscribe((data:any) => {
      this.currentValues = data;
      this.currentValues.sort(function(a, b) {
        return a.id - b.id;
      });
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.selectedSource = this.sourceService.getCurrentSource();
      }
    });

    this.selectedSource = this.sourceService.getCurrentSource();
  }

  onRowSelect(event:any) {
    this.currencyService.setSelectedCurrency(event.data.currency.abbr);
    this.router.navigate(['/home/archival-data', this.currencyService.getSelectedCurrency().abbr, this.sourceService.getCurrentSource().name]);
  }

  onDropdownChange(event:any) {
    this.sourceService.setCurrentSource(event.value.name);
    this.currentValueService.setCurrentValues(this.currentValueService.getCurrentValuesBySourceNameFromServer(event.value.name));
    this.currentValueService.getCurrentValues().subscribe((data:any) => {
      this.currentValues = data;
      this.currentValues.sort(function(a, b) {
        return a.id - b.id;
      });
    });
  }

  getBestSource(currentValue: CurrentValue): CurrentValue{
    // @ts-ignore
    return this.bestPriceCurrentValues.find(obj => {
      return obj.currency.abbr === currentValue.currency.abbr;
    });
  }

}
