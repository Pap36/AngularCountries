import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() regionVal: EventEmitter<string> = new EventEmitter(); // emit the value of the region
  selectedReg:FormControl = new FormControl(); // listen to the region field
  // list of regions to filter by
  regions:string[] = [
    'Asia', 'Africa', 'Americas', 'Antarctic', 'Europe', 'Oceania', 'Worldwide'
  ];

  constructor() { }

  ngOnInit(): void {
    // listen to the region field
    this.selectedReg.valueChanges.subscribe(value => {
      this.regionVal.emit(value);
    })
  }

}
