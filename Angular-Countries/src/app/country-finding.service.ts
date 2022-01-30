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
  private apiCallDone: boolean = false;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    var dataObs = this.http.get<Country[]>(`${this.target}/all?fields=name,capital,currencies,flags,population,borders,region,subregion,tld,languages`);
    return dataObs;
  }

  setAllCountries(countries: Country[]) {
    this.allCountries = countries;
    //log all regions just so we know;
    // var regions: string[] = [];
    // this.allCountries.forEach(country => {
    //   if(!regions.includes(country.region)) regions.push(country.region);
    // });
    // console.log(regions);
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

  getApiCAll(): boolean {
    return this.apiCallDone;
  }

  filterCountries(): Country[]{
    console.log(this.allCountries);
    return this.filterC(this.searchVal, this.regionVal);
  }


}
