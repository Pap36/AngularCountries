import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Country } from '../country';
import { CountryFindingService } from '../country-finding.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private countryFinding: CountryFindingService) { }
  private searchVal: string = '';
  private filterVal: string = '';
  apiCallDone: boolean = false;
  filteredCountries?: Country[];

  ngOnInit(): void {
    this.apiCallDone = this.countryFinding.getApiCAll();
    if(this.apiCallDone) this.getCountries();
    else {
      this.countryFinding.getAllCountries().subscribe(country => {
        this.filteredCountries = country;
        this.countryFinding.setAllCountries(this.filteredCountries);
        this.getCountries();
        setTimeout(() => this.apiCallDone = true, 1000);
      })
    }
  }

  getCountries() : void {
    this.filteredCountries = this.countryFinding.filterCountries();
  }

  updateSearchCriteria(val: string){
    this.searchVal = val;
    console.log(val);
    this.updateDisplay(this.searchVal, this.filterVal);
  }

  updateFilterCriteria(val: string){
    this.filterVal = val === 'Worldwide' ? '' : val;
    console.log(this.filterVal);
    this.updateDisplay(this.searchVal, this.filterVal);
  }

  updateDisplay(sVal: string, rVal: string){
    this.countryFinding.setFilterParameters(sVal, rVal);
    this.filteredCountries = this.countryFinding.filterCountries();
    console.log(this.filteredCountries);
  }

}
