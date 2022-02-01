import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryFindingService {

  private target = 'https://restcountries.com/v3.1';

  private allCountries: Country[] = []; // all countries from restcountries.com (should be 250)
  private searchVal: string = ''; // input field value
  private regionVal: string = ''; // filter by region value
  private sortField: string = ''; // sort by value
  private ascending: boolean = true; // ascending or descending sort
  private apiCallDone: boolean = false; // wether the api call has been completed or not

  constructor(private http: HttpClient) {}

  /**
   * getAllCountries(): Observable<Country[]>
   * @returns dataObs an Observable representing a list of all countries fetched via the API call
   */
  getAllCountries(): Observable<Country[]> {
    var dataObs = this.http.get<Country[]>(`${this.target}/all?fields=name,capital,currencies,flags,population,borders,region,subregion,tld,languages,cca3`);
    return dataObs;
  }

  /**
   * setAllCountries(countries: Country[]): void
   * @param countries list of Country objects representing all countries
   * sets the value of property allCountries and updates apiCallDone since data has been fetched
   */
  setAllCountries(countries: Country[]): void {
    this.allCountries = countries;
    this.apiCallDone = true;
  }

  /**
   * findCountry(code: String): Country
   * @param code string representing the cca3 code of a country: ex BEL, AUT, ROU, etc.
   * @returns the Country whose cca3 code is code
   */
  findCountry(code: string) : Country{
    // find the object by looking into all countries
    const country: Country = this.allCountries.find((country) => {
      return country.cca3 === code;
    })!;
    return country;
  }

  /**
   * findCountryAPI(code: String): Observable<Country>
   * @param code string representing the cca3 code of a country: ex BEL, AUT, ROU, etc.
   * @returns an Observable of type Country representing the country whose cca3 code is code
   * function fetches the country directly via an API call
   */
  findCountryAPI(code: string) : Observable<Country>{
    return this.http.get<Country>(`${this.target}/alpha/${code}?fields=name,capital,currencies,flags,population,borders,region,subregion,tld,languages,cca3`);
  }

  /**
   * setFilterParameters(sVal:string, rVal:string, sortF: string, asc: boolean): void
   * @param sVal string representing input field value
   * @param rVal string representing region to filter by
   * @param sortF string representing property to sort by
   * @param asc boolean representing whether sorting is ascending or descending
   */
  setFilterParameters(sVal:string, rVal:string, sortF: string, asc: boolean): void {
    this.sortField = sortF;
    this.ascending = asc;
    this.searchVal = sVal;
    this.regionVal = rVal;
  }

  /**
   * filterC(sVal: string, rVal: string): Country[]
   * @param sVal string representing input field value
   * @param rVal string representing region to filter by
   * @returns a list of countries whose name contains sVal as a substring and whose region is rVal
   */
  private filterC(sVal: string, rVal: string): Country[]{
    return this.allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(sVal.toLowerCase()) && 
        country.region.toLowerCase().includes(rVal.toLowerCase());
    })
  }

  /**
   * getApiCall(): boolean
   * @returns value of apiCallDone property 
   */
  getApiCAll(): boolean {
    return this.apiCallDone;
  }

  /**
   * sortMe(filteredCountries: Country[]): Country[]
   * @param filteredCountries list of Country objects representing the filtered countries
   * @returns list of Country objects according to the order representing by sortField and ascending
   */
  private sortMe(filteredCountries: Country[]): Country[] {
    // different comparators between country objects based on sortField value
    switch (this.sortField) {
      // consider empty field to be alphabetical sort
      case '':
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        return this.ascending ? filteredCountries : filteredCountries.reverse();
      case 'Name':
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        return this.ascending ? filteredCountries : filteredCountries.reverse();
      case 'Region':
        // if regions are the same, then sort alphabetically
        filteredCountries.sort((a, b) => {
          if(a.region.localeCompare(b.region) == 0){
            return a.name.common.localeCompare(b.name.common);
          }
          return a.region.localeCompare(b.region);
        });
        return this.ascending ? filteredCountries : filteredCountries.reverse();
      case 'Population':
        // if population is the same, then sort by region
        // if region is also the same, then sort alphabetically
        filteredCountries.sort((a, b) => {
          if(a.population == b.population) {
            if(a.region.localeCompare(b.region) == 0) return a.name.common.localeCompare(b.name.common);
            return a.region.localeCompare(b.region);
          }
          return a.population - b.population
        });
        return this.ascending ? filteredCountries : filteredCountries.reverse();
    }
    return filteredCountries;
  }

  /**
   * filterCountries(): Country[]
   * @returns a list of country objects that are filtered according to the input and region values and 
   *          ordered according to the sort by and ascending fields
   */
  filterCountries(): Country[]{
    var outPut = this.filterC(this.searchVal, this.regionVal);
    return this.sortMe(outPut);
  }

  
}
