import { Component } from '@angular/core';

import { AppNavbarComponent} from './common/app.navbar.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
  <base href='/'>
  <h1> Todo App developed using Angular 4 </h1>
    <div class="app">
      <nav-bar></nav-bar>
      <router-outlet></router-outlet>
      <!-- app-home></app-home -->
    </div>
  `
})
export class AppComponent {

}
