import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// alpega logo
const LOGO_ICON = `
  <?xml version="1.0" encoding="utf-8"?>
  <svg viewBox="0.0 0.0 125.103 84.7" width="125.103px" height="84.7px" xmlns="http://www.w3.org/2000/svg">
    <path d="M125.4,82.1 L105.2,41.8 C105.2,41.8 105.2,41.8 105.2,41.8 L85,1.5 C85,1.5 85,1.5 85,1.4 C85,1.4 85,1.3 84.9,1.3 C84.9,1.3 84.9,1.3 84.9,1.3 C84.9,1.3 84.9,1.2 84.8,1.2 C84.8,1.2 84.7,1.1 84.7,1.1 C84.7,1.1 84.6,1 84.6,1 C84.6,1 84.5,0.9 84.5,0.9 C84.5,0.9 84.4,0.9 84.4,0.8 C84.4,0.8 84.3,0.7 84.3,0.7 C84.3,0.7 84.2,0.7 84.2,0.6 C84.2,0.6 84.1,0.6 84.1,0.5 C84.1,0.5 84,0.5 84,0.5 C84,0.5 83.9,0.5 83.8,0.4 C83.8,0.4 83.7,0.4 83.7,0.4 C83.6,0.4 83.6,0.4 83.5,0.4 C83.5,0.4 83.4,0.4 83.4,0.4 C83.3,0.4 83.2,0.4 83.1,0.4 L83.1,0.4 L43,0.4 C42.9,0.4 42.8,0.4 42.7,0.4 C42.7,0.4 42.6,0.4 42.6,0.4 C42.5,0.4 42.5,0.4 42.4,0.4 C42.4,0.4 42.3,0.4 42.3,0.4 C42.3,0.4 42.2,0.4 42.2,0.5 C42.2,0.5 42.1,0.5 42.1,0.6 C42.1,0.6 42,0.6 42,0.7 C42,0.7 41.9,0.7 41.9,0.8 C41.9,0.8 41.8,0.9 41.8,0.9 C41.8,0.9 41.7,0.9 41.7,1 C41.7,1 41.6,1.1 41.6,1.1 C41.6,1.1 41.5,1.2 41.5,1.2 C41.5,1.2 41.4,1.3 41.4,1.3 C41.4,1.3 41.4,1.4 41.3,1.4 C41.3,1.4 41.3,1.4 41.3,1.4 C41.3,1.4 41.3,1.5 41.3,1.5 C41.3,1.5 41.3,1.5 41.3,1.6 L21,41.8 C21,41.8 21,41.8 21,41.8 L0.8,82.1 C0.5,82.7 0.5,83.5 0.9,84.1 C1.3,84.7 1.9,85.1 2.6,85.1 L43,85.1 L43,85.1 C43,85.1 43,85.1 43,85.1 C43.1,85.1 43.2,85.1 43.3,85.1 C43.3,85.1 43.4,85.1 43.4,85.1 C43.5,85.1 43.5,85.1 43.6,85.1 C43.6,85.1 43.7,85.1 43.7,85.1 C43.8,85.1 43.8,85.1 43.9,85 C43.9,85 44,85 44,85 C44,85 44.1,85 44.1,84.9 C44.1,84.9 44.2,84.9 44.2,84.8 C44.2,84.8 44.3,84.7 44.3,84.7 C44.3,84.7 44.4,84.7 44.4,84.6 C44.4,84.6 44.5,84.5 44.5,84.5 C44.5,84.5 44.5,84.5 44.6,84.4 C44.6,84.4 44.7,84.3 44.7,84.3 C44.7,84.3 44.7,84.2 44.8,84.2 C44.8,84.2 44.8,84.2 44.8,84.2 C44.8,84.2 44.8,84.1 44.9,84.1 C44.9,84.1 44.9,84.1 44.9,84 L63.3,47.3 L81.7,84 C81.7,84 81.7,84 81.7,84.1 C81.7,84.1 81.7,84.2 81.8,84.2 C81.8,84.2 81.8,84.2 81.8,84.2 C81.8,84.2 81.8,84.3 81.9,84.3 C81.9,84.3 82,84.4 82,84.4 C82,84.4 82,84.5 82.1,84.5 C82.1,84.5 82.2,84.6 82.2,84.6 C82.2,84.6 82.3,84.6 82.3,84.7 C82.3,84.7 82.4,84.8 82.4,84.8 C82.4,84.8 82.5,84.8 82.5,84.9 C82.5,84.9 82.6,85 82.6,85 C82.6,85 82.7,85 82.7,85 C82.8,85 82.8,85 82.9,85.1 C82.9,85.1 83,85.1 83,85.1 C83.1,85.1 83.1,85.1 83.2,85.1 C83.2,85.1 83.3,85.1 83.3,85.1 C83.4,85.1 83.5,85.1 83.6,85.1 C83.6,85.1 83.6,85.1 83.6,85.1 L83.6,85.1 L123.9,85.1 C124.6,85.1 125.2,84.7 125.6,84.1 C125.7,83.5 125.8,82.8 125.4,82.1 L125.4,82.1 Z M66.4,40.7 L83.3,6.9 L100.2,40.7 L66.4,40.7 Z M80,4.4 L75.3,13.8 L63.1,38.2 L46.2,4.4 L80,4.4 L80,4.4 Z M43,6.9 L53.1,27.1 L59.9,40.7 L26.1,40.7 L43,6.9 Z M22.8,47.2 L39.7,81 L5.9,81 L22.8,47.2 Z M43,78.5 L26.1,44.7 L59.9,44.7 L43,78.5 Z M100.2,44.7 L83.3,78.5 L66.4,44.7 L100.2,44.7 Z M86.6,81 L103.5,47.2 L120.4,81 L86.6,81 Z" id="Shape" fill="#FF0054"/>
  </svg>
  `;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isDark: boolean = false; // wether current theme is dark or not 
  
  constructor(
    private themeService: ThemeService,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    themeService.onInit();
    iconRegistry.addSvgIconLiteral('logo', sanitizer.bypassSecurityTrustHtml(LOGO_ICON));
  }

  ngOnInit(): void {
    this.isDark = this.themeService.isDarkMode(); 
  }

  /**
   * changeTheme(): void
   * change the theme according to the current one
   * from light -> dark
   * or
   * from dark -> light
   */
  changeTheme(): void {
    this.isDark = this.themeService.isDarkMode();
    this.isDark ? this.themeService.update('light-theme') : this.themeService.update('dark-theme');
    // make sure to update the value of isDark
    this.isDark = !this.isDark;
  }

  /**
   * backToHome(): void
   * navigates back to homepage
   */
  backToHome(): void {
    this.router.navigateByUrl('');
  }
}
