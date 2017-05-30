import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Todo } from '../models/Todo.interface';
import { TodoList } from '../models/TodoList.interface';

const TODO_API: string = 'http://localhost:9090/api/todolists';

@Injectable()
export class TodoService {
  constructor(private http: Http) {}

  getTodoLists(): Observable<TodoList[]> {
      console.log('about to call ' + TODO_API);
    return this.http
      .get(TODO_API)
      .map((response: Response) => response.json());
  }

}