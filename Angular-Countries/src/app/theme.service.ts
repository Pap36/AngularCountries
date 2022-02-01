import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private colorTheme: string = 'light-theme'; // string representing the current theme

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  

  onInit(): void {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  /**
   * update(theme): void
   * updates the whole documents theme to either light-theme or dark-theme
   * based on the current theme
   */
  update(theme: 'dark-theme' | 'light-theme'): void {
    this.setColorTheme(theme);
    const previousColorTheme =
      theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  /**
   * isDarkMode(): boolean
   * @returns true if current theme is set to dark-theme
   *          false otherwise
   */
  isDarkMode(): boolean {
    return this.colorTheme === 'dark-theme';
  }

  /**
   * setColorTheme(theme: string): void
   * @param theme string representing the theme that has been set
   * stores the theme that has been set in local storage so it's not forgotten upon refresh
   */
  private setColorTheme(theme: string): void {
    this.colorTheme = theme;
    localStorage.setItem('selectedTheme', theme);
  }

  /**
   * getColorTheme()
   * initialises the colorTheme property with the string representing the theme
   * it access it from the local storage
   */
  private getColorTheme(): void {
    this.colorTheme = localStorage.getItem('selectedTheme')!;
  }
}
