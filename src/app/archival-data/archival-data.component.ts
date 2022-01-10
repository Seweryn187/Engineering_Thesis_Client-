import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HistoricalValue} from "../models/models";
import {HistoricalValueService} from "../services/historical-value.service";

@Component({
  selector: 'app-archival-data',
  templateUrl: './archival-data.component.html',
  styleUrls: ['./archival-data.component.sass']
})
export class ArchivalDataComponent implements OnInit {

  chartData: any;
  chartOptions: any;
  abbr: string = '';
  source: string = '';
  historicalValues: Array<HistoricalValue> = [];

  constructor(private route: ActivatedRoute, private historicalValueService:HistoricalValueService) {
    this.route.params.subscribe(params => {
      this.abbr = params['abbr'];
      this.source = params['source']
    });
  }

  ngOnInit(): void {
    this.historicalValueService.getHistoricalValuesByCurrencyAbbrAndSourceNameFromServer(this.abbr, this.source).subscribe(
      (data: any) => {
        this.historicalValues=data;
        console.log(this.historicalValues);
      }
    )

  }

}
