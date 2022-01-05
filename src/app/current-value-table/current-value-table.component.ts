import {Component, OnInit} from '@angular/core';
import {Currency, CurrentValue, Source} from "../models/models";
import {CurrentValueService} from "../services/current-value.service";
import {Router} from "@angular/router";
import {SourceService} from "../services/source.service";

@Component({
  selector: 'app-current-value-table',
  templateUrl: './current-value-table.component.html',
  styleUrls: ['./current-value-table.component.sass']
})
export class CurrentValueTableComponent implements OnInit {

  currentValues: Array<CurrentValue> = [];
  selectedSource: Array<Currency> = [];
  selectedCurrency: Currency | undefined;
  sources: Source[] = [];

  constructor(private currentValueService:CurrentValueService, private router: Router, private sourceService:SourceService) {
  }

  ngOnInit(): void {
    this.sourceService.getSources().subscribe((data:any) => {
      this.sources = data;
    });
    this.currentValueService.getCurrentValue().subscribe((data:any) => {
      this.currentValues = data;
    })

  }

  onRowSelect(event:any) {
    this.router.navigate(['/home/archival-data', event.data.currency.abbr]);
  }

  onDropdownChange(event:any) {
    this.currentValueService.setCurrentSource(event.value.name);
    this.currentValueService.setCurrentValue(this.currentValueService.getCurrentValuesBySourceNameFromServer(event.value.name));
    this.currentValueService.getCurrentValue().subscribe((data:any) => {
      this.currentValues = data;
    })
  }


}
