import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private colorTheme: string = 'light-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  onInit() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  update(theme: 'dark-theme' | 'light-theme') {
    this.setColorTheme(theme);
    const previousColorTheme =
      theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  isDarkMode() {
    return this.colorTheme === 'dark-theme';
  }

  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem('selectedTheme', theme);
  }

  private getColorTheme() {
    this.colorTheme = localStorage.getItem('selectedTheme')!;
  }
}
