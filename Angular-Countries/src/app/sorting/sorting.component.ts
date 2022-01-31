import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  @Output() fieldVal: EventEmitter<string> = new EventEmitter();
  selectedField:FormControl = new FormControl();
  up:boolean = true;
  @Output() orderVal: EventEmitter<boolean> = new EventEmitter();
  fields:string[] = [
    'Name', 'Region', 'Population'
  ];
  constructor() { }

  ngOnInit(): void {
    this.selectedField.valueChanges.subscribe(value => {
      this.fieldVal.emit(value);
    });
  }

  toggleIcon(): void {
    this.up = !this.up;
    this.orderVal.emit(this.up);
  }

}
