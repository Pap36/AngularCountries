import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FilterComponent } from './filter/filter.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryCardComponent } from './country-card/country-card.component';
import { CountryPageComponent } from './country-page/country-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DarkModeComponent,
    HomepageComponent,
    SearchbarComponent,
    FilterComponent,
    CountriesListComponent,
    CountryCardComponent,
    CountryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
