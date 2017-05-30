import { Todo } from './Todo.interface'
export interface TodoList {
    id : number,
    dateCompleted : Date,
    created : Date,
    todos : Todo[],
    title : string
}