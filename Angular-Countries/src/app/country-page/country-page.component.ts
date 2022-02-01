import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Country } from '../country';
import { CountryFindingService } from '../country-finding.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit {

  country?: Country; // the country whose details will be displayed
  languages: string[] = []; // list of languages of the country
  currencies: string[] =[]; // list of currencies
  apiDone: boolean = false; // whether the api call is done
  nativeNames: string[] = []; // list of native names

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private countryFinding: CountryFindingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // if the api call is done, get the country from the list of countries
    if(this.countryFinding.getApiCAll()){
      this.getCountry();
      this.apiDone = true;
    }
    // else make a direct api call done
    else {
      this.getCountryAPI();
    }
  }

  /**
   * getCountry(): void
   * function fetches data so it can be properly formated from the country
   */
  getCountry(): void {
    // the country is fetched by looking at the cca3 code in the url
    this.route.params.subscribe((parameters) => {
      const codeName = parameters['code']; // the cca3 code
      this.country = this.countryFinding.findCountry(codeName);
      // fetch the information that is more sensible
      const langs = this.country.languages;
      const curr = this.country.currencies;
      const names = this.country.name.nativeName;
      // make sure to reset the lists of languages, currencies and names
      // to avoid data duplication
      this.languages = [];
      this.currencies = [];
      this.nativeNames = [];
      
      //for each of the 3 objects, store their values in the list
      Object.entries(langs).forEach(([_, value]) => {
        this.languages.push(String(value));
      });
      Object.entries(curr).forEach(([_, value]) => {
        // we are interested in the currency name not symbol
        this.currencies.push(String(value['name']));
      });
      Object.entries(names).forEach(([_, value]) => {
        // we want to common nativa name, but can easily change to official native name
        this.nativeNames.push(String(value['common']));
      });
    })
  }

  /**
   * getCountryAPI(): void
   * logic of data formatting is same as getCountry
   * country is fetched by making dirrect API call
   */
  getCountryAPI(): void {
    // get the code from the URL
    this.route.params.subscribe((parameters) => {
      const codeName = parameters['code']; // cca3 code
      // make a direct API call using the cca3 code
      this.countryFinding.findCountryAPI(codeName).subscribe((country) => {
        this.country = country;
        // same as getCountry()
        const langs = this.country.languages;
        const curr = this.country.currencies;
        const names = this.country.name.nativeName;
        this.languages = [];
        this.currencies = [];
        this.nativeNames = [];

        Object.entries(langs).forEach(([_, value]) => {
          this.languages.push(String(value));
        })
        Object.entries(curr).forEach(([_, value]) => {
          this.currencies.push(String(value['name']));
        })
        Object.entries(names).forEach(([_, value]) => {
          console.log(value);
          this.nativeNames.push(String(value['common']));
        })
        // update the value of apiDone
        // could add a timeout here as well for the loading screen
        this.apiDone = true;
      });
    })
  }

  /**
   * goBack(): void
   * navigate back to previous tab
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * navigateTo(code: String): void
   * @param code string representing cca3 of a border country
   * naviagte to country page of a border country
   */
  navigateTo(code: String): void {
    this.router.navigateByUrl(`detail/${code}`);
  }

  /**
   * formatPopulation(): string 
   * @returns string representing the population of the country
   *          nicely formated using '.'
   */
  formatPopulation(): string {
    // get the population of the country as a string
    const pop: number = Number(this.country?.population);
    var population: string = pop.toString();
    // work from the end of the string and add '.' every 3 characters
    var index = population.length - 1;
    var count = 0;
    while(index > 0) {
      if(count % 3 == 2) {
        // insert '.'
        population = population.substring(0, index).concat(".", population.substring(index, population.length));
      }
      count += 1;
      index -= 1;
    }

    return population;
  }

  /**
   * formatCapital(): string
   * @returns string with all capitals nicely separated using ','
   * useful when a country has more than one capital (ex: South Africa)
   */
  formatCapital(): string {
    var cap: string = "";
    var index = 0;
    this.country?.capital.forEach(capit => {
      cap = (index === 0) ? cap.concat(capit) : cap.concat(", ", capit);
      index += 1;
    });
    return cap;
  }

  /**
   * formatlanguage(): string
   * @returns string with all languages nicely separated using ','
   * same approach as formatCapital()
   */
  formatLanguage(): string {
    var lang: string = "";
    var index = 0;
    this.languages.forEach(language => {
      lang = (index === 0) ? lang.concat(language) : lang.concat(", ", language);
      index += 1;
    });
    return lang;
  }

  /**
   * formatCurrencies(): string
   * @returns string with all currencies nicely separated using ','
   * same approach as formatCapital()
   */
  formatCurrencies(): string {
    var curr: string = "";
    var index = 0;
    this.currencies.forEach(currency => {
      curr = (index === 0) ? curr.concat(currency) : curr.concat(", ", currency);
      index += 1;
    });
    return curr;
  }

  /**
   * formatTLD(): string
   * @returns string wit all top level domains nicely separated using ','
   * same approach as formatCapital()
   */
  formatTLD(): string {
    var dom: string = "";
    var index = 0;
    this.country?.tld.forEach(domain => {
      dom = (index === 0) ? dom.concat(domain) : dom.concat(", ", domain);
      index += 1;
    });
    return dom;
  }

  /**
   * formatNativeName(): string
   * @returns string with the chosen native name out of all the ones from the API
   * chooses the last one from the list (as decided from the Belgium example)
   */
  formatNativeName(): string {
    return this.nativeNames[this.nativeNames.length - 1];
  }
}
