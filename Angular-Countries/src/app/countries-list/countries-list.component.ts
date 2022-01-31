import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../country';
import { CountryFindingService } from '../country-finding.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  @Input() displayedCountries?: Country[];
  constructor() { }

  ngOnInit(): void {
  }

}
