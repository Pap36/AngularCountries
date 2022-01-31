import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  formatPopulation(): string {
    const pop: number = Number(this.country?.population);
    var population: string = pop.toString();
    var index = population.length - 1;
    var count = 0;
    while(index > 0) {
      if(count % 3 == 2) {
        population = population.substring(0, index).concat(".", population.substring(index, population.length));
      }
      count += 1;
      index -= 1;
    }

    return population;
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private countryFinding: CountryFindingService,
    private router: Router,
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
      this.languages = [];
      this.currencies = [];
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
        this.languages = [];
        this.currencies = [];
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

  navigateTo(code: String): void {
    this.router.navigateByUrl(`detail/${code}`);
  }

  formatCapital(): string {
    var cap: string = "";
    var index = 0;
    this.country?.capital.forEach(capit => {
      console.log(index);
      cap = (index === 0) ? cap.concat(capit) : cap.concat(", ", capit);
      index += 1;
    });
    return cap;
  }

  formatLanguage(): string {
    var lang: string = "";
    var index = 0;
    this.languages.forEach(language => {
      console.log(index);
      lang = (index === 0) ? lang.concat(language) : lang.concat(", ", language);
      index += 1;
    });
    return lang;
  }

  formatCurrencies(): string {
    var curr: string = "";
    var index = 0;
    this.currencies.forEach(currency => {
      console.log(index);
      curr = (index === 0) ? curr.concat(currency) : curr.concat(", ", currency);
      index += 1;
    });
    return curr;
  }

  formatTLD(): string {
    var dom: string = "";
    var index = 0;
    this.country?.tld.forEach(domain => {
      dom = (index === 0) ? dom.concat(domain) : dom.concat(", ", domain);
      index += 1;
    });
    return dom;
  }

}
