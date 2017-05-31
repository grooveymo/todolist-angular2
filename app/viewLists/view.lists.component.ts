import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Todo } from '../models/Todo.interface';
import { TodoList } from '../models/TodoList.interface';
import { TodoService } from '../services/todo.service';

@Component({
    selector: 'todo-lists',

    template: `
                <style>
                table {
                    table-layout: fixed;
                    width: 100%;
                    border-collapse: collapse;
                    border: 3px solid purple;
                    }

                    thead th:nth-child(1) {
                    width: 30%;
                    }

                    thead th:nth-child(2) {
                    width: 20%;
                    }

                    thead th:nth-child(3) {
                    width: 15%;
                    }

                    thead th:nth-child(4) {
                    width: 35%;
                    }

                    th, td {
                    padding: 20px;
                }
                
                tbody tr:nth-child(odd) {
                    background-color: #ff33cc;
                    }

                    tbody tr:nth-child(even) {
                    background-color: #e495e4;
                    }

                    tbody tr {
                    }

                    table {
                    background-color: #ff33cc;
                    }
                </style>

                  <table style='table-layout:fixed; width:100%'>
                    <tr>
                        <th> title </th>
                        <th># items </th>
                        <th> action </th>
                    </tr>
                    <tr *ngFor="let item of todoLists">
                        <td style='text-align:center'>
                            {{item.title}}
                        </td>
                        <td style='text-align:center'>
                            {{item.todos?.length}}
                        </td>
                        <td style='text-align:center'>
                            <button (click)='editTodoList(item._id)'>Edit</button>
                        </td>        
                    </tr>
                  </table>  
                `
})
export class ViewListsComponent implements OnInit {

    todoLists: TodoList[];

    todo1: Todo = {
        _id: 111,
        completed: new Date(),
        created: new Date(),
        isCompleted: false,
        description: "first todo"
    };
    todo2: Todo = {
        _id: 222,
        completed: new Date(),
        created: new Date(),
        isCompleted: false,
        description: "second todo"
    };

    mylist = [this.todo1, this.todo2];

    todoList1: TodoList = {
        _id: 999,
        dateCompleted: new Date(),
        created: new Date(),
        todos: this.mylist,
        title: "my todo list"

    };

    constructor(private router: Router, private todoService: TodoService) { }

    ngOnInit() {

        //this.todoLists = [this.todoList1];

        this.todoService.getTodoLists().subscribe((data: TodoList[]) => { this.todoLists = data });
    }

    /**
     * Navigates to edit list page
     * @param todoListId Id of Todo List we wish to edit
     */
    editTodoList(todoListId: number) {
        this.router.navigate(['/edit-list/', todoListId]);
    }
}
