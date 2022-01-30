import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../country';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent implements OnInit {

  @Input() country?: Country;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(): void {
    this.router.navigateByUrl(`detail/${this.country?.cca3}`);
  }

}
