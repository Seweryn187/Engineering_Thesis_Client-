import {Component, OnInit} from '@angular/core';
import {Currency} from "../models/models";
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-current-value-table',
  templateUrl: './current-value-table.component.html',
  styleUrls: ['./current-value-table.component.sass']
})
export class CurrentValueTableComponent implements OnInit {

  currencies: Array<Currency> = [];

  constructor(private service:CurrencyService) {

  }

  ngOnInit(): void {
    this.service.getCurrentValue().subscribe((data:any) => {
      data.forEach((val:any) => this.currencies.push(Object.assign({}, val)));
    })
    console.log(this.currencies);
  }



}
