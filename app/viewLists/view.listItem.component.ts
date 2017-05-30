import { Component, Input } from '@angular/core';
import { Todo } from '../models/Todo.interface';
import { TodoList } from '../models/TodoList.interface';

@Component({
    selector : 'todo-list-item',
    template : `
                    <td style='text-align:center'>
                        {{item.title}}
                    </td>
                    <td style='text-align:center'>
                        {{item.todos?.length}}
                    </td>
                    <td style='text-align:center'>
                        <button>Edit</button>
                    </td>
                `
})
export class ListItemComponent {

    @Input()
    item : TodoList
}