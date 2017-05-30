import { Component } from '@angular/core';
import { ViewListsComponent } from "../viewLists/view.lists.component";

@Component ({
    selector : 'view-lists-page',
    template : `
        <div>
            <p> Welcome to the view lists page </p>
            <todo-lists></todo-lists>
        </div>
    `
})
export class ViewListsPageComponent {

};