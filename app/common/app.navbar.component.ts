/*
 Defines navigational component
 Styling from  see https://www.webcodegeeks.com/html5/html5-navigation-bar-example/

 */
import { Component } from '@angular/core';
@Component({
    selector : 'nav-bar',
    template : `
            <style>
                nav {
                    background-color: #333;
                    border: 1px solid #333;
                    color: #fff;
                    display: block;
                    margin: 0;
                    overflow: hidden;
                }
                nav ul{
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                nav ul li {
                    margin: 0;
                    display: inline-block;
                    list-style-type: none;
                    transition: all 0.2s;
                }

                nav > ul > li > a {
                    color: #aaa;
                    /*display: block;*/
                    line-height: 2em;
                    padding: 0.5em 2em;
                    text-decoration: none;
                }
            </style>

            <nav>
                <ul>
                    <li>
                        <a routerLink="/home" routerLinkActive="active">Home </a> |
                    </li>
                    <li>
                        <a routerLink="/create-list" routerLinkActive="active">Create List </a>  |
                    </li>
                    <li>
                        <a routerLink="/view-lists" routerLinkActive="active">View Lists </a>
                    </li>
                </ul>
            </nav>
    `
})
export class AppNavbarComponent {

}
