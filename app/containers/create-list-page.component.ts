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
        <div style='margin-top:20px' class='card'>
            <div class='card-header'>
                <h1>Create List </h1>
            </div>
            <!-- h1 class='h1 text-center'> Create List </h1 -->

            <div class='card-block'>
                <label>
                    Title 
                    <input type='text' [(ngModel)]="title"  (keyup.enter)='onCreate()' novalidate>
                </label>
                <!-- p>value : {{title}}</p -->

                <button class='btn btn-success' (click)='onCreate()'> Create </button>

                <!-- test 1 way data binding 
                <button (click)='onBoogie()'> Boogie </button>
                --> 
           </div>     
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