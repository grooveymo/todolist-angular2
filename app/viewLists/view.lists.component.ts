import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo.interface';
import { TodoList } from '../models/TodoList.interface';

@Component({
    selector: 'todo-lists',
    template: `
                  <table style='table-layout:fixed; width:100%'>
                    <tr>
                        <th>title</th>
                        <th># items</th>
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
                            <button>Edit</button>
                        </td>        
                    </tr>
                  </table>  
                `
})
export class ViewListsComponent implements OnInit {

    todoLists: TodoList[];

    todo1: Todo = {
        id: 111,
        completed: new Date(),
        created: new Date(),
        isCompleted: false,
        description: "first todo"
    };
    todo2: Todo = {
        id: 222,
        completed: new Date(),
        created: new Date(),
        isCompleted: false,
        description: "second todo"
    };

    mylist = [this.todo1, this.todo2];

    todoList1: TodoList = {
            id : 999,
            dateCompleted: new Date(),
            created: new Date(),
            todos: this.mylist,
            title: "my todo list"

    };


    ngOnInit() {

    this.todoLists = [this.todoList1];

        // this.todoLists.todos.push(this.todo1);
        // this.todoLists.todos.push(this.todo2);
    }

}
