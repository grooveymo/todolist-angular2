import { Component } from '@angular/core';

import { AppNavbarComponent } from './common/app.navbar.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <base href='/'>
    <div class='container'>
      <div class='jumbotron'>
        <h1> Todo App (Angular 4) </h1>
      </div> 
      <div class="app">
        <nav-bar></nav-bar>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {

}
