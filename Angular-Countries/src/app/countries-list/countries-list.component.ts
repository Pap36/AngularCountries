import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../country';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  @Input() displayedCountries?: Country[]; // the list of countries to be displayed
  constructor() { }

  ngOnInit(): void {
  }

}
