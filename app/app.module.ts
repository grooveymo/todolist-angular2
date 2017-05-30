import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HomeComponent} from './containers/home.component';
import { AppNavbarComponent } from './common/app.navbar.component';
import {CreateListPageComponent } from './containers/create-list-page.component'
import {EditListPageComponent } from './containers/edit-list-page.component'
import {ViewListsPageComponent } from './containers/view-lists-page.component'
import { ViewListsComponent } from "./viewLists/view.lists.component";


import {RouterModule, Routes} from '@angular/router'

//declare app routes (note should not have leading slash)
const appRoutes : Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'create-list', component : CreateListPageComponent},
  {path : 'edit-list', component : EditListPageComponent},
  {path : 'view-lists', component : ViewListsPageComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AppNavbarComponent,
    CreateListPageComponent,
    EditListPageComponent,
    ViewListsPageComponent,
    ViewListsComponent,
  ]
})
export class AppModule {}
