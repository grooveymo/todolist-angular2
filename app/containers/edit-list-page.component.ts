import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { TodoService } from '../services/todo.service';
import { TodoList } from '../models/TodoList.interface';

@Component({
    selector: 'edit-list-page',
    template: `
        <style>
            .todo {
                padding : 10px;
                display:inline;
                width : 100px;
                margin-left, margin-bottom:10px;
            }
        </style>
        <div>
            <p> Editing {{currentTodoList?.title}} </p>
        </div>
        <div>
            <input type='text' [(ngModel)]="newTodo"  (keyup.enter)='onAddTodo()' novalidate/>
        </div>
        <div>
            <ul>
            <li *ngFor='let item of currentTodoList?.todos'>

                <div class='todo'>            
                    <input type='checkbox' style='width:5%' [checked]="item.isCompleted" (change)='toggleIsCompleted(currentTodoList._id, item._id)' novalidate/>

                    <label  style='width:70%' >
                        {{item.description}}
                   </label>

                    <button (click)='removeTodo(currentTodoList._id, item._id)'>remove </button>
                </div>
            </li>
            </ul>   
        </div>
    `
})
export class EditListPageComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService) { }

    private currentTodoList: TodoList;

    private newTodo = '';
    /**
     * Want to retrieve the TodoList from db so that we can edit it.
     * The _id is passed in via the route /edit-lists/:_id
     */
    ngOnInit() {
        console.log('calling onInit in Edit component');

        this.route.params
            .switchMap((params: Params) => this.todoService.getTodoList(params['id']))
            .subscribe(
            (todoList: TodoList) => {
                this.currentTodoList = todoList
                console.log('retrieved : ' + this.currentTodoList.title);
            }
            );
    }


    /**
     * Adds new Todo to current List
     */
    onAddTodo() {
        console.log('adding todo = ' + this.newTodo);
        this.todoService.addTodo(this.currentTodoList._id, this.newTodo)
            .subscribe((data: TodoList) => {
                console.log('bar list is now ' + JSON.stringify(data));
                this.currentTodoList = data;
                this.newTodo = '';
            });

    }

    toggleIsCompleted(listId: number, todoId: number) {

        this.todoService.toggleTodoCompleteStatus(listId, todoId)
            .subscribe((data: TodoList) => {
                console.log('bar list is now ' + JSON.stringify(data));
                this.currentTodoList = data;
            });

    }

    removeTodo(listId: number, todoId: number) {

        this.todoService.removeTodo(listId, todoId)
            .subscribe((data: TodoList) => {
                console.log('bar list is now ' + JSON.stringify(data));
                this.currentTodoList = data;
            });

    }

}