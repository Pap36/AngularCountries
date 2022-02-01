import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  @Output() fieldVal: EventEmitter<string> = new EventEmitter(); // emits the value of the sorting field
  selectedField:FormControl = new FormControl(); // listens to changes in the sorting field
  up:boolean = true; // wether the order is ascending (up) or descending (!up)
  @Output() orderVal: EventEmitter<boolean> = new EventEmitter(); // emits the value of ascending
  
  // fields to sort by
  fields:string[] = [
    'Name', 'Region', 'Population'
  ];

  constructor() { }

  ngOnInit(): void {
    // add a listener on the sort-by field
    this.selectedField.valueChanges.subscribe(value => {
      this.fieldVal.emit(value);
    });
  }

  /**
   * toggleIcon(): void
   * changes the ordering icon from arrow_upwards to arrow_downbards and vice versa
   * emits the value of up.
   */
  toggleIcon(): void {
    this.up = !this.up;
    this.orderVal.emit(this.up);
  }

}
