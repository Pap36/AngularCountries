import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../country';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent implements OnInit {

  @Input() country?: Country; // the country whose card is displayed
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  /**
   * navigateTo(): void
   * upon clicking on the card, navigate to the country's page
   */
  navigateTo(): void {
    this.router.navigateByUrl(`detail/${this.country?.cca3}`);
  }

  /**
   * formatCapital(): string
   * @returns a string representing either the capital of the country
   *          if there is only one, or the first capital + ' and more'
   *          if there is more than one capital
   */
  formatCapital(): string {
    const len = this.country?.capital.length!;
    var cap = this.country?.capital[0]!;
    return len > 1 ? cap?.concat(" and more") : cap;
  }

  /**
   * formatPopulation(): string 
   * @returns string representing the population of the country
   *          nicely formated using '.'
   */
  formatPopulation(): string {
    // get the population as a string
    const pop: number = Number(this.country?.population);
    var population: string = pop.toString();
    // work from the end and add a '.' after every other 3 characters
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
