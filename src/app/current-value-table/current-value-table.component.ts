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

  currentValues: Array<CurrentValue> = [];
  selectedCurrency: Currency | undefined;
  sources: Source[] = [];
  selectedSource: Source| undefined;

  constructor(public currentValueService:CurrentValueService, private router: Router, public sourceService:SourceService, private currencyService: CurrencyService) {
    //this.selectedSource = this.sourceService.getCurrentSource();
  }

  ngOnInit(): void {
    this.sourceService.getSources().subscribe((data:any) => {
      this.sources = data;
    });

    this.currentValueService.getCurrentValues().subscribe((data:any) => {
      this.currentValues = data;
    })

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
    });
  }

}
