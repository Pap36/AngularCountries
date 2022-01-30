import { Component, OnInit } from '@angular/core';
import { DarkModeComponent } from '../dark-mode/dark-mode.component';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  private isDark: boolean = false;

  ngOnInit(): void {
    this.isDark = this.themeService.isDarkMode(); 
  }

  constructor(private themeService: ThemeService) {
    themeService.onInit();
  }

  changeTheme(): void {
    this.isDark = this.themeService.isDarkMode();
    this.isDark ? this.themeService.update('light-theme') : this.themeService.update('dark-theme');
  }
}
