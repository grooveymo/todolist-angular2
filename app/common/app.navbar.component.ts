/*
 Defines navigational component
 */
import { Component } from '@angular/core';
@Component({
    selector : 'nav-bar',
    styles : ['padding : 10px; margin-left: 20px; background-color : green'],
    template : `
            <div style='border 2px solid red;'>
            <!--
               <a (click)="gotoHome($event)" >Home </a> |
                <a (click)="gotoCreateList()">Create List </a>  |
                <a (click)="gotoViewLists()">View Lists </a>
 
            -->
                <a routerLink="/home" routerLinkActive="active">Home </a> |
                <a routerLink="/create-list" routerLinkActive="active">Create List </a>  |
                <a routerLink="/view-lists" routerLinkActive="active">View Lists </a>
            </div>
    `
})
export class AppNavbarComponent {
    gotoHome(event : any){
        console.log('clicked on ' + event.currentTarget);
    }
    gotoCreateList(event){
                console.log('clicked on ' + event);
    }
    gotoViewLists(event){
                console.log('clicked on ' + event);

    }
}
