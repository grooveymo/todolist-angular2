import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from '../services/todo.service';
import { TodoList } from '../models/TodoList.interface';

//import { NgForm } from '@angular/forms';
//                <input type='text' [(ngModel)]="title" (keyup.enter)='onCreate()' novalidate>
/**
 *  The following sets up 2 way binding
 *                 <input type='text' [(ngModel)]="title"  (keyup.enter)='onCreate()' novalidate>
 * whereas previously had it as
 *                 <input type='text'  (keyup.enter)='onCreate()' novalidate>
 * which only provides 1 way binding. Whatever you set 'title' to in the model, this is reflected in the view.
 */
@Component({
    selector: 'create-list-page',
    template: `
        <div>
            <p> Welcome to the create list page </p>
            <label>
                List Title : 
                <input type='text' [(ngModel)]="title"  (keyup.enter)='onCreate()' novalidate>
            </label>
            <p>value : {{title}}</p>

            <button (click)='onCreate()'> Create </button>

            <!-- test 1 way data binding 
            <button (click)='onBoogie()'> Boogie </button>
               --> 
        </div>
    `
})
export class CreateListPageComponent {

    @Input()
    title: string = '';

    //inject in router 
    constructor(private router: Router, private todoService: TodoService) { }


    onCreate() {
        console.log('Creating list ==>  ' + this.title);
        this.todoService
            .createTodoList({ 'title': this.title })
            .subscribe((data: TodoList) => {
                console.log('routing to /edit-list/' + JSON.stringify(data._id));
                this.router.navigate(['/edit-list/', data._id]);
            });

    }

    /** 
     * //test 1 way data binding
    onBoogie(){
        this.title = 'woogie';
        console.log('boogie gives ' + this.title);
    }
         */

}