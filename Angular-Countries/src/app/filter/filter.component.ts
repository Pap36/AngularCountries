import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() regionVal: EventEmitter<string> = new EventEmitter();
  selectedReg:FormControl = new FormControl();
  regions:string[] = [
    'Asia', 'Africa', 'Americas', 'Antarctic', 'Europe', 'Oceania', 'Worldwide'
  ];
  constructor() { }

  ngOnInit(): void {
    this.selectedReg.valueChanges.subscribe(value => {
      this.regionVal.emit(value);
    })
  }

}
