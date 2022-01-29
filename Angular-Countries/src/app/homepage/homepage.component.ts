import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  private searchVal: string = '';
  private filterVal: string = '';
  ngOnInit(): void {
  }

  updateSearchCriteria(val: string){
    this.searchVal = val;
    console.log(val);
    this.updateDisplay(this.searchVal, this.filterVal);
  }

  updateFilterCriteria(val: string){
    this.filterVal = val;
    console.log(val);
    this.updateDisplay(this.searchVal, this.filterVal);
  }

  updateDisplay(sVal: string, fVal: string){
    
  }

}
