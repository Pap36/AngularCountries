import { Component, OnInit} from '@angular/core';
import { Country } from '../country';
import { CountryFindingService } from '../country-finding.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private countryFinding: CountryFindingService) { }

  private searchVal: string = ''; // value of input field
  private filterVal: string = ''; // value of region to filter by
  private sortingField: string = ''; // value of sorting field
  private ascendingSort: boolean = false; // value of sorting order
  apiCallDone: boolean = false; // wether the api call is done
  filteredCountries?: Country[]; // all the filtered countries

  ngOnInit(): void {
    // first check wheher the api call has been completed by asking the service
    this.apiCallDone = this.countryFinding.getApiCAll();
    if(this.apiCallDone) this.getCountries(); // we can get the list of the countries displayed
    else {
      // we need to get the observable and wait for the api call to finish
      this.countryFinding.getAllCountries().subscribe(country => {
        // store the data
        this.filteredCountries = country;
        // tell the service that the data has been fetched
        this.countryFinding.setAllCountries(this.filteredCountries);
        this.getCountries();
        // let a timer of 1 second for the loading screen just so that it is not too abrupt
        setTimeout(() => this.apiCallDone = true, 1000);
      })
    }
  }

  /**
   * getCountries(): void
   * store the list of only the countries which should be displayed
   */
  getCountries(): void {
    this.filteredCountries = this.countryFinding.filterCountries();
  }

  /**
   * updateSearchCriteria(val: string): void
   * @param val string representing the input value
   */
  updateSearchCriteria(val: string): void{
    this.searchVal = val;
    // make sure to update the list of displayed countries after every change
    this.updateDisplay(this.searchVal, this.filterVal, this.sortingField, this.ascendingSort);
  }

  /**
   * updateFilterCriteria(val: string): void
   * @param val string representing the region to filter by
   */
  updateFilterCriteria(val: string): void{
    // if region is 'Worldwide' treat as initially ('')
    this.filterVal = val === 'Worldwide' ? '' : val;
    this.updateDisplay(this.searchVal, this.filterVal, this.sortingField, this.ascendingSort);
  }

  /**
   * updateSortingCriteria(val: string): void
   * @param val string representing value of sorting field
   */
  updateSortingCriteria(val: string): void{
    this.sortingField = val;
    this.updateDisplay(this.searchVal, this.filterVal, this.sortingField, this.ascendingSort);
  }

  /**
   * updateSortingOrder(val: boolean): void
   * @param val boolean value representing whether the order should be ascending or descending
   */
  updateSortingOrder(val: boolean): void{
    this.ascendingSort = val;
    this.updateDisplay(this.searchVal, this.filterVal, this.sortingField, this.ascendingSort);
  }

  /**
   * updateDisplay(sVal: string, rVal: string, sortF: string, asc: boolean): void
   * @param sVal input field value
   * @param rVal region to filter by
   * @param sortF sorting field value
   * @param asc sorting order
   */
  updateDisplay(sVal: string, rVal: string, sortF: string, asc: boolean): void{
    // set the parameters int the service
    this.countryFinding.setFilterParameters(sVal, rVal, sortF, asc);
    // filter the countries
    this.filteredCountries = this.countryFinding.filterCountries();
  }

}
