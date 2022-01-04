import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archival-data',
  templateUrl: './archival-data.component.html',
  styleUrls: ['./archival-data.component.sass']
})
export class ArchivalDataComponent implements OnInit {

  chartData: any;
  chartOptions: any;

  constructor() { }

  ngOnInit(): void {
  }

}
