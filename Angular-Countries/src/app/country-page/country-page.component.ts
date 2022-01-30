import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Country } from '../country';
import { CountryFindingService } from '../country-finding.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit {

  country?: Country;
  languages: string[] = [];
  currencies: string[] =[];
  apiDone: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private countryFinding: CountryFindingService,
  ) { }

  ngOnInit(): void {
    if(this.countryFinding.getApiCAll()){
      this.getCountry();
      this.apiDone = true;
    }
    else {
      this.getCountryAPI();
    }
  }

  getCountry(): void {
    this.route.params.subscribe((parameters) => {
      const codeName = parameters['code'];
      this.country = this.countryFinding.findCountry(codeName);
      const langs = this.country.languages;
      const curr = this.country.currencies;
      Object.entries(langs).forEach(([_, value]) => {
        this.languages.push(String(value));
      })
      Object.entries(curr).forEach(([_, value]) => {
        this.currencies.push(String(value['name']));
      })
    })
  }

  getCountryAPI(): void {
    this.route.params.subscribe((parameters) => {
      const codeName = parameters['code'];
      this.countryFinding.findCountryAPI(codeName).subscribe((country) => {
        this.country = country;
        const langs = this.country.languages;
        const curr = this.country.currencies;
        Object.entries(langs).forEach(([_, value]) => {
          this.languages.push(String(value));
        })
        Object.entries(curr).forEach(([_, value]) => {
          this.currencies.push(String(value['name']));
        })
        this.apiDone = true;
      });
    })
  }

  goBack(): void {
    this.location.back();
  }

}
