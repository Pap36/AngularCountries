import { Component } from '@angular/core';
import { CountryFindingService } from './country-finding.service';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss']
})
export class AppComponent {
  title = 'Angular-Countries';
  private isDark: boolean = false;


  constructor(private themeService: ThemeService, private countryFinding: CountryFindingService) {
    themeService.onInit();
    this.isDark = themeService.isDarkMode(); 
    this.countryFinding.getAllCountries();
    console.log("Done");
  }

  changeTheme(): void {
    this.isDark = this.themeService.isDarkMode();
    this.isDark ? this.themeService.update('light-theme') : this.themeService.update('dark-theme');
  }
}
