import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, NavigationStart} from "@angular/router";
import {Currency, HistoricalValue, Source} from "../models/models";
import {HistoricalValueService} from "../services/historical-value.service";
import {CurrencyService} from "../services/currency.service";
import {SourceService} from "../services/source.service";
import {UIChart} from "primeng/chart";

@Component({
  selector: 'app-archival-data',
  templateUrl: './archival-data.component.html',
  styleUrls: ['./archival-data.component.sass']
})
export class ArchivalDataComponent implements OnInit, AfterContentInit {

  chartData: any;
  sources: Source[] = [];
  selectedSource: Source;
  chartOptions: any;
  abbr: string = '';
  source: string = '';
  historicalValues: Array<HistoricalValue> = [];
  selectedCurrency: Currency = {
    name: '',
    abbr: ''
  };
  currencies: Array<Currency> = [];

  constructor(private route: ActivatedRoute, private historicalValueService:HistoricalValueService, private currencyService: CurrencyService, public sourceService: SourceService, private router: Router) {
    this.resetChartData();
    this.selectedSource = this.sourceService.getCurrentSource();
    this.route.params.subscribe(params => {
      this.abbr = params['abbr'];
      this.source = params['source']
      this.selectedSource = {
        name: this.source,
        type: ''
      }
    });
    this.historicalValueService.getHistoricalValuesByCurrencyAbbrAndSourceNameFromServer(this.abbr, this.source).subscribe(
      (data: any) => {
        this.historicalValues=data;
        this.selectedCurrency = this.currencyService.getSelectedCurrency();
        this.sourceService.setCurrentSource(this.historicalValues[0].source.name)
        this.prepareChartData();
      });

    this.chartOptions = {
      legend: {
        position: 'bottom'
      }
    };

    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
        this.historicalValueService.getHistoricalValuesByCurrencyAbbrAndSourceNameFromServer(this.currencyService.getSelectedCurrency().abbr, this.sourceService.getCurrentSource().name).subscribe(
          (data: any) => {
            this.historicalValues=data;
            this.resetChartData();
            this.selectedCurrency = this.currencyService.getSelectedCurrency();
            this.sourceService.setCurrentSource(this.historicalValues[0].source.name)
            this.selectedSource = this.sourceService.getCurrentSource();
            this.prepareChartData();
          });
      }
    })
  }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    this.currencyService.getAllCurrencies().subscribe((data: any) => {
      this.currencies = data;
    });
    this.sourceService.getSources().subscribe((data:any) => {
      this.sources = data;
    });
    console.log(this.historicalValues);
  }

  onSourceDropdownChange(event: any) {
    this.sourceService.setCurrentSource(event.value.name);
    this.router.navigate(['/home/archival-data',this.currencyService.getSelectedCurrency().abbr, this.sourceService.getCurrentSource().name])
    this.historicalValueService.getHistoricalValuesByCurrencyAbbrAndSourceNameFromServer(this.currencyService.getSelectedCurrency().abbr, this.sourceService.getCurrentSource().name).subscribe(
      (data: any) => {
        this.historicalValues=data;
        this.resetChartData();
        this.selectedCurrency = this.historicalValues[0].currency;
        this.sourceService.setCurrentSource(this.historicalValues[0].source.name)
        this.selectedSource = this.sourceService.getCurrentSource();
        this.prepareChartData();
      });
  }

  onCurrencyAbbrDropdownChange(event: any) {
    this.currencyService.setSelectedCurrency(event.value.abbr);
    this.router.navigate(['/home/archival-data', this.currencyService.getSelectedCurrency().abbr, this.sourceService.getCurrentSource().name])
    this.historicalValueService.getHistoricalValuesByCurrencyAbbrAndSourceNameFromServer(this.currencyService.getSelectedCurrency().abbr, this.sourceService.getCurrentSource().name).subscribe(
      (data: any) => {
        this.historicalValues=data;
        this.resetChartData();
        this.sourceService.setCurrentSource(this.historicalValues[0].source.name)
        this.prepareChartData();
      });
    this.selectedCurrency = this.currencyService.getSelectedCurrency();
    this.selectedSource = this.sourceService.getCurrentSource();
  }

  resetChartData() {
    this.chartData = {
      labels: [],
      datasets: [
        {
          label: "Bid price",
          data: [],
          borderColor: '#47a837'
        },
        {
          label: "Ask price",
          data: [],
          borderColor: '#d32f41'
        },
        {
          label: "Mean price",
          data: [],
          borderColor: '#405ada'
        },
      ]
    };
  }

  prepareChartData() {
    this.historicalValues.forEach((value: any) => {
      this.chartData.labels.push(value.date.toString());
      this.chartData.datasets[0].data.push(value.meanBidValue/1000);
      this.chartData.datasets[1].data.push(value.meanAskValue/1000);
      this.chartData.datasets[2].data.push(value.meanValue/1000);
    });
  }

}
