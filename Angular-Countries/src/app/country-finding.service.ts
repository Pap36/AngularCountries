import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryFindingService {

  private target = 'https://restcountries.com/v3.1';

  private allCountries: Country[] = [];
  private searchVal: string = '';
  private regionVal: string = '';

  constructor(private http: HttpClient) {}

  getAllCountries(): void {
    var dataObs = this.http.get<Country[]>(`${this.target}/all?fields=name,capital,currencies,flags,population,borders,region,subregion,tld,languages`);
    dataObs.subscribe(value => {
      this.allCountries = value;
    })
  }

  setFilterParameters(sVal:string, rVal:string){
    this.searchVal = sVal;
    this.regionVal = rVal;
  }

  private filterC(sVal: string, rVal: string): Country[]{
    return this.allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(sVal.toLowerCase()) && country.region.toLowerCase().includes(rVal.toLowerCase());
    })
  }

  filterCountries(): Country[]{
    console.log(this.allCountries);
    return this.filterC(this.searchVal, this.regionVal);
  }

}
