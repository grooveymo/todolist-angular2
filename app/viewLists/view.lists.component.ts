import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Todo } from '../models/Todo.interface';
import { TodoList } from '../models/TodoList.interface';
import { TodoService } from '../services/todo.service';

@Component({
    selector: 'todo-lists',

    template: `
                  <table class='table table-striped'>
                    <thead class='thead-inverse'>
                        <th> Title </th>
                        <th># Items </th>
                        <th> Edit </th>
                        <th> Remove </th>
                    </thead>
                    <tbody>
                    <tr *ngFor="let item of todoLists">
                        <td>
                            {{item.title}}
                        </td>
                        <td>
                            {{item.todos?.length}}
                        </td>
                        <td >
                            <button (click)='editTodoList(item._id)' class='btn btn-warning'>Edit</button>
                        </td>        
                        <td >
                            <button (click)='removeTodoList(item._id)' class='btn btn-danger'>Remove</button>
                        </td>        

                    </tr>
                    </tbody>
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


    /**
     * Removes todo list
     * Note the remote endpoint behaves differently here since it does return an updated set of todo lists minus the one we just deleted
     * Instead we need to check the status of the operation and then manually delete from our in-memory list.
     * 
     * @param todoListId Id for list
     */
    removeTodoList(todoListId: number) {
        this.todoService.removeTodoList(todoListId)
            .subscribe((data: number) => {
                if(data === 200) {
                      this.todoLists = this.todoLists.filter(function(item){
                          return item._id != todoListId;
                      });  
                }
            });
    }
}
