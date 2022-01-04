import {Component, OnInit} from '@angular/core';
import {Currency} from "../models/models";
import {CurrencyService} from "../services/currency.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-current-value-table',
  templateUrl: './current-value-table.component.html',
  styleUrls: ['./current-value-table.component.sass']
})
export class CurrentValueTableComponent implements OnInit {

  currencies: Array<Currency> = [];
  selectedCurrency: Currency | undefined;

  constructor(private service:CurrencyService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getCurrentValue().subscribe((data:any) => {
      data.forEach((val:any) => this.currencies.push(Object.assign({}, val)));
    })
  }

  onRowSelect(event:any) {
    this.router.navigate(['/home/archival-data/', { abbr: event.data.abbr}]);
  }


}
