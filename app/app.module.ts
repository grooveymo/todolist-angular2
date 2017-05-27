import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HomeComponent} from './containers//home.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ]
})
export class AppModule {}
