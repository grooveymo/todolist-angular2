import { Todo } from './Todo.interface'
export interface TodoList {
    _id : number,
    dateCompleted : Date,
    created : Date,
    todos : Todo[],
    title : string
}