import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { TodoService } from '../services/todo.service';
import { TodoList } from '../models/TodoList.interface';
import { Todo } from '../models/Todo.interface';

@Component({
    selector: 'edit-list-page',
    template: `
        <div style='margin-top:20px'>
            <h1 class='alert alert-warning'> Editing List <span class='badge badge-default'> {{currentTodoList?.title}} </span> </h1>
        </div>
        <div class='card'>
            <div class='card-header'>
                <label>Todo</label>
                <input type='text' [(ngModel)]="newTodo"  (keyup.enter)='onAddTodo()' novalidate/>
                <button class='btn btn-success' (click)='onAddTodo()'>Add</button>
            </div>
            <div class='card-block'>
                <ul class='list-group'>
                    <li *ngFor='let item of displayableTodoList' class='list-group-item'>

                        <input class='col-2' type='checkbox' [checked]="item.isCompleted" (change)='toggleIsCompleted(currentTodoList._id, item._id)' novalidate/>

                        <label class='col-4' >
                            {{item.description}}
                         </label>

                        <div class='col-2'>
                            <button  class='btn btn-danger' (click)='removeTodo(currentTodoList._id, item._id)'>remove </button>
                        </div>
                    </li>
                </ul>   
            </div>
        </div>

        <div class='alert alert-info'>
            Number of Active Todos: {{numActive}}
        </div>
        <div class='row'>
            <div class='col-1'>
            <button  class='btn btn-warning' (click)='showAll()'> All </button>
            </div>
            <div class='col-1'>
            <button  class='btn btn-primary' (click)='showActive()'> Active </button>
            </div>
            <div class='col-1'>
            <button  class='btn btn-success' (click)='showCompleted()'> Completed </button>
            </div>
        </div>

    `
})
export class EditListPageComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService) { }

    //will hold the actual dataset
    private currentTodoList: TodoList;

    //will hold the data we want to show based on filters: all, active, completed
    private displayableTodoList: Todo[];

    //assumes only following values : call, active, completed
    //TODO : replace with enum
    private viewMode: string = 'all';

    private newTodo = '';

    //Stores the count of todos yet to be completed
    private numActive = 0;

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
                this.numActive = this.todoService.calculateNumActive(this.currentTodoList.todos);
                this.filterByAll();
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
                this.numActive = this.todoService.calculateNumActive(this.currentTodoList.todos);
                this.filterViewableList();

            });

    }

    /**
     * Toggles the 'completed' status for a todo
     */
    toggleIsCompleted(listId: number, todoId: number) {

        this.todoService.toggleTodoCompleteStatus(listId, todoId)
            .subscribe((data: TodoList) => {
                console.log('bar list is now ' + JSON.stringify(data));
                this.currentTodoList = data;
                this.numActive = this.todoService.calculateNumActive(this.currentTodoList.todos);
                this.filterViewableList();

            });

    }

    /**
     * Removes the todo from it's parent list
     * @param listId Id for list
     * @param todoId Id for todo
     */
    removeTodo(listId: number, todoId: number) {

        this.todoService.removeTodo(listId, todoId)
            .subscribe((data: TodoList) => {
                console.log('bar list is now ' + JSON.stringify(data));
                this.currentTodoList = data;
                this.numActive = this.todoService.calculateNumActive(this.currentTodoList.todos);
                this.filterViewableList();

            });

    }

    /**
     * Sets view mode to 'all' and then resets view
     */
    showAll() {
        this.viewMode = 'all';
        this.filterViewableList();
    }

    /**
     * Sets view mode to 'active' and then resets view
     */
    showActive() {
        this.viewMode = 'active';
        this.filterViewableList();
    }

    /**
     * Sets view mode to 'active' and then resets view
     */
    showCompleted() {
        this.viewMode = 'completed';
        this.filterViewableList();
    }

    /**
     * Filters the viewable dataset based on the value of viewMode.
     */
    filterViewableList() {
        switch (this.viewMode) {
            case 'all': this.filterByAll()
                break;
            case 'active': this.filterByActive();
                break;
            case 'completed': this.filterByCompleted();
                break;
            default:
                console.log('Error - invalid viewMode value supplied');

        }
    }

    /**
     * resets the viewable dataset to that of the original
     */
    filterByAll() {
        this.displayableTodoList = this.currentTodoList.todos;
    }

    /**
     * resets the viewable dataset to only todos that have not been completed
     */
    filterByActive() {
        this.displayableTodoList = this.currentTodoList.todos.filter(function (item) {
            return !item.completed;
        });
    }

    /**
     * resets the viewable dataset to only todos that have been completed
     */
    filterByCompleted() {
        this.displayableTodoList = this.currentTodoList.todos.filter(function (item) {
            return item.completed;
        });
    }

}