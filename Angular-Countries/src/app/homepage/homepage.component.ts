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
  private sortingField: string = '';
  private ascendingSort: boolean = false;
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
    this.updateDisplay(this.searchVal, this.filterVal, this.sortingField, this.ascendingSort);
  }

  updateFilterCriteria(val: string){
    this.filterVal = val === 'Worldwide' ? '' : val;
    console.log(this.filterVal);
    this.updateDisplay(this.searchVal, this.filterVal, this.sortingField, this.ascendingSort);
  }

  updateSortingCriteria(val: string){
    this.sortingField = val;
    this.updateDisplay(this.searchVal, this.filterVal, this.sortingField, this.ascendingSort);
  }

  updateSortingOrder(val: boolean){
    this.ascendingSort = val;
    this.updateDisplay(this.searchVal, this.filterVal, this.sortingField, this.ascendingSort);
  }

  updateDisplay(sVal: string, rVal: string, sortF: string, asc: boolean){
    this.countryFinding.setFilterParameters(sVal, rVal, sortF, asc);
    this.filteredCountries = this.countryFinding.filterCountries();
  }

}
