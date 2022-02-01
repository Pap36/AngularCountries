import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Output() searchVal: EventEmitter<string> = new EventEmitter(); // emits the value of the input field
  searchControl: FormControl = new FormControl(); // listens to changes on the input field
  constructor() { }

  ngOnInit(): void {
    // listen to the input field
    this.searchControl.valueChanges.subscribe(value => {
      this.searchVal.emit(value);
    })
  }

}
