import { Component, OnInit } from '@angular/core';
import { Country } from '../country';
import { CountryFindingService } from '../country-finding.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private countryFinding: CountryFindingService) { }
  private searchVal: string = '';
  private filterVal: string = '';
  filteredCountries: Country[] = [];
  ngOnInit(): void {
    console.log("Now");
    this.filteredCountries = this.countryFinding.filterCountries();
    console.log(this.filteredCountries);
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
