import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Output() searchVal: EventEmitter<string> = new EventEmitter();
  searchControl: FormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      this.searchVal.emit(value);
    })
  }

}
