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
    'Europe', 'Asia', 'America', 'Worldwide'
  ];
  constructor() { }

  ngOnInit(): void {
    this.selectedReg.valueChanges.subscribe(value => {
      this.regionVal.emit(value);
    })
  }

}
