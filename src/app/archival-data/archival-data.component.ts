import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-archival-data',
  templateUrl: './archival-data.component.html',
  styleUrls: ['./archival-data.component.sass']
})
export class ArchivalDataComponent implements OnInit {

  chartData: any;
  chartOptions: any;
  abbr: string | undefined;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.abbr = params['abbr'];

    });
  }

}
