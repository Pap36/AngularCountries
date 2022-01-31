import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from '../country';
import { ThemeService } from '../theme.service';

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

  formatCapital(): string {
    const len = this.country?.capital.length!;
    var cap = this.country?.capital[0]!;
    return len > 1 ? cap?.concat(" and more") : cap;
  }

  formatPopulation(): string {
    const pop: number = Number(this.country?.population);
    var population: string = pop.toString();
    var index = population.length - 1;
    var count = 0;
    while(index > 0) {
      if(count % 3 == 2) {
        population = population.substring(0, index).concat(".", population.substring(index, population.length));
      }
      count += 1;
      index -= 1;
    }

    return population;
  }

}
