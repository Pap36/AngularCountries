import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryFindingService {

  private target = 'https://restcountries.com/v3.1';

  private allCountries: Country[] = [];
  private searchVal: string = '';
  private regionVal: string = '';
  private sortField: string = '';
  private ascending: boolean = true;
  private apiCallDone: boolean = false;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    var dataObs = this.http.get<Country[]>(`${this.target}/all?fields=name,capital,currencies,flags,population,borders,region,subregion,tld,languages,cca3`);
    return dataObs;
  }

  setAllCountries(countries: Country[]) {
    this.allCountries = countries;
    this.apiCallDone = true;
    //log all regions just so we know;
    // var regions: string[] = [];
    // this.allCountries.forEach(country => {
    //   if(!regions.includes(country.region)) regions.push(country.region);
    // });
    // console.log(regions);
  }

  findCountry(code: String) : Country{
    console.log(this.allCountries);
    const country: Country = this.allCountries.find((country) => {
      return country.cca3 === code;
    })!;
    console.log(country);
    console.log(this.allCountries);
    return country;
  }

  findCountryAPI(code: String) : Observable<Country>{
    return this.http.get<Country>(`${this.target}/alpha/${code}?fields=name,capital,currencies,flags,population,borders,region,subregion,tld,languages,cca3`);
  }

  setFilterParameters(sVal:string, rVal:string, sortF: string, asc: boolean){
    this.sortField = sortF;
    this.ascending = asc;
    this.searchVal = sVal;
    this.regionVal = rVal;
  }

  private filterC(sVal: string, rVal: string): Country[]{
    return this.allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(sVal.toLowerCase()) && country.region.toLowerCase().includes(rVal.toLowerCase());
    })
  }

  getApiCAll(): boolean {
    return this.apiCallDone;
  }

  private sortMe(filteredCountries: Country[]): Country[] {
    console.log(this.sortField);
    switch (this.sortField) {
      case '':
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        return this.ascending ? filteredCountries : filteredCountries.reverse();
      case 'Name':
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        return this.ascending ? filteredCountries : filteredCountries.reverse();
      case 'Region':
        filteredCountries.sort((a, b) => {
          if(a.region.localeCompare(b.region) == 0){
            return a.name.common.localeCompare(b.name.common);
          }
          return a.region.localeCompare(b.region);
        });
        return this.ascending ? filteredCountries : filteredCountries.reverse();
      case 'Population':
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

  filterCountries(): Country[]{
    var outPut = this.filterC(this.searchVal, this.regionVal);
    return this.sortMe(outPut);
  }

  
}
