import { Component } from '@angular/core';
import { ViewListsComponent } from "../viewLists/view.lists.component";

@Component ({
    selector : 'view-lists-page',
    template : `
        <div style='margin-top:20px'>
            <h1 class='h1'> View Lists </h1>
            <todo-lists></todo-lists>
        </div>
    `
})
export class ViewListsPageComponent {

};